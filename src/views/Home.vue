<template>
  <div class="container">
    <h1>Trust1Connector</h1>

    {{ consentRequired }}

    <ReadersList v-if="!consentRequired" />
    <Consent v-if="consentRequired" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";
// import { onMounted, ref } from "vue";

export default {
  name: "Home",
  data() {
    return {
      consentRequired: false,
    };
  },
  // computed: {
  //   getConsentRequired() {
  //     return this.consentRequired;
  //   },
  // },
  // watch: {
  //   consentRequiredRef(current, prev) {
  //     console.log(current, prev);
  //     this.consentRequired = current;
  //   },
  // },
  methods: {
    consented() {
      console.log("consented", this.consentRequired);
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
  setup() {
    // const consentRequiredRef = ref(false);
    //
    // onMounted(() => {
    //
    // });
    //
    // return {
    //   consentRequiredRef,
    // };
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
