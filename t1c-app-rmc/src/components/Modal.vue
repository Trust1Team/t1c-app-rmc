<template>
  <div class="modal fade" ref="consentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="consentModalLabel">
            Trust1Connector consent
          </h5>
        </div>
        <div class="modal-body">
          Please provide your consent to use the Trust1Connector.
          <span class="consent-data" ref="consentData">{{
              consentData
            }}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: String,
    fade: Boolean,
    id: String,
    show: Boolean,
  },
};
</script>
