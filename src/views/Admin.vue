<template>
  <div class="container">
    <div class="t1c-logo">
      <img src="../assets/t1c-logo-full.png" alt="t1c-logo" />
    </div>

    <Consent v-if="consentRequired" @consented="consented" />

    <h1>Device information</h1>
    <div class="installation-info-container" v-if="info != null">
      <div class="installation-info-item">
        <h3>Trust1Connector version</h3>
        <p>{{ info.t1CInfoAPI.version }}</p>
      </div>

      <div class="installation-info-item">
        <h3>Trust1Connector javascript</h3>
        <p>{{ jsVersion }}</p>
      </div>

      <div class="installation-info-item">
        <h3>Device</h3>
        <span>Device ID</span>
        <p>{{ info.t1CInfoAPI.uid }}</p>
        <span>Status</span>
        <p>{{ info.t1CInfoAPI.status }}</p>

        <span>Log level</span>
        <p>{{ info.t1CInfoAPI.logLevel }}</p>
      </div>

      <div class="installation-info-item">
        <h3>Operating system</h3>
        <div>
          <span>Platform</span>
          <p>{{ info.t1CInfoOS.platform }}</p>
        </div>

        <div>
          <span>Version</span>
          <p>
            {{ info.t1CInfoOS.version }} - {{ info.t1CInfoOS.architecture }}
          </p>
        </div>
      </div>
    </div>

    <h1>User information</h1>

    <div class="installation-info-container" v-if="info != null">
      <div class="installation-info-item">
        <h3>User</h3>
        <span>User</span>
        <p>{{ info.t1CInfoUser.name }}</p>

        <span>Username</span>
        <p>{{ info.t1CInfoUser.username }}</p>
      </div>

      <div class="installation-info-item">
        <h3>Home directory</h3>
        <p>{{ info.t1CInfoUser.home }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import Consent from "../components/core/Consent";

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

  components: { Consent },
};
</script>

<style scoped>
.t1c-logo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  height: 100px;
}

.installation-info-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.installation-info-item {
  margin: 10px;
  width: 300px;
  min-height: 200px;
  border-radius: 15px;
  border-bottom: 5px solid #e8e8e8;
  background-color: #f6f6f6;
  padding: 15px;
}

.installation-info-item h3 {
  font-size: 1.3rem;
  color: #e05512;
}

.installation-info-item p {
  font-weight: bold;
}
</style>
