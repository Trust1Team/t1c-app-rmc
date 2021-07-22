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
      consentRequired: false,
      readerId: null,
      module: null,
      pageView: 0,
    };
  },
  methods: {
    consented() {
      this.consentRequired = false;
    },
    readerSelected(evt) {
      this.readerId = evt.readerId;
      this.module = evt.module;
      this.pageView = 1;
      // TODO add to vue store
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
      },
      (err) => {
        console.log(err);
        this.consentRequired = true;
        Trust1ConnectorService.setErrorClient(err.client);
      }
    );
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
