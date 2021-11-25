<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">

      <div id="single-file-upload" class="p-5">
        <div class="preview">
          <Dropzone
              ref-key="dropzoneSingleRef"
              :options="{
                  url: 'https://httpbin.org/post',
                  thumbnailWidth: 150,
                  maxFilesize: 0.5,
                  maxFiles: 1,
                  headers: { 'My-Awesome-Header': 'header value' }
                }"
              class="dropzone"
          >
            <div class="text-lg font-medium">
              Drop files here or click to upload.
            </div>
            <div class="text-gray-600">
              This is just a demo dropzone. Selected files are
              <span class="font-medium">not</span> actually uploaded.
            </div>
          </Dropzone>
        </div>
        <div class="source-code hidden">
          <button
              data-target="#copy-single-file-upload"
              class="copy-code btn py-1 px-2 btn-outline-secondary"
          >
            <FileIcon class="w-4 h-4 mr-2" /> Copy example code
          </button>
          <div class="overflow-y-auto mt-3 rounded-md">
            <Highlight id="copy-single-file-upload" class="source-preview">
              <code
                  class="text-xs p-0 rounded-md html pl-5 pt-8 pb-4 -mb-10 -mt-10"
              >
                    <textarea>
                      <Dropzone
                        ref-key="dropzoneSingleRef"
                        :options="{
                          url: 'https://httpbin.org/post',
                          thumbnailWidth: 150,
                          maxFilesize: 0.5,
                          maxFiles: 1,
                          headers: { 'My-Awesome-Header': 'header value' }
                        }"
                        class="dropzone"
                      >
                        <div class="text-lg font-medium">
                          Drop files here or click to upload.
                        </div>
                        <div class="text-gray-600">
                          This is just a demo dropzone. Selected files are
                          <span class="font-medium">not</span> actually uploaded.
                        </div>
                      </Dropzone>
                    </textarea>
              </code>
            </Highlight>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" :disabled="getCertificateLoading">
        {{ $t("cardActions.legalCopy") }}
      </button>

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
    })
  },
  data() {
    return {
      pinDialogVisible: false,
      pinErrorDescription: undefined
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