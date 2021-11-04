<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-6 m-auto">
      <SpanishDNIe :card-info="cardInfo" />
    </div>
  </div>
</template>

<script>
import SpanishDNIe from "../components/modules/espana/SpanishDNIe";
export default {
  name: "FileExplorer",
  components: {
    SpanishDNIe,
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
