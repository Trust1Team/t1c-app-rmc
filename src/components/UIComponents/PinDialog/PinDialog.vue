<template>
  <div id="pin-pad-modal" ref="pinModal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body flex justify-center">
          <div class="flex-column justify-center">
            <div v-if="pinErrorDescription" class="alert alert-danger-soft show flex items-center mb-2" role="alert">
              <AlertOctagonIcon class="w-6 h-6 mr-2" /> {{ pinErrorDescription }}
            </div>

            <Pinpad ref="pinpad" @submitPin="pinSelected" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'cash-dom';
import { Pinpad } from '@/components/UIComponents';

export default {
  name: 'PinDialog',
  components: { Pinpad },
  props: ['pinErrorDescription'],
  emits: ['confirmPin'],
  setup(props, context) {
    const pinpad = ref(null);

    const showDialog = () => {
      $('#pin-pad-modal').modal('show');
      pinpad.value.focusInput();
    };

    const hideDialog = () => {
      $('#pin-pad-modal').modal('hide');
    };

    const pinSelected = (pin) => {
      context.emit('confirmPin', pin);
    };

    return {
      pinpad,
      pinSelected,
      showDialog,
      hideDialog,
    };
  },
};
</script>

<style src="./PinDialog.style.css" scoped />
