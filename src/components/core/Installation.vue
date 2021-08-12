<template>
  <i18n-t keypath="installation.welcome" tag="h1" class="head">
    <span class="highlight">Read My Cards</span>
  </i18n-t>
  <h2>{{ $t("installation.install") }}</h2>

  <div class="binaries-container">
    <div class="binary-os">Windows</div>

    <div class="binary-os">MacOS</div>

    <div class="binary-os">Linux</div>
  </div>
</template>
<script>
import DistributionService from "../../services/DistributionService";

export default {
  name: "Installation",
  data: () => ({}),
  methods: {},
  props: {},
  created() {
    DistributionService.getLatestVersion().then(
      (res) => {
        console.log(res);
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
.head {
  margin-bottom: 40px;
}
h1,
h2 {
  text-align: center;
}

.highlight {
  color: #e05512;
}

.binary-os {
  font-size: 1.4rem;
  width: 250px;
  background-color: #d24d0d;
  border-radius: 15px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.binaries-container {
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
