<template>
  <div class="readers-header" v-if="!readers">
    <h1>Connect your Reader</h1>
    <p> Please connect your <b>smartcard reader</b> to your computer.</p>
    <p>Once it is connected, this page will automatically detect it</p>

  </div>

  <div class="readers-header" v-if="readers">
    <h1>Choose your Reader</h1>
    <p v-if="readers">Please select the reader you want to use</p>
  </div>

  <div class="readers-container">
    <div
      v-for="reader in readers"
      v-bind:key="reader.id"
      class="reader-item"
    >
      <div class="reader-name">
        {{ reader.name }}
      </div>
      <div>
        {{ reader.card.modules[0] }}
      </div>
      <div>
        {{ reader.pinpad }}
      </div>
      <div @click="selectReader(reader.id)">
        Select
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from "../../services/Trust1ConnectorService";

export default {
  name: "ReadersList",
  data() {
    return {
      readers: null,
    };
  },
  methods: {
    getReaders() {
      console.log("Get readers");
      Trust1ConnectorService.init().then(
        (client) => {
          client
            .core()
            .readersCardAvailable()
            .then(
              (res) => {
                this.readers = res.data;
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.error(err);
        }
      );
    },
    selectReader(readerId) {
      console.log(readerId);
    },
    copyAtr() {

    },
    copyReaderName() {

    }
  },
  created() {
    this.getReaders();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.reader-item {
  background-color: #F0F0F0;
  border-radius: 10px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

.reader-name {
  font-weight: bold;
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
</style>
