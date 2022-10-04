<template>
  <div class="container">
    <div>
      <VersionCheck />

      <h1 class="text-4xl font-medium my-4">{{ $t('admin.Device information') }}</h1>
      <DeviceInfo :info="info" :js-version="jsVersion" />

      <h1 class="text-4xl font-medium my-4">{{ $t('admin.User information') }}</h1>
      <UserInfo :info="info" />

      <h1 class="text-4xl font-medium my-4">{{ $t('admin.reader') }}</h1>
      <ReadersList />

      <h1 class="text-4xl font-medium my-4">{{ $t('admin.dependency') }}</h1>
      <DependencyInfo />

      <h1 class="text-4xl font-medium my-4">{{ $t('admin.binaries') }}</h1>
      <Installation />
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import { Installation, ReadersList } from '@/components/core';
import DependencyInfo from './components/DependencyInfo';
import VersionCheck from './components/VersionCheck';
import DeviceInfo from './components/DeviceInfo';
import UserInfo from './components/UserInfo';

export default {
  name: 'Admin',
  components: {
    VersionCheck,
    ReadersList,
    DeviceInfo,
    UserInfo,
    DependencyInfo,
    Installation,
  },
  data() {
    return {
      info: null,
      jsVersion: null,
    };
  },
  computed: {},
  created() {
    const client = Trust1ConnectorService.getClient();
    if (client != null) {
      client
        .core()
        .version()
        .then(
          (version) => {
            this.jsVersion = version;
          },
          (err) => {
            console.error(err);
          },
        );
      client
        .core()
        .info()
        .then(
          (infoRes) => {
            this.info = infoRes;
          },
          (err) => {
            console.error(err);
          },
        );
    }
  },
  methods: {},
};
</script>

<style scoped></style>
