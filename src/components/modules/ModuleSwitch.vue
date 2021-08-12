<template>
  <BeidCardView
    :biometric="getBiometric"
    :picture="getPicture"
    :address="getAddress"
    :rootCertificate="getRootCertificate"
    :intermediateCertificates="getIntermediateCertificates"
    :authenticationCertificate="getAuthenticationCertificate"
    :nonRepudiationCertificate="getNonRepudiationCertificate"
    :encryptionCertificate="getEncryptionCertificate"
    :issuerCertificate="getIssuerCertificate"
    :reader-name="getReader.name"
  />
</template>

<script>
import BeidCardView from "./beid/BeidCardView";

export default {
  name: "ModuleSwitch",
  components: { BeidCardView },
  computed: {
    getReader() {
      return this.$store.getters["reader/getSelectedReader"];
    },
    getBiometric() {
      return this.$store.getters["card/getBiometric"];
    },
    getAddress() {
      return this.$store.getters["card/getAddress"];
    },
    getPicture() {
      return this.$store.getters["card/getPicture"];
    },
    getRootCertificate() {
      return this.$store.getters["card/getRootCertificate"];
    },
    getIntermediateCertificates() {
      return this.$store.getters["card/getIntermediateCertificates"];
    },
    getAuthenticationCertificate() {
      return this.$store.getters["card/getAuthenticationCertificate"];
    },
    getNonRepudiationCertificate() {
      return this.$store.getters["card/getNonRepudiationCertificate"];
    },
    getEncryptionCertificate() {
      return this.$store.getters["card/getEncryptionCertificate"];
    },
    getIssuerCertificate() {
      return this.$store.getters["card/getIssuerCertificate"];
    },
    getConsent() {
      return this.$store.getters["getConsent"];
    },
    getInstalled() {
      return this.$store.getters["getInstalled"];
    },
    getDataLoading() {
      return this.$store.getters["card/getDataLoading"];
    },
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
