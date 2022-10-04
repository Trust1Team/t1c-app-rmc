<template>
  <div v-if="info != null" class="installation-info-container">
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <UserIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoUser.name }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('userInfo.Name') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <UserIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoUser.username }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('userInfo.Username') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <HomeIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoUser.home }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('userInfo.Home directory') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    info: Object,
  },
  setup() {},
};
</script>

<style src="./UserInfo.style.css" scoped />
