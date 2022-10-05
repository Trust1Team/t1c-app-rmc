<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">
      <button class="btn btn-primary"
              :disabled="getCertificateLoading"
              @click="pinPadDialog">
        {{ $t("cardActions.checkPin") }}
      </button>
    </div>
  </div>

  <PinDialog ref="pinDialog" @confirmPin="pinSelected" :pin-error-description="pinErrorDescription"/>
</template>

<script>
import { useToast } from 'vue-toastification'
import Trust1ConnectorService from '@/services/Trust1ConnectorService'
import PinDialog from '@/components/UIComponents/PinDialog'

export default {
  name: 'GenericPaymentCardActions',
  setup() {
    const toast = useToast()
    return {
      toast
    }
  },
  data() {
    return {
      pinErrorDescription: undefined
    }
  },
  methods: {
    pinPadDialog() {
      this.pinErrorDescription = undefined
      this.$refs.pinDialog.showDialog()
    },

    pinSelected(pin) {
      const client = Trust1ConnectorService.getClient().paymentGeneric(
        this.getReader.id,
        this.getPin,
        this.getPinType
      )
      const data = {
        pin: pin
      }

      client.verifyPin(this.getReader.card.modules[0], data).then(res => {
        if (res && res.success && res.data.verified) {
          this.$refs.pinDialog.hideDialog()
          this.pinErrorDescription = undefined
          this.toast.success(this.$t('cardActions.verifiedPin'))
        } else {
          this.$refs.pinDialog.hideDialog()
          this.pinErrorDescription = 'Pin code is not correct'
          this.toast.error(this.$t('cardActions.incorrectPin'))
        }
      }, err => {
        this.pinErrorDescription = err.description
        this.toast.error(err.description)
      })
    },
    remove() {
      this.resetForm()
    },
    dragover(event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100')
        event.currentTarget.classList.add('bg-green-300')
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    drop(event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.handleUpload()
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
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
  components: { PinDialog }
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
