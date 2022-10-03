<template>
  <div v-if="applicationData" class="token-container">
    <div class="token-card">
      <div class="card-side">
        <GenericPaymentFrontCardView :application-data="applicationData" />
      </div>
    </div>

    <div class="token-details">
      <GenericPaymentApplications :applications="applications" />
      <GenericPaymentCertificateInformation />
      <GenericPaymentCardActions />
    </div>
  </div>
</template>

<script>
import GenericPaymentFrontCardView from './GenericPaymentFrontCardView';
import GenericPaymentCertificateInformation from './GenericPaymentCertificateInformation';
import GenericPaymentCardActions from './GenericPaymentCardActions';
import GenericPaymentApplications from './GenericPaymentApplications';

export default {
  name: 'GenericPaymentCardView',
  components: {
    GenericPaymentFrontCardView,
    GenericPaymentCertificateInformation,
    GenericPaymentCardActions,
    GenericPaymentApplications,
  },
  props: {
    applications: Object,
    applicationData: Object,
  },
  computed: {},
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
