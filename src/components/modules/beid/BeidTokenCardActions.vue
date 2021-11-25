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

  <!--  User ref to be able to call the functions inside this component -->
  <PinDialog ref="pinDialog" @confirmPin="pinSelected" :pin-error-description="pinErrorDescription"/>

  <notification-toast ref="notificationToast" />

</template>

<script>
import PinDialog from '@/components/UIComponents/PinDialog'
import NotificationToast from '@/components/UIComponents/NotificationToast'
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'
import { onMounted, provide, ref } from 'vue'
import { useToast } from 'vue-toastification'

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
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      pinErrorDescription: undefined,
      toastDescription: undefined,
      toastTitle: undefined
    }
  },
  methods: {
    pinPadDialog() {
      this.pinErrorDescription = undefined
      this.$refs.pinDialog.showDialog()
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
          this.$refs.pinDialog.hideDialog()
          this.pinErrorDescription = undefined
          this.toast.success('Successfully verified the pin code')
        } else {
          this.$refs.pinDialog.hideDialog()
          this.pinErrorDescription = 'Pin code is not correct'
          this.toast.error('Pin code is not correct')
        }
      }, err => {
        this.pinErrorDescription = err.description
        this.toast.error(err.description)
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
  components: { NotificationToast, PinDialog }
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
