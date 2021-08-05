<template>
  <div class="col-11 alert text-center p-1 mx-auto" :class="state">
    <i class="fa" :class="icon"></i>&nbsp;&nbsp;&nbsp;&nbsp;{{ text }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["state", "icon", "text"],
};
</script>

<style scoped>
.alert-warning {
  background-color: #e05512;
  color: white;
}
</style>
