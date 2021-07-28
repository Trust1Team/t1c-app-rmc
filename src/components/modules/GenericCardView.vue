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
  props: ["readerId", "module", "readerName"],
  components: { IDCard, Alert, OtherInformation },
  data() {
    return {
      client: null,
      biometric: null,
      address: null,
      picture: null,
      rootCertificate: null,
      intermediateCertificates: null,
      authenticationCertificate: null,
      nonRepudiationCertificate: null,
      encryptionCertificate: null,
      issuerCertificate: null,
    };
  },
  emits: ["goBack"],
  methods: {
    getAllData() {
      if (this.client && this.module) {
        this.client.allData(this.module).then(
            (allDataRes) => {
              this.biometric = allDataRes.data.biometric;
              this.address = allDataRes.data.address;
              this.picture = allDataRes.data.picture;
              console.log(this.address);
            },
            (err) => {
              console.error("Could not fetch alldata", err);
            }
        );
      }
    },
  },
  created() {
    console.log(this.readerName)
    Trust1ConnectorService.init().then(
        (client) => {
          this.client = client.generic(this.readerId);
          this.getAllData(this.readerId);
        },
        (err) => {
          console.error(err);
        }
    );
  },
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
