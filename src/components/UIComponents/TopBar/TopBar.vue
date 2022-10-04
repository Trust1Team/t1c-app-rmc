<template>
  <div class="top-bar mb-3">
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <router-link :to="{ name: 'side-menu-home' }">Read my cards</router-link>
      <div v-for="route in currentRouteName.matched" :key="route">
        <div v-if="route.path !== '/'">
          <ChevronRightIcon class="breadcrumb__icon" />
          <router-link :to="{ name: route.name }" class="breadcrumb--active bc">
            {{ getFinalOfPath(route.path) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const searchDropdown = ref(false);

    const showSearchDropdown = () => {
      searchDropdown.value = true;
    };

    const hideSearchDropdown = () => {
      searchDropdown.value = false;
    };

    const currentRouteName = () => {
      return route;
    };

    const getFinalOfPath = (p) => {
      return p.split('/').pop();
    };

    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      getFinalOfPath,
      currentRouteName,
    };
  },
});
</script>

<style src="./TopBar.style.css" scoped />
