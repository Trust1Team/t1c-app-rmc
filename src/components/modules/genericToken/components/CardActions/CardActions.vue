<template>
  <div class="token-details-item">
    <h3>{{ $t('cardActions.header') }}</h3>
    <div class="action-buttons">
      <!--      <div id="single-file-upload" class="p-5">-->
      <!--        <form ref="form">-->
      <!--          <div class="p-12 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">-->
      <!--            <input type="file" name="fields[assetsFieldHandle][]" id="assetsFieldHandle"-->
      <!--                   class="w-px h-px opacity-0 overflow-hidden absolute" @change="handleUpload" ref="file" accept=".pdf" />-->

      <!--            <label for="assetsFieldHandle" class="block cursor-pointer">-->
      <!--              You can drop the desired PDF file to sign-->
      <!--              or <span class="underline">click here</span> to upload the PDF file-->
      <!--            </label>-->
      <!--            <ul class="mt-4" v-if="files && files.length" v-cloak>-->
      <!--              <li class="file-item flex" v-for="file in files" :key="file">-->
      <!--                <div class="file-item-name font-bold italic">-->
      <!--                  {{ file.name }}-->
      <!--                </div>-->
      <!--                <div><button class="btn btn-danger ml-2" type="button" @click="remove" title="Remove file"><XIcon></XIcon></button></div>-->
      <!--              </li>-->
      <!--            </ul>-->
      <!--          </div>-->
      <!--        </form>-->

      <!--      </div>-->

      <button class="btn btn-primary" :disabled="certLoading" @click="uploadFileToSign">
        {{ $t('cardActions.authenticate') }}
      </button>

      <button class="btn btn-primary" :disabled="certLoading" @click="pinPadDialog">
        {{ $t('cardActions.checkPin') }}
      </button>
    </div>
  </div>

  <PinDialog ref="pinDialog" :pin-error-description="pinErrorDescription" @confirmPin="pinSelected" />

  <GenericAuthDialog
    ref="signDialog"
    :bytes-to-sign="bytesToSign"
    :module="selectedReader.card.modules[0]"
    @closed="resetForm"
  />
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { PinDialog } from '@/components/UIComponents';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import GenericAuthDialog from '@/components/modules/genericToken/GenericAuthDialog';

export default {
  name: 'CardActions',
  components: { GenericAuthDialog, PinDialog },
  setup() {
    const toast = useToast();
    const store = useStore();

    const pinDialog = ref();
    const signDialog = ref();
    const pinErrorDescription = ref();
    const file = ref();
    const files = ref();
    const form = ref();
    const bytesToSign = ref();

    const certLoading = computed(() => store.getters['card/getCertificateLoading']);
    const selectedReader = computed(() => store.getters['reader/getSelectedReader']);
    const selectedPin = computed(() => store.getters['reader/getSelectedPin']);
    const selectedPinType = computed(() => store.getters['reader/getSelectedPinType']);

    const resetForm = () => {
      form.value.reset();
      files.value = undefined;
    };

    const uploadFileToSign = () => {
      bytesToSign.value = 'oL4mNb8tt5eRzM5yOjnO12qgw5LOC++nFi0LnJzu1gY=';
      signDialog.value.showDialog();
    };

    const pinPadDialog = () => {
      pinErrorDescription.value = undefined;
      pinDialog.value.showDialog();
    };

    const pinSelected = (pin) => {
      const client = Trust1ConnectorService.getClient().generic(
        selectedReader.value.id,
        selectedPin.value,
        selectedPinType.value,
      );

      const data = {
        pin: pin,
      };

      client.verifyPin(selectedReader.value.card.modules[0], data).then(
        (res) => {
          if (res?.success && res?.data?.verified) {
            pinDialog.value.hideDialog();
            pinErrorDescription.value = undefined;
            toast.success('Successfully verified the pin code');
          } else {
            pinDialog.value.hideDialog();
            pinErrorDescription.value = 'Pin code is not correct';
            toast.error('Pin code is not correct');
          }
        },
        (err) => {
          pinErrorDescription.value = err.description;
          toast.error(err.description);
        },
      );
    };

    // const handleUpload = () => {
    //   const files = file.value.files;
    //   if (files.length > 1) {
    //     toast.error('Cannot upload more then 1 file');
    //     resetForm();
    //   } else if (files[0] && !files[0].name.toLowerCase().endsWith('.pdf')) {
    //     toast.error('File must be a PDF');
    //     resetForm();
    //   } else {
    //     files = file.value.files;
    //   }
    // };

    // const remove = () => {
    //   resetForm();
    // };

    // const dragover = (event) => {
    //   event.preventDefault();
    //   // Add some visual fluff to show the user can drop its files
    //   if (!event.currentTarget.classList.contains('bg-green-300')) {
    //     event.currentTarget.classList.remove('bg-gray-100');
    //     event.currentTarget.classList.add('bg-green-300');
    //   }
    // };

    // const dragleave = (event) => {
    //   // Clean up
    //   event.currentTarget.classList.add('bg-gray-100');
    //   event.currentTarget.classList.remove('bg-green-300');
    // };

    // const drop = (event) => {
    //   event.preventDefault();
    //   file.value.files = event.dataTransfer.files;
    //   handleUpload();
    //   // Clean up
    //   event.currentTarget.classList.add('bg-gray-100');
    //   event.currentTarget.classList.remove('bg-green-300');
    // };

    return {
      toast,
      file,
      form,
      pinDialog,
      signDialog,
      certLoading,
      selectedReader,
      resetForm,
      uploadFileToSign,
      pinPadDialog,
      pinErrorDescription,
      pinSelected,
    };
  },
};
</script>

<style src="./CardActions.style.css" scoped />
