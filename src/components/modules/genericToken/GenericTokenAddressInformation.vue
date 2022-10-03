<template>
  <div v-if="address" class="token-details-item">
    <h3>{{ $t('addressInformation.header') }}</h3>
    <div class="text-container mt-3">
      <div class="text-label">
        {{ $t('addressInformation.address') }}
      </div>
      <div class="text-content intro-x box">
        <span v-if="address.streetAndNumber">{{ address.streetAndNumber }}</span>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('addressInformation.city') }}
      </div>
      <div class="text-content intro-x box">
        <span v-if="address.municipality">{{ address.municipality }}</span>
      </div>
    </div>

    <div class="text-container">
      <div class="text-label">
        {{ $t('addressInformation.postalCode') }}
      </div>
      <div class="text-content intro-x box">
        <span v-if="address.zipcode">{{ address.zipcode }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenericTokenAddressInformation',
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
  border-radius: 5px;
  word-break: break-word;
}
</style>
