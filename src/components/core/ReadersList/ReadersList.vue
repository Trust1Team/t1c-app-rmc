<template>
  <div v-if="loading" class="loading">
    <Loading icon="puff" size="40"></Loading>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
      <div v-if="readers" class="hidden md:block mx-auto text-gray-600">
        {{ $t('readersList.showing') }} {{ readers.length }} {{ $t('readersList.readers') }}
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="refresh">
          <button class="btn btn-primary" :disabled="loading" @click="getReaders()">
            <i class="fas fa-sync-alt refresh-icon"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
        <thead>
          <tr>
            <th class="whitespace-nowrap">{{ $t('readersList.readername') }}</th>
            <th class="text-center whitespace-nowrap">{{ $t('readersList.readermodule') }}</th>
            <th class="text-center whitespace-nowrap">{{ $t('readersList.status') }}</th>
            <th v-if="selectable" class="text-center whitespace-nowrap">{{ $t('readersList.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reader in readers" :key="reader.id" class="intro-x">
            <td>
              <p class="font-medium whitespace-nowrap" @click="copyReaderId(reader)">{{ reader.name }}</p>
              <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5" @click="copyReaderId(reader)">
                {{ reader.id }}
              </div>
            </td>
            <td class="text-center">
              <div v-if="reader.card">
                <Tippy :content="'ATR: ' + reader.card.atr">
                  <span v-if="reader.card.modules" @click="copyAtr(reader)">{{ reader.card.modules[0] }}</span>
                  <div v-else>
                    <span class="span-row">{{ $t('readersList.No module detected') }}</span>
                    <div class="dropdown">
                      <button
                        id="dropdownMenuButton"
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li
                          v-for="module in modules"
                          :key="module"
                          class="dropdown-item"
                          :value="module"
                          @click="selectModule(reader, module)"
                        >
                          {{ module }}
                        </li>
                      </div>
                    </div>
                  </div>
                </Tippy>
              </div>
            </td>
            <td class="w-40">
              <div class="flex items-center justify-evenly">
                <Tippy :content="reader.pinpad ? 'Is pin-pad reader' : 'Is not a pin-pad reader'">
                  <span
                    :class="{
                      isPresent: reader.pinpad,
                      isNotPresent: !reader.pinpad,
                    }"
                    ><i class="fas fa-keyboard"></i>
                  </span>
                </Tippy>

                <Tippy :content="reader.card ? 'Reader has card inserted' : 'Reader has no card inserted'">
                  <CreditCardIcon
                    class="w-4 h-4 mr-2"
                    :class="{
                      isPresent: reader.card,
                      isNotPresent: !reader.card,
                    }"
                  ></CreditCardIcon>
                </Tippy>
              </div>
            </td>
            <td v-if="selectable" class="table-report__action w-56">
              <div class="flex justify-center items-center">
                <div
                  class="flex items-center mr-3 reader-select"
                  :class="{ selectDisabled: !reader.card }"
                  @click="selectReader(reader)"
                >
                  <CheckCircleIcon class="w-4 h-4 mr-1" />
                  Select
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import Loading from '@/global-components/loading-icon/Main';

export default {
  name: 'ReadersList',
  components: { Loading },
  props: {
    unknownModulesDisabled: Boolean,
    selectable: Boolean,
  },
  emits: ['readerSelected'],
  data() {
    return {
      readers: null,
      loading: true,
      modules: [
        'beid',
        'emv',
        'crelan',
        'aventra',
        'oberthur',
        'idemia',
        'luxeid',
        'diplad',
        'certigna',
        'certinomis',
        'dnie',
        'safenet',
        'eherkenning',
        'jcop',
        'airbus',
      ],
    };
  },
  created() {
    this.getReaders();
  },
  methods: {
    getReaders() {
      this.readers = null;
      this.loading = true;
      const client = Trust1ConnectorService.getClient();
      if (client != null) {
        client
          .core()
          .readers()
          .then(
            (res) => {
              this.loading = false;
              this.readers = res.data;
            },
            (err) => {
              this.loading = false;
              this.readers = [];
              console.log(err);
            },
          );
      } else {
        this.readers = [];
        this.loading = false;
      }
    },
    selectReader(reader) {
      if (reader.card) {
        this.$emit('readerSelected', reader);
      }
    },
    copyAtr(reader) {
      this.copyTextToClipboard(reader.card.atr);
    },
    copyReaderId(reader) {
      this.copyTextToClipboard(reader.id);
    },
    fallbackCopyTextToClipboard(text) {
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
    copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      // TODO use toast for copy clipboard notification
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        },
      );
    },
    selectModule(reader, module) {
      reader.card.description = [module];
      reader.card.modules = [module];
    },
  },
};
</script>

<style src="./ReadersList.style.css" scoped />
