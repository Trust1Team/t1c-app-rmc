<template>
  <div class="btn-group">
    <button
      class="btn btn-secondary btn-lg dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="getReaders"
    >
      Selected reader
    </button>
    <ul class="dropdown-menu">
      <li v-for="reader in readers" v-bind:key="reader.id">
        <a class="dropdown-item" href="#">{{ reader.name }}</a>
      </li>
    </ul>
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
      if (Trust1ConnectorService.getClient() != null) {
        Trust1ConnectorService.getClient()
          .core()
          .readersCardAvailable()
          .then(
            (res) => {
              console.log(res.data);
              this.readers = res.data;
            },
            (err) => {
              console.log(err);
            }
          );
      }
    },
  },
  mounted() {
    if (Trust1ConnectorService.getClient() != null) {
      Trust1ConnectorService.getClient()
        .core()
        .readersCardAvailable()
        .then(
          (res) => {
            console.log(res.data);
            this.readers = res.data;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
