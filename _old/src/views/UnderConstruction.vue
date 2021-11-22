<template>
  <div class="construction">
    <div class="img-container">
      <img src="../assets/construction.jpg" alt="T1C logo" />
    </div>
    <h1>This page is under construction</h1>
    <h3>We're working on it</h3>
  </div>
</template>

<script>
export default {
  name: "UnderConstruction",
};
</script>

<style scoped>
.construction {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.img-container img {
  width: 400px;
}

.construction h1 {
  text-align: center;
}

.construction h3 {
  text-align: center;
  color: #8c959d;
}
</style>
