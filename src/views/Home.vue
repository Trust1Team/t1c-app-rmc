<template>
  <div class="container">
    <h1 style="text-align: center; color: #D74112">Connect your Reader</h1>
    <p style="text-align: center;">Please connect your <b>smartcard reader</b> to your computer.</p>
    <p style="text-align: center;">Once it is connected, this page will automatically detect it</p>
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
  data() {
    return {
      consentRequired: false,
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
