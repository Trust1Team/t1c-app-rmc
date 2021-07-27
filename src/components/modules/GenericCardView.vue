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
        <div class="col-12 row">
          <div class="col-6">
            <div class="col-11 alert alert-success text-center p-1 mx-auto">
              <i class="fa fa-check-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;All certificates are valid
            </div>
            <FrontCardView :biometric="biometric" :picture="picture" />
          </div>
          <div class="col-6">
            <div class="col-11 alert alert-dark text-center p-1 mx-auto">
              <i class="fa fa-question-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;Click to check the pin
            </div>
            <BackCardView :biometric="biometric" :picture="picture" />
          </div>
        </div>
        <br>
        <div class="col-12">
          <div class="col-4 alert alert-warning text-center p-1 mx-auto">
            Print legal copy of card
          </div>
          <div class="col-12 row">
            <div class="col-6">
              <h5 class="text-warning">Additional information</h5>
              <ul>
                <li>Address: {{ address.streetAndNumber }}</li>
                <li>city: {{ address.municipality }}</li>
                <li>xxx: {{ address.zipcode }}</li>
              </ul>
            </div>
            <div class="col-6">
              <h5 class="text-warning">General information</h5>
              <ul>
                <li>Chip number: {{ biometric.chipNumber }}</li>
              </ul>
            </div>
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
import BackCardView from "./BackCardView";
import FrontCardView from "./FrontCardView";

export default {
  name: "GenericCardView",
  props: ["readerId", "module", "readerName"],
  components: { BackCardView, FrontCardView },
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

.alert-warning {
  background-color: #e05512;
  color: white;
}

.text-warning {
  color: #e05512 !important;
}

ul {
  list-style-type: none;
}
</style>
