<template>
  <div class="pin-container">
    <div class="pin-input-container">
      <input
        class="form-control pin-field"
        required
        type="password"
        v-model="pin"
        ref="pinField"
        :placeholder="$t('pinpad.Enter PIN code')"
      />
    </div>
    <div class="pin-pad">
      <div>
        <div class="row">
          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(1)"
          >
            1
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(2)"
          >
            2
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(3)"
          >
            3
          </button>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(4)"
          >
            4
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(5)"
          >
            5
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(6)"
          >
            6
          </button>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(7)"
          >
            7
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(8)"
          >
            8
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(9)"
          >
            9
          </button>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn form-control btn-error"
            @click="resetNumber"
          >
            C
          </button>

          <button
            type="button"
            class="btn form-control btn-outline-secondary"
            @click="enteredNumber(0)"
          >
            0
          </button>

          <button
            type="submit"
            class="btn form-control btn-success"
            @click="submitPin"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Pinpad',
  data() {
    return {
      pin: ''
    }
  },
  emits: ['submitPin'],
  methods: {
    focusInput() {
      this.$refs.pinField.focus()
    },
    enteredNumber(number) {
      this.pin += number
    },
    resetNumber() {
      this.pin = this.pin.substr(0, this.pin.length - 1)
    },
    submitPin() {
      this.$emit('submitPin', this.pin)
      this.pin = ''
    }
  }
}
</script>

<style scoped>
.btn-error {
  color: #ffffff !important;
  background-color: #d74747 !important;
  border-color: #dc1515 !important;
}

.btn-error:hover {
  background-color: #bd3535 !important;
}

.pin-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
}

.pin-input-container {
  width: 300px;
  margin-bottom: 20px;
}

.pin-input-container input {
  border-color: #d9400e !important;
  transition: all 0.5s ease-in !important;
  text-align: center;
}

.pin-input-container input:hover {
  border-color: #c8694e !important;
}

.pin-pad {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.row {
  margin-bottom: 15px;
  display: flex;
}

.row button {
  margin: 5px;
  width: 70px;
  height: 50px;
  display: inline-block;
}
</style>
