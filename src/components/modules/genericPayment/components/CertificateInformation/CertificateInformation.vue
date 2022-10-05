<template>
  <div class="token-details-item">
    <h3>{{ $t('paymentCertificateInformation.header') }}</h3>

    <div v-if="applications">
      <div v-for="application in applications.applications" :key="application.aid" class="text-container">
        <h4>{{ application.name }}</h4>

        <div class="text-label">
          {{ $t('paymentCertificateInformation.iccPublicCertificate') }}
        </div>
        <PaymentCertificateItem
          v-if="!certLoading && ICCPublicCert && ICCPublicCert[application.aid]"
          :certificate="ICCPublicCert[application.aid]"
        ></PaymentCertificateItem>

        <div class="text-label">
          {{ $t('paymentCertificateInformation.issuerPublicCertificate') }}
        </div>
        <PaymentCertificateItem
          v-if="!certLoading && issuerPublicCert && issuerPublicCert[application.aid]"
          :certificate="issuerPublicCert[application.aid]"
        ></PaymentCertificateItem>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PaymentCertificateItem from '../CertificateItem';

export default {
  name: 'CertificateInformation',
  components: { PaymentCertificateItem },
  props: {},
  setup() {
    const store = useStore();

    const certLoading = computed(() => store.getters['card/getCertificateLoading']);
    const applications = computed(() => store.getters['card/getApplications']);
    const ICCPublicCert = computed(() => store.getters['card/getICCPublicCertificate']);
    const issuerPublicCert = computed(() => store.getters['card/getIssuerPublicCertificate']);

    return {
      certLoading,
      applications,
      ICCPublicCert,
      issuerPublicCert,
    };
  },
};
</script>

<style src="./CertificateInformation.style.css" scoped />
