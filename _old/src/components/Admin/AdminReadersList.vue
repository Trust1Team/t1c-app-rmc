<template>
  <div
    class="readers-header"
    v-if="readers && readers.length === 0 && !loading"
  >
    <h1>{{ $t("readersList.readersNotFound") }}</h1>
    <p>{{ $t("readersList.askToConnect") }}</p>
  </div>

  <div class="refresh">
    <button @click="getReaders()" class="btn btn-primary" :disabled="loading">
      <i class="fas fa-sync-alt refresh-icon"></i>
    </button>
  </div>

  <div class="loading">
    <Loading :show="loading" />
  </div>

  <div class="readers-container" v-if="readers && readers.length > 0">
    <div v-for="reader in readers" v-bind:key="reader.id" class="reader-item">
      <div @click="copyReaderId(reader)" class="reader-name">
        {{ reader.name }}
      </div>
      <div class="reader-module">
        <span
          v-if="reader.card && reader.card.modules"
          @click="copyAtr(reader)"
          >{{ reader.card.modules[0] }}</span
        >
        <span v-else>{{ $t("readersList.No module detected") }}</span>
      </div>
      <div class="reader-pinpad">
        <span
          v-bind:class="{
            isPinpad: reader.pinpad,
            isNotPinpad: !reader.pinpad,
          }"
        >
          <i class="fas fa-keyboard"></i>
        </span>
      </div>
      <div class="reader-card">
        <span
          v-bind:class="{
            hasCard: reader.card,
            hasNoCard: !reader.card,
          }"
        >
          <i class="far fa-id-card"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";
import Loading from "../core/Loading";
import copyMixin from "@/mixins/copyMixin";

export default {
  name: "AdminReadersList",
  data() {
    return {
      readers: null,
      loading: true,
    };
  },
  emits: ["readerSelected"],
  methods: {
    getReaders() {
      this.readers = null;
      this.loading = true;
      Trust1ConnectorService.init().then(
        (client) => {
          client
            .core()
            .readers()
            .then(
              (res) => {
                this.loading = false;
                this.readers = res.data;
              },
              (err) => {
                this.loading = false;
                console.log(err);
              }
            );
        },
        (err) => {
          this.loading = false;
          console.error(err);
        }
      );
    },
    copyAtr(reader) {
      this.copyTextToClipboard(reader.card.atr);
    },
    copyReaderId(reader) {
      this.copyTextToClipboard(reader.id);
    },
  },
  created() {
    this.getReaders();
  },
  components: { Loading },
  mixins: [copyMixin],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reader-item {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 0 15px;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 5px solid #f0f0f0;
}

.reader-name {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 340px);
}

.reader-module {
  margin-left: 10px;
  margin-right: 10px;
  width: 300px;
}

.reader-pinpad {
  margin-left: 10px;
  margin-right: 10px;
  width: 20px;
}

.reader-card {
  margin-left: 10px;
  margin-right: 10px;
  width: 20px;
}

.readers-container {
  margin-top: 10px;
  margin-bottom: 50px;
  width: 100%;
}

.readers-header {
  text-align: center;
}

.readers-header h1 {
  color: #d74112;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.isPinpad {
  color: #8dc63f;
}

.isNotPinpad {
  color: #ff0000;
}

.hasCard {
  color: #8dc63f;
}

.hasNoCard {
  color: #ff0000;
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

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}
</style>
