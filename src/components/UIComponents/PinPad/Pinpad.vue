<template>
  <div class="pin-container">
    <div class="pin-input-container">
      <input
        ref="pinField"
        v-model="pin"
        class="form-control pin-field"
        required
        type="password"
        :placeholder="$t('pinpad.Enter PIN code')"
      />
    </div>
    <div class="pin-pad">
      <div>
        <div class="row">
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(1)">1</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(2)">2</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(3)">3</button>
        </div>
        <div class="row">
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(4)">4</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(5)">5</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(6)">6</button>
        </div>
        <div class="row">
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(7)">7</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(8)">8</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(9)">9</button>
        </div>
        <div class="row">
          <button type="button" class="btn form-control btn-error" @click="resetNumber">C</button>
          <button type="button" class="btn form-control btn-outline-secondary" @click="enteredNumber(0)">0</button>
          <button type="submit" class="btn form-control btn-success" @click="submitPin">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Pinpad',
  emits: ['submitPin'],
  setup(props, context) {
    const pin = ref('');
    const pinField = ref(null);

    const focusInput = () => {
      pinField.value.focus();
    };

    const enteredNumber = (number) => {
      pin.value += number;
    };

    const resetNumber = () => {
      pin.value = pin.value.substr(0, pin.value.length - 1);
    };

    const submitPin = () => {
      context.emit('submitPin', pin.value);
      pin.value = '';
    };

    return {
      pin,
      pinField,
      focusInput,
      enteredNumber,
      resetNumber,
      submitPin,
    };
  },
};
</script>

<style src="./Pinpad.style.css" scoped />
