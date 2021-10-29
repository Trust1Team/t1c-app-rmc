<template>
  <div
    class="notification-toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-body">
      {{ notification.text }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="dismissToast"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.$store.dispatch("notification/remove", this.notification),
      3000
    );
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  methods: {
    dismissToast() {
      this.$store.dispatch("notification/remove", this.notification);
    },
  },
};
</script>

<style scoped>
.notification-toast {
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 0.25rem;
  width: auto;
  background-color: #333;
  color: white;
  margin-top: 10px;
  padding-right: 7%;
  opacity: 0.95;
}

.toast-body {
  display: flex;
}
</style>
