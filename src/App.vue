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
    <div class="i18n">NL EN</div>
  </footer>
</template>

<script>
// @ is an alias to /src

import Navigation from "./components/nav/Navigation";

export default {
  name: "App",
  components: { Navigation },
};
</script>

<style>
.t1c-logo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  height: 100px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

#footer .i18n {
  font-weight: bold;
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
</style>
