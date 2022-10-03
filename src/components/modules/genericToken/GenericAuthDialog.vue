<template>
  <!--  PINPAD MODAL BEGIN-->
  <div id="sign-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body flex justify-center">
          <div class="flex-column justify-center">
            <!-- BEGIN: Wizard Layout -->
            <div class="wizard flex flex-col lg:flex-row justify-center px-5 sm:px-20">
              <div class="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                <button v-if="step === 1" class="w-10 h-10 rounded-full btn btn-primary" @click="setStep(1)">1</button>
                <button
                  v-else
                  class="w-10 h-10 rounded-full btn text-gray-600 bg-gray-200 dark:bg-dark-1"
                  @click="setStep(1)"
                >
                  1
                </button>
                <div class="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">Authenticate</div>
              </div>
              <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button v-if="step === 2" class="w-10 h-10 rounded-full btn btn-primary" @click="setStep(2)">2</button>
                <button
                  v-else
                  class="w-10 h-10 rounded-full btn text-gray-600 bg-gray-200 dark:bg-dark-1"
                  @click="setStep(2)"
                >
                  2
                </button>
                <div class="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-gray-700 dark:text-gray-600">Finish</div>
              </div>
            </div>
            <div class="px-5 sm:px-20 mt-10 pt-10 border-t border-gray-200 dark:border-dark-5">
              <div v-if="loading" class="flex items-center justify-center">
                <Loading icon="puff" size="40"></Loading>
              </div>

              <div v-if="step === 1 && !loading">
                <div class="wizard-text intro-x">
                  <p>Please enter your pin code to authenticate</p>
                </div>

                <div
                  v-if="pinErrorDescription"
                  class="alert alert-danger-soft show flex items-center mb-2"
                  role="alert"
                >
                  <AlertOctagonIcon class="w-6 h-6 mr-2" />
                  {{ pinErrorDescription }}
                </div>

                <pinpad ref="pinpad" class="intro-x" @submitPin="pinSelected"></pinpad>
              </div>

              <div v-if="step === 2 && !loading">
                <div class="wizard-text intro-x">
                  <p>You have successfully Authenticated</p>
                </div>

                <div class="w-full border-t border-gray-200 dark:border-dark-5 mt-5"></div>

                <div class="intro-x flex items-center justify-center mt-5">
                  <button class="btn btn-primary w-24 ml-2" @click="hideDialog()">Finish</button>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Wizard Layout -->
        </div>
      </div>
    </div>
  </div>
  <!--  PINPAD MODAL END-->
</template>

<script>
import $ from 'cash-dom';
import { useToast } from 'vue-toastification';
import Pinpad from '@/components/UIComponents/Pinpad';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import Loading from '@/global-components/loading-icon/Main';

export default {
  name: 'GenericAuthModal',
  components: { Pinpad, Loading },
  props: ['module', 'bytesToSign'],
  emits: ['closed'],
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  data() {
    return {
      step: 1,
      pinErrorDescription: undefined,
      downloadLink: undefined,
      loading: false,
    };
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
    getRootCertificate() {
      return this.$store.getters['card/getRootCertificate'];
    },
    getIntermediateCertificates() {
      return this.$store.getters['card/getIntermediateCertificates'];
    },
    getNonRepudiationCertificate() {
      return this.$store.getters['card/getNonRepudiationCertificate'];
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin'];
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType'];
    },
  },
  methods: {
    reset() {
      this.downloadLink = undefined;
      this.step = 1;
      this.pinErrorDescription = undefined;
      this.loading = false;
    },
    showDialog() {
      this.reset();
      $('#sign-modal').modal('show');
    },
    hideDialog() {
      $('#sign-modal').modal('hide');
      this.$emit('closed');
    },
    sign(pin) {
      const client = Trust1ConnectorService.getClient().generic(this.getReader.id, this.getPin, this.getPinType);
      const data = {
        pin: pin,
        algorithm: 'sha256',
        data: this.bytesToSign,
      };
      this.loading = true;
      client.authenticate(this.getReader.card.modules[0], data).then(
        (res) => {
          if (res && res.success) {
            this.pinErrorDescription = undefined;
            this.loading = false;
            this.downloadLink = res.data.data;
            this.setStep(2);
            this.toast.success('Successfully authenticated');
          } else {
            this.loading = false;
            this.pinErrorDescription = 'Pin code is not correct';
            this.toast.error('Pin code is not correct');
          }
        },
        (err) => {
          this.loading = false;
          this.pinErrorDescription = err.description;
          this.toast.error(err.description);
        },
      );
    },
    pinSelected(pin) {
      this.sign(pin);
    },
    setStep(nr) {
      this.step = nr;
    },
  },
};
</script>

<style scoped>
.wizard-text {
  margin-bottom: 30px;
}
</style>
