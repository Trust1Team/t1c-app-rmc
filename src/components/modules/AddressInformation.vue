<template>
  <div class="token-details-item">
    <h3>{{ $t("addressInformation.header") }}</h3>
    <div class="text-container">
      <div class="text-label">
        {{ $t("addressInformation.address") }}
      </div>
      <div class="text-content">
        {{ address.streetAndNumber }}
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("addressInformation.city") }}
      </div>
      <div class="text-content">
        {{ address.municipality }}
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t("addressInformation.postalCode") }}
      </div>
      <div class="text-content">
        {{ address.zipcode }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressInformation",
  props: {
    address: Object,
  },
};
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}

.text-container {
  margin-bottom: 20px;
}

.text-label {
  color: #b1b1b1;
  margin-bottom: 4px;
}

.text-content {
  padding: 15px;
  background-color: #f5f7f9;
  border-radius: 5px;
  word-break: break-word;
}
</style>
