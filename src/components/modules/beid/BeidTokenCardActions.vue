<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">

      <div id="single-file-upload" class="p-5">
        <input ref="file" v-on:change="handleUpload()"  type="file">

<!--          <Dropzone-->
<!--              ref-key="dropzoneSingleRef"-->
<!--              :options="{-->
<!--                  url: 'https://httpbin.org/post',-->
<!--                  thumbnailWidth: 150,-->
<!--                  maxFilesize: 5,-->
<!--                  maxFiles: 1,-->
<!--                }"-->
<!--              class="dropzone"-->
<!--          >-->
<!--            <div class="text-lg font-medium">-->
<!--              Drop files here or click to upload.-->
<!--            </div>-->
<!--            <div class="text-gray-600">-->
<!--              This is just a demo dropzone. Selected files are-->
<!--              <span class="font-medium">not</span> actually uploaded.-->
<!--            </div>-->
<!--          </Dropzone>-->
      </div>

      <button class="btn btn-primary" :disabled="getCertificateLoading" @click="uploadFileToSign">
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

  <SignModal ref="signModal" :bytes-to-sign="bytesToSign" :document-id="documentId" module="beid" />

</template>

<script>
import PinDialog from '@/components/UIComponents/PinDialog'
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'
import SigningService from '@/services/SigningService'
import { useToast } from 'vue-toastification'
import SignModal from '@/components/modules/beid/SignDialog'

export default {
  name: 'BeidTokenCardActions',
  setup() {
    const toast = useToast()
    return {
      toast
    }
  },
  data() {
    return {
      pinErrorDescription: undefined,
      files: undefined,
      bytesToSign: undefined,
      documentId: undefined
    }
  },
  methods: {
    handleUpload() {
      console.log('selected file', this.$refs.file.files)
      this.files = this.$refs.file.files
    },
    uploadFileToSign() {
      if (this.files) {
        SigningService.uploadFile(this.files[0], this.getNonRepudiationCertificate.certificate, this.getRootCertificate.certificate, this.getIntermediateCertificates.certificate).then(res => {
          console.log(res.data.data)
          this.bytesToSign = res.data.data.bytes
          this.documentId = res.data.data.documentId
          this.$refs.signModal.showDialog()
        }, err => {
          console.error(err)
          this.toast.error(err)
        })
      }
    },
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
    getRootCertificate() {
      return this.$store.getters['card/getRootCertificate']
    },
    getIntermediateCertificates() {
      return this.$store.getters['card/getIntermediateCertificates']
    },
    getNonRepudiationCertificate() {
      return this.$store.getters['card/getNonRepudiationCertificate']
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
  components: { SignModal, PinDialog }
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
