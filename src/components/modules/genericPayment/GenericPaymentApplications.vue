<template>
  <div class="token-details-item">
    <h3>{{ $t("genericPaymentApplications.header") }}</h3>

    <div v-for="application in applications" :key="application.aid">
      <h4>{{ application.name }}</h4>

      <div class="text-container">
        <div class="text-label">
          {{ $t("genericPaymentApplications.aid") }}
        </div>
        <div class="text-content">
          <div>
            <span>
              {{ application.aid }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-container">
        <div class="text-label">
          {{ $t("genericPaymentApplications.priority") }}
        </div>
        <div class="text-content">
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
  name: "GenericPaymentApplications",
  props: {
    applications: Object,
  },
  computed: {},
};
</script>

<style scoped>
.token-details-item {
  margin-bottom: 30px;
}

h4 {
  color: #e05512;
  font-size: 1.1rem;
}

.text-container {
  margin-bottom: 20px;
}

.text-label {
  color: #b1b1b1;
  margin-bottom: 4px;
}

.text-content {
  padding: 15px;
  background-color: #f5f7f9;
  border-radius: 5px;
  word-break: break-word;
}
</style>
