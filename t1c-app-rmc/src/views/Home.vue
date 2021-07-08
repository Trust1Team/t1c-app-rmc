<template>
  <div class="container">
    <h1>Trust1Connector</h1>

    <ReadersList />

    <!--    Putting this in a component fails for now-->
    <div class="modal fade" ref="consentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="consentModalLabel">
              Trust1Connector consent
            </h5>
          </div>
          <div class="modal-body">
            Please provide your consent to use the Trust1Connector.
            <span class="consent-data" ref="consentData">{{
              consentData
            }}</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Modal } from "bootstrap";
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/ReadersList";

export default {
  name: "Home",
  data: () => ({
    modal: null,
    consentData: null,
  }),
  methods: {
    closeModal() {
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
              .then((versionResult) =>
                console.log("T1C running on core " + versionResult)
              );
            this.modal.hide();
          },
          (err) => {
            console.error(err);
          }
        );
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.consentModal);
    this.consentData = Trust1ConnectorService.getRand(15);
    Trust1ConnectorService.init().then(
      (res) => {
        console.log(res);
        Trust1ConnectorService.setClient(res);
      },
      (err) => {
        console.log(err);
        Trust1ConnectorService.setErrorClient(err.client);
        this.modal.show();
      }
    );
  },
  components: { ReadersList },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.consent-data {
  opacity: 0;
}
</style>
