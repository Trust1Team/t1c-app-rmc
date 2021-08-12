<template>
  <div class="container">
    <Consent v-if="getInstalled && !getConsent" @consented="consented" />
    <div v-if="getConsent && getInstalled">
      <h1>{{ $t("admin.Device information") }}</h1>
      <DeviceInfo :info="info" :js-version="jsVersion" />

      <h1>{{ $t("admin.User information") }}</h1>
      <UserInfo :info="info" />

      <h1>{{ $t("admin.reader") }}</h1>
      <AdminReadersList />

      <h1>{{ $t("admin.dependency") }}</h1>
      <DependencyInfo />
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import Consent from "../components/core/Consent";
import DeviceInfo from "../components/Admin/DeviceInfo";
import UserInfo from "../components/Admin/UserInfo";
import AdminReadersList from "../components/Admin/AdminReadersList";
import DependencyInfo from "../components/Admin/DependencyInfo";

export default {
  name: "Admin",
  data() {
    return {
      info: null,
      installed: false,
      jsVersion: null,
    };
  },
  methods: {
    consented() {
      this.$store.dispatch("SET_CONSENT", true);
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
  computed: {
    getConsent() {
      return this.$store.getters["getConsent"];
    },
    getInstalled() {
      return this.$store.getters["getInstalled"];
    },
  },
  components: {
    AdminReadersList,
    Consent,
    DeviceInfo,
    UserInfo,
    DependencyInfo,
  },
};
</script>

<style scoped>
.admin-reader-list {
  margin-bottom: 50px;
}
</style>
