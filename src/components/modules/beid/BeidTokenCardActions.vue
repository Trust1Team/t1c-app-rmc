<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">
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

      <pin-dialog
        @confirmPin="pinSelected"
        :visible="pinDialogVisible"
      ></pin-dialog>
    </div>
  </div>
</template>

<script>
import PinDialog from '../../UIComponents/PinDialog'

export default {
  name: 'BeidTokenCardActions',
  data() {
    return {
      pinDialogVisible: false
    }
  },
  methods: {
    pinSelected(pin) {
      this.pinDialogVisible = false
      console.log(pin)
      // Get reader
      console.log(this.getReader.id)
      // get module

      // execute verify pin

      // display result
    },
    pinPadDialog() {
      // Open pin dialog
      this.pinDialogVisible = true
    }
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
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
