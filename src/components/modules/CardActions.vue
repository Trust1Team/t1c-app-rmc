<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">
      <button class="btn btn-primary" :disabled="getCertificateLoading">
        {{ $t("cardActions.legalCopy") }}
      </button>

      <button class="btn btn-primary" :disabled="getCertificateLoading">
        {{ $t("cardActions.checkPin") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardActions",
  props: {
    address: Object,
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
};
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}
.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}
</style>
