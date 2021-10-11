<template>
  <div class="readers-header" v-if="!readers && !loading">
    <h1>{{ $t("readersList.Connect your Reader") }}</h1>
    <p>
      {{ $t("readersList.Please connect your") }}
      <b>{{ $t("readersList.smartcard reader") }}</b>
      {{ $t("readersList.to your computer") }}.
    </p>
    <p>{{ $t("readersList.detectMessage") }}</p>
  </div>

  <div class="readers-header" v-if="readers && readers.length > 0 && !loading">
    <h1>{{ $t("readersList.Choose your Reader") }}</h1>
    <p>{{ $t("readersList.askToSelect") }}</p>
  </div>

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
        <span v-if="reader.card.modules" @click="copyAtr(reader)">{{
          reader.card.modules[0]
        }}</span>
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
      <div
        v-if="!unknownModulesDisabled"
        @click="selectReader(reader)"
        class="reader-select"
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 30.051 30.051"
          style="enable-background: new 0 0 30.051 30.051"
          xml:space="preserve"
          class="next-svg"
        >
          <g>
            <path
              d="M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069
		c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532
		c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z"
            />
            <path
              d="M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021
		C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518
		c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z"
            />
          </g>
        </svg>
      </div>
      <div
        v-if="unknownModulesDisabled"
        @click="selectReader(reader)"
        class="reader-select"
        v-bind:class="{ readerDisabled: !reader.card.modules }"
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 30.051 30.051"
          style="enable-background: new 0 0 30.051 30.051"
          xml:space="preserve"
          class="next-svg"
        >
          <g>
            <path
              d="M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069
		c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532
		c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z"
            />
            <path
              d="M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021
		C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518
		c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";
import Loading from "./Loading";
import copyMixin from "@/mixins/copyMixin"

export default {
  name: "ReadersList",
  props: {
    unknownModulesDisabled: Boolean,
  },
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
            .readersCardAvailable()
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
    selectReader(reader) {
      if (reader.card.modules) {
        this.$emit("readerSelected", reader);
      }
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
  mixins: [copyMixin]
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

.reader-item:hover {
  border-bottom: 5px solid #dddddd;
}

.reader-name {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 390px);
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
.reader-select {
  margin-left: 30px;
  margin-right: 10px;
  width: 70px;
}

.readers-container {
  margin-top: 50px;
  width: 100%;
}

.readers-header {
  text-align: center;
}

.readers-header h1 {
  color: #d74112;
}

.next-svg {
  width: 30px;
}

.next-svg:hover {
  cursor: pointer;
  fill: #d24d0d;
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

.readerDisabled svg {
  fill: lightgray;
}
.readerDisabled:hover svg {
  fill: lightgray;
  cursor: not-allowed;
}
</style>
