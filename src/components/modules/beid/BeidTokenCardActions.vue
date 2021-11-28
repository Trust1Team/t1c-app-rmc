<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">

      <div id="single-file-upload" class="p-5">
        <div class="preview">
          <Dropzone
              ref-key="dropzoneSingleRef"
              :options="{
                  url: 'http://localhost:9000/v1/sign/upload',
                  thumbnailWidth: 150,
                  maxFilesize: 100,
                  maxFiles: 1,
                }"
              class="dropzone"
          >
            <div class="text-lg font-medium">
              Drop your file here or click to upload to start the signing process.
            </div>
            <div class="text-gray-600">
            </div>
          </Dropzone>
        </div>
      </div>

      <button
        class="btn btn-primary"
        :disabled="getCertificateLoading"
        @click="pinPadDialog"
      >
        {{ $t("cardActions.checkPin") }}
      </button>
    </div>
  </div>

<!--  PINPAD MODAL BEGIN-->
  <div
      id="pin-pad-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body flex justify-center">
          <pinpad @confirmPin="pinSelected"></pinpad>
        </div>
      </div>
    </div>
  </div>
<!--  PINPAD MODAL END-->

  <!-- BEGIN: Notification Content -->
  <div id="success-notification-content" class="toastify-content hidden flex">
    <CheckCircleIcon class="text-theme-9" />
    <div class="ml-4 mr-4">
      <div class="font-medium">Pin verified!</div>
      <div class="text-gray-600 mt-1">
        Verification of pin was successful.
      </div>
    </div>
  </div>
  <!-- END: Notification Content -->

  <!-- BEGIN: Notification Content -->
  <div id="fail-notification-content" class="toastify-content hidden flex">
    <AlertCircleIcon class="text-theme-6" />
    <div class="ml-4 mr-4">
      <div class="font-medium">Pin Failed!</div>
      <div class="text-gray-600 mt-1">
        <span v-if="pinErrorDescription">{{pinErrorDescription}}</span>
        <span v-else>Verification of pin was not successful.</span>
      </div>
    </div>
  </div>
  <!-- END: Notification Content -->
</template>

<script>
import Pinpad from '@/components/UIComponents/Pinpad'
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'
import Toastify from 'toastify-js'
import { onMounted, provide, ref } from 'vue'
import store from '@/store'

export default {
  name: 'BeidTokenCardActions',
  setup() {
    const dropzoneSingleRef = ref()

    provide('bind[dropzoneSingleRef]', el => {
      dropzoneSingleRef.value = el
    })

    onMounted(() => {
      const elDropzoneSingleRef = dropzoneSingleRef.value
      elDropzoneSingleRef.dropzone.on('success', () => {
        alert('Added file.')
      })
      elDropzoneSingleRef.dropzone.on('error', () => {
        alert('No more files please!')
      })
      elDropzoneSingleRef.dropzone.on('sending', function(file, xhr, formData) {
        formData.append('non-repudiation-certificate', store.getters['card/getNonRepudiationCertificate'].certificate)
        formData.append('root-certificate', store.getters['card/getRootCertificate'].certificate)
        formData.append('intermediate-certificate', store.getters['card/getIntermediateCertificates'].certificate)
      })
    })
  },
  data() {
    return {
      pinDialogVisible: false,
      pinErrorDescription: undefined,
      file: ''
    }
  },
  methods: {
    pinPadDialog() {
      cash('#pin-pad-modal').modal('show')
      // console.log('open pin dialog')
    },
    successNotification() {
      Toastify({
        node: cash('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    },
    failNotification() {
      Toastify({
        node: cash('#fail-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    },
    pinSelected(pin) {
      const client = Trust1ConnectorService.getClient().generic(
        this.getReader.id,
        this.getPin,
        this.getPinType
      )
      const data = {
        pin: pin
      }

      client.verifyPin('beid', data).then(res => {
        if (res && res.success && res.data.verified) {
          cash('#pin-pad-modal').modal('hide')
          this.successNotification()
        } else {
          this.failNotification()
        }
      }, err => {
        console.log(err)
        this.pinErrorDescription = err.description
        this.failNotification()
      })
    }
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin']
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType']
    }
  },
  components: { Pinpad }
}
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}
.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}
</style>
