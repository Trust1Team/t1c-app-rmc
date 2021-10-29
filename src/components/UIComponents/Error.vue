<template>
  <div class="error">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["state", "icon", "text"],
};
</script>

<style scoped>
.error {
  margin: 20px 0;
  width: 100%;
  background-color: #f3d8da;
  color: #79282c;
  border: 1px solid #edc4c8;
  min-height: 50px;
  border-radius: 5px;
  padding: 10px 20px;
  /*text-align: center;*/
}
</style>
