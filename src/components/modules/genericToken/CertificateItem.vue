<template>
  <div v-if="certLoading" class="loading">
    <LoadingIcon icon="puff" :size="20" />
  </div>
  <span v-if="!certLoading && !certificates">
    {{ $t('certificateInformation.noCertFound') }}
  </span>
  <div v-if="certificates">
    <div v-for="cert in certificates" :key="cert" class="text-content cert intro-x box">
      <div>
        <span v-if="cert">
          {{ cert }}
        </span>
      </div>

      <div v-if="cert" class="cert-expand" @click="toggleCert">
        <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
      </div>

      <div v-if="cert" class="cert-copy" @click="copyTextToClipboard(cert)">
        <i class="far fa-copy"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { LoadingIcon } from '@/components/UIComponents';
import { copyTextToClipboard } from '@/utils/helpers';

export default {
  name: 'CertificateItem',
  components: { LoadingIcon },
  props: {
    certificate: Object,
  },
  setup(props, context) {
    const store = useStore();

    // getCertificateLoading
    const certLoading = computed(() => store.getters['card/getCertificateLoading']);

    // getCertificates
    const certificates = computed(() => {
      if (props.certificate && props.certificate.certificate) {
        return [props.certificate.certificate];
      } else if (props.certificate && props.certificate.certificates) {
        return props.certificate.certificates;
      } else {
        return null;
      }
    });

    const toggleCert = (event) => {
      event.target.parentNode.parentNode.classList.toggle('cert-open');
      event.target.classList.toggle('cert-expand-rotated');
    };

    return {
      copyTextToClipboard,
      certLoading,
      certificates,
      toggleCert,
    };
  },
  methods: {},
};
</script>

<style src="./CertificateItem.style.css" scoped />
