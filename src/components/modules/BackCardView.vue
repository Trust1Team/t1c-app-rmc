<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="tag col-6">Identificatienummer van het Rijksregister</div>
        <div class="data col-6"></div>
      </div>

      <div class="row">
        <div class="tag col-6">Identification number of the National Register</div>
        <div class="data col-6"></div>
      </div>

      <div class="row">
        <div class="tag col-6"><b>{{ biometric.chipNumber }}</b></div>
      </div>

      <div class="row">
        <div class="tag col-12">&nbsp;</div>
      </div>

      <div class="row">
        <div class="tag col-6">Plaats van afgifte/Place of issue</div>
      </div>
      <div class="row">
        <div class="data col-4"><b>{{ biometric.cardDeliveryMunicipality }}</b></div>
      </div>
      <div class="row">
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
        <div class="tag">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag signature col-12">{{ biometric.signature }}</div>
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