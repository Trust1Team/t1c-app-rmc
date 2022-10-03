<template>
  <div class="container">
    <div class="installer">
      <i18n-t keypath="installation.welcome" tag="h1" class="text-4xl font-medium my-16">
        <span class="highlight">Read My Cards</span>
      </i18n-t>
      <!-- <h2>{{ $t("installation.install") }}</h2> -->
      <Installation />
    </div>
  </div>
</template>

<script>
import Installation from '@/components/core/Installation';

export default {
  name: 'Download',
  components: {
    Installation,
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}
</style>
