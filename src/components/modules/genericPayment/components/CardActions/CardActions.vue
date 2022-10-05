<template>
  <div class="token-details-item">
    <h3>{{ $t('cardActions.header') }}</h3>
    <div class="action-buttons">
      <button class="btn btn-primary" :disabled="certLoading" @click="pinPadDialog">
        {{ $t('cardActions.checkPin') }}
      </button>
    </div>
  </div>

  <PinDialog ref="pinDialog" :pin-error-description="pinErrorDescription" @confirmPin="pinSelected" />
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { PinDialog } from '@/components/UIComponents';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'CardActions',
  components: { PinDialog },
  setup() {
    const store = useStore();
    const toast = useToast();

    const pinErrorDescription = ref();
    const pinDialog = ref();

    const certLoading = computed(() => store.getters['card/getCertificateLoading']);
    const selectedReader = computed(() => store.getters['reader/getSelectedReader']);
    const selectedPin = computed(() => store.getters['reader/getSelectedPin']);
    const selectedPinType = computed(() => store.getters['reader/getSelectedPinType']);

    const pinPadDialog = () => {
      pinErrorDescription.value = undefined;
      pinDialog.value.showDialog();
    };

    const pinSelected = (pin) => {
      const client = Trust1ConnectorService.getClient().paymentGeneric(
        selectedReader.value.id,
        selectedPin.value,
        selectedPinType.value,
      );
      const data = {
        pin: pin,
      };

      client.verifyPin(selectedReader.value.card.modules[0], data).then(
        (res) => {
          if (res && res.success && res.data.verified) {
            pinDialog.value.hideDialog();
            pinErrorDescription.value = undefined;
            toast.success('Successfully verified the pin code');
          } else {
            pinDialog.value.hideDialog();
            pinErrorDescription.value = 'Pin code is not correct';
            toast.error('Pin code is not correct');
          }
        },
        (err) => {
          pinErrorDescription.value = err.description;
          toast.error(err.description);
        },
      );
    };

    return {
      toast,
      pinDialog,
      pinPadDialog,
      certLoading,
      pinSelected,
      pinErrorDescription,
    };
  },
};
</script>

<style src="./CardActions.style.css" scoped />
