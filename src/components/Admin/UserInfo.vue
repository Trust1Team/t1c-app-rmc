<template>
  <div class="installation-info-container" v-if="info != null">
    <div class="installation-info-item">
      <h3>{{ $t('userInfo.User') }}</h3>
      <span>User</span>
      <p>{{ info.t1CInfoUser.name }}</p>

      <span>{{ $t('userInfo.Username') }}</span>
      <p>{{ info.t1CInfoUser.username }}</p>
    </div>

    <div class="installation-info-item">
      <h3>{{ $t('userInfo.Home directory') }}</h3>
      <p>{{ info.t1CInfoUser.home }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    info: Object,
  },
  methods: {},
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.installation-info-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.installation-info-item {
  margin: 10px;
  width: 300px;
  min-height: 200px;
  border-radius: 15px;
  border-bottom: 5px solid #e8e8e8;
  background-color: #f6f6f6;
  padding: 15px;
}

.installation-info-item h3 {
  font-size: 1.3rem;
  color: #e05512;
}

.installation-info-item p {
  font-weight: bold;
}
</style>
