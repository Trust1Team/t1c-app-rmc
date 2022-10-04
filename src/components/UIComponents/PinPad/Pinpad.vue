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
export default {
  name: 'Pinpad',
  emits: ['submitPin'],
  data() {
    return {
      pin: '',
    };
  },
  methods: {
    focusInput() {
      this.$refs.pinField.focus();
    },
    enteredNumber(number) {
      this.pin += number;
    },
    resetNumber() {
      this.pin = this.pin.substr(0, this.pin.length - 1);
    },
    submitPin() {
      this.$emit('submitPin', this.pin);
      this.pin = '';
    },
  },
};
</script>

<style src="./Pinpad.style.css" scoped />
