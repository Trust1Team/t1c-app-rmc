<template>
  <div class="readers-header mt-6">
    <h1 class="font-medium text-4xl">{{ $t('readersList.Choose your Reader') }}</h1>
    <p class="mt-3">{{ $t('readersList.askToSelect') }}</p>
  </div>

  <ReadersList :selectable="true" :unknown-modules-disabled="true" @readerSelected="readerSelected($event)" />
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { ReadersList } from '@/components/core';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'HomeReaderList',
  components: {
    ReadersList,
  },
  emits: ['readerSelected'],
  setup(props, context) {
    const toast = useToast();
    const store = useStore();
    const { t } = useI18n();

    const error = ref();

    const readerSelected = (reader) => {
      Trust1ConnectorService.getClient()
        .core()
        .readersCardAvailable()
        .then(
          (readerRes) => {
            if (readerRes.data.find((r) => r.id === reader.id)) {
              store.dispatch('reader/setSelectedReader', reader).then(() => {
                // When a Pace enabled card then we show the pinpad view first
                context.emit('readerSelected');
              });
            } else {
              toast.error(t('home.readerlist.error.unavailable'));
            }
          },
          (err) => {
            console.error(t('home.readerlist.error.cannotselect'), err);
            toast.error(t('home.readerlist.error.cannotselect'));
          },
        );
    };

    return {
      toast,
      error,
      readerSelected,
    };
  },
};
</script>

<style src="./ReaderList.style.css" scoped />
