<template>
  <div v-if="biometric" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <BeidFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <BeidBackCardView :biometric="biometric" :picture="picture" />
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

      <BeidTokenCardActions />
    </div>
  </div>
</template>

<script>
import BeidFrontCardView from './BeidFrontCardView';
import BeidBackCardView from './BeidBackCardView';
import GenericTokenCertificateInformation from '../genericToken/GenericTokenCertificateInformation';
import GenericTokenAddressInformation from '../genericToken/GenericTokenAddressInformation';
import BeidTokenCardActions from './BeidTokenCardActions';

export default {
  name: 'BeidCardView',
  components: {
    BeidFrontCardView,
    BeidBackCardView,
    GenericTokenCertificateInformation,
    GenericTokenAddressInformation,
    BeidTokenCardActions,
  },
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
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
  },
  created() {},
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
