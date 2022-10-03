<template>
  <div class="consent-container">
    <p>{{ $t('consent.consentMessage') }}</p>
    <p>
      {{ $t('consent.askToConfirm') }}
      <strong>{{ $t('consent.consent') }}</strong>
      {{ $t('consent.to continue') }}.
    </p>

    <button type="button" class="btn btn-primary consent-btn" @click="consent">
      {{ $t('consent.Consent') }}
    </button>
  </div>
</template>

<script>
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import copyMixin from '@/infrastructure/mixins/copyMixin';
import { T1CClient } from 't1c-sdk-js';
export default {
  name: 'Consent',
  mixins: [copyMixin],
  props: {},
  emits: ['consented'],
  data() {
    return {
      consentData: null,
    };
  },
  created() {
    this.consentData = T1CClient.generateConsentToken();
  },
  methods: {
    consent() {
      this.copyTextToClipboard(this.consentData);
      Trust1ConnectorService.getErrorClient()
        .core()
        .getImplicitConsent(this.consentData)
        .then(
          (consentRes) => {
            Trust1ConnectorService.setClient(consentRes);
            Trust1ConnectorService.setErrorClient(null);
            Trust1ConnectorService.getClient()
              .core()
              .version()
              .then((versionResult) => {
                console.log('T1C running on core ' + versionResult);
                this.$emit('consented');
              });
            this.copyConsentToClipboard(this.consentData);
          },
          (err) => {
            console.error(err);
          },
        );
    },
    fallbackCopyConsentToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
    copyConsentToClipboard(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyConsentToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        },
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.consent-container {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.consent-data {
  opacity: 0;
}

.consent-btn {
  width: 130px;
  height: 50px;
  font-weight: bold;
}
</style>
