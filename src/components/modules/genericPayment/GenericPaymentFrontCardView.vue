<template>
  <div class="card-container">
    <div class="card-content">
      <div class="chip">
        <img src="../../../assets/credit-card.svg" alt="Credit card chip" />
      </div>
      <div class="card-row">
        <div class="text-title">
          <p><i>Card number</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ constructCardNumber }}</p>
        </div>
      </div>
      <div class="card-row" v-if="applicationData.name">
        <div class="text-title">
          <p><i>Card number</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ applicationData.name }}</p>
        </div>
      </div>
      <div class="card-row">
        <div class="text-title">
          <p><i>Expires</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">
            {{ constructExpirationDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import * as _ from "lodash";

export default {
  name: "GenericPaymentFrontCardView",
  props: ["applicationData"],
  methods: {},
  computed: {
    constructCardNumber() {
      let cardNumber = "";
      _.forEach(this.applicationData.pan, (comp, idx) => {
        idx % 4 === 0 ? (cardNumber += " " + comp) : (cardNumber += comp);
      });
      return cardNumber;
    },

    constructExpirationDate() {
      return moment(this.applicationData.expirationDate, "YYMMDD").format(
        "DD/MM/YY"
      );
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: unset;
}

.chip {
  width: 60px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.chip img {
  width: 100%;
}

.text-title {
  width: 125px;
  margin-left: 50px;
}

.card-container {
  /*Ratio is 8/5*/
  width: 480px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 15px;
  position: relative;
  background-color: #d9d9d9;
  background-image: linear-gradient(135deg, #d9d9d9 0%, #f6f2f2 74%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.card-content {
  padding: 5px;
  margin-top: 35px;
}

.text-spacing {
  margin-left: 10px;
}

.card-row {
  margin-top: 5px;
  display: flex;
  line-height: 15px;
  margin-bottom: 30px;
}

.bold {
  font-weight: bold;
}
</style>
