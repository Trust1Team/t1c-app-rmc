<template>
  <div class="token-details-item">
    <h3>{{ $t("certificateInformation.header") }}</h3>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.nonRepudiationCertificate") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="nonRepudiationCertificate && !getCertificateLoading">
            {{ nonRepudiationCertificate.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !nonRepudiationCertificate">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="nonRepudiationCertificate && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.authenticationCertificate") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="authenticationCertificate && !getCertificateLoading">
            {{ authenticationCertificate.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !authenticationCertificate">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="authenticationCertificate && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.encryptionCertificate") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="encryptionCertificate && !getCertificateLoading">
            {{ encryptionCertificate.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !encryptionCertificate">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="encryptionCertificate && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.issuerCertificate") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="issuerCertificate && !getCertificateLoading">
            {{ issuerCertificate.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !issuerCertificate">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="issuerCertificate && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.intermediateCertificates") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="intermediateCertificates && !getCertificateLoading">
            {{ intermediateCertificates.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !intermediateCertificates">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="intermediateCertificates && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.rootCertificate") }}
      </div>
      <div class="text-content cert">
        <div>
          <span v-if="rootCertificate && !getCertificateLoading">
            {{ rootCertificate.certificate }}
          </span>
          <span v-if="!getCertificateLoading && !rootCertificate">
            {{ $t("certificateInformation.noCertFound") }}
          </span>
          <div v-if="getCertificateLoading" class="loading">
            <Loading :show="getCertificateLoading" :size="20" />
          </div>
        </div>

        <div
          class="cert-expand"
          v-if="rootCertificate && !getCertificateLoading"
          @click="toggleCert"
        >
          <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../core/Loading";

export default {
  name: "GenericPaymentCertificateInformation",
  props: {
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object,
  },
  methods: {
    toggleCert: function (event) {
      event.target.parentNode.parentNode.classList.toggle("cert-open");
      event.target.classList.toggle("cert-expand-rotated");
    },
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
  components: { Loading },
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

.text-content {
  padding: 15px;
  background-color: #f5f7f9;
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
