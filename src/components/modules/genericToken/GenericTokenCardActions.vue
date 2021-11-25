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

  <notification-toast ref="notificationToast" />

</template>

<script>
import PinDialog from '@/components/UIComponents/PinDialog'
import NotificationToast from '@/components/UIComponents/NotificationToast'
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'

export default {
  name: 'GenericTokenCardActions',
  data() {
    return {
      pinErrorDescription: undefined,
      toastDescription: undefined,
      toastTitle: undefined
    }
  },
  methods: {
    pinPadDialog() {
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
          // this.$refs.notificationToast.setProps('Verify pin success', 'Successfully verified the pin code')
          this.$refs.notificationToast.successNotification('Verify pin success', 'Successfully verified the pin code', 5000)
        } else {
          this.$refs.pinDialog.hideDialog()
          // this.$refs.notificationToast.setProps('Verify pin failed', 'Pin code is not correct')
          this.$refs.notificationToast.failNotification('Verify pin failed', 'Pin code is not correct', 5000)
        }
      }, err => {
        this.pinErrorDescription = err.description
        // this.$refs.notificationToast.setProps('Verify pin failed', err.description)
        this.$refs.notificationToast.failNotification('Verify pin failed', err.description, 5000)
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
