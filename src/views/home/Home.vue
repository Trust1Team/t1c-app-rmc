<template>
  <div v-if="loading" class="flex justify-center my-8">
    <LoadingIcon icon="puff" :size="50" />
  </div>
  <div v-if="!loading" class="container">
    <VersionCheck />

    <div v-if="consent && isInstalled">
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
    <Consent v-if="isInstalled && !consent" @consented="consented" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted } from 'vue';
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
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const selectedReader = computed(() => store.getters['reader/getSelectedReader']);
    const selectedPin = computed(() => store.getters['reader/getSelectedPin']);
    const selectedPinType = computed(() => store.getters['reader/getSelectedPinType']);
    const consent = computed(() => store.getters['config/getConsent']);
    const isInstalled = computed(() => store.getters['config/getInstalled']);

    const loading = ref(false);
    const pageView = ref(0);
    const pinType = ref(false);
    const error = ref();

    const resetError = () => {
      error.value = null;
    };

    const returnToStart = () => {
      resetError();
      pageView.value = 0;
    };

    const installed = () => {
      resetError();
      store.dispatch('setInstalled', true);
    };

    const consented = () => {
      resetError();
      store.dispatch('setConsent', true);
    };

    const getTokenCertificates = () => {
      return new Promise((resolve, reject) => {
        if (selectedReader.value && selectedReader.value.card && selectedReader.value.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.generic(selectedReader.value.id, selectedPin.value, selectedPinType.value);
          c.allCerts(selectedReader.value.card.modules[0]).then(
            (allCertsRes) => {
              store.dispatch('card/setAllCertificates', allCertsRes).then(() => {
                store.dispatch('card/setCertificateLoading', false);
                return resolve();
              });
            },
            (err) => {
              error.value = t('home.certificates.error.fetch', [err.description]);
              console.error(err);
              store.dispatch('card/setCertificateLoading', false).then(() => {
                return reject(err);
              });
            },
          );
        } else {
          error.value = t('home.error.nomodule');
          store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(t('home.error.nomodule'));
          });
        }
      });
    };

    const getTokenAllData = () => {
      return new Promise((resolve, reject) => {
        if (selectedReader.value && selectedReader.value.card && selectedReader.value.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.generic(selectedReader.value.id, selectedPin.value, selectedPinType.value);

          c.allData(selectedReader.value.card.modules[0]).then(
            (allDataRes) => {
              store.dispatch('card/setAllData', allDataRes).then(() => {
                store.dispatch('card/setDataLoading', false);
                return resolve();
              });
            },
            (err) => {
              error.value = t('home.data.error.fetch', [err.description]);
              console.error(err);
              store.dispatch('card/setDataLoading', false).then(() => {
                return reject(err);
              });
            },
          );
        } else {
          error.value = t('home.error.nomodule');
          store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(t('home.error.nomodule'));
          });
        }
      });
    };

    const pinSelected = () => {
      resetError();
      loading.value = true;
      Promise.all([getTokenAllData(), getTokenCertificates()])
        .then(() => {
          loading.value = false;
          router.push({ name: 'side-menu-generic' });
        })
        .catch((err) => {
          loading.value = false;
          console.error(err);
        });
    };

    const getPaymentAllData = () => {
      return new Promise((resolve, reject) => {
        if (selectedReader.value && selectedReader.value.card && selectedReader.value.card.modules) {
          const client = Trust1ConnectorService.getClient();
          const c = client.paymentGeneric(selectedReader.value.id);
          c.readApplicationData(selectedReader.value.card.modules[0]).then(
            (applicationDataRes) => {
              store.dispatch('card/setApplicationData', applicationDataRes).then(() => {
                store.dispatch('card/setDataLoading', false);
                c.readData(selectedReader.value.card.modules[0]).then(
                  (allDataRes) => {
                    let certsFetched = 0;
                    allDataRes.data.applications.forEach((app) => {
                      c.allCerts(selectedReader.value.card.modules[0], app.aid).then(
                        (allCertsRes) => {
                          certsFetched += 1;
                          store
                            .dispatch('card/setPaymentCertificates', {
                              aid: app.aid,
                              data: allCertsRes.data,
                            })
                            .then(() => {
                              if (certsFetched === allDataRes.data.applications.length) {
                                store.dispatch('card/setCertificateLoading', false);
                              }
                            });
                        },
                        (err) => {
                          error.value = t('home.certificates.error.fetch', [err.description]);
                          console.error(err);
                          return reject(err);
                        },
                      );
                    });
                    store.dispatch('card/setApplications', allDataRes);
                    return resolve();
                  },
                  (err) => {
                    error.value = t('home.data.error.fetch', [err.description]);
                    console.error(err);
                    return reject(err);
                  },
                );
              });
            },
            (err) => {
              error.value = t('home.data.error.fetch', [err.description]);
              console.error(err);
              return reject(err);
            },
          );
        } else {
          error.value = t('home.error.nomodule');
          store.dispatch('card/setCertificateLoading', false).then(() => {
            return reject(t('home.error.nomodule'));
          });
        }
      });
    };

    const readerSelected = () => {
      loading.value = true;
      const reader = selectedReader.value;
      if (reader) {
        if (selectedReader.value.card.modules.includes('emv') || selectedReader.value.card.modules.includes('crelan')) {
          // EMV token
          Promise.all([getPaymentAllData()])
            .then(() => {
              loading.value = false;
              router.push({ name: 'side-menu-generic' });
            })
            .catch((err) => {
              loading.value = false;
              console.error(err);
            });
        } else if (selectedReader.value.card.modules.includes('luxeid')) {
          // PACE enabled token
          loading.value = false;
          pageView.value = 1;
        } else {
          // Regular tokens without PACE
          Promise.all([getTokenAllData(), getTokenCertificates()])
            .then(() => {
              loading.value = false;
              router.push({ name: 'side-menu-generic' });
            })
            .catch((err) => {
              loading.value = false;
              console.error(err);
            });
        }
      } else {
        error.value = t('home.error.noreader');
      }
    };

    onMounted(() => {
      resetError();
      if (Trust1ConnectorService.getErrorClient() || Trust1ConnectorService.getClient()) {
        installed();
        if (Trust1ConnectorService.getClient()) consented();
      } else {
        Trust1ConnectorService.init().then(
          (res) => {
            installed();
            consented();
            Trust1ConnectorService.setClient(res);
          },
          (err) => {
            if (err.code === '814500' || err.code === '814501') {
              installed();
              Trust1ConnectorService.setErrorClient(err.client);
            } else {
              router.push({ name: 'side-menu-download' });
            }
          },
        );
      }
    });

    return {
      loading,
      pageView,
      pinType,
      error,
      consent,
      isInstalled,
      readerSelected,
      pinSelected,
    };
  },
};
</script>

<style src="./Home.style.css" scoped />
