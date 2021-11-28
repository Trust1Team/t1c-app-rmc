<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">
      <button class="btn btn-primary" :disabled="getCertificateLoading">
        {{ $t("cardActions.legalCopy") }}
      </button>

      <button class="btn btn-primary" :disabled="getCertificateLoading" @click="pinPadDialog">
        {{ $t("cardActions.checkPin") }}
      </button>
    </div>
  </div>

  <!--  User ref to be able to call the functions inside this component -->
  <PinDialog ref="pinDialog" @confirmPin="pinSelected" :pin-error-description="pinErrorDescription"/>

</template>

<script>
import PinDialog from '@/components/UIComponents/PinDialog'
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'

import { useToast } from 'vue-toastification'

export default {
  name: 'GenericTokenCardActions',
  setup() {
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
