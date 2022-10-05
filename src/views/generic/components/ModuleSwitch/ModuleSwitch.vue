<template>
  <BeidModule
    v-if="reader.card.modules.includes('beid')"
    :biometric="cardBiometric"
    :picture="cardPicture"
    :address="cardAddress"
    :rootCertificate="cardRootCert"
    :intermediateCertificates="cardIntermediateCerts"
    :authenticationCertificate="cardAuthenticationCert"
    :nonRepudiationCertificate="cardNonRepudiationCert"
    :encryptionCertificate="cardEncryptionCert"
    :issuerCertificate="cardIssuerCert"
    :reader-name="reader.name"
  />

  <GenericTokenCardView
    v-if="!reader.card.modules.includes('beid') && !reader.card.modules.includes('emv')"
    :biometric="cardBiometric"
    :picture="cardPicture"
    :address="cardAddress"
    :rootCertificate="cardRootCert"
    :intermediateCertificates="cardIntermediateCerts"
    :authenticationCertificate="cardAuthenticationCert"
    :nonRepudiationCertificate="cardNonRepudiationCert"
    :encryptionCertificate="cardEncryptionCert"
    :issuerCertificate="cardIssuerCert"
    :reader-name="reader.name"
  />

  <GenericPayment
    v-if="cardApplications && reader.card.modules.includes('emv')"
    :application-data="cardApplicationData"
    :applications="cardApplications.applications"
    :reader-name="reader.name"
  />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BeidModule from '@/components/modules/beid';
import GenericPayment from '@/components/modules/genericPayment';
import GenericTokenCardView from '@/components/modules/genericTokenCardView';

export default {
  name: 'ModuleSwitch',
  components: {
    BeidModule,
    GenericPayment,
    GenericTokenCardView,
  },
  setup(props, context) {
    const store = useStore();

    const reader = computed(() => store.getters['reader/getSelectedReader']);
    const cardBiometric = computed(() => store.getters['card/getBiometric']);
    const cardAddress = computed(() => store.getters['card/getAddress']);
    const cardPicture = computed(() => store.getters['card/getPicture']);
    const cardRootCert = computed(() => store.getters['card/getRootCertificate']);
    const cardIntermediateCerts = computed(() => store.getters['card/getIntermediateCertificates']);
    const cardAuthenticationCert = computed(() => store.getters['card/getAuthenticationCertificate']);
    const cardNonRepudiationCert = computed(() => store.getters['card/getNonRepudiationCertificate']);
    const cardEncryptionCert = computed(() => store.getters['card/getEncryptionCertificate']);
    const cardIssuerCert = computed(() => store.getters['card/getIssuerCertificate']);
    const cardApplications = computed(() => store.getters['card/getApplications']);
    const cardApplicationData = computed(() => store.getters['card/getApplicationData']);

    return {
      reader,
      cardBiometric,
      cardAddress,
      cardPicture,
      cardRootCert,
      cardIntermediateCerts,
      cardAuthenticationCert,
      cardNonRepudiationCert,
      cardEncryptionCert,
      cardIssuerCert,
      cardApplications,
      cardApplicationData,
    };
  },
};
</script>

<style src="./ModuleSwitch.style.css" scoped />
