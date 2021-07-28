<template>
  <div class="container">
    <div v-if="!consentRequired">
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
          <Loading :show="loading"></Loading>
        </div>
        <GenericCardView
          v-if="!loading"
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

    <Consent v-if="consentRequired" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";
import Loading from "../components/core/Loading";
import GenericCardView from "../components/modules/GenericCardView";

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      consentRequired: false,
      pageView: 0,
    };
  },
  methods: {
    consented() {
      this.consentRequired = false;
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
      this.loading = true;
      if (this.getReader && this.getReader.id) {
        const module = this.getReader.card.module
          ? this.getReader.card.module[0]
          : "beid";
        Trust1ConnectorService.init().then(
          (client) => {
            const c = client.generic(this.getReader.id);
            c.allData(module).then(
              (allDataRes) => {
                this.loading = false;
                this.$store.dispatch("card/setAllData", allDataRes).then(() => {
                  this.loading = false;
                });
              },
              (err) => {
                console.error("Could not fetch alldata", err);
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
        this.consentRequired = false;
        Trust1ConnectorService.setClient(res);
        if (this.getReader) {
          this.getAllData();
          this.pageView = 1;
        }
      },
      (err) => {
        console.log(err);
        this.consentRequired = true;
        Trust1ConnectorService.setErrorClient(err.client);
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
  },
  components: { ReadersList, Consent, GenericCardView, Loading },
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
