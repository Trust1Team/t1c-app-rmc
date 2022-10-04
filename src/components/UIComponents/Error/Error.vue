<template>
  <div class="error">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['state', 'icon', 'text'],
};
</script>

<style src="./Error.style.css" scoped />
