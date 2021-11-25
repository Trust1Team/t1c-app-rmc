<template>
  <!--  PINPAD MODAL BEGIN-->
  <div
      id="pin-pad-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body flex justify-center">
          <div class="flex-column justify-center">
            <div v-if="pinErrorDescription"
                 class="alert alert-danger-soft show flex items-center mb-2"
                 role="alert"
            >
              <AlertOctagonIcon class="w-6 h-6 mr-2" /> {{ pinErrorDescription }}
            </div>

            <pinpad ref="pinpad" @submitPin="pinSelected"></pinpad>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!--  PINPAD MODAL END-->

</template>

<script>
import Pinpad from '@/components/UIComponents/Pinpad'

export default {
  name: 'PinDialog',
  props: ['pinErrorDescription'],
  emits: ['confirmPin'],
  methods: {
    showDialog() {
      cash('#pin-pad-modal').modal('show')
      this.$refs.pinpad.focusInput()
    },
    hideDialog() {
      cash('#pin-pad-modal').modal('hide')
    },
    pinSelected(pin) {
      this.$emit('confirmPin', pin)
    }
  },
  components: { Pinpad }
}
</script>

<style scoped>

</style>
