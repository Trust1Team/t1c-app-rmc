<template>
  <div class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black">
    <div class="card-content">
      <div class="card-row">
        <div v-if="chipNumber">
          <slot name="chipNumberLabel" />
          <p class="bold">{{ chipNumber }}</p>
        </div>
        <div v-if="barcodeNumber" class="barcode">
          {{ barcodeNumber }}
        </div>
      </div>

      <div class="card-row">
        <div>
          <slot name="row2Label" />
          <p class="bold">{{ biometric.cardDeliveryMunicipality }}</p>
        </div>
      </div>

      <div v-if="mrz" class="card-row">
        <div class="machine-readable">
          <p>{{ mrz[0] }}</p>
          <p>{{ mrz[1] }}</p>
          <p>{{ mrz[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBack',
  props: ['chipNumber', 'barcodeNumber', 'row2Label', 'row2Value', 'mrz'],
};
</script>

<style src="./GenericBackCard.style.css" scoped />
