<template>
  <div v-if="biometric" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <GenericTokenFrontCardView :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <GenericBackCard
          :chipNumber="biometric.chipNumber"
          :barcodeNumber="
            biometric?.nationalNumber &&
            biometric?.cardNumber &&
            `${biometric.nationalNumber}${biometric.cardNumber.substr(3)}`
          "
          :row2Value="biometric.cardDeliveryMunicipality"
          :mrz="mrz"
        >
          <template #chipNumberLabel>
            <p><i>Identification number of the National Register</i></p>
          </template>
          <template #row2Label>
            <p><i>Place of issue</i></p>
          </template>
        </GenericBackCard>
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
import { ref, onMounted } from 'vue';
import { constructMachineReadableStrings } from '@/utils/helpers';
import { GenericBackCard } from '@/components/UIComponents';
import GenericTokenFrontCardView from './GenericTokenFrontCardView';
import GenericTokenCertificateInformation from './GenericTokenCertificateInformation';
import GenericTokenAddressInformation from './GenericTokenAddressInformation';
import GenericTokenCardActions from './GenericTokenCardActions';

export default {
  name: 'GenericTokenCardView',
  components: {
    GenericBackCard,
    GenericTokenFrontCardView,
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
  setup(props) {
    const mrz = ref();

    onMounted(() => {
      mrz.value = constructMachineReadableStrings(props.biometric);
    });

    return {
      mrz,
    };
  },
};
</script>

<style src="./GenericToken.style.css" scoped />
