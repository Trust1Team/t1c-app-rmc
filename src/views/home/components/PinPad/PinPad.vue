<template>
  <div class="pin-pad-container">
    <h1>Enter your pin/can to unlock the card</h1>
    <div class="pin-pad">
      <div class="form-check form-switch form-pace">
        <input id="pinTypeSwitch" v-model="pinType" class="form-check-switch" type="checkbox" />
        <label v-if="pinType" class="form-check-label" for="pinTypeSwitch">Can</label>
        <label v-if="!pinType" class="form-check-label" for="pinTypeSwitch">Pin</label>
      </div>
      <Pinpad ref="pinpad" @submitPin="pinSelected" />
    </div>
  </div>
</template>

<script>
import { Pinpad } from '@/components/UIComponents';

export default {
  name: 'HomePinPad',
  components: {
    Pinpad,
  },
  emits: ['pinSelected'],
  data() {
    return {
      pageView: 0,
      pinType: false,
      error: null,
    };
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin'];
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType'];
    },
    getConsent() {
      return this.$store.getters.getConsent;
    },
    getInstalled() {
      return this.$store.getters.getInstalled;
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading'];
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
  },
  methods: {
    pinSelected(pin) {
      this.$store.dispatch('reader/setSelectedPin', pin).then(() => {
        this.$store.dispatch('reader/setSelectedPinType', this.pinType ? 'Can' : 'Pin').then(() => {
          // Emit event!
          this.$emit('pinSelected');
        });
      });
    },
  },
};
</script>

<style scoped>
.head {
  margin-bottom: 40px;
}

.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}

.go-back button:hover .go-back-icon {
  transform: translateX(-3px);
}

.loading {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.pin-pad-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.pin-pad-container h1 {
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: #dc623b;
}

.pin-pad {
  width: 300px;
}

.form-pace {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
}

.form-pace input {
  margin-right: 10px;
}
</style>
