<template>
  <!-- BEGIN: Notification Content -->
  <div id="success-notification-content" class="toastify-content hidden flex">
    <CheckCircleIcon class="text-theme-9" />
    <div class="ml-4 mr-4">
      <div class="font-medium">{{getTitle}}</div>
      <div class="text-gray-600 mt-1">
        {{ getDescription }}
      </div>
    </div>
  </div>
  <!-- END: Notification Content -->

  <!-- BEGIN: Notification Content -->
  <div id="fail-notification-content" class="toastify-content hidden flex">
    <AlertCircleIcon class="text-theme-6" />
    <div class="ml-4 mr-4">
      <div class="font-medium">{{ getTitle }}</div>
      <div class="text-gray-600 mt-1">
        {{ getDescription }}
      </div>
    </div>
  </div>
  <!-- END: Notification Content -->
</template>

<script>
import Toastify from 'toastify-js'

export default {
  name: 'NotificationToast',
  data() {
    return {
      title: undefined,
      description: undefined
    }
  },
  // props: ['title', 'description'],
  methods: {
    setProps(title, description) {
      this.title = title
      this.description = description
    },
    successNotification(title, description, duration) {
      this.title = title
      this.description = description
      Toastify({
        node: cash('#success-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: duration,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    },
    failNotification(title, description, duration) {
      this.title = title
      this.description = description
      Toastify({
        node: cash('#fail-notification-content')
          .clone()
          .removeClass('hidden')[0],
        duration: duration,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    getDescription() {
      return this.description
    }
  }
}
</script>

<style scoped>
</style>
