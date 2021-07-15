<template>
  <h1>Provide your consent</h1>
  <p>
    Please provide your <strong>consent</strong> to use the Trust1Connector.
  </p>
  <p>
    The button below states that you consent the Trust1Connector to read your
    card/token information.
  </p>
  <p ref="consentData" class="consent-data">{{ consentData }}</p>

  <button type="button" class="btn btn-primary" @click="consent">
    Consent
  </button>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";

export default {
  name: "Consent",
  data: () => ({
    consentData: null,
  }),
  emits: ["consented"],
  methods: {
    consent() {
      let range = document.createRange();
      range.selectNode(this.$refs.consentData);
      window.getSelection().addRange(range);
      try {
        document.execCommand("copy");
      } catch (err) {
        console.log("Oops, unable to copy");
      }
      window.getSelection().removeRange(range);
      Trust1ConnectorService.getErrorClient()
        .core()
        .getImplicitConsent(this.$refs.consentData.textContent)
        .then(
          (consentRes) => {
            Trust1ConnectorService.setClient(consentRes);
            Trust1ConnectorService.setErrorClient(null);
            Trust1ConnectorService.getClient()
              .core()
              .version()
              .then((versionResult) => {
                console.log("T1C running on core " + versionResult);
                this.$emit("consented", true);
              });
          },
          (err) => {
            console.error(err);
          }
        );
    },
  },
  props: {},
  created() {
    this.consentData = Trust1ConnectorService.getRand(15);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.consent-data {
  opacity: 0;
}
</style>
