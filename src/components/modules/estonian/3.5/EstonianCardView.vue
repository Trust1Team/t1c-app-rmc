<template>
  <div class="token-container" v-if="biometric">
    <div class="token-card">
      <div class="card-side">
        <EstonianFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <EstonianBackCardView :biometric="biometric" :picture="picture" />
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

<!--      <GenericTokenCardActions />-->
    </div>
  </div>
</template>

<script>
import EstonianFrontCardView from "./EstonianFrontCardView";
import EstonianBackCardView from "./EstonianBackCardView";
import GenericTokenCertificateInformation from "../../genericToken/GenericTokenCertificateInformation";
import GenericTokenAddressInformation from "../../genericToken/GenericTokenAddressInformation";
// import GenericTokenCardActions from "../genericToken/GenericTokenCardActions";

export default {
  name: "EstonianCardView",
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
    EstonianFrontCardView,
    EstonianBackCardView,
    GenericTokenCertificateInformation,
    GenericTokenAddressInformation,
    // GenericTokenCardActions,
  },
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
