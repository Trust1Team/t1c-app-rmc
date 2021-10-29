<template>
  <div class="notification-container">
    <transition-group name="list" tag="div" appear>
      <NotificationToast
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import NotificationToast from "@/components/UIComponents/NotificationToast.vue";
import { mapState } from "vuex";

export default {
  components: {
    NotificationToast,
  },
  computed: mapState("notification", ["notifications"]),
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  margin-right: 10px;
}

.list-enter-from {
  transform: scale(0.6);
  opacity: 0;
}
.list-enter-to {
  opacity: 0.95;
  transform: scale(1);
}

.list-enter-active {
  transition: all 0.5s ease;
}
</style>
