<template>
  <div>
    <div class="go-back">
      <button @click="this.$router.go(-1)" class="btn btn-primary">
        <i class="fas fa-arrow-left go-back-icon"></i>
      </button>
    </div>

    <div class="loading">
      <loading v-if="getDataLoading" icon="bars" size="40"></loading>
    </div>
    <BeidCardView
      :biometric="getBiometric"
      :picture="getPicture"
      :address="getAddress"
      :rootCertificate="getRootCertificate"
      :intermediateCertificates="getIntermediateCertificates"
      :authenticationCertificate="getAuthenticationCertificate"
      :nonRepudiationCertificate="getNonRepudiationCertificate"
      :encryptionCertificate="getEncryptionCertificate"
      :issuerCertificate="getIssuerCertificate"
      :readerName="getReader.name"
    />
  </div>
</template>

<script>
import BeidCardView from '@/components/modules/beid/BeidCardView'
import Loading from '@/global-components/loading-icon/Main'
import store from '@/store'

export default {
  name: 'BeidView',
  beforeRouteEnter (to, from, next) {
    if (!store.getters['reader/getSelectedReader'] == true) {
      next({ name: 'side-menu-modules-beid' })
    } else {
      next()
    }
  },
  components: {
    BeidCardView,
    Loading
  },
  methods: {
    goBack() {
      this.$store.dispatch('reader/setSelectedReader', null)
      this.$router.go(-1)
    }
  },
  computed: {
    getDataLoading() {
      return this.$store.getters['card/getDataLoading']
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getBiometric() {
      return this.$store.getters['card/getBiometric']
    },
    getAddress() {
      return this.$store.getters['card/getAddress']
    },
    getPicture() {
      return this.$store.getters['card/getPicture']
    },
    getRootCertificate() {
      return this.$store.getters['card/getRootCertificate']
    },
    getIntermediateCertificates() {
      return this.$store.getters['card/getIntermediateCertificates']
    },
    getAuthenticationCertificate() {
      return this.$store.getters['card/getAuthenticationCertificate']
    },
    getNonRepudiationCertificate() {
      return this.$store.getters['card/getNonRepudiationCertificate']
    },
    getEncryptionCertificate() {
      return this.$store.getters['card/getEncryptionCertificate']
    },
    getIssuerCertificate() {
      return this.$store.getters['card/getIssuerCertificate']
    }
  },
  unmounted() {
    this.$store.dispatch('reader/setSelectedReader', null)
  }
}
</script>

<style scoped>
.go-back {
  width: 100%;
  display: flex;
}

.go-back-icon {
  transition: all 0.2s ease-in;
}

.go-back button:hover .go-back-icon {
  transform: translateX(-3px);
}

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}
</style>
