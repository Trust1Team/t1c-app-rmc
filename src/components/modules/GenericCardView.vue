<template>
  <div v-if="biometric">
    <div class="card">
      <div class="card-body row">
        <div style="width: 50%">
          <FrontCardView :biometric="biometric" :picture="picture" />
        </div>
        <div style="width: 50%">
          <BackCardView :biometric="biometric" :picture="picture" />
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
  props: ["readerId", "module"],
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
            console.log(this.biometric);
          },
          (err) => {
            console.error("Could not fetch alldata", err);
          }
        );
      }
    },
  },
  created() {
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
</style>
