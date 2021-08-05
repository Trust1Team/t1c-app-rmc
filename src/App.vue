<template>
  <div class="app-container">
    <Navigation />
    <div id="content">
      <div class="t1c-logo">
        <img src="./assets/t1c-logo-full.png" alt="t1c-logo" />
      </div>
      <router-view />
    </div>
  </div>

  <footer id="footer">
    <div class="logo">
      <img src="./assets/t1c-stamp.svg" alt="T1C logo" />
    </div>
    <div class="copyright">
      <p>
        This service is provided free of charge, and is intended for private use
        only. No personal info is saved when using this service.
      </p>
      <p>Copyright 2021 Trust1Team - All rights reserved</p>
    </div>
    <div>
      <a
        href=""
        class="clickable"
        :class="activeLang === 'en' ? 'active' : ''"
        @click.prevent="switchLanguage('en')"
        >EN</a
      >
      <a
        href=""
        class="clickable"
        :class="activeLang === 'nl' ? 'active' : ''"
        @click.prevent="switchLanguage('nl')"
        >NL</a
      >
      <a
        href=""
        class="clickable"
        :class="activeLang === 'fr' ? 'active' : ''"
        @click.prevent="switchLanguage('fr')"
        >FR</a
      >
    </div>
  </footer>
</template>

<script>
// @ is an alias to /src
import Navigation from "./components/nav/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {
      activeLang: null,
    };
  },
  created() {
    this.activeLang = this.$i18n.locale;
  },
  methods: {
    switchLanguage(lang) {
      this.$i18n.locale = lang;
      window.VUE_APP_ENV_DEFAULT_LANGUAGE = lang;
    },
  },
};
</script>

<style scoped>
.t1c-logo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  height: 100px;
  margin-bottom: 30px;
}

.app-container {
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: row;
}

#footer {
  height: 70px;
  background-color: #e05512;
  padding: 5px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

#footer .copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  line-height: 1rem;
}

.copyright p {
  margin: 5px 0 5px 0;
}

#footer .logo {
  width: 40px;
}

#content {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  min-height: calc(100vh - 130px);
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
