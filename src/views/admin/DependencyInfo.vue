<template>
  <div class="refresh">
    <button @click="fetchDependencies()" class="btn btn-primary">
      <i class="fas fa-sync-alt refresh-icon"></i>
    </button>
  </div>

  <div class="status-container">
    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t("admin.dependencyInfo.t1cApi") }}
      </div>
      <div class="status-item-icon">
        <div class="loading" v-if="!t1c">
          <Loading :size="30" :show="t1c"></Loading>
        </div>
        <div v-if="t1c">
          <i v-if="t1c.error" class="fas fa-exclamation-circle fa-2x red"></i>
          <i
            v-if="t1c.warning"
            class="fas fa-exclamation-triangle fa-2x yellow"
          ></i>
          <i v-if="t1c.success" class="fas fa-check-circle fa-2x green"></i>
        </div>
      </div>
    </div>

    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t("admin.dependencyInfo.validationService") }}
      </div>
      <div class="status-item-icon">
        <div class="loading" v-if="!validation">
          <Loading :size="30" :show="validation"></Loading>
        </div>
        <div v-if="validation">
          <i
            v-if="validation.error"
            class="fas fa-exclamation-circle fa-2x red"
          ></i>
          <i
            v-if="validation.warning"
            class="fas fa-exclamation-triangle fa-2x yellow"
          ></i>
          <i
            v-if="validation.success"
            class="fas fa-check-circle fa-2x green"
          ></i>
        </div>
      </div>
    </div>

    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t("admin.dependencyInfo.distributionServer") }}
      </div>
      <div class="status-item-icon">
        <div class="loading" v-if="!ds">
          <Loading :size="30" :show="ds"></Loading>
        </div>
        <div v-if="ds">
          <i v-if="ds.error" class="fas fa-exclamation-circle fa-2x red"></i>
          <i
            v-if="ds.warning"
            class="fas fa-exclamation-triangle fa-2x yellow"
          ></i>
          <i v-if="ds.success" class="fas fa-check-circle fa-2x green"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DistributionService from '../../services/DistributionService'
import Loading from '../../components/core/Loading'
import ValidationService from '../../services/ValidationService'
import Trust1ConnectorService from '../../services/Trust1ConnectorService'

export default {
  name: 'DependencyInfo',
  data() {
    return {
      ds: null,
      validation: null,
      t1c: null
    }
  },
  methods: {
    fetchDependencies() {
      this.ds = null
      this.t1c = null
      this.validation = null

      Trust1ConnectorService.init().then(
        (client) => {
          client
            .core()
            .info()
            .then(
              (res) => {
                if (res.t1CInfoAPI.status === 'ACTIVATED') {
                  this.t1c = {
                    error: false,
                    success: true,
                    warning: false
                  }
                } else {
                  this.t1c = {
                    error: false,
                    success: false,
                    warning: true
                  }
                }
              },
              (err) => {
                this.t1c = {
                  error: false,
                  success: false,
                  warning: true
                }
                console.log(err)
              }
            )
        },
        (err) => {
          this.t1c = {
            error: true,
            success: false,
            warning: false
          }
          console.error(err)
        }
      )

      ValidationService.getStatus().then(
        () => {
          this.validation = {
            error: false,
            success: true,
            warning: false
          }
        },
        (err) => {
          this.validation = {
            error: true,
            success: false,
            warning: false
          }
          console.error(err)
        }
      )

      DistributionService.getSystemInfo().then(
        (res) => {
          if (res.data.data.isAlive) {
            this.ds = {
              error: false,
              success: true,
              warning: false
            }
          } else {
            this.ds = {
              error: false,
              success: false,
              warning: true
            }
          }
        },
        (err) => {
          this.ds = {
            error: true,
            success: false,
            warning: false
          }
          console.error(err)
        }
      )
    }
  },
  created() {
    this.fetchDependencies()
  },
  components: { Loading }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.status-container {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 50px;
}

.status-item-service {
  font-weight: bold;
  margin-left: 20px;
}

.status-item-icon {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.loading {
  height: 30px;
}

.status-item {
  padding: 0 15px;
  width: 100%;
  height: 60px;
  align-items: center;
  border: 1px solid #cdcdcd;
  border-top: none;
  display: flex;
  justify-content: space-between;
}

.status-item:first-of-type {
  border-top: 1px solid #cdcdcd;
  border-radius: 10px 10px 0 0;
}

.status-item:last-of-type {
  border-top: none;
  border-radius: 0 0 10px 10px;
}

.intro-x:nth-child(2) {
  border-radius: 0px;
}

.green {
  color: #31a24c;
}

.red {
  color: crimson;
}

.yellow {
  color: #fadb01;
}

.refresh {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.refresh-icon {
  transition: all 0.2s ease-in;
}

.refresh button:hover .refresh-icon {
  transform: rotate(180deg);
}
</style>
