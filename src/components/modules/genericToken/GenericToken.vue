<template>
  <div v-if="biometric" class="token-container">
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
import GenericTokenFrontCardView from './GenericTokenFrontCardView';
import GenericTokenBackCardView from './GenericTokenBackCardView';
import GenericTokenCertificateInformation from './GenericTokenCertificateInformation';
import GenericTokenAddressInformation from './GenericTokenAddressInformation';
import GenericTokenCardActions from './GenericTokenCardActions';

export default {
  name: 'GenericTokenCardView',
  components: {
    GenericTokenFrontCardView,
    GenericTokenBackCardView,
    GenericTokenCertificateInformation,
    GenericTokenAddressInformation,
    GenericTokenCardActions,
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
  emits: ['goBack'],
};
</script>

<style src="./GenericToken.style.css" scoped />
