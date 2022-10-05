<template>
  <div v-if="applicationData" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <CardFront :application-data="applicationData" />
      </div>
    </div>

    <div class="token-details">
      <Applications :applications="applications" />
      <CertificateInformation />
      <CardActions />
    </div>
  </div>
</template>

<script>
import CardFront from './components/CardFront';
import CertificateInformation from './components/CertificateInformation';
import CardActions from './components/CardActions';
import Applications from './components/Applications';

export default {
  name: 'GenericPaymentCardView',
  components: {
    CardFront,
    CertificateInformation,
    CardActions,
    Applications,
  },
  props: {
    applications: Object,
    applicationData: Object,
  },
};
</script>

<style src="./GenericPayment.style.css" scoped />
