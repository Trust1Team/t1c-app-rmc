<template>
  <div class="token-details-item">
    <h3>{{ $t('paymentCertificateInformation.header') }}</h3>

    <div v-if="getApplications">
      <div v-for="application in getApplications.applications" :key="application.aid" class="text-container">
        <h4>{{ application.name }}</h4>

        <div class="text-label">
          {{ $t('paymentCertificateInformation.iccPublicCertificate') }}
        </div>
        <PaymentCertificateItem
          v-if="!getCertificateLoading && getICCPublicCertificate && getICCPublicCertificate[application.aid]"
          :certificate="getICCPublicCertificate[application.aid]"
        ></PaymentCertificateItem>

        <div class="text-label">
          {{ $t('paymentCertificateInformation.issuerPublicCertificate') }}
        </div>
        <PaymentCertificateItem
          v-if="!getCertificateLoading && getIssuerPublicCertificate && getIssuerPublicCertificate[application.aid]"
          :certificate="getIssuerPublicCertificate[application.aid]"
        ></PaymentCertificateItem>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentCertificateItem from '@/components/modules/genericPayment/PaymentCertificateItem';

export default {
  name: 'GenericPaymentCertificateInformation',
  components: { PaymentCertificateItem },
  props: {},
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
    getApplications() {
      return this.$store.getters['card/getApplications'];
    },
    getICCPublicCertificate() {
      return this.$store.getters['card/getICCPublicCertificate'];
    },
    getIssuerPublicCertificate() {
      return this.$store.getters['card/getIssuerPublicCertificate'];
    },
  },
  methods: {
    toggleCert: function (event) {
      event.target.parentNode.parentNode.classList.toggle('cert-open');
      event.target.classList.toggle('cert-expand-rotated');
    },
  },
};
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}

.text-container {
  margin-bottom: 20px;
}

.text-label {
  color: #b1b1b1;
  margin-bottom: 4px;
}

h4 {
  color: #e05512;
  font-size: 1.1rem;
}

.text-content {
  padding: 15px;
  border-radius: 5px;
  word-break: break-word;
}

.loading {
  width: 20px;
  height: 20px;
}

.cert {
  display: flex;
  max-height: 65px;
  overflow: hidden;
  transition: all 0.2s ease-in;
  margin-bottom: 15px;
}

.cert-expand {
  height: 15px;
  color: #e05512;
  margin-left: 5px;
  margin-top: 5px;
}

.cert-expand:hover {
  cursor: pointer;
}

.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}

.cert-open {
  max-height: 2000px;
}

.cert-expand-icon {
  transition: all 0.1s ease-in;
}

.cert-expand-rotated {
  transform: rotate(180deg);
}
</style>
