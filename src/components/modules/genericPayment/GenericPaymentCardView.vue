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

      <CertificateInformation
        :authentication-certificate="authenticationCertificate"
        :root-certificate="rootCertificate"
        :non-repudiation-certificate="nonRepudiationCertificate"
        :issuer-certificate="issuerCertificate"
        :encryption-certificate="encryptionCertificate"
        :intermediate-certificates="intermediateCertificates"
      />

      <CardActions />
    </div>
  </div>
</template>

<script>
import GenericTokenFrontCardView from "./GenericTokenFrontCardView";
import GenericTokenBackCardView from "./GenericTokenBackCardView";
import CertificateInformation from "../CertificateInformation";
import GenericTokenAddressInformation from "../GenericTokenAddressInformation";
import CardActions from "../CardActions";

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
    CertificateInformation,
    GenericTokenAddressInformation,
    CardActions,
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
