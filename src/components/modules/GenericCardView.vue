<template>
  <div v-if="biometric">
    <p>{{ biometric.cardNumber }}</p>
    <p>{{ biometric.firstNames }}</p>
    <p>{{ biometric.name }}</p>
  </div>
</template>

<script>
export default {
  name: "GenericCardView",
  props: {
    biometric: Object,
    address: Object,
    picture: Object,
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object,
  },
  emits: ["goBack"],
  methods: {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
