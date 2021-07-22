<template>
  <div v-if="biometric">
    <p>{{ biometric.cardNumber }}</p>
    <p>{{ biometric.firstNames }}</p>
    <p>{{ biometric.name }}</p>
  </div>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";

export default {
  name: "GenericCardView",
  props: ["readerId", "module"],
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
            console.log(allDataRes.data);
            this.biometric = allDataRes.data.biometric;
            this.address = allDataRes.data.address;
            this.picture = allDataRes.data.picture;
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
<style scoped></style>
