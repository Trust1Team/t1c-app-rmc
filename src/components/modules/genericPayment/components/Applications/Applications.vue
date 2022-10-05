<template>
  <div class="token-details-item">
    <h3>{{ $t('genericPaymentApplications.header') }}</h3>

    <div v-for="application in applications" :key="application.aid">
      <h4>{{ application.name }}</h4>

      <div class="text-container">
        <div class="text-label">
          {{ $t('genericPaymentApplications.aid') }}
        </div>
        <div class="text-content intro-x box">
          <div>
            <span>
              {{ application.aid }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-container">
        <div class="text-label">
          {{ $t('genericPaymentApplications.priority') }}
        </div>
        <div class="text-content intro-x box">
          <div>
            <span>
              {{ application.priority }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Applications',
  props: {
    applications: Object,
  },
};
</script>

<style src="./Applications.style.css" scoped />
