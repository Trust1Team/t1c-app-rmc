<template>
  <div class="container">
    <div v-if="getConsent && getInstalled">
      <div v-if="error">
        <Error :text="error" />
      </div>
      <div v-if="pageView === 0">
        <ReadersList
          :unknown-modules-disabled="true"
          @readerSelected="readerSelected($event)"
        />
      </div>
      <div v-if="pageView === 1">
        <div class="pin-pad-container">
          <h1>Enter your pin/can to unlock the card</h1>
          <div class="pin-pad">
            <div class="form-check form-switch form-pace">
              <input
                class="form-check-input"
                type="checkbox"
                id="pinTypeSwitch"
                v-model="pinType"
              />
              <label class="form-check-label" for="pinTypeSwitch" v-if="pinType"
                >Can</label
              >
              <label
                class="form-check-label"
                for="pinTypeSwitch"
                v-if="!pinType"
                >Pin</label
              >
            </div>
            <pinpad @confirmPin="pinSelected"></pinpad>
          </div>
        </div>
      </div>
    </div>
    <Consent v-if="getInstalled && !getConsent" @consented="consented" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from '@/services/Trust1ConnectorService.js'
import ReadersList from '@/components/core/ReadersList'
import Consent from '@/components/core/Consent'
import Pinpad from '@/components/UIComponents/Pinpad'
import Error from '@/components/UIComponents/Error'

export default {
  name: 'Home',
  data() {
    return {
      pageView: 0,
      pinType: false,
      error: null
    }
  },
  methods: {
    installed() {
      this.resetError()
      this.$store.dispatch('setInstalled', true)
    },
    consented() {
      this.resetError()
      this.$store.dispatch('setConsent', true)
    },
    pinSelected(pin) {
      this.resetError()
      this.$store.dispatch('reader/setSelectedPin', pin).then(() => {
        this.$store
          .dispatch('reader/setSelectedPinType', this.pinType ? 'Can' : 'Pin')
          .then(() => {
            this.getAllData()
            this.$router.push({ name: 'side-menu-generic ' })
          })
      })
    },
    readerSelected(reader) {
      this.resetError()
      Trust1ConnectorService.getClient()
        .core()
        .readersCardAvailable()
        .then(
          (readerRes) => {
            if (readerRes.data.find((r) => r.id === reader.id)) {
              this.$store
                .dispatch('reader/setSelectedReader', reader)
                .then(() => {
                  // When a Pace enabled card then we show the pinpad view first
                  if (reader.card.modules.includes('luxeid')) {
                    this.pageView = 1
                  } else {
                    this.getAllData()
                    this.$router.push({ name: 'side-menu-generic' })
                  }
                })
            } else {
              console.error('Choosen reader could not be found anymore')
            }
          },
          () => {
            console.error('cannot select reader')
          }
        )
    },
    resetError() {
      this.error = null
    },
    getAllData() {
      this.resetError()
      this.$store.dispatch('card/resetState')
      if (this.getReader && this.getReader.id) {
        const module = this.getReader.card.modules
          ? this.getReader.card.modules[0]
          : null

        if (module != null) {
          Trust1ConnectorService.init().then(
            (client) => {
              let c = client.generic(
                this.getReader.id,
                this.getPin,
                this.getPinType
              )
              if (
                this.getReader.card.modules.includes('emv') ||
                this.getReader.card.modules.includes('crelan')
              ) {
                c = client.paymentGeneric(this.getReader.id)
                c.readData(module).then(
                  (allDataRes) => {
                    let certsFetched = 0
                    allDataRes.data.applications.forEach((app) => {
                      c.allCerts(module, app.aid).then(
                        (allCertsRes) => {
                          certsFetched += 1
                          this.$store
                            .dispatch('card/setPaymentCertificates', {
                              aid: app.aid,
                              data: allCertsRes.data
                            })
                            .then(() => {
                              if (
                                certsFetched ===
                                allDataRes.data.applications.length
                              ) {
                                this.$store.dispatch(
                                  'card/setCertificateLoading',
                                  false
                                )
                              }
                            })
                        },
                        (err) => {
                          this.error =
                            'Could not fetch allCerts: ' + err.description
                          console.error('Could not fetch allCerts', err)
                        }
                      )
                    })

                    this.$store.dispatch('card/setApplications', allDataRes)
                  },
                  (err) => {
                    this.error = 'Could not fetch alldata: ' + err.description
                    console.error('Could not fetch alldata', err)
                  }
                )
                c.readApplicationData(module).then(
                  (applicationDataRes) => {
                    this.$store
                      .dispatch('card/setApplicationData', applicationDataRes)
                      .then(() => {
                        this.$store.dispatch('card/setDataLoading', false)
                      })
                  },
                  (err) => {
                    this.error =
                      'Could not fetch readApplicationData: ' + err.description
                    console.error('Could not fetch readApplicationData', err)
                  }
                )
              } else {
                c.allData(module).then(
                  (allDataRes) => {
                    this.$store
                      .dispatch('card/setAllData', allDataRes)
                      .then(() => {
                        this.$store.dispatch('card/setDataLoading', false)
                      })
                  },
                  (err) => {
                    this.$store.dispatch('card/setDataLoading', false)
                    this.error = 'Could not fetch alldata: ' + err.description
                    console.error('Could not fetch alldata', err)
                  }
                )
                c.allCerts(module).then(
                  (allCertsRes) => {
                    this.$store
                      .dispatch('card/setAllCertificates', allCertsRes)
                      .then(() => {
                        this.$store.dispatch(
                          'card/setCertificateLoading',
                          false
                        )
                      })
                  },
                  (err) => {
                    this.$store.dispatch('card/setCertificateLoading', false)
                    this.error = 'Could not fetch allCerts: ' + err.description
                    console.error('Could not fetch allCerts', err)
                  }
                )
              }
            },
            (err) => {
              this.error = err.description
              console.error(err)
            }
          )
        } else {
          this.error = 'No module was found for selected reader'
          console.error('No module was found for selected reader')
        }
      }
    }
  },
  created() {
    this.resetError()
    Trust1ConnectorService.init().then(
      (res) => {
        this.installed()
        this.consented()
        Trust1ConnectorService.setClient(res)
        if (this.getReader) {
          this.getAllData()
          this.router.push({ name: 'side-menu-generic' })
        }
      },
      (err) => {
        if (err.code === '814501' || err.code === '814501') {
          this.installed()
          Trust1ConnectorService.setErrorClient(err.client)
        } else {
          this.$router.push({ name: 'side-menu-download' })
        }
      }
    )
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin']
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType']
    },
    getConsent() {
      return this.$store.getters.getConsent
    },
    getInstalled() {
      return this.$store.getters.getInstalled
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading']
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    }
  },
  components: {
    Pinpad,
    ReadersList,
    Consent,
    Error
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  margin-bottom: 40px;
}

.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}

.highlight {
  color: #e05512;
}

.go-back {
  width: 100%;
  display: flex;
}

.go-back-icon {
  transition: all 0.2s ease-in;
}

.go-back button:hover .go-back-icon {
  transform: translateX(-3px);
}

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.pin-pad-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.pin-pad-container h1 {
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: #dc623b;
}

.pin-pad {
  width: 300px;
}

.form-pace {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
}

.form-pace input {
  margin-right: 10px;
}
</style>
