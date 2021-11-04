<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-6 m-auto">
      <LuxembourgID :card-info="cardInfo" />
    </div>
  </div>
</template>

<script>
import LuxembourgID from "../components/modules/luxembourg/LuxembourgID";
export default {
  name: "FileExplorer",
  components: {
    LuxembourgID,
  },
  data() {
    return {
      cardInfo: {
        name: "Jhon Doe",
        sex: "M",
        nationality: "ESP",
        birthDate: "01 01 1980",
        cardNumber: "BAA000972",
        validUntil: "01 01 2025",
        dni: "99999999R",
        secret: "987654"
      }
    }
  }
};
</script>
