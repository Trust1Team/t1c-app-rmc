<template>
  <div class="grid grid-cols-12 footer text-white pt-5">
    <div class="col-span-2 pl-16 pt-3">
      <img
        alt="T1C logo"
        class="w-6 footer-logo"
        src="@/assets/images/t1c-logo.png"
      />
    </div>
    <div class="col-span-8 text-center text-base pl-10">
      {{ $t("navigation.service")}} <br> {{ $t("navigation.Copyright")}}
    </div>
    <div class="col-span-2 text-right">
      <a
        href=""
        class="clickable"
        :class="activeLang === 'fr' ? 'active' : ''"
        @click.prevent="switchLanguage('fr'), activeLang = 'fr'"
      > FR
      </a>
      <a
        href=""
        class="clickable"
        :class="activeLang === 'en' ? 'active' : ''"
        @click.prevent="switchLanguage('en'), activeLang = 'en'"
      > EN
      </a>
      <a
        href=""
        class="clickable"
        :class="activeLang === 'nl' ? 'active' : ''"
        @click.prevent="switchLanguage('nl'), activeLang = 'nl'"
      > NL
      </a>
      <span><i class="fas fa-question-circle" /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      activeLang: null,
      year: new Date().getFullYear()
    }
  },
  created() {
    this.activeLang = this.$i18n.locale
  },
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang
      window.VUE_APP_ENV_DEFAULT_LANGUAGE = lang
    }
  }
}
</script>

<style scoped>
.footer-logo {
  width: 35px;
}

a {
  color: white !important;
  text-decoration: none;
}
a:hover {
  color: #00a0c6;
  cursor: pointer;
  text-decoration: underline;
}
.clickable {
  padding-left: 4px;
  cursor: pointer;
}
.active {
  font-weight: 700;
}
</style>
