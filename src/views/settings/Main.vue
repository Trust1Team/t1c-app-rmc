<template>
  <div class="container">
    <!--    Header-->
    <div class="header mt-6">
      <h1 class="text-4xl font-medium leading-none">{{ $t('settings.header') }}</h1>
      <p class="mt-3">{{ $t('settings.subtitle') }}</p>
    </div>

    <div class="intro-y box col-span-12 2xl:col-span-6 my-5">
      <div class="flex items-center px-5 py-5 sm:py-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">{{ $t('settings.application.header') }}</h2>
      </div>
      <div class="p-5">
        <div class="tab-content">
          <div class="tab-pane active" role="tabpanel" aria-labelledby="latest-tasks-new-tab">
            <div class="flex items-center justify-between my-2.5">
              <div class="border-l-2 border-theme-1 pl-4">
                <a href="" class="font-medium">{{ $t('settings.application.darkmode.title') }}</a>
                <div class="text-gray-600">{{ $t('settings.application.darkmode.subtitle') }}</div>
              </div>
              <input class="form-check-switch ml-auto" type="checkbox" :checked="darkMode" @click="switchMode" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="intro-y box col-span-12 2xl:col-span-6 my-5">
      <div class="flex items-center px-5 py-5 sm:py-5 border-b border-gray-200 dark:border-dark-5">
        <h2 class="font-medium text-base mr-auto">{{ $t('settings.trust1connector.header') }}</h2>
      </div>
      <div class="p-5">
        <div class="tab-content">
          <div class="tab-pane active" role="tabpanel" aria-labelledby="latest-tasks-new-tab">
            <div class="flex items-center justify-between my-2.5">
              <div class="border-l-2 border-theme-1 pl-4">
                <a href="" class="font-medium">{{ $t('settings.trust1connector.url.title') }}</a>
                <div class="text-gray-600">{{ $t('settings.trust1connector.url.subtitle') }}</div>
              </div>
              <input
                v-model="url"
                type="text"
                class="form-control w-56"
                :placeholder="$t('settings.trust1connector.url.title')"
              />
            </div>

            <div class="flex items-center justify-between my-2.5">
              <div class="border-l-2 border-theme-1 pl-4">
                <a href="" class="font-medium">{{ $t('settings.trust1connector.port.title') }}</a>
                <div class="text-gray-600">{{ $t('settings.trust1connector.port.subtitle') }}</div>
              </div>
              <input
                v-model="port"
                type="number"
                class="form-control w-56"
                :placeholder="$t('settings.trust1connector.port.title')"
              />
            </div>

            <div class="flex items-center justify-between my-2.5">
              <div class="border-l-2 border-theme-1 pl-4">
                <a href="" class="font-medium">{{ $t('settings.trust1connector.init.title') }}</a>
                <div class="text-gray-600">{{ $t('settings.trust1connector.init.subtitle') }}</div>
              </div>
              <button :disabled="initialiseLoading" class="btn btn-primary w-44 mr-2 mb-2" @click="initialise">
                <Loading v-if="initialiseLoading" class="w-4 h-4 mr-2" icon="puff" size="20"> </Loading>
                <RefreshCwIcon v-if="!initialiseLoading" class="w-4 h-4 mr-2"></RefreshCwIcon>
                {{ $t('settings.trust1connector.init.title') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'cash-dom';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import Loading from '@/global-components/loading-icon/Main';

export default {
  name: 'Settings',
  components: { Loading },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.main.darkMode);
    const toast = useToast();
    const setDarkModeClass = () => {
      darkMode.value ? $('html').addClass('dark') : $('html').removeClass('dark');
    };

    const switchMode = () => {
      store.dispatch('main/setDarkMode', !darkMode.value);
      setDarkModeClass();
    };

    onMounted(() => {
      setDarkModeClass();
    });

    return {
      switchMode,
      darkMode,
      toast,
    };
  },
  data() {
    return {
      url: undefined,
      port: undefined,
      initialiseLoading: false,
    };
  },
  computed: {
    getUrl() {
      const client = Trust1ConnectorService.getClient();
      if (client != null) {
        return client.config()._t1cApiUrl;
      } else {
        return window.VUE_APP_ENV_T1C_URL ? window.VUE_APP_ENV_T1C_URL : 'https://t1c.t1t.io';
      }
    },
    getPort() {
      const client = Trust1ConnectorService.getClient();
      if (client != null) {
        return client.config()._t1cProxyPort;
      } else {
        return window.VUE_APP_ENV_T1C_PORT ? window.VUE_APP_ENV_T1C_PORT : 51783;
      }
    },
  },
  created() {
    this.url = this.getUrl;
    this.port = this.getPort;
  },
  methods: {
    initialise() {
      this.initialiseLoading = true;
      Trust1ConnectorService.init(this.url, this.port).then(
        (res) => {
          this.initialiseLoading = false;
          Trust1ConnectorService.setClient(res);
          console.log(Trust1ConnectorService.getClient().config());
          this.toast.success('Trust1Connector initialised');
        },
        (err) => {
          this.initialiseLoading = false;
          if (err.code === '112999') {
            this.toast.error('Could not initialise Trust1Connector');
          } else {
            this.toast.warning('Trust1Connector initialised');
            Trust1ConnectorService.setErrorClient(err.client);
          }
        },
      );
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
