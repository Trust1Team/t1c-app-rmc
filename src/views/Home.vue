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
        <GenericCardView :reader-id="readerId" :module="module" />
      </div>
    </div>

    <button @click="getReader">Reader</button>

    <Consent v-if="consentRequired" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";
import GenericCardView from "../components/modules/GenericCardView";

export default {
  name: "Home",
  data() {
    return {
      readerId: null,
      module: null,
      consentRequired: false,
      pageView: 0,
    };
  },
  methods: {
    consented() {
      this.consentRequired = false;
    },
    readerSelected(reader) {
      this.readerId = reader.id;
      this.module = reader.card.module ? reader.card.module[0] : "beid";
      this.pageView = 1;
      this.$store.dispatch("setSelectedReader", reader);
    },
    goBack() {
      this.pageView = 0;
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
  components: { ReadersList, Consent, GenericCardView },
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
</style>
