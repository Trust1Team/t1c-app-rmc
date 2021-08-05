<template>
  <div class="row">
    <div class="col-6">
      <h5 class="text-warning">
        {{ $t("otherInformation.Additional information") }}
      </h5>
      <ul>
        <li>
          {{ $t("otherInformation.Address") }}: {{ address.streetAndNumber }}
        </li>
        <li>{{ $t("otherInformation.city") }}: {{ address.municipality }}</li>
        <li>{{ $t("otherInformation.Postal code") }}: {{ address.zipcode }}</li>
      </ul>
    </div>
    <div class="col-6">
      <h5 class="text-warning">
        {{ $t("otherInformation.General information") }}
      </h5>
      <ul>
        <li>
          {{ $t("otherInformation.Chip number") }}: {{ biometric.chipNumber }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherInformation",
  props: ["biometric", "address"],
};
</script>

<style scoped>
.text-warning {
  color: #e05512 !important;
}

ul {
  list-style-type: none;
}
</style>
