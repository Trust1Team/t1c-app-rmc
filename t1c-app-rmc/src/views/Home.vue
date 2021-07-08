<template>
  <div class="container">
    <h1>Trust1Connector</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { onMounted } from "vue";
import Trust1ConnectorService from "../services/Trust1ConnectorService";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    // mounted
    onMounted(() => {
      console.log("Component is mounted!");
      Trust1ConnectorService.init().then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  },
};
</script>
