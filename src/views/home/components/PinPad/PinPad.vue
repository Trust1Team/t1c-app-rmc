<template>
  <div class="pin-pad-container">
    <h1>Enter your pin/can to unlock the card</h1>
    <div class="pin-pad">
      <div class="form-check form-switch form-pace">
        <input id="pinTypeSwitch" v-model="pinType" class="form-check-switch" type="checkbox" />
        <label v-if="pinType" class="form-check-label" for="pinTypeSwitch">Can</label>
        <label v-if="!pinType" class="form-check-label" for="pinTypeSwitch">Pin</label>
      </div>
      <PinPad ref="pinpad" @submitPin="pinSelected" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { PinPad } from '@/components/UIComponents';

export default {
  name: 'HomePinPad',
  components: {
    PinPad,
  },
  emits: ['pinSelected'],
  setup(props, context) {
    const store = useStore();

    const pageView = ref(0);
    const pinType = ref(false);
    const error = ref();

    const pinSelected = (pin) => {
      store.dispatch('reader/setSelectedPin', pin).then(() => {
        store.dispatch('reader/setSelectedPinType', pinType.value ? 'Can' : 'Pin').then(() => {
          // Emit event!
          context.emit('pinSelected');
        });
      });
    };

    return {
      pageView,
      pinType,
      error,
      pinSelected,
    };
  },
};
</script>

<style src="./PinPad.style.css" scoped />
