<template>
  <div>
    <div class="go-back">
      <button @click="this.$router.go(-1)" class="btn btn-primary">
        <i class="fas fa-arrow-left go-back-icon"></i>
      </button>
    </div>

    <div class="loading">
      <loading v-if="getDataLoading" icon="bars" size="40"></loading>
    </div>
    <ModuleSwitch />
  </div>
</template>

<script>
import ModuleSwitch from '@/components/modules/ModuleSwitch'
import Loading from '@/global-components/loading-icon/Main'
import store from '@/store'

export default {
  name: 'CertinomisView',
  beforeRouteEnter (to, from, next) {
    if (!store.getters['reader/getSelectedReader'] == true) {
      next({ name: 'side-menu-modules-certinomis' })
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
.go-back {
  width: 100%;
  display: flex;
}

.go-back-icon {
  transition: all 0.2s ease-in;
}

.go-back button:hover .go-back-icon {
  transform: translateX(-3px);
}

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}
</style>
