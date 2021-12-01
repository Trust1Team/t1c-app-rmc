<template>
  <div class="container">
<!--    Header-->
    <div class="header mt-6">
      <h1 class="text-4xl font-medium leading-none">{{ $t("settings.header") }}</h1>
      <p class="mt-3">{{ $t("settings.subtitle") }}</p>
    </div>

    <div class="intro-y box col-span-12 2xl:col-span-6">
      <div class="flex items-center px-5 py-5 sm:py-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">{{ $t("settings.application.header") }}</h2>
      </div>
      <div class="p-5">
        <div class="tab-content">
          <div
              id="latest-tasks-new"
              class="tab-pane active"
              role="tabpanel"
              aria-labelledby="latest-tasks-new-tab">
            <div class="flex items-center">
              <div class="border-l-2 border-theme-1 pl-4">
                <a href="" class="font-medium">{{ $t("settings.application.darkmode.title") }}</a>
                <div class="text-gray-600">{{ $t("settings.application.darkmode.subtitle") }}</div>
              </div>
              <input
                  class="form-check-switch ml-auto"
                  type="checkbox"
                  @click="switchMode"
                  :checked="darkMode"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { computed, onMounted } from 'vue'
import $ from 'cash-dom'

export default {
  name: 'Settings',
  setup() {
    const store = useStore()
    const darkMode = computed(() => store.state.main.darkMode)

    const setDarkModeClass = () => {
      darkMode.value
        ? $('html').addClass('dark')
        : $('html').removeClass('dark')
    }

    const switchMode = () => {
      store.dispatch('main/setDarkMode', !darkMode.value)
      setDarkModeClass()
    }

    onMounted(() => {
      setDarkModeClass()
    })

    return {
      switchMode,
      darkMode
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
