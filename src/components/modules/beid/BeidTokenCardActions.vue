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

      <button class="btn btn-primary" :disabled="getCertificateLoading || !files" @click="uploadFileToSign">
        {{ $t('cardActions.legalCopy') }}
      </button>

      <button class="btn btn-primary" :disabled="getCertificateLoading" @click="pinPadDialog">
        {{ $t('cardActions.checkPin') }}
      </button>
    </div>
  </div>

  <!--  User ref to be able to call the functions inside this component -->
  <PinDialog ref="pinDialog" :pin-error-description="pinErrorDescription" @confirmPin="pinSelected" />

  <SignModal ref="signModal" :bytes-to-sign="bytesToSign" :document-id="documentId" module="beid" @closed="resetForm" />
</template>

<script>
import { useToast } from 'vue-toastification';
import PinDialog from '@/components/UIComponents/PinDialog';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import SigningService from '@/infrastructure/services/Signing';
import SignModal from '@/components/modules/beid/SignDialog';

export default {
  name: 'BeidTokenCardActions',
  components: { SignModal, PinDialog },
  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },
  data() {
    return {
      pinErrorDescription: undefined,
      files: undefined,
      bytesToSign: undefined,
      documentId: undefined,
    };
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading'];
    },
    getRootCertificate() {
      return this.$store.getters['card/getRootCertificate'];
    },
    getIntermediateCertificates() {
      return this.$store.getters['card/getIntermediateCertificates'];
    },
    getNonRepudiationCertificate() {
      return this.$store.getters['card/getNonRepudiationCertificate'];
    },
    getReader() {
      return this.$store.getters['reader/getSelectedReader'];
    },
    getPin() {
      return this.$store.getters['reader/getSelectedPin'];
    },
    getPinType() {
      return this.$store.getters['reader/getSelectedPinType'];
    },
  },
  methods: {
    handleUpload() {
      const files = this.$refs.file.files;
      if (files.length > 1) {
        this.toast.error('Cannot upload more then 1 file');
        this.resetForm();
      } else if (files[0] && !files[0].name.toLowerCase().endsWith('.pdf')) {
        this.toast.error('File must be a PDF');
        this.resetForm();
      } else {
        this.files = this.$refs.file.files;
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.files = undefined;
    },
    uploadFileToSign() {
      if (this.files) {
        SigningService.uploadFile(
          this.files[0],
          this.getNonRepudiationCertificate.certificate,
          this.getRootCertificate.certificate,
          this.getIntermediateCertificates.certificate,
        ).then(
          (res) => {
            this.bytesToSign = res.data.data.bytes;
            this.documentId = res.data.data.documentId;
            this.$refs.signModal.showDialog();
          },
          (err) => {
            console.error(err);
            this.resetForm();
            this.toast.error(err);
          },
        );
      }
    },
    pinPadDialog() {
      this.pinErrorDescription = undefined;
      this.$refs.pinDialog.showDialog();
    },

    pinSelected(pin) {
      const client = Trust1ConnectorService.getClient().generic(this.getReader.id, this.getPin, this.getPinType);
      const data = {
        pin: pin,
      };

      client.verifyPin('beid', data).then(
        (res) => {
          if (res && res.success && res.data.verified) {
            this.$refs.pinDialog.hideDialog();
            this.pinErrorDescription = undefined;
            this.toast.success('Successfully verified the pin code');
          } else {
            this.$refs.pinDialog.hideDialog();
            this.pinErrorDescription = 'Pin code is not correct';
            this.toast.error('Pin code is not correct');
          }
        },
        (err) => {
          this.pinErrorDescription = err.description;
          this.toast.error(err.description);
        },
      );
    },
    remove() {
      this.resetForm();
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.handleUpload();
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.token-details-item {
  margin-bottom: 30px;
}
.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}

.file-item-name {
  max-width: 600px;
  word-break: break-all;
  padding: 10px;
  border-radius: 10px;
}
</style>
