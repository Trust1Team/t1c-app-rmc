<template>
  <div class="token-details-item">
    <h3>{{ $t('cardActions.header') }}</h3>
    <div class="action-buttons">
      <div id="single-file-upload" class="p-5">
        <form ref="form">
          <div class="p-12 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <input
              id="assetsFieldHandle"
              ref="file"
              type="file"
              name="fields[assetsFieldHandle][]"
              class="w-px h-px opacity-0 overflow-hidden absolute"
              accept=".pdf"
              @change="handleUpload"
            />

            <label for="assetsFieldHandle" class="block cursor-pointer">
              You can drop the desired PDF file to sign or <span class="underline">click here</span> to upload the PDF
              file
            </label>
            <ul v-if="files && files.length" v-cloak class="mt-4">
              <li v-for="file in files" :key="file" class="file-item flex">
                <div class="file-item-name font-bold italic">
                  {{ file.name }}
                </div>
                <div>
                  <button class="btn btn-danger ml-2" type="button" title="Remove file" @click="remove">
                    <XIcon></XIcon>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </form>
      </div>

      <button class="btn btn-primary" :disabled="cardCertificateLoading || !files" @click="uploadFileToSign">
        {{ $t('cardActions.legalCopy') }}
      </button>

      <button class="btn btn-primary" :disabled="cardCertificateLoading" @click="pinPadDialog">
        {{ $t('cardActions.checkPin') }}
      </button>
    </div>
  </div>

  <PinDialog ref="pinDialog" :pin-error-description="pinErrorDescription" @confirmPin="pinSelected" />

  <SignDialog
    ref="signDialog"
    :bytes-to-sign="bytesToSign"
    :document-id="documentId"
    module="beid"
    @closed="resetForm"
  />
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { PinDialog } from '@/components/UIComponents';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import SigningService from '@/infrastructure/services/Signing';
import SignDialog from '@/components/modules/beid/dialogs/Sign';

export default {
  name: 'CardActions',
  components: {
    SignDialog,
    PinDialog,
  },
  setup() {
    const toast = useToast();
    const store = useStore();

    const pinErrorDescription = ref();
    const file = ref();
    const signDialog = ref();
    const pinDialog = ref();
    const form = ref();
    const files = ref();
    const bytesToSign = ref();
    const documentId = ref();

    const cardCertificateLoading = computed(() => store.getters['card/getCertificateLoading']);
    const cardRootCert = computed(() => store.getters['card/getRootCertificate']);
    const cardIntermediateCerts = computed(() => store.getters['card/getIntermediateCertificates']);
    const cardNonRepudiationCert = computed(() => store.getters['card/getNonRepudiationCertificate']);
    const selectedReader = computed(() => store.getters['reader/getSelectedReader']);
    const selectedPin = computed(() => store.getters['reader/getSelectedPin']);
    const selectedPinType = computed(() => store.getters['reader/getSelectedPinType']);

    const resetForm = () => {
      form.value.reset();
      files.value = undefined;
    };

    const handleUpload = () => {
      const files = file.value.files;

      if (files.length > 1) {
        toast.error('Cannot upload more then 1 file');
        resetForm();
      } else if (files[0] && !files[0].name.toLowerCase().endsWith('.pdf')) {
        toast.error('File must be a PDF');
        resetForm();
      } else {
        files.value = file.value.files;
      }
    };

    const uploadFileToSign = () => {
      if (!files.value) {
        return false;
      }

      SigningService.uploadFile(
        files.value[0],
        cardNonRepudiationCert.value.certificate,
        cardRootCert.value.certificate,
        cardIntermediateCerts.value.certificate,
      ).then(
        (res) => {
          bytesToSign.value = res.data.data.bytes;
          documentId.value = res.data.data.documentId;
          signDialog.value.showDialog();
        },
        (err) => {
          console.error(err);
          resetForm();
          toast.error(err);
        },
      );
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

      client.verifyPin('beid', data).then(
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

    const remove = () =>  {
      this.resetForm();
    },

    const dragover = (event) => {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    }

    dragleave = (event) => {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }

    drop = (event) => {
      event.preventDefault();
      file.value.files = event.dataTransfer.files;
      handleUpload();
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }

    return {
      toast,
      files,
      dragover,
      dragleave,
      drop,
      handleUpload,
      files,
      file,
      form,
      remove,
      signDialog,
      pinDialog,
      cardCertificateLoading,
      uploadFileToSign,
      pinPadDialog,
      pinErrorDescription,
      pinSelected,
      bytesToSign,
      documentId,
      resetForm,
    };
  },
};
</script>

<style src="./CardActions.style.css" scoped />
