<template>
  <div v-if="loading" class="flex justify-center my-8">
    <LoadingIcon icon="puff" :size="50" />
  </div>
  <div v-if="!loading" class="container">
    <VersionCheck />

    <div v-if="getConsent && getInstalled">
      <div v-if="error">
        <Error :text="error" />
      </div>
      <div v-if="pageView === 0">
        <ReaderList @readerSelected="readerSelected" />
      </div>
      <div v-if="pageView === 1">
        <div class="return">
          <button class="btn btn-primary" @click="returnToStart()">
            <i class="fas fa-arrow-left" />
          </button>
        </div>
        <PinPad @pinSelected="pinSelected" />
      </div>
    </div>
    <Consent v-if="getInstalled && !getConsent" @consented="consented" />
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { Consent } from '@/components/core';
import { Error, LoadingIcon } from '@/components/UIComponents';
import VersionCheck from '@/views/admin/components/VersionCheck';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import ReaderList from './components/ReaderList';
import PinPad from './components/PinPad';

export default {
  name: 'Home',
  components: {
    VersionCheck,
    PinPad,
    ReaderList,
    Consent,
    Error,
    LoadingIcon,
  },
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  data() {
    return {
      loading: false,
      pageView: 0,
      pinType: false,
      error: null,
    };
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin'];
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType'];
    },
    getConsent() {
      return this.$store.getters['config/getConsent'];
    },
    getInstalled() {
      return this.$store.getters['config/getInstalled'];
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading'];
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
  },
  created() {
    this.resetError();
    if (Trust1ConnectorService.getErrorClient() || Trust1ConnectorService.getClient()) {
      this.installed();
      if (Trust1ConnectorService.getClient()) this.consented();
    } else {
      Trust1ConnectorService.init().then(
        (res) => {
          this.installed();
          this.consented();
          Trust1ConnectorService.setClient(res);
        },
        (err) => {
          if (err.code === '814500' || err.code === '814501') {
            this.installed();
            Trust1ConnectorService.setErrorClient(err.client);
          } else {
            this.$router.push({ name: 'side-menu-download' });
          }
        },
      );
    }
  },
  methods: {
    returnToStart() {
      this.resetError();
      this.pageView = 0;
    },
    installed() {
      this.resetError();
      this.$store.dispatch('setInstalled', true);
    },
    consented() {
      this.resetError();
      this.$store.dispatch('setConsent', true);
    },
    pinSelected() {
      this.resetError();
      this.loading = true;
      Promise.all([this.getTokenAllData(), this.getTokenCertificates()])
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'side-menu-generic' });
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    readerSelected() {
      this.loading = true;
      const reader = this.getReader;
      if (reader) {
        if (this.getReader.card.modules.includes('emv') || this.getReader.card.modules.includes('crelan')) {
          // EMV token
          Promise.all([this.getPaymentAllData()])
            .then(() => {
              this.loading = false;
              this.$router.push({ name: 'side-menu-generic' });
            })
            .catch((err) => {
              this.loading = false;
              console.error(err);
            });
        } else if (this.getReader.card.modules.includes('luxeid')) {
          // PACE enabled token
          this.loading = false;
          this.pageView = 1;
        } else {
          // Regular tokens without PACE
          Promise.all([this.getTokenAllData(), this.getTokenCertificates()])
            .then(() => {
              this.loading = false;
              this.$router.push({ name: 'side-menu-generic' });
            })
            .catch((err) => {
              this.loading = false;
              console.error(err);
            });
        }
      } else {
        this.error = this.$t('home.error.noreader');
      }
    },
    resetError() {
      this.error = null;
    },
    getTokenCertificates() {
      return new Promise((resolve, reject) => {
        if (this.getReader && this.getReader.card && this.getReader.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.generic(this.getReader.id, this.getPin, this.getPinType);
          c.allCerts(this.getReader.card.modules[0]).then(
            (allCertsRes) => {
              this.$store.dispatch('card/setAllCertificates', allCertsRes).then(() => {
                this.$store.dispatch('card/setCertificateLoading', false);
                return resolve();
              });
            },
            (err) => {
              this.error = this.$t('home.certificates.error.fetch', [err.description]);
              console.error(err);
              this.$store.dispatch('card/setCertificateLoading', false).then(() => {
                return reject(err);
              });
            },
          );
        } else {
          this.error = this.$t('home.error.nomodule');
          this.$store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(this.$t('home.error.nomodule'));
          });
        }
      });
    },
    getTokenAllData() {
      return new Promise((resolve, reject) => {
        if (this.getReader && this.getReader.card && this.getReader.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.generic(this.getReader.id, this.getPin, this.getPinType);
          c.allData(this.getReader.card.modules[0]).then(
            (allDataRes) => {
              this.$store.dispatch('card/setAllData', allDataRes).then(() => {
                this.$store.dispatch('card/setDataLoading', false);
                return resolve();
              });
            },
            (err) => {
              this.error = this.$t('home.data.error.fetch', [err.description]);
              console.error(err);
              this.$store.dispatch('card/setDataLoading', false).then(() => {
                return reject(err);
              });
            },
          );
        } else {
          this.error = this.$t('home.error.nomodule');
          this.$store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(this.$t('home.error.nomodule'));
          });
        }
      });
    },
    getPaymentCertificates() {
      return new Promise((resolve, reject) => {
        if (this.getReader && this.getReader.card && this.getReader.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.paymentGeneric(this.getReader.id);
          c.allCerts(this.getReader.card.modules[0]).then(
            (allCertsRes) => {
              this.$store.dispatch('card/setAllCertificates', allCertsRes).then(() => {
                this.$store.dispatch('card/setCertificateLoading', false);
                return resolve();
              });
            },
            (err) => {
              this.error = this.$t('home.certificates.error.fetch', [err.description]);
              console.error(err);
              this.$store.dispatch('card/setCertificateLoading', false).then(() => {
                return reject(err);
              });
            },
          );
        } else {
          this.error = this.$t('home.error.nomodule');
          this.$store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(this.$t('home.error.nomodule'));
          });
        }
      });
    },
    getPaymentAllData() {
      return new Promise((resolve, reject) => {
        if (this.getReader && this.getReader.card && this.getReader.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.paymentGeneric(this.getReader.id);
          c.readApplicationData(this.getReader.card.modules[0]).then(
            (applicationDataRes) => {
              this.$store.dispatch('card/setApplicationData', applicationDataRes).then(() => {
                this.$store.dispatch('card/setDataLoading', false);
                c.readData(this.getReader.card.modules[0]).then(
                  (allDataRes) => {
                    let certsFetched = 0;
                    allDataRes.data.applications.forEach((app) => {
                      c.allCerts(this.getReader.card.modules[0], app.aid).then(
                        (allCertsRes) => {
                          certsFetched += 1;
                          this.$store
                            .dispatch('card/setPaymentCertificates', {
                              aid: app.aid,
                              data: allCertsRes.data,
                            })
                            .then(() => {
                              if (certsFetched === allDataRes.data.applications.length) {
                                this.$store.dispatch('card/setCertificateLoading', false);
                              }
                            });
                        },
                        (err) => {
                          this.error = this.$t('home.certificates.error.fetch', [err.description]);
                          console.error(err);
                          return reject(err);
                        },
                      );
                    });
                    this.$store.dispatch('card/setApplications', allDataRes);
                    return resolve();
                  },
                  (err) => {
                    this.error = this.$t('home.data.error.fetch', [err.description]);
                    console.error(err);
                    return reject(err);
                  },
                );
              });
            },
            (err) => {
              this.error = this.$t('home.data.error.fetch', [err.description]);
              console.error(err);
              return reject(err);
            },
          );
        } else {
          this.error = this.$t('home.error.nomodule');
          this.$store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(this.$t('home.error.nomodule'));
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.pin-pad-container h1 {
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: #dc623b;
}
</style>
