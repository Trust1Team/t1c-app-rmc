<template>
  <div v-if="biometric">
    <div class="text-center text-black-50">
      We have detected the <b>Belgium eID</b> card in the <b>{{ readerName }}</b>
    </div>
    <br>
    <div class="card card-border">
      <div class="card-header header">
        Card reading: <b>{{ biometric.nationalNumber }} eID</b>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <Alert state="alert-success" icon="fa-check-circle" text="All certificates are valid" />
          </div>
          <div class="col-6">
            <Alert state="alert-dark" icon="fa-question-circle" text="Click to check the pin" />
          </div>
        </div>
        <div class="col-12">
          <IDCard :biometric="biometric" :picture="picture" />
        </div>
        <br>
        <div class="col-12">
          <div class="col-4 m-auto">
            <Alert state="alert-warning" text="Print legal copy of card" />
          </div>
          <div class="col-12">
            <OtherInformation :biometric="biometric" :address="address"/>
          </div>
          <div class="col-4 alert alert-dark text-white text-center p-1 mx-auto">
            Show generated information
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";
import IDCard from "./IDCard";
import Alert from "../UIComponents/Alert";
import OtherInformation from "./OtherInformation";

export default {
  name: "GenericCardView",
  props: {
    biometric: Object,
    address: Object,
    picture: Object,
    rootCertificate: Object,
    intermediateCertificates: Object,
    authenticationCertificate: Object,
    nonRepudiationCertificate: Object,
    encryptionCertificate: Object,
    issuerCertificate: Object,
    readerName: String
  },
  emits: ["goBack"],
  methods: {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}
.card-border {
  border-color: #e05512;
}

.header {
  text-align: center;
  color: white;
  background-color: #e05512;
  font-size: 26px !important;
  font-weight: normal;
}
</style>
