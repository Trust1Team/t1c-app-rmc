<template>
  <div class="row">
    <div class="col-6">
      <FrontCardView :biometric="biometric" :picture="picture" />
    </div>
    <div class="col-6">
      <BackCardView :biometric="biometric" :picture="picture" />
    </div>
  </div>
</template>

<script>
import BackCardView from "./BackCardView";
import FrontCardView from "./FrontCardView";

export default {
  name: "IDCard",
  props: ["biometric", "picture"],
  components: { BackCardView, FrontCardView },
};
</script>

<style scoped>
.row {
  display: flex;
}
</style>
