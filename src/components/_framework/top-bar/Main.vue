<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar mb-3">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <a href="">Read my cards</a>
      <ChevronRightIcon class="breadcrumb__icon" />
      <a href="" class="breadcrumb--active">{{ currentRouteName }}</a>
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
      const route = this.$route.name
      if (route === 'side-menu-home') {
        return 'Home'
      } else if (route === 'side-menu-admin') {
        return 'Admin'
      } else if (route === 'side-menu-contact') {
        return 'Contact'
      } else {
        return 'Home'
      }
    }
  }
})
</script>
