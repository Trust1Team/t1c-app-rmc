<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="title">{{ $t("pinpad.Enter PIN code") }}</h4>
      </div>
      <br>
      <div class="card-body">
        <div class="form">
          <form @submit.prevent>
            <div class="row">
              <div class="col-12">
                <input class="form-control" required type="password" v-model="pin" :placeholder="$t('pinpad.Enter PIN code')" >
              </div>
            </div>
            <br>
            <div class="col-11 m-auto">
              <div class="row">
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(1)">1</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(2)">2</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(3)">3</button>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(4)">4</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(5)">5</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(6)">6</button>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(7)">7</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(8)">8</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(9)">9</button>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-4">
                  <button type="button" class="btn form-control btn-primary" @click="clearField">C</button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn form-control btn-outline-primary" @click="enteredNumber(0)">0</button>
                </div>
                <div class="col-4">
                  <button type="submit" class="btn form-control btn-success" @click="submitPin">OK</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pinpad",
  data() {
    return {
      pin: '',
    }
  },
  emits:["confirmPin"],
  methods: {
    enteredNumber(number) {
      this.pin += number;
    },
    clearField() {
      this.pin = '';
    },
    submitPin() {
      alert('Inside emit');
      this.$emit("confirmPin", this.pin);
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 30px;
  color: #d24d0d;
}
</style>