<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-4 m-auto">
      <EuropeMastercardVisa />
    </div>
  </div>
</template>

<script>
import EuropeMastercardVisa from "../components/modules/paymentModules/EuropeMastercardVisa";
export default {
  name: "FileExplorer",
  components: {
    EuropeMastercardVisa,
  },
};
</script>
