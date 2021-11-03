<template>
  <div>
    <h1>{{ $t("fileExplorer.File explorer") }}</h1>
    <div class="col-4 m-auto">
      <EuropeMastercardVisa :card-info="cardInfo"/>
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
  data() {
    return {
      cardInfo: {
        bankName: "CIB",
        cardNumber: "1234 5678 9876 5432",
        cvv: "1234",
        validThru: "12/99",
        cardHolder: "JHON DOE JHON DOE",
      }
    }
  }
};
</script>
