<template>
  <div v-if="biometric" class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black">
    <div class="card-content">
      <div class="card-row">
        <div>
          <p><i>Identificatienummer van het Rijksregister</i></p>
          <p><i>Identification number of the National Register</i></p>
          <p class="bold">
            {{
              `${biometric.nationalNumber.substr(0, 2)}.${biometric.nationalNumber.substr(
                4,
                2,
              )}-${biometric.nationalNumber.substr(6, 3)}.${biometric.nationalNumber.substr(9, 2)}`
            }}
          </p>
        </div>
        <div class="barcode">{{ biometric.nationalNumber }}{{ biometric.cardNumber.substr(3) }}</div>
      </div>

      <div class="card-row">
        <div>
          <p><i>Plaats van afgifte/Place of issue</i></p>
          <p class="bold">{{ biometric.cardDeliveryMunicipality }}</p>
        </div>
      </div>

      <div v-if="mrz" class="card-row">
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
import { computed } from 'vue';
import { padEnd, truncate, sum, map, join, split } from 'lodash';

const pad = (string) => {
  return padEnd(truncate(string, { length: 30, omission: '' }), 30, '<');
};
const calculate = (string) => {
  const dict = {
    '<': 0,
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
    sum(
      map(
        map(string, (letter) => {
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
        },
      ),
    ) % 10
  );
};

export default {
  name: 'BeidCardBack',
  props: ['biometric', 'picture'],
  setup(props, context) {
    const constructMachineReadableStrings = (rnData) => {
      const mrs = [];

      // First line
      const prefix = 'ID';
      let first = 'BEL' + rnData.cardNumber.substr(0, 9) + '<' + rnData.cardNumber.substr(9);
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
        rnData.cardNumber.substr(0, 10) + rnData.nationalNumber.substr(0, 6) + validity + rnData.nationalNumber;
      second += calculate(finalCheck);
      second = pad(second);
      mrs.push(second.toUpperCase());

      // Third line
      let third =
        join(split(rnData.name, ' '), '<') +
        '<<' +
        join(split(rnData.firstNames, ' '), '<') +
        '<' +
        join(split(rnData.thirdName, ' '), '<');
      third = pad(third);
      mrs.push(third.toUpperCase());
      return mrs;
    };

    const mrz = computed(() => constructMachineReadableStrings(props.biometric));

    return {
      mrz,
    };
  },
};
</script>

<style src="./CardBack.style.css" scoped />
