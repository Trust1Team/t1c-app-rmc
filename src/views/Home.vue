<template>
  <div class="container">
    <h1>Trust1Connector</h1>

    <ReadersList v-if="!consentRequired" />
    <Consent v-if="consentRequired" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";

export default {
  name: "Home",
  data: () => ({
    consentRequired: Boolean,
  }),
  methods: {
    consented() {
      if (Trust1ConnectorService.getErrorClient() != null) {
        Trust1ConnectorService.getErrorClient()
          .init()
          .then(
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
      } else {
        // TODO error
      }
    },
  },
  mounted() {
    this.consentRequired = false;
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
  components: { ReadersList, Consent },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.consent-data {
  opacity: 0;
}
</style>
