<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <div
        v-show="show"
        ref="modal-backdrop"
        class="modal-backdrop fixed inset-0 overflow-y-auto bg-black bg-opacity-50"
      >
        <div class="flex items-start justify-center min-h-screen dialog-wrapper text-center">
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 translate-y-10 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
              ref="modal"
              class="bg-white rounded-lg text-left shadow-xl modal-content"
              :style="{ maxWidth: `${maxWidth}px` }"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="modal__header">
                <h2 v-show="title" class="modal__header__title">{{ $t(title) }}</h2>
                <button class="btn btn-close" @click="closeModal">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
                    />
                  </svg>
                </button>
              </div>
              <div class="modal__content">
                <slot></slot>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'SimpleDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    maxWidth: {
      type: Number,
      default: 780,
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('closeModal');
    };

    return {
      // Functions
      closeModal,
    };
  },
};
</script>
<style scoped>
.dialog-wrapper {
  padding-top: 115px;
}

.modal-backdrop {
  z-index: 100;
}

.modal-content {
  position: relative;
  width: 85%;
  padding: 25px 20px;
}

.modal__header {
  text-align: center;
}

.modal__header__title {
  font-size: 22px;
  font-weight: 600;
}

.btn-close {
  position: absolute;
  right: 10px;
  top: 10px;
  text-shadow: none;
  box-shadow: none;
  border: none;
}

.btn-close svg {
  width: 24px;
  height: 24px;
  fill: #b4b4b4;
}

.modal__content {
  margin-top: 20px;
}
</style>
