<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="tag" style="width: 50%">Identificatienummer van het Rijksregister</div>
        <div class="data" style="width: 50%"></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 50%">Identification number of the National Register</div>
        <div class="data" style="width: 50%"></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 50%"><b>{{ biometric.chipNumber }}</b></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 100%">&nbsp;</div>
      </div>

      <div class="row">
        <div class="tag" style="width: 50%">Plaats van afgifte/Place of issue</div>
      </div>
      <div class="row">
        <div class="data" style="width: 30%"><b>{{ biometric.cardDeliveryMunicipality }}</b></div>
      </div>
      <div class="row">
        <div class="tag" style="width: 100%">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag signature" style="width: 100%">{{ biometric.signature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackCardView",
  props: ["biometric", "picture"]
}
</script>

<style scoped>
.card {
  width: 80%;
  margin: auto;
}

.tag {
  font-size: 9px !important;
}

.data {
  font-size: 9px !important;
}

.signature {
  font-size: 14px !important;
}
</style>