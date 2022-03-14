<template>
  <div class="binaries-container">

    <div class="flex justify-evenly w-full my-5">
      <div class="alert alert-primary-soft show mb-2 flex items-center justify-center installation-alert" role="alert">{{ $t("installation.help") }}</div>
      <div class="refresh">
        <button @click="refreshPage()" class="btn btn-primary">
          <i class="fas fa-sync-alt refresh-icon"></i>
        </button>
      </div>
    </div>

    <div v-if="!compareBaseConfig" class="flex justify-evenly w-full my-5">
      <div class="alert alert-warning-soft show mb-2 flex items-center justify-center installation-alert" role="alert">{{ $t("installation.config", [this.getUrl, this.getPort]) }}</div>
    </div>

    <div class="binary-os intro-x box">
      <h3>
        <i class="fab fa-windows"></i> {{ $t("installation.windowsheader") }}
      </h3>
      <div class="mt-3">
        <p>
          {{ $t("installation.windows") }}
        </p>
        <div>
          <button @click="setSelectedOS('windows')" class="btn-primary">
            Download <i class="fas fa-chevron-down"></i>
          </button>
          <div
            :class="{ 'download-list-active': selectedOS === 'windows' }"
            class="download-list"
          >
            <div
              :class="{
                'download-list-disabled': !latestVersion.uris.find(
                  (u) => u.os === 'WIN64'
                ),
              }"
              class="download-list-item"
              v-if="latestVersion"
              @click="downloadVersion('WIN64')"
            >
              {{ $t("installation.windows64bit") }}
              <span>{{ latestVersion.id }}</span>
            </div>
            <div
              :class="{
                'download-list-disabled': !latestVersion.uris.find(
                  (u) => u.os === 'WIN32'
                ),
              }"
              class="download-list-item"
              v-if="latestVersion"
              @click="downloadVersion('WIN32')"
            >
              {{ $t("installation.windows32bit") }}
              <span>{{ latestVersion.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="binary-os intro-x box">
      <h3><i class="fab fa-apple"></i> {{ $t("installation.macosheader") }}</h3>
      <div class="mt-3">
        <p>
          {{ $t("installation.macos") }}
        </p>
        <button @click="setSelectedOS('macos')" class="btn-primary">
          Download <i class="fas fa-chevron-down"></i>
        </button>
        <div
          :class="{ 'download-list-active': selectedOS === 'macos' }"
          class="download-list"
        >
          <div
            :class="{
              'download-list-disabled': !latestVersion.uris.find(
                (u) => u.os === 'MACOS'
              ),
            }"
            class="download-list-item"
            v-if="latestVersion"
            @click="downloadVersion('MACOS')"
          >
            {{ $t("installation.macosintel") }}
            <span>{{ latestVersion.id }}</span>
          </div>
          <div
            :class="{
              'download-list-disabled': !latestVersion.uris.find(
                (u) => u.os === 'MACOSARM'
              ),
            }"
            class="download-list-item"
            v-if="latestVersion"
            @click="downloadVersion('MACOSARM')"
          >
            {{ $t("installation.macosapple") }}
            <span>{{ latestVersion.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="binary-os intro-x box">
      <h3><i class="fab fa-linux"></i> {{ $t("installation.linuxheader") }}</h3>
      <div class="mt-3">
        <p>
          {{ $t("installation.linux") }}
        </p>
        <button @click="setSelectedOS('linux')" class="btn-primary">
          Download <i class="fas fa-chevron-down"></i>
        </button>
        <div
          :class="{ 'download-list-active': selectedOS === 'linux' }"
          class="download-list"
        >
          <div
            :class="{
              'download-list-disabled': !latestVersion.uris.find(
                (u) => u.os === 'LINUX64'
              ),
            }"
            class="download-list-item"
            v-if="latestVersion"
            @click="downloadVersion('LINUX64')"
          >
            {{ $t("installation.linux64bit") }}
            <span>{{ latestVersion.id }}</span>
          </div>
          <div
            :class="{
              'download-list-disabled': !latestVersion.uris.find(
                (u) => u.os === 'LINUX32'
              ),
            }"
            class="download-list-item"
            v-if="latestVersion"
            @click="downloadVersion('LINUX32')"
          >
            {{ $t("installation.linux32bit") }}
            <span>{{ latestVersion.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DistributionService from '../../services/DistributionService'
import { useToast } from 'vue-toastification'
import Trust1ConnectorService from '@/services/Trust1ConnectorService'

export default {
  name: 'Installation',
  setup() {
    const toast = useToast()
    return { toast }
  },
  data() {
    return {
      selectedOS: null,
      latestVersion: null
    }
  },
  methods: {
    refreshPage() {
      this.$router.push({ name: 'side-menu-home' })
    },
    setSelectedOS(os) {
      this.selectedOS = os
    },
    downloadVersion(version) {
      const v = this.latestVersion.uris.find((u) => u.os === version)
      if (v) {
        window.open(v.uri, '_blank').focus()
      } else {
        this.toast.error('Could not find uri')
        console.error('Could not find uri')
      }
    }
  },
  props: {},
  created() {
    DistributionService.getLatestVersion().then(
      (res) => {
        this.latestVersion = res.data.data
      },
      (err) => {
        console.error(err)
      }
    )
  },
  computed: {
    compareBaseConfig() {
      const client = Trust1ConnectorService.getClient() || Trust1ConnectorService.getErrorClient()
      if (client != null) {
        console.log(client.config()._t1cApiUrl, this.getUrl)
        console.log(client.config()._t1cProxyPort, this.getPort)
        console.log(client.config()._t1cApiUrl === this.getUrl && client.config()._t1cProxyPort === this.getPort)
        return client.config()._t1cApiUrl === this.getUrl && client.config()._t1cProxyPort === this.getPort
      } else {
        return true
      }
    },
    getUrl() {
      return window.VUE_APP_ENV_T1C_URL ? window.VUE_APP_ENV_T1C_URL : 'https://t1c.t1t.io'
    },
    getPort() {
      return window.VUE_APP_ENV_T1C_PORT ? window.VUE_APP_ENV_T1C_PORT : 51783
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.binary-os {
  margin-top: 20px;
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.4rem;
  width: 400px;
  margin-bottom: 20px;
  background-color: #f6f8fa;
  border-radius: 5px;
  justify-content: center;
  padding: 20px;
}

.binary-os p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.binary-os button {
  border: none;
  border-radius: 4px;
  padding: 15px;
  width: 100%;
}

.binaries-container {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 55px;
}

.download-list-active {
  transform: translateY(0px) !important;
  opacity: 1 !important;
  display: flex !important;
}

.download-list {
  transform: translateY(5px);
  opacity: 0;
  display: none;
  flex-wrap: wrap;
  border-radius: 5px;
  font-size: 1.1rem;
  margin-top: 5px;
  position: absolute;
  width: 370px;
  background-color: #f6f8fa;
  transition: all 0.2s ease-in;
}

.download-list-item {
  width: 100%;
  display: flex;
  padding: 10px;
  border: 1px solid #cacaca;
  justify-content: space-between;
}

.download-list-item span {
  color: #aeaeae;
}

.download-list-item:hover {
  background-color: #eceaea;
  cursor: pointer;
}

.download-list-item:first-of-type {
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}

.download-list-item:last-of-type {
  border-radius: 0 0 5px 5px;
}

.download-list-disabled {
  background-color: #eceaea;
  color: #696969;
}

.download-list-disabled:hover {
  cursor: not-allowed !important;
}

@media only screen and (max-width: 1546px) {
  .binary-os {
    width: 100%;
  }

  .download-list {
    position: relative;
    width: 100%;
  }
}
.installation-alert {
  width: 100%;
}

.refresh {
  margin-left: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: flex-end;
}

</style>
