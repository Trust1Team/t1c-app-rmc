<template>
  <div class="container">
    <div class="t1c-logo">
      <img src="../assets/t1c-logo-full.png" alt="t1c-logo" />
    </div>

    <Consent v-if="consentRequired" @consented="consented" />

    <h1>Device information</h1>
    <DeviceInfo :info="info" :js-version="jsVersion" />

    <h1>User information</h1>
    <UserInfo :info="info" />
  </div>
</template>

<script>
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import Consent from "../components/core/Consent";
import DeviceInfo from "../components/Admin/DeviceInfo";
import UserInfo from "../components/Admin/UserInfo";

export default {
  name: "Admin",
  data() {
    return {
      info: null,
      consentRequired: false,
      jsVersion: null,
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
        res
          .core()
          .version()
          .then(
            (version) => {
              this.jsVersion = version;
            },
            (err) => {
              console.error(err);
            }
          );
        res
          .core()
          .info()
          .then(
            (infoRes) => {
              this.info = infoRes;
            },
            (err) => {
              console.error(err);
            }
          );
      },
      (err) => {
        console.log(err);
        this.consentRequired = true;
        Trust1ConnectorService.setErrorClient(err.client);
      }
    );
  },

  components: { Consent, DeviceInfo, UserInfo },
};
</script>

<style scoped>
.t1c-logo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  height: 100px;
}


</style>
