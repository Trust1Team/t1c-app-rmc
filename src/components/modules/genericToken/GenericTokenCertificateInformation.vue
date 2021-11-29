<template>
  <div class="token-details-item">
    <h3>{{ $t("certificateInformation.header") }}</h3>

    <verify-certificates-component></verify-certificates-component>

    <div class="text-container mt-3">
      <div class="text-label">
        {{ $t("certificateInformation.nonRepudiationCertificate") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="nonRepudiationCertificate && !getCertificateLoading"
          @click="copyTextToClipboard(nonRepudiationCertificate.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.authenticationCertificate") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="authenticationCertificate && !getCertificateLoading"
          @click="copyTextToClipboard(authenticationCertificate.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.encryptionCertificate") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="encryptionCertificate && !getCertificateLoading"
          @click="copyTextToClipboard(encryptionCertificate.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.issuerCertificate") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="issuerCertificate && !getCertificateLoading"
          @click="copyTextToClipboard(issuerCertificate.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.intermediateCertificates") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="intermediateCertificates && !getCertificateLoading"
          @click="copyTextToClipboard(intermediateCertificates.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("certificateInformation.rootCertificate") }}
      </div>
      <div class="text-content cert intro-x box">
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

        <div
          class="cert-copy"
          v-if="rootCertificate && !getCertificateLoading"
          @click="copyTextToClipboard(rootCertificate.certificate)"
        >
          <i class="far fa-copy"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../../core/Loading'
import copyMixin from '@/mixins/copyMixin'
import VerifyCertificatesComponent from '@/components/modules/VerifyCertificatesComponent'

export default {
  name: 'GenericTokenCertificateInformation',
  props: {
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object
  },
  methods: {
    toggleCert: function (event) {
      event.target.parentNode.parentNode.classList.toggle('cert-open')
      event.target.classList.toggle('cert-expand-rotated')
    }
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    }
  },
  components: { VerifyCertificatesComponent, Loading },
  mixins: [copyMixin]
}
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

.cert-expand,
.cert-copy {
  height: 15px;
  color: #e05512;
  margin-left: 10px;
  margin-top: 5px;
}

.cert-expand:hover,
.cert-copy:hover {
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
