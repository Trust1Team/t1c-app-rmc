<template>
  <div class="token-container" v-if="biometric">
    <div class="token-card">
      <div class="card-side">
        <EstonianResidentFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <EstonianResidentBackCardView :biometric="biometric" :picture="picture" />
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
import EstonianResidentFrontCardView from "./EstonianResidentFrontCardView";
import EstonianResidentBackCardView from "./EstonianResidentBackCardView";
import GenericTokenCertificateInformation from "../../genericToken/GenericTokenCertificateInformation";
import GenericTokenAddressInformation from "../../genericToken/GenericTokenAddressInformation";
// import GenericTokenCardActions from "../genericToken/GenericTokenCardActions";

export default {
  name: "ResidentCardView",
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
    EstonianResidentFrontCardView,
    EstonianResidentBackCardView,
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
