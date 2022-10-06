<template>
  <div v-if="biometric" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <CardFront :biometric="biometric" :picture="picture" />
      </div>

      <div class="card-side">
        <GenericBackCard
          :chipNumber="`${biometric.nationalNumber.substr(0, 2)}.${biometric.nationalNumber.substr(
            4,
            2,
          )}-${biometric.nationalNumber.substr(6, 3)}.${biometric.nationalNumber.substr(9, 2)}`"
          :barcodeNumber="`${biometric.nationalNumber}${biometric.cardNumber.substr(3)}`"
          :row2Value="biometric.cardDeliveryMunicipality"
          :mrz="mrz"
        >
          <template #chipNumberLabel>
            <p><i>Identificatienummer van het Rijksregister</i></p>
            <p><i>Identification number of the National Register</i></p>
          </template>
          <template #row2Label>
            <p><i>Plaats van afgifte/Place of issue</i></p>
          </template>
        </GenericBackCard>
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
import { ref, onMounted } from 'vue';
import { constructMachineReadableStrings } from '@/utils/helpers';
import CardFront from './components/CardFront';
import CardActions from './components/CardActions';
import { GenericBackCard } from '@/components/UIComponents';
// import GenericTokenCertificateInformation from '../genericToken/GenericTokenCertificateInformation';
// import GenericTokenAddressInformation from '../genericToken/GenericTokenAddressInformation';

export default {
  name: 'BeidCardView',
  components: {
    CardFront,
    // GenericTokenCertificateInformation,
    // GenericTokenAddressInformation,
    CardActions,
    GenericBackCard,
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

<style src="./Beid.style.css" scoped />
