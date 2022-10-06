<template>
  <div class="binaries-container">
    <div v-if="!compareBaseConfig" class="flex justify-evenly w-full my-5">
      <div class="alert alert-warning-soft show mb-2 flex items-center justify-center installation-alert" role="alert">
        {{ $t('installation.config', [getUrl, getPort]) }}
      </div>
    </div>

    <div class="binary-os intro-x box">
      <h3><i class="fab fa-windows"></i> {{ $t('installation.windowsheader') }}</h3>
      <div class="mt-3">
        <p>
          {{ $t('installation.windows') }}
        </p>
        <div>
          <button class="btn-primary" @click="setSelectedOS('windows')">
            Download <i class="fas fa-chevron-down"></i>
          </button>
          <div :class="{ 'download-list-active': selectedOS === 'windows' }" class="download-list">
            <div
              v-if="latestVersion"
              :class="{
                'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'WIN64'),
              }"
              class="download-list-item"
              @click="downloadVersion('WIN64')"
            >
              {{ $t('installation.windows64bit') }}
              <span>{{ latestVersion.id }}</span>
            </div>
            <div
              v-if="latestVersion"
              :class="{
                'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'WIN32'),
              }"
              class="download-list-item"
              @click="downloadVersion('WIN32')"
            >
              {{ $t('installation.windows32bit') }}
              <span>{{ latestVersion.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="binary-os intro-x box">
      <h3><i class="fab fa-apple"></i> {{ $t('installation.macosheader') }}</h3>
      <div class="mt-3">
        <p>
          {{ $t('installation.macos') }}
        </p>
        <button class="btn-primary" @click="setSelectedOS('macos')">
          Download <i class="fas fa-chevron-down"></i>
        </button>
        <div :class="{ 'download-list-active': selectedOS === 'macos' }" class="download-list">
          <div
            v-if="latestVersion"
            :class="{
              'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'MACOS'),
            }"
            class="download-list-item"
            @click="downloadVersion('MACOS')"
          >
            {{ $t('installation.macosintel') }}
            <span>{{ latestVersion.id }}</span>
          </div>
          <div
            v-if="latestVersion"
            :class="{
              'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'MACOSARM'),
            }"
            class="download-list-item"
            @click="downloadVersion('MACOSARM')"
          >
            {{ $t('installation.macosapple') }}
            <span>{{ latestVersion.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="binary-os intro-x box">
      <h3><i class="fab fa-linux"></i> {{ $t('installation.linuxheader') }}</h3>
      <div class="mt-3">
        <p>
          {{ $t('installation.linux') }}
        </p>
        <button class="btn-primary" @click="setSelectedOS('linux')">
          Download <i class="fas fa-chevron-down"></i>
        </button>
        <div :class="{ 'download-list-active': selectedOS === 'linux' }" class="download-list">
          <div
            v-if="latestVersion"
            :class="{
              'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'LINUX64'),
            }"
            class="download-list-item"
            @click="downloadVersion('LINUX64')"
          >
            {{ $t('installation.linux64bit') }}
            <span>{{ latestVersion.id }}</span>
          </div>
          <div
            v-if="latestVersion"
            :class="{
              'download-list-disabled': !latestVersion.uris.find((u) => u.os === 'LINUX32'),
            }"
            class="download-list-item"
            @click="downloadVersion('LINUX32')"
          >
            {{ $t('installation.linux32bit') }}
            <span>{{ latestVersion.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import DistributionService from '@/infrastructure/services/Distribution';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'VersionDownload',
  props: {},
  setup() {
    const toast = useToast();
    const router = useRouter();

    const selectedOS = ref();
    const latestVersion = ref();

    const getUrl = () => (window._env_.VUE_APP_T1C_URL ? window._env_.VUE_APP_T1C_URL : 'https://t1c.t1t.io');
    const getPort = () => (window._env_.VUE_APP_T1C_PORT ? window._env_.VUE_APP_T1C_PORT : 51783);

    const compareBaseConfig = () => {
      const client = Trust1ConnectorService.getClient() || Trust1ConnectorService.getErrorClient();

      if (!client) {
        return true;
      }

      console.log(client.config()._t1cApiUrl, getUrl);
      console.log(client.config()._t1cProxyPort, getPort);
      console.log(client.config()._t1cApiUrl === getUrl && client.config()._t1cProxyPort === getPort);

      return client.config()._t1cApiUrl === getUrl && client.config()._t1cProxyPort === getPort;
    };

    const refreshPage = () => {
      router.push({ name: 'side-menu-home' });
    };

    const setSelectedOS = (os) => {
      selectedOS.value = os;
    };

    const downloadVersion = (version) => {
      if (!latestVersion.value?.uris) {
        toast.error('Could not find uri');
        console.error('Could not find uri');
        return false;
      }

      const v = latestVersion.value.uris.find((u) => u.os === version);
      window.open(v.uri, '_blank').focus();
    };

    onMounted(async () => {
      try {
        const response = await DistributionService.getLatestVersion();
        latestVersion.value = response.data.data;
      } catch (err) {
        console.error(err);
      }
    });

    return {
      toast,
      selectedOS,
      latestVersion,
      getUrl,
      getPort,
      compareBaseConfig,
      refreshPage,
      setSelectedOS,
      downloadVersion,
    };
  },
};
</script>

<style src="./VersionDownload.style.css" scoped />
