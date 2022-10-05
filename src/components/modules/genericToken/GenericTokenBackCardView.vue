<template>
  <div class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black" v-if="biometric">
    <div class="card-content">
      <div class="card-row">
        <div>
          <p>
            <i>{{ $t("genericCardView.Identification number of the National Register") }}</i>
          </p>
          <p class="bold">{{ biometric.chipNumber }}</p>
        </div>
        <div class="barcode" v-if="biometric.nationalNumber && biometric.cardNumber">
          {{ biometric.nationalNumber }}{{ biometric.cardNumber.substr(3) }}
        </div>
      </div>

      <div class="card-row">
        <div>
          <p>
            <i>{{ $t("genericCardView.Place of issue") }}</i>
          </p>
          <p class="bold">{{ biometric.cardDeliveryMunicipality }}</p>
        </div>
      </div>

      <div class="card-row" v-if="mrz">
        <div class="machine-readable">
          <p>{{ mrz[0] }}</p>
          <p>{{ mrz[1] }}</p>
          <p>{{ mrz[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";

function pad(string) {
  return _.padEnd(_.truncate(string, { length: 30, omission: "" }), 30, "<");
}
function calculate(string) {
  const dict = {
    "<": 0,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
  };
  return (
    _.sum(
      _.map(
        _.map(string, (letter) => {
          return dict[letter.toUpperCase()];
        }),
        (val, index) => {
          let weighted = val;
          switch (index % 3) {
            case 0:
              weighted = val * 7;
              break;
            case 1:
              weighted = val * 3;
              break;
            case 2:
              break;
          }
          return weighted;
        }
      )
    ) % 10
  );
}

export default {
  name: "GenericTokenBackCardView",
  props: ["biometric", "picture"],
  data() {
    return {
      mrz: null,
    };
  },
  created() {
    this.mrz = this.constructMachineReadableStrings(this.biometric);
  },
  methods: {
    constructMachineReadableStrings(rnData) {
      const mrs = [];
      if (
        rnData.cardNumber &&
        rnData.sex &&
        rnData.nationality &&
        rnData.cardValidityDateEnd &&
        rnData.cardValidityDateBegin &&
        rnData.nationalNumber
      ) {
        // First line
        const prefix = "ID";
        let first = "BEL" + rnData.cardNumber.substr(0, 9) + "<" + rnData.cardNumber.substr(9);
        first += calculate(first);
        first = pad(prefix + first);
        mrs.push(first.toUpperCase());

        // Second line
        let second = rnData.nationalNumber.substr(0, 6);
        second += calculate(second);
        second += rnData.sex;
        const validity =
          rnData.cardValidityDateEnd.substr(8, 2) +
          rnData.cardValidityDateEnd.substr(3, 2) +
          rnData.cardValidityDateEnd.substr(0, 2);
        second += validity + calculate(validity);
        second += rnData.nationality.substr(0, 3);
        second += rnData.nationalNumber;
        const finalCheck =
          rnData.cardNumber.substr(0, 10) +
          rnData.nationalNumber.substr(0, 6) +
          validity +
          rnData.nationalNumber;
        second += calculate(finalCheck);
        second = pad(second);
        mrs.push(second.toUpperCase());

        // Third line
        let third =
          _.join(_.split(rnData.name, " "), "<") +
          "<<" +
          _.join(_.split(rnData.firstNames, " "), "<") +
          "<" +
          _.join(_.split(rnData.thirdName, " "), "<");
        third = pad(third);
        mrs.push(third.toUpperCase());
      }
      return mrs;
    },
  },
  computed: {},
};
</script>

<style scoped>
@font-face {
  font-family: "Libre Barcode 39";
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/librebarcode39/v14/-nFnOHM08vwC6h8Li1eQnP_AHzI2G_Bx0vrx52g.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F,
    U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

p {
  margin-bottom: unset;
}
.card-container {
  /*Ratio is 8/5*/
  width: 480px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 15px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.card-content {
  padding: 15px;
  font-size: 10px;
  /*margin-top: 15px;*/
}

.barcode {
  font-family: "Libre Barcode 39", cursive;
  transform: scale(1.55, 5.3);
  margin-top: 30px;
  margin-right: 25px;
}

.card-row {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  line-height: 15px;
}

.bold {
  font-weight: bold;
}

.machine-readable {
  margin-top: 90px;
  font-size: 1.5rem;
  line-height: 1;
  font-family: "OCR-B", monospace;
}
</style>
