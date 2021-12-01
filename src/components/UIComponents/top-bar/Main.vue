<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar mb-3">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <router-link :to="{ name: 'side-menu-home' }">Read my cards</router-link>
      <div v-for="route in currentRouteName.matched" v-bind:key="route">
        <div v-if="route.path !== '/'">
          <ChevronRightIcon class="breadcrumb__icon"/>
          <a href="" class="breadcrumb--active">{{ route.name.path.fil }}</a>
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
  computed: {
    currentRouteName() {
      // const route = this.$route.name
      console.log(this.$route)
      return this.$route
    }
  }
})
</script>
