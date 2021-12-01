<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar mb-3">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <router-link :to="{ name: 'side-menu-home' }">Read my cards</router-link>
      <div v-for="route in currentRouteName.matched" v-bind:key="route">
        <div v-if="route.path !== '/'">
          <ChevronRightIcon class="breadcrumb__icon"/>
          <router-link :to="{ name: route.name }" class="breadcrumb--active bc">{{ getFinalOfPath(route.path) }}</router-link>
        </div>
      </div>

    </div>
    <!-- END: Breadcrumb -->
  </div>
  <!-- END: Top Bar -->
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const searchDropdown = ref(false)

    const showSearchDropdown = () => {
      searchDropdown.value = true
    }

    const hideSearchDropdown = () => {
      searchDropdown.value = false
    }

    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown
    }
  },
  methods: {
    getFinalOfPath(p) {
      return p.split('/').pop()
    }
  },
  computed: {
    currentRouteName() {
      return this.$route
    }
  }
})
</script>

<style scoped>
.bc {
  text-transform: capitalize;
}
</style>
