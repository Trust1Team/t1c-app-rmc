<template>
  <div class="app-container">
    <Navigation />
    <div id="content">
      <div class="header">
      <Header />
      </div>
      <router-view />
    </div>
  </div>

<!--  <footer id="footer">-->
<!--    <div class="logo">-->
<!--      <img src="./assets/t1c-stamp.svg" alt="T1C logo" />-->
<!--    </div>-->
<!--    <div class="copyright">-->
<!--      <p>-->
<!--        This service is provided free of charge, and is intended for private use-->
<!--        only. No personal info is saved when using this service.-->
<!--      </p>-->
<!--      <p>Copyright 2021 Trust1Team - All rights reserved</p>-->
<!--    </div>-->
<!--    <div class="i18n">NL EN</div>-->
<!--  </footer>-->
</template>

<script>
// @ is an alias to /src

import Navigation from "./components/nav/Navigation";
import Header from "./components/nav/Header";

export default {
  name: "App",
  components: {
    Navigation,
    Header
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}


#footer {
  height: 50px;
  background-color: #d9400e;
  padding: 5px 10px;
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

#footer .copyright {
  text-align: center;
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

.header {
  width: 100%;
  height: 65px;
}
</style>
