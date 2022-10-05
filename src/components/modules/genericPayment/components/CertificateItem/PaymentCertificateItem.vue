<template>
  <div v-if="certLoading" class="loading">
    <LoadingIcon icon="puff" :size="20" />
  </div>
  <span v-if="!certLoading && !certificate?.certificate">
    {{ $t('certificateInformation.noCertFound') }}
  </span>
  <div v-if="certificate?.certificate">
    <div class="text-content cert intro-x box">
      <div>
        <span>
          {{ certificate.certificate }}
        </span>
      </div>

      <div class="cert-expand" @click="toggleCert">
        <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
      </div>

      <div class="cert-copy" @click="copyTextToClipboard(certificate.certificate)">
        <i class="far fa-copy" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { LoadingIcon } from '@/components/UIComponents';

export default {
  name: 'CertificateItem',
  components: { LoadingIcon },
  props: {
    certificate: Object,
  },
  setup(props, context) {
    const store = useStore();

    const certLoading = computed(() => store.getters['card/getCertificateLoading']);

    const toggleCert = (event) => {
      event.target.parentNode.parentNode.classList.toggle('cert-open');
      event.target.classList.toggle('cert-expand-rotated');
    };

    return {
      toggleCert,
      certLoading,
    };
  },
};
</script>

<style src="./PaymentCertificateItem.style.css" scoped />
