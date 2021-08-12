<template>
  <div class="token-container" v-if="biometric">
    <div class="token-card">
      <div class="card-side">
        <BeidFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <BeidBackCardView :biometric="biometric" :picture="picture" />
      </div>
    </div>

    <div class="token-details">
      <AddressInformation :address="address" />

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
import BeidFrontCardView from "./BeidFrontCardView";
import BeidBackCardView from "./BeidBackCardView";
import CertificateInformation from "../CertificateInformation";
import AddressInformation from "../AddressInformation";
import CardActions from "../CardActions";

export default {
  name: "BeidCardView",
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
    BeidFrontCardView,
    BeidBackCardView,
    CertificateInformation,
    AddressInformation,
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
