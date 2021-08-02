<template>
  <div class="row">
    <div class="col-6">
      <h5 class="text-warning">Additional information</h5>
      <ul>
        <li>Address: {{ address.streetAndNumber }}</li>
        <li>city: {{ address.municipality }}</li>
        <li>Postal code: {{ address.zipcode }}</li>
      </ul>
    </div>
    <div class="col-6">
      <h5 class="text-warning">General information</h5>
      <ul>
        <li>Chip number: {{ biometric.chipNumber }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherInformation",
  props: ["biometric", "address"]
}
</script>

<style scoped>
.text-warning {
  color: #e05512 !important;
}

ul {
  list-style-type: none;
}
</style>