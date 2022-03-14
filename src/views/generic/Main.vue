<template>
  <div class="container">
    <div class="go-back flex flex-row">
      <button @click="this.$router.go(-1)" class="btn btn-primary">
        <i class="fas fa-arrow-left go-back-icon"></i>
      </button>
      <h1 class="font-medium text-4xl">{{ $t("module.token.header") }}</h1>
    </div>

    <div class="loading">
      <loading v-if="getDataLoading" icon="puff" size="40"></loading>
    </div>
    <ModuleSwitch />
  </div>
</template>

<script>
import ModuleSwitch from '@/components/modules/ModuleSwitch'
import Loading from '@/global-components/loading-icon/Main'
import store from '@/store'

export default {
  name: 'Generic',
  beforeRouteEnter (to, from, next) {
    if (!store.getters['reader/getSelectedReader'] === true) {
      next('/')
    } else {
      next()
    }
  },
  components: {
    ModuleSwitch,
    Loading
  },
  methods: {
    goBack() {
      this.$store.dispatch('reader/setSelectedReader', null)
      this.$router.go(-1)
    }
  },
  computed: {
    getDataLoading() {
      return this.$store.getters['card/getDataLoading']
    }
  },
  unmounted() {
    this.$store.dispatch('reader/setSelectedReader', null)
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.go-back button {
  margin-right: 10px;
}
</style>
