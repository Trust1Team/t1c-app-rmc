<template>
  <div class="token-details-item">
    <h3>{{ $t("cardActions.header") }}</h3>
    <div class="action-buttons">
      <button class="btn btn-primary">
        {{ $t("cardActions.checkPin") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericPaymentCardActions',
  props: {},
  computed: {}
}
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
