<template>
  <div class="container">
    <div>
      <h1 class="text-4xl font-medium my-4">{{ $t("admin.Device information") }}</h1>
      <DeviceInfo :info="info" :js-version="jsVersion" />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.User information") }}</h1>
      <UserInfo :info="info" />

      <h1 class="text-4xl font-medium my-4">{{ $t("admin.reader") }}</h1>
      <AdminReadersList />

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
import AdminReadersList from './AdminReadersList'
import DependencyInfo from './DependencyInfo'
import Installation from '../../components/core/Installation'
import router from '@/router'

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
    Trust1ConnectorService.init().then(
      (res) => {
        Trust1ConnectorService.setClient(res)
        res
          .core()
          .version()
          .then(
            (version) => {
              this.jsVersion = version
            },
            (err) => {
              console.error(err)
            }
          )
        res
          .core()
          .info()
          .then(
            (infoRes) => {
              this.info = infoRes
            },
            (err) => {
              console.error(err)
            }
          )
      },
      (err) => {
        console.log(err)
        Trust1ConnectorService.setErrorClient(err.client)
        router.push({ name: 'Home' })
      }
    )
  },
  computed: {},
  components: {
    AdminReadersList,
    DeviceInfo,
    UserInfo,
    DependencyInfo,
    Installation
  }
}
</script>

<style scoped></style>
