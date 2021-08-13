<template>
  <div class="token-container" v-if="applicationData">
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
import GenericPaymentFrontCardView from "./GenericPaymentFrontCardView";
import GenericPaymentCertificateInformation from "./GenericPaymentCertificateInformation";
import GenericPaymentCardActions from "./GenericPaymentCardActions";
import GenericPaymentApplications from "./GenericPaymentApplications";

export default {
  name: "GenericPaymentCardView",
  props: {
    applications: Object,
    applicationData: Object,
  },
  components: {
    GenericPaymentFrontCardView,
    GenericPaymentCertificateInformation,
    GenericPaymentCardActions,
    GenericPaymentApplications,
  },
  created() {},
  computed: {},
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
