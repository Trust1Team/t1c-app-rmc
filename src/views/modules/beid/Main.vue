<template>
  <div class="container">
    <div v-if="getConsent && getInstalled">
      <div v-if="error">
        <Error :text="error" />
      </div>
      <div>
        <ReadersList
          :unknown-modules-disabled="true"
          @readerSelected="readerSelected($event)"
        />
      </div>
    </div>
    <Consent v-if="getInstalled && !getConsent" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'
import ReadersList from '@/components/core/ReadersList'
import Consent from '@/components/core/Consent'
import Error from '@/components/UIComponents/Error'

export default {
  name: 'BeidModule',
  data() {
    return {
      error: null
    }
  },
  methods: {
    installed() {
      this.resetError()
      this.$store.dispatch('setInstalled', true)
    },
    consented() {
      this.resetError()
      this.$store.dispatch('setConsent', true)
    },
    readerSelected(reader) {
      this.resetError()
      const beid = Trust1ConnectorService.getClient().beid(reader.id)
      beid.allData().then((allDataRes) => {
        this.$store
          .dispatch('card/setAllData', allDataRes)
          .then(() => {
            this.$store.dispatch('card/setDataLoading', false)
          });
        (err) => {
          this.$store.dispatch('card/setDataLoading', false)
          this.error = 'Could not fetch alldata: ' + err.description
          console.error('Could not fetch alldata', err)
        }
      })
      beid.allCerts().then(
        (allCertsRes) => {
          this.$store
            .dispatch('card/setAllCertificates', allCertsRes)
            .then(() => {
              this.$store.dispatch(
                'card/setCertificateLoading',
                false
              )
            })
        },
        (err) => {
          this.$store.dispatch('card/setCertificateLoading', false)
          this.error = 'Could not fetch allCerts: ' + err.description
          console.error('Could not fetch allCerts', err)
        }
      )
      this.$store.dispatch('reader/setSelectedReader', reader)
      this.$router.push({ name: 'side-menu-modules-beid-view' })
    },
    resetError() {
      this.error = null
    }
  },
  created() {
    this.resetError()
    Trust1ConnectorService.init().then(
      (res) => {
        this.installed()
        this.consented()
        Trust1ConnectorService.setClient(res)
        if (this.getReader) {
          this.readerSelected(this.getReader)
          this.router.push({ name: 'side-menu-modules-beid' })
        }
      },
      (err) => {
        if (err.code === '814501' || err.code === '814501') {
          this.installed()
          Trust1ConnectorService.setErrorClient(err.client)
        } else {
          this.$router.push({ name: 'side-menu-download' })
        }
      }
    )
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getConsent() {
      return this.$store.getters.getConsent
    },
    getInstalled() {
      return this.$store.getters.getInstalled
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading']
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    }
  },
  components: {
    ReadersList,
    Consent,
    Error
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  margin-bottom: 40px;
}

.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}
</style>
