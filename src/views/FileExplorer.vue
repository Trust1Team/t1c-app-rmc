<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-6 m-auto">
      <BelgiumLawyer :card-info="cardInfo" />
    </div>
  </div>
</template>

<script>
import BelgiumLawyer from "../components/modules/belgiumLawyer/BelgiumLawyer";
export default {
  name: "FileExplorer",
  components: {
    BelgiumLawyer,
  },
  data() {
    return {
      cardInfo: {
        name: "Jhon Doe",
        givenName: "Jhon Doe",
        validUntil: "02.04.2017"
      }
    }
  }
};
</script>
