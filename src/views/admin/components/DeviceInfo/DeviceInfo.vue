<template>
  <div v-if="info != null" class="installation-info-container">
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <PackageIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">v{{ info.t1CInfoAPI.version }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.api-version') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <PackageIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">v{{ jsVersion }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.js-version') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <ToolIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoAPI.uid }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.Device ID') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <ServerIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoAPI.status }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.Status') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <InfoIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoAPI.logLevel }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.Log level') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <CpuIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">{{ info.t1CInfoOS.platform }}</div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.Operating system') }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <HardDriveIcon class="report-box__icon text-theme-10" />
            </div>
            <div class="text-3xl font-medium leading-8 mt-6 overflow-x-auto">
              {{ info.t1CInfoOS.version }} - {{ info.t1CInfoOS.architecture }}
            </div>
            <div class="text-base text-gray-600 mt-1">{{ $t('deviceInfo.Version') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfo',
  props: {
    info: Object,
    jsVersion: String,
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
p {
  word-break: break-all;
}

.installation-info-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.installation-info-item {
  margin: 10px;
  width: 300px;
  min-height: 200px;
  border-radius: 15px;
  padding: 15px;
}

.installation-info-item h3 {
  font-size: 1.3rem;
  color: #e05512;
  margin-bottom: 10px;
}

.installation-info-item h6 {
  margin-top: 15px;
}

.installation-info-item p {
  font-weight: bold;
}
</style>
