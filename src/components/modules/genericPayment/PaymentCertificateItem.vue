<template>
  <div v-if="getCertificateLoading" class="loading">
    <Loading icon="puff" :size="20"/>
  </div>
  <span v-if="!getCertificateLoading && !getCertificate">
            {{ $t("certificateInformation.noCertFound") }}
    </span>
  <div v-if="getCertificate">
    <div class="text-content cert intro-x box">
      <div>
          <span>
            {{ getCertificate }}
          </span>
      </div>

      <div
          class="cert-expand"
          @click="toggleCert"
      >
        <i class="fas fa-sort-down fa-lg cert-expand-icon"></i>
      </div>

      <div
          class="cert-copy"
          @click="copyTextToClipboard(getCertificate)"
      >
        <i class="far fa-copy"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/global-components/loading-icon/Main'
import copyMixin from '@/mixins/copyMixin'

export default {
  name: 'PaymentCertificateItem',
  props: {
    certificate: Object
  },
  methods: {
    toggleCert: function (event) {
      event.target.parentNode.parentNode.classList.toggle('cert-open')
      event.target.classList.toggle('cert-expand-rotated')
    }
  },
  computed: {
    getCertificateLoading() {
      return this.$store.getters['card/getCertificateLoading']
    },
    getCertificate() {
      if (this.certificate) {
        return this.certificate.data
      } else {
        return null
      }
    }
  },
  components: { Loading },
  mixins: [copyMixin]
}
</script>

<style scoped>
.text-content {
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  word-break: break-word;
}

.loading {
  width: 20px;
  height: 20px;
}

.cert {
  display: flex;
  max-height: 65px;
  overflow: hidden;
  transition: all 0.2s ease-in;
}

.cert-expand,
.cert-copy {
  height: 15px;
  color: #e05512;
  margin-left: 10px;
  margin-top: 5px;
}

.cert-expand:hover,
.cert-copy:hover {
  cursor: pointer;
}

.action-buttons button {
  width: 100%;
  margin-bottom: 20px;
}

.cert-open {
  max-height: 2000px;
}

.cert-expand-icon {
  transition: all 0.1s ease-in;
}

.cert-expand-rotated {
  transform: rotate(180deg);
}
</style>
