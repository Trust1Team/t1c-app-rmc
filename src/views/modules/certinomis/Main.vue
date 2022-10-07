<template>
  <div class="container">
    <div v-if="getConsent && getInstalled">
      <div v-if="error">
        <Error :text="error" />
      </div>
      <div>
        <ReadersList :unknown-modules-disabled="true" @readerSelected="readerSelected($event)" />
      </div>
    </div>
    <Consent v-if="getInstalled && !getConsent" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js';
import ReadersList from '@/components/core/ReadersList';
import Consent from '@/components/core/Consent';
import Error from '@/components/UIComponents/Error';

export default {
  name: 'CertinomisModule',
  components: {
    ReadersList,
    Consent,
    Error,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getConsent() {
      return this.$store.getters.getConsent;
    },
    getInstalled() {
      return this.$store.getters.getInstalled;
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading'];
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
  },
  created() {
    this.resetError();
    Trust1ConnectorService.init().then(
      (res) => {
        this.installed();
        this.consented();
        Trust1ConnectorService.setClient(res);
        if (this.getReader) {
          this.readerSelected(this.getReader);
          this.router.push({ name: 'side-menu-modules-certigna' });
        }
      },
      (err) => {
        if (err.code === '814501' || err.code === '814501') {
          this.installed();
          Trust1ConnectorService.setErrorClient(err.client);
        } else {
          this.$router.push({ name: 'side-menu-download' });
        }
      },
    );
  },
  methods: {
    installed() {
      this.resetError();
      this.$store.dispatch('config/setInstalled', true);
    },
    consented() {
      this.resetError();
      this.$store.dispatch('config/setConsent', true);
    },
    readerSelected(reader) {
      this.resetError();
      const certinomis = Trust1ConnectorService.getClient().certinomis(reader.id);
      console.log(certinomis);
      console.log(certinomis.nonRepudiationCertificate());
      certinomis.allCerts().then(
        (allCertsRes) => {
          console.log(allCertsRes);
          this.$store.dispatch('card/setAllCertificates', allCertsRes).then(() => {
            this.$store.dispatch('card/setCertificateLoading', false);
          });
        },
        (err) => {
          this.$store.dispatch('card/setCertificateLoading', false);
          this.error = 'Could not fetch allCerts: ' + err.description;
          console.error('Could not fetch allCerts', err);
        },
      );
      this.$store.dispatch('reader/setSelectedReader', reader);
      this.$router.push({ name: 'side-menu-modules-certigna-view' });
    },
    resetError() {
      this.error = null;
    },
  },
};
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
