<template>
  <div>
    <SimpleDialog
        v-if="show"
        :show="show"
        title="version.new"
        :max-width="1024"
        @closeModal="closeModal(false)"
    >
      <div>
        <div v-if="newVersion">
          <div v-if="newVersionType === 'mandatory'" class="alert alert-danger-soft show mb-2 flex items-center justify-center" role="alert">New version available {{newVersion}}, you have {{oldVersion}}, this version is mandatory</div>
          <div v-if="newVersionType === 'recommended'" class="alert alert-warning-soft show mb-2 flex items-center justify-center" role="alert">New version available {{newVersion}}, you have {{oldVersion}}, this version is recommended</div>
          <div v-if="newVersionType === 'allowed'" class="alert alert-primary-soft show mb-2 flex items-center justify-center" role="alert">New version available {{newVersion}}, you have {{oldVersion}}</div>
        </div>

        <VersionDownload />
      </div>

      <div class="px-5 pt-5 text-center col-span-12" v-if="newVersionType !== 'mandatory'">
        <button class="btn btn-primary btn-lg ml-6" @click="closeModal(true)">{{ $t("version.ok") }}</button>
      </div>
    </SimpleDialog>
  </div>

</template>

<script>
import Trust1ConnectorService from '@/services/Trust1ConnectorService'
import DistributionService from '@/services/DistributionService'
import SimpleDialog from '@/components/UIComponents/SimpleDialog'
import VersionDownload from '@/components/core/VersionDownload'

export default {
  name: 'VersionCheck',
  components: {
    VersionDownload,
    SimpleDialog
  },
  data() {
    return {
      show: false,
      title: '',
      oldVersion: null,
      newVersion: null,
      newVersionType: null
    }
  },
  methods: {
    closeModal(confirmed) {
      if (this.newVersionType !== 'mandatory') {
        this.show = false
      }
    },
    checkVersion(client) {
      client.core().info().then(info => {
        DistributionService.getLatestVersion().then(dsRes => {
          if (info.t1CInfoAPI.version < dsRes.data.data.id) {
            this.oldVersion = info.t1CInfoAPI.version
            if (dsRes.data.data.mandatory) {
              this.show = true
              this.newVersion = dsRes.data.data.id
              this.newVersionType = 'mandatory'
            } else if (dsRes.data.data.recommended) {
              this.show = true
              this.newVersion = dsRes.data.data.id
              this.newVersionType = 'recommended'
            } else if (dsRes.data.data.allowed) {
              this.show = true
              this.newVersion = dsRes.data.data.id
              this.newVersionType = 'allowed'
            }
          }
        })
      })
    }
  },
  created() {
    if (Trust1ConnectorService.getErrorClient() || Trust1ConnectorService.getClient()) {
      if (Trust1ConnectorService.getClient()) {
        this.checkVersion(Trust1ConnectorService.getClient())
      }
    } else {
      Trust1ConnectorService.init().then(
        (res) => {
          this.checkVersion(res)
        },
        (err) => {
          this.checkVersion(err.client)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-top: 15px !important;
}

.installation-info-item p {
  font-weight: bold;
}
</style>
