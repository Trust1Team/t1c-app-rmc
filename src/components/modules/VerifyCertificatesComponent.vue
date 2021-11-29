<template>
  <div class="certificate-verification">
    <div v-if="loading">
      <div class="alert alert-secondary-soft show flex items-center mb-2" role="alert"> <Loading icon="puff" size="40" class="w-6 h-6 mr-2"></Loading> {{ $t("verify.certificates.validating") }}</div>
    </div>

    <div class="alert alert-success-soft show flex items-center mb-2" role="alert"> <AlertTriangleIcon class="w-6 h-6 mr-2"></AlertTriangleIcon> {{ $t("verify.certificates.success") }}</div>
    <div class="alert alert-warning-soft show flex items-center mb-2" role="alert"> <AlertCircleIcon class="w-6 h-6 mr-2"></AlertCircleIcon> {{ $t("verify.certificates.warning") }} </div>
    <div class="alert alert-danger-soft show flex items-center mb-2" role="alert"> <AlertOctagonIcon class="w-6 h-6 mr-2"></AlertOctagonIcon> {{ $t("verify.certificates.error") }}</div>

  </div>

</template>

<script>

import { useToast } from 'vue-toastification'
import Loading from '@/global-components/loading-icon/Main'
import ValidationService from '@/services/ValidationService'

export default {
  name: 'VerifyCertificatesComponent',
  data() {
    return {
      loading: true
    }
  },
  setup() {
    const toast = useToast()
    return {
      toast
    }
  },
  methods: {
    validateChain() {
      console.log('validate chain')
      ValidationService.validateChain(
        this.getAuthenticationCertificate.certificate,
        this.getRootCertificate.certificate,
        this.getIntermediateCertificates.certificate
      ).then(res => {
        this.loading = false
        console.log(res)
      })
    }
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    },
    getRootCertificate() {
      return this.$store.getters['card/getRootCertificate']
    },
    getIntermediateCertificates() {
      return this.$store.getters['card/getIntermediateCertificates']
    },
    getNonRepudiationCertificate() {
      return this.$store.getters['card/getNonRepudiationCertificate']
    },
    getAuthenticationCertificate() {
      return this.$store.getters['card/getAuthenticationCertificate']
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin']
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType']
    }
  },
  watch: {
    getCertificateLoading (newValue, oldValue) {
      if (!newValue) {
        this.validateChain()
      } else {
        this.loading = true
      }
    }
  },
  components: { Loading }
}
</script>

<style scoped>
</style>
