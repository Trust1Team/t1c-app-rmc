<template>
  <div class="installation-info-container" v-if="info != null">
    <div class="installation-info-item">
      <h3>{{ $t("deviceInfo.Trust1Connector version") }}</h3>
      <h6>{{ $t("deviceInfo.api-version") }}</h6>
      <p>{{ info.t1CInfoAPI.version }}</p>
      <h6>{{ $t("deviceInfo.js-version") }}</h6>
      <p>{{ jsVersion }}</p>
    </div>

    <div class="installation-info-item">
      <h3>{{ $t("deviceInfo.Device") }}</h3>
      <h6>{{ $t("deviceInfo.Device ID") }}</h6>
      <p>{{ info.t1CInfoAPI.uid }}</p>
      <h6>{{ $t("deviceInfo.Status") }}</h6>
      <p>{{ info.t1CInfoAPI.status }}</p>

      <h6>{{ $t("deviceInfo.Log level") }}</h6>
      <p>{{ info.t1CInfoAPI.logLevel }}</p>
    </div>

    <div class="installation-info-item">
      <h3>{{ $t("deviceInfo.Operating system") }}</h3>
      <div>
        <h6>{{ $t("deviceInfo.Platform") }}</h6>
        <p>{{ info.t1CInfoOS.platform }}</p>
      </div>

      <div>
        <h6>{{ $t("deviceInfo.Version") }}</h6>
        <p>{{ info.t1CInfoOS.version }} - {{ info.t1CInfoOS.architecture }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceInfo",
  props: {
    info: Object,
    jsVersion: String,
  },
  methods: {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  word-break: break-all;
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
  margin-bottom: 10px;
}

.installation-info-item h6 {
  margin-top: 15px;
}

.installation-info-item p {
  font-weight: bold;
}
</style>
