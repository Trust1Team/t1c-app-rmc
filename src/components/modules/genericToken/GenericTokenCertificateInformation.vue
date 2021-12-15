<template>
  <div class="token-details-item">
    <h3>{{ $t("certificateInformation.header") }}</h3>

    <verify-token-certificates-component></verify-token-certificates-component>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.nonRepudiationCertificate") }}
      </div>
      <CertificateItem :certificate="nonRepudiationCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.authenticationCertificate") }}
      </div>
      <CertificateItem :certificate="authenticationCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.encryptionCertificate") }}
      </div>
      <CertificateItem :certificate="encryptionCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.issuerCertificate") }}
      </div>
      <CertificateItem :certificate="issuerCertificate"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.intermediateCertificates") }}
      </div>
      <CertificateItem :certificate="intermediateCertificates"></CertificateItem>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.rootCertificate") }}
      </div>
      <CertificateItem :certificate="rootCertificate"></CertificateItem>
    </div>
  </div>
</template>

<script>
import copyMixin from '@/mixins/copyMixin'
import VerifyTokenCertificatesComponent from '@/components/modules/VerifyTokenCertificatesComponent'
import CertificateItem from '@/components/modules/CertificateItem'

export default {
  name: 'GenericTokenCertificateInformation',
  props: {
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object
  },
  methods: {},
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    }
  },
  components: { CertificateItem, VerifyTokenCertificatesComponent },
  mixins: [copyMixin]
}
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

.text-content {
  padding: 15px;
  border-radius: 5px;
  word-break: break-word;
}

.loading {
  width: 20px;
  height: 20px;
}

.cert {
  display: flex;
  max-height: 65px;
  overflow: hidden;
  transition: all 0.2s ease-in;
}

.cert-expand,
.cert-copy {
  height: 15px;
  color: #e05512;
  margin-left: 10px;
  margin-top: 5px;
}

.cert-expand:hover,
.cert-copy:hover {
  cursor: pointer;
}

.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}

.cert-open {
  max-height: 2000px;
}

.cert-expand-icon {
  transition: all 0.1s ease-in;
}

.cert-expand-rotated {
  transform: rotate(180deg);
}
</style>
