<template>
  <div class="container">
    <div v-if="getConsent && getInstalled">
      <div v-if="pageView === 0">
        <ReadersList
          :unknown-modules-disabled="true"
          @readerSelected="readerSelected($event)"
        />
      </div>
      <div v-if="pageView === 1">
        <div class="go-back">
          <button @click="goBack()" class="btn btn-primary">
            <i class="fas fa-arrow-left go-back-icon"></i>
          </button>
        </div>

        <div class="loading">
          <Loading :show="getDataLoading"></Loading>
        </div>
        <ModuleSwitch />
      </div>
    </div>

    <Consent v-if="getInstalled && !getConsent" @consented="consented" />

    <Installation v-if="!getInstalled" />
  </div>
</template>

<script>
// @ is an alias to /src
import Trust1ConnectorService from "../services/Trust1ConnectorService";
import ReadersList from "../components/core/ReadersList";
import Consent from "../components/core/Consent";
import Installation from "../components/core/Installation";
import Loading from "../components/core/Loading";
import ModuleSwitch from "../components/modules/ModuleSwitch";
import DistributionService from "../services/DistributionService";

export default {
  name: "Home",
  data() {
    return {
      pageView: 0,
    };
  },
  methods: {
    installed() {
      this.$store.dispatch("setInstalled", true);
    },
    consented() {
      this.$store.dispatch("setConsent", true);
    },
    readerSelected(reader) {
      Trust1ConnectorService.getClient()
        .core()
        .readersCardAvailable()
        .then(
          (readerRes) => {
            const foundReader = readerRes.data.find((r) => r.id === reader.id);
            if (foundReader && foundReader.card && foundReader.card.modules) {
              this.$store
                .dispatch("reader/setSelectedReader", foundReader)
                .then(() => {
                  this.getAllData();
                  this.pageView = 1;
                });
            } else {
              console.error("Choosen reader could not be found anymore");
            }
          },
          () => {
            console.error("cannot select reader");
          }
        );
    },
    goBack() {
      this.pageView = 0;
    },
    getAllData() {
      this.$store.dispatch("card/resetState");
      if (this.getReader && this.getReader.id) {
        const module = this.getReader.card.modules
          ? this.getReader.card.modules[0]
          : "beid";

        Trust1ConnectorService.init().then(
          (client) => {
            // TODO this is a bit dirty, cleanup later
            let c = client.generic(this.getReader.id);
            if (
              this.getReader.card.modules.includes("emv") ||
              this.getReader.card.modules.includes("crelan")
            ) {
              c = client.paymentGeneric(this.getReader.id);
              c.readData(module).then(
                (allDataRes) => {
                  let certsFetched = 0;
                  allDataRes.data.applications.forEach((app) => {
                    c.allCerts(module, app.aid).then(
                      (allCertsRes) => {
                        certsFetched += 1;
                        this.$store
                          .dispatch("card/setPaymentCertificates", {
                            aid: app.aid,
                            data: allCertsRes.data,
                          })
                          .then(() => {
                            if (
                              certsFetched ===
                              allDataRes.data.applications.length
                            ) {
                              this.$store.dispatch(
                                "card/setCertificateLoading",
                                false
                              );
                            }
                          });
                      },
                      (err) => {
                        console.error("Could not fetch allCerts", err);
                      }
                    );
                  });

                  this.$store.dispatch("card/setApplications", allDataRes);
                },
                (err) => {
                  console.error("Could not fetch alldata", err);
                }
              );
              c.readApplicationData(module).then(
                (applicationDataRes) => {
                  this.$store
                    .dispatch("card/setApplicationData", applicationDataRes)
                    .then(() => {
                      this.$store.dispatch("card/setDataLoading", false);
                    });
                },
                (err) => {
                  console.error("Could not fetch readApplicationData", err);
                }
              );
            } else {
              c.allData(module).then(
                (allDataRes) => {
                  this.$store
                    .dispatch("card/setAllData", allDataRes)
                    .then(() => {
                      this.$store.dispatch("card/setDataLoading", false);
                    });
                },
                (err) => {
                  console.error("Could not fetch alldata", err);
                }
              );
              c.allCerts(module).then(
                (allCertsRes) => {
                  this.$store
                    .dispatch("card/setAllCertificates", allCertsRes)
                    .then(() => {
                      this.$store.dispatch("card/setCertificateLoading", false);
                    });
                },
                (err) => {
                  console.error("Could not fetch allCerts", err);
                }
              );
            }
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
  },
  created() {
    Trust1ConnectorService.init().then(
      (res) => {
        this.installed();
        this.consented();
        Trust1ConnectorService.setClient(res);
        if (this.getReader) {
          this.getAllData();
          this.pageView = 1;
        }
      },
      (err) => {
        console.log(err);
        if (err !== 12999) {
          this.installed();
        }
        Trust1ConnectorService.setErrorClient(err.client);
      }
    );

    DistributionService.getLatestVersion().then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
  computed: {
    getReader() {
      return this.$store.getters["reader/getSelectedReader"];
    },
    getConsent() {
      return this.$store.getters["getConsent"];
    },
    getInstalled() {
      return this.$store.getters["getInstalled"];
    },
    getDataLoading() {
      return this.$store.getters["card/getDataLoading"];
    },
    getCertificateLoading() {
      return this.$store.getters["card/getCertificateLoading"];
    },
  },
  components: { ReadersList, Consent, ModuleSwitch, Loading, Installation },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
