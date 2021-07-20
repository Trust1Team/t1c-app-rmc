<template>
  <div class="container">
    <div v-if="!consentRequired">
      <div v-if="pageView === 0">
        <ReadersList />
      </div>
      <div v-if="pageView === 1">
        Page details
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

export default {
  name: "Home",
  data() {
    return {
      consentRequired: false,
      pageView: 0,
    };
  },
  methods: {
    consented() {
      this.consentRequired = false;
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

  components: { ReadersList, Consent },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
