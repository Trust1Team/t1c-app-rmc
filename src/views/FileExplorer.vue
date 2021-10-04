<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-6 m-auto">
      <pinpad />
    </div>
  </div>
</template>

<script>
import Pinpad from "../components/UIComponents/Pinpad";
export default {
  name: "FileExplorer",
  components:{
    Pinpad
  }
};
</script>
