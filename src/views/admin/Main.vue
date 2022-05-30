<template>
  <div class="container">
    <div>
      <VersionCheck></VersionCheck>

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.Device information") }}</h1>
      <DeviceInfo :info="info" :js-version="jsVersion" />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.User information") }}</h1>
      <UserInfo :info="info" />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.reader") }}</h1>
      <ReadersList />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.dependency") }}</h1>
      <DependencyInfo />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.binaries") }}</h1>
      <Installation />
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from '../../services/Trust1ConnectorService'
import DeviceInfo from './DeviceInfo'
import UserInfo from './UserInfo'
import ReadersList from '@/components/core/ReadersList'
import DependencyInfo from './DependencyInfo'
import Installation from '../../components/core/Installation'
import VersionCheck from '@/views/admin/VersionCheck'

export default {
  name: 'Admin',
  data() {
    return {
      info: null,
      jsVersion: null
    }
  },
  methods: {},
  created() {
    const client = Trust1ConnectorService.getClient()
    if (client != null) {
      client.core().version().then((version) => {
        this.jsVersion = version
      },
      (err) => {
        console.error(err)
      })
      client.core().info().then((infoRes) => {
        this.info = infoRes
      },
      (err) => {
        console.error(err)
      })
    }
  },
  computed: {},
  components: {
    VersionCheck,
    ReadersList,
    DeviceInfo,
    UserInfo,
    DependencyInfo,
    Installation
  }
}
</script>

<style scoped></style>
