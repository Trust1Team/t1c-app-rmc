<template>
  <div class="container">
    <h1>Trust1Connector</h1>

    <ReadersList v-if="!consentRequired" />
    <Consent v-if="consentRequired" />
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
    consentData: null,
    consentRequired: Boolean,
  }),
  methods: {},
  mounted() {
    this.consentRequired = false;
    Trust1ConnectorService.init().then(
      (res) => {
        console.log(res);
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
