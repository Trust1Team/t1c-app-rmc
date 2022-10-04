<template>
  <div class="readers-header mt-6">
    <h1 class="font-medium text-4xl">{{ $t('readersList.Choose your Reader') }}</h1>
    <p class="mt-3">{{ $t('readersList.askToSelect') }}</p>
  </div>

  <ReadersList :selectable="true" :unknown-modules-disabled="true" @readerSelected="readerSelected($event)" />
</template>

<script>
// @ is an alias to /src
import { useToast } from 'vue-toastification';
import { ReadersList } from '@/components/core';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'HomeReaderList',
  components: {
    ReadersList,
  },
  emits: ['readerSelected'],
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getConsent() {
      return this.$store.getters.getConsent;
    },
    getInstalled() {
      return this.$store.getters.getInstalled;
    },
  },
  methods: {
    readerSelected(reader) {
      Trust1ConnectorService.getClient()
        .core()
        .readersCardAvailable()
        .then(
          (readerRes) => {
            if (readerRes.data.find((r) => r.id === reader.id)) {
              this.$store.dispatch('reader/setSelectedReader', reader).then(() => {
                // When a Pace enabled card then we show the pinpad view first
                this.$emit('readerSelected');
              });
            } else {
              this.toast.error(this.$t('home.readerlist.error.unavailable'));
            }
          },
          (err) => {
            console.error(this.$t('home.readerlist.error.cannotselect'), err);
            this.toast.error(this.$t('home.readerlist.error.cannotselect'));
          },
        );
    },
  },
};
</script>

<style scoped>
.installer h1,
h2 {
  text-align: center;
}

.installer h2 {
  margin-bottom: 60px;
}

.pin-pad-container h1 {
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: #dc623b;
}

.form-pace input {
  margin-right: 10px;
}
</style>
