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
          :biometric="biometric"
          :picture="picture"
          :address="address"
          :rootCertificate="rootCertificate"
          :intermediateCertificates="intermediateCertificates"
          :authenticationCertificate="authenticationCertificate"
          :nonRepudiationCertificate="nonRepudiationCertificate"
          :encryptionCertificate="encryptionCertificate"
          :issuerCertificate="issuerCertificate"
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
      readerId: null,
      module: null,
      consentRequired: false,
      pageView: 0,
      biometric: null,
      address: null,
      picture: null,
      rootCertificate: null,
      intermediateCertificates: null,
      authenticationCertificate: null,
      nonRepudiationCertificate: null,
      encryptionCertificate: null,
      issuerCertificate: null,
    };
  },
  methods: {
    consented() {
      this.consentRequired = false;
    },
    readerSelected(reader) {
      this.readerId = reader.id;
      this.module = reader.card.module ? reader.card.module[0] : "beid";
      this.getAllData();
      this.pageView = 1;
      this.$store.dispatch("setSelectedReader", reader);
    },
    goBack() {
      this.pageView = 0;
    },
    getAllData() {
      this.resetCardData();
      this.loading = true;
      if (this.readerId && this.module) {
        Trust1ConnectorService.init().then(
          (client) => {
            const c = client.generic(this.readerId);
            c.allData(this.module).then(
              (allDataRes) => {
                this.loading = false;
                this.biometric = allDataRes.data.biometric;
                this.address = allDataRes.data.address;
                this.picture = allDataRes.data.picture;
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
    resetCardData() {
      this.biometric = null;
      this.address = null;
      this.picture = null;
      this.rootCertificate = null;
      this.intermediateCertificates = null;
      this.authenticationCertificate = null;
      this.nonRepudiationCertificate = null;
      this.encryptionCertificate = null;
      this.issuerCertificate = null;
    },
  },
  created() {
    Trust1ConnectorService.init().then(
      (res) => {
        this.consentRequired = false;
        Trust1ConnectorService.setClient(res);
        // console.log(this.$store);
        // if (this.$store.SelectedReader.state.selectedReader != null) {
        //   this.readerId = this.$store.SelectedReader.state.selectedReader.id;
        // }
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
      console.log(this.$store.getters.getSelectedReader());
      if (this.$store.state.selectedReader) {
        return this.$store.state.selectedReader.id;
      } else {
        return null;
      }
    },
    getModule() {
      if (
        this.$store.state.selectedReader &&
        this.$store.state.selectedReader.card &&
        this.$store.state.selectedReader.card.modules
      ) {
        return this.$store.state.selectedReader.card.modules[0];
      } else {
        return "beid";
      }
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
