<template>
  <div class="certificate-verification">
    <div v-if="loading">
      <div class="alert alert-secondary-soft show flex items-center mb-2" role="alert">
        <LoadingIcon icon="puff" size="40" class="w-6 h-6 mr-2" />
        {{ $t('verify.certificates.validating') }}
      </div>
    </div>

    <div v-if="!loading">
      <Tippy :content="toolTip">
        <div v-if="qualified && !expired" class="alert alert-success-soft show flex items-center mb-2" role="alert">
          <AlertTriangleIcon class="w-6 h-6 mr-2" /> {{ $t('verify.certificates.success') }}
        </div>
        <div
          v-else-if="!qualified && !expired"
          class="alert alert-warning-soft show flex items-center mb-2"
          role="alert"
        >
          <AlertCircleIcon class="w-6 h-6 mr-2" /> {{ $t('verify.certificates.warning') }}
        </div>
        <div v-else class="alert alert-danger-soft show flex items-center mb-2" role="alert">
          <AlertOctagonIcon class="w-6 h-6 mr-2" /> {{ $t('verify.certificates.error') }}
        </div>
      </Tippy>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { LoadingIcon } from '@/components/UIComponents';
import ValidationService from '@/infrastructure/services/Validation';

export default {
  name: 'VerifyTokenCertificatesComponent',
  components: { LoadingIcon },
  setup() {
    const toast = useToast();
    const store = useStore();

    const certLoading = computed(() => store.getters['card/getCertificateLoading']);
    const rootCert = computed(() => store.getters['card/getRootCertificate']);
    const intermediateCerts = computed(() => store.getters['card/getIntermediateCertificates']);
    const authenticationCert = computed(() => store.getters['card/getAuthenticationCertificate']);

    const loading = ref(true);
    const qualified = ref();
    const expired = ref();
    const toolTip = ref();

    const validateChain = () => {
      expired.value = undefined;
      qualified.value = undefined;
      toolTip.value = undefined;
      const certificates = [];

      if (authenticationCert.value?.certificates) {
        authenticationCert.value.certificates.reverse().forEach((cert) => {
          certificates.push(cert);
        });
      } else {
        certificates.push(authenticationCert.value.certificate);
      }

      if (intermediateCerts.value) {
        if (intermediateCerts.value.certificates) {
          intermediateCerts.value.certificates.reverse().forEach((cert) => {
            certificates.push(cert);
          });
        } else {
          certificates.push(intermediateCerts.value.certificate);
        }
      }

      if (rootCert.value?.certificates) {
        rootCert.value.certificates.reverse().forEach((cert) => {
          certificates.push(cert);
        });
      } else {
        certificates.push(rootCert.value.certificate);
      }

      ValidationService.validateChain(certificates).then((res) => {
        loading.value = false;
        expired.value = res.data.data.certificateChainValidationBreakDown.expired;
        qualified.value = res.data.data.certificateChainValidationBreakDown.qualifiedIssuer;
        toolTip.value = `Certificates are ${expired.value ? 'expired' : 'not expired'} and ${
          qualified.value ? 'qualified' : 'not qualified'
        }.`;
      });
    };

    onMounted(() => {
      validateChain();
    });

    watch(certLoading, (newValue, oldValue) => {
      console.log(newValue, oldValue);
      if (!newValue) {
        validateChain();
      } else {
        loading.value = true;
      }
    });

    return {
      loading,
      qualified,
      expired,
      toolTip,
    };
  },
};
</script>

<style src="./VerifyTokenCertificatesComponent.style.css" scoped />
