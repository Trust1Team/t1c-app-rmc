<template>
  <div class="token-details-item">
    <h3>{{ $t('certificateInformation.header') }}</h3>

    <verify-token-certificates-component></verify-token-certificates-component>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.nonRepudiationCertificate') }}
      </div>
      <CertificateItem :certificate="nonRepudiationCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.authenticationCertificate') }}
      </div>
      <CertificateItem :certificate="authenticationCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.encryptionCertificate') }}
      </div>
      <CertificateItem :certificate="encryptionCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.issuerCertificate') }}
      </div>
      <CertificateItem :certificate="issuerCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.intermediateCertificates') }}
      </div>
      <CertificateItem :certificate="intermediateCertificates"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('certificateInformation.rootCertificate') }}
      </div>
      <CertificateItem :certificate="rootCertificate"></CertificateItem>
    </div>
  </div>
</template>

<script>
import CertificateItem from '@/components/modules/CertificateItem';
import VerifyTokenCertificatesComponent from './VerifyTokenCertificatesComponent';

export default {
  name: 'GenericTokenCertificateInformation',
  components: { CertificateItem, VerifyTokenCertificatesComponent },
  props: {
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object,
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
  },
  methods: {},
};
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}

.text-container {
  margin-bottom: 20px;
}

.text-label {
  color: #b1b1b1;
  margin-bottom: 4px;
}

.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}
</style>
