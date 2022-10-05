<template>
  <div id="sign-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body flex justify-center">
          <div class="flex-column justify-center">
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
                <LoadingIcon icon="puff" size="40" />
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

                <PinPad ref="pinpad" class="intro-x" @submitPin="pinSelected" />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'cash-dom';
import { useStore } from 'store';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { PinPad, LoadingIcon } from '@/components/UIComponents';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'GenericAuthModal',
  components: { PinPad, LoadingIcon },
  props: ['module', 'bytesToSign'],
  emits: ['closed'],
  setup(props, context) {
    const toast = useToast();
    const store = useStore();

    const selectedReader = computed(() => store.getters['reader/getSelectedReader']);
    const selectedPin = computed(() => store.getters['reader/getSelectedPin']);
    const selectedPinType = computed(() => store.getters['reader/getSelectedPinType']);

    const pinpad = ref();
    const step = ref(1);
    const pinErrorDescription = ref();
    const downloadLink = ref();
    const loading = ref(false);

    const hideDialog = () => {
      $('#sign-modal').modal('hide');
      context.emit('closed');
    };

    const sign = (pin) => {
      const client = Trust1ConnectorService.getClient().generic(
        selectedReader.value.id,
        selectedPin.value,
        selectedPinType.value,
      );

      const data = {
        pin: pin,
        algorithm: 'sha256',
        data: props.bytesToSign,
      };

      loading.value = true;
      client.authenticate(selectedReader.value.card.modules[0], data).then(
        (res) => {
          if (res && res.success) {
            pinErrorDescription.value = undefined;
            loading.value = false;
            downloadLink.value = res.data.data;
            setStep(2);
            toast.success('Successfully authenticated');
          } else {
            loading.value = false;
            pinErrorDescription.value = 'Pin code is not correct';
            toast.error('Pin code is not correct');
          }
        },
        (err) => {
          loading.value = false;
          pinErrorDescription.value = err.description;
          toast.error(err.description);
        },
      );
    };

    const pinSelected = (pin) => {
      sign(pin);
    };

    const setStep = (nr) => {
      step.value = nr;
    };

    return {
      toast,
      pinpad,
      step,
      pinErrorDescription,
      downloadLink,
      loading,
      hideDialog,
      sign,
      pinSelected,
      setStep,
    };
  },
};
</script>

<style src="./GenericAuthDialog.style.css" scoped />
