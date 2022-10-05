<template>
  <div v-if="biometric" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <CardFront :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <CardBack :biometric="biometric" :picture="picture" />
      </div>
    </div>

    <div class="token-details">
      <!-- <GenericTokenAddressInformation :address="address" />

      <GenericTokenCertificateInformation
        :authentication-certificate="authenticationCertificate"
        :root-certificate="rootCertificate"
        :non-repudiation-certificate="nonRepudiationCertificate"
        :issuer-certificate="issuerCertificate"
        :encryption-certificate="encryptionCertificate"
        :intermediate-certificates="intermediateCertificates"
      /> -->

      <CardActions />
    </div>
  </div>
</template>

<script>
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';
import CardActions from './components/CardActions';
// import GenericTokenCertificateInformation from '../genericToken/GenericTokenCertificateInformation';
// import GenericTokenAddressInformation from '../genericToken/GenericTokenAddressInformation';

export default {
  name: 'BeidCardView',
  components: {
    CardFront,
    CardBack,
    // GenericTokenCertificateInformation,
    // GenericTokenAddressInformation,
    CardActions,
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
  setup() {},
};
</script>

<style src="./Beid.style.css" scoped />
