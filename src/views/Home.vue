<template>
  <div class="container">
    <div v-if="getConsent && getInstalled">
      <div v-if="pageView === 0">
        <ReadersList @readerSelected="readerSelected($event)" />
      </div>
      <div v-if="pageView === 1">
        <div class="go-back">
          <button @click="goBack()" class="btn btn-primary">
            <i class="fas fa-arrow-left go-back-icon"></i>
          </button>
        </div>

        <div class="loading">
          <Loading :show="getDataLoading"></Loading>
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
          :reader-name="getReader.name"
        />
      </div>
    </div>

    <Consent v-if="getInstalled && !getConsent" @consented="consented" />

    <Installation v-if="!getInstalled" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";
import Installation from "../components/core/Installation";
import Loading from "../components/core/Loading";
import BeidCardView from "../components/modules/beid/BeidCardView";
import DistributionService from "../services/DistributionService";

export default {
  name: "Home",
  data() {
    return {
      pageView: 0,
    };
  },
  methods: {
    installed() {
      this.$store.dispatch("setInstalled", true);
    },
    consented() {
      this.$store.dispatch("setConsent", true);
    },
    readerSelected(reader) {
      this.getAllData();
      this.$store.dispatch("reader/setSelectedReader", reader).then(() => {
        this.getAllData();
        this.pageView = 1;
      });
    },
    goBack() {
      this.pageView = 0;
    },
    getAllData() {
      this.$store.dispatch("card/resetState");
      if (this.getReader && this.getReader.id) {
        const module = this.getReader.card.module
          ? this.getReader.card.module[0]
          : "beid";
        Trust1ConnectorService.init().then(
          (client) => {
            const c = client.generic(this.getReader.id);
            c.allData(module).then(
              (allDataRes) => {
                this.$store.dispatch("card/setAllData", allDataRes).then(() => {
                  this.$store.dispatch("card/setDataLoading", false);
                });
              },
              (err) => {
                console.error("Could not fetch alldata", err);
              }
            );
            c.allCerts(module).then(
              (allCertsRes) => {
                this.$store
                  .dispatch("card/setAllCertificates", allCertsRes)
                  .then(() => {
                    this.$store.dispatch("card/setCertificateLoading", false);
                  });
              },
              (err) => {
                console.error("Could not fetch allCerts", err);
              }
            );
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
  },
  created() {
    Trust1ConnectorService.init().then(
      (res) => {
        this.installed();
        this.consented();
        Trust1ConnectorService.setClient(res);
        if (this.getReader) {
          this.getAllData();
          this.pageView = 1;
        }
      },
      (err) => {
        console.log(err);
        if (err !== 12999) {
          this.installed();
        }
        Trust1ConnectorService.setErrorClient(err.client);
      }
    );

    DistributionService.getLatestVersion().then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
  computed: {
    getReader() {
      return this.$store.getters["reader/getSelectedReader"];
    },
    getBiometric() {
      return this.$store.getters["card/getBiometric"];
    },
    getAddress() {
      return this.$store.getters["card/getAddress"];
    },
    getPicture() {
      return this.$store.getters["card/getPicture"];
    },
    getRootCertificate() {
      return this.$store.getters["card/getRootCertificate"];
    },
    getIntermediateCertificates() {
      return this.$store.getters["card/getIntermediateCertificates"];
    },
    getAuthenticationCertificate() {
      return this.$store.getters["card/getAuthenticationCertificate"];
    },
    getNonRepudiationCertificate() {
      return this.$store.getters["card/getNonRepudiationCertificate"];
    },
    getEncryptionCertificate() {
      return this.$store.getters["card/getEncryptionCertificate"];
    },
    getIssuerCertificate() {
      return this.$store.getters["card/getIssuerCertificate"];
    },
    getConsent() {
      return this.$store.getters["getConsent"];
    },
    getInstalled() {
      return this.$store.getters["getInstalled"];
    },
    getDataLoading() {
      return this.$store.getters["card/getDataLoading"];
    },
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
  components: { ReadersList, Consent, BeidCardView, Loading, Installation },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
