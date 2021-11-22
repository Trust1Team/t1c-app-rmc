<template>
  <div class="token-container" v-if="biometric">
    <div class="token-card">
      <div class="card-side">
        <GenericTokenFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <GenericTokenBackCardView :biometric="biometric" :picture="picture" />
      </div>
    </div>

    <div class="token-details">
      <GenericTokenAddressInformation :address="address" />

      <GenericTokenCertificateInformation
        :authentication-certificate="authenticationCertificate"
        :root-certificate="rootCertificate"
        :non-repudiation-certificate="nonRepudiationCertificate"
        :issuer-certificate="issuerCertificate"
        :encryption-certificate="encryptionCertificate"
        :intermediate-certificates="intermediateCertificates"
      />

      <GenericTokenCardActions />
    </div>
  </div>
</template>

<script>
import GenericTokenFrontCardView from "./GenericTokenFrontCardView";
import GenericTokenBackCardView from "./GenericTokenBackCardView";
import GenericTokenCertificateInformation from "./GenericTokenCertificateInformation";
import GenericTokenAddressInformation from "./GenericTokenAddressInformation";
import GenericTokenCardActions from "./GenericTokenCardActions";

export default {
  name: "GenericTokenCardView",
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
    readerName: String,
  },
  components: {
    GenericTokenFrontCardView,
    GenericTokenBackCardView,
    GenericTokenCertificateInformation,
    GenericTokenAddressInformation,
    GenericTokenCardActions,
  },
  emits: ["goBack"],
  created() {},
  computed: {
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.token-container {
  display: flex;
  flex-wrap: nowrap;
}

.token-details {
  margin-left: 40px;
  width: 50%;
}

.card-side {
  margin-bottom: 30px;
}
</style>
