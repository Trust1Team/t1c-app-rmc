<template>
  <div class="pin-pad-container">
    <h1>Enter your pin/can to unlock the card</h1>
    <div class="pin-pad">
      <div class="form-check form-switch form-pace">
        <input
            class="form-check-input"
            type="checkbox"
            id="pinTypeSwitch"
            v-model="pinType"
        />
        <label class="form-check-label" for="pinTypeSwitch" v-if="pinType">Can</label>
        <label
            class="form-check-label"
            for="pinTypeSwitch"
            v-if="!pinType">Pin</label>
      </div>
      <pinpad ref="pinpad" @submitPin="pinSelected"></pinpad>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Pinpad from '@/components/UIComponents/Pinpad'

export default {
  name: 'HomePinPad',
  emits: ['pinSelected'],
  data() {
    return {
      pageView: 0,
      pinType: false,
      error: null
    }
  },
  methods: {
    pinSelected(pin) {
      this.$store.dispatch('reader/setSelectedPin', pin).then(() => {
        this.$store
          .dispatch('reader/setSelectedPinType', this.pinType ? 'Can' : 'Pin')
          .then(() => {
            // Emit event!
            this.$emit('pinSelected')
          })
      })
    }
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader']
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin']
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType']
    },
    getConsent() {
      return this.$store.getters.getConsent
    },
    getInstalled() {
      return this.$store.getters.getInstalled
    },
    getDataLoading() {
      return this.$store.getters['card/getDataLoading']
    },
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    }
  },
  components: {
    Pinpad
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
