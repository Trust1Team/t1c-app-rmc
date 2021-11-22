<template>
  <GDialog v-model="value">
    <div>Info Alert</div>

    <pinpad @confirmPin="pinSelected"></pinpad>
    {{ info }}
  </GDialog>
</template>

<script>
import Pinpad from './Pinpad'

import { computed } from 'vue'
import { GDialog } from 'gitart-vue-dialog'

export default {
  name: 'PinDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue
      },

      set(val) {
        emit('update:modelValue', val)
      }
    })

    return {
      value
    }
  },
  methods: {
    pinSelected(pin) {
      // TODO check if we can use the store to save the pin temporary until the use-case has finished
      this.$emit('confirmPin', pin)
    }
  },
  components: { Pinpad, GDialog }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(45, 45, 45, 0.8);
}

.pin-pad-container {
  position: relative;
  left: calc(50% - 170px);
  top: calc(50% - 195px);
  border: 3px solid #ecebeb;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 340px;
  height: 390px;
  -webkit-box-shadow: 0px 0px 15px 0px rgba(45, 45, 45, 0.75);
  -moz-box-shadow: 0px 0px 15px 0px rgba(45, 45, 45, 0.75);
  box-shadow: 0px 0px 15px 0px rgba(45, 45, 45, 0.75);
}
</style>
