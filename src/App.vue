<template>
  <header id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </header>

  <div id="content">
    <router-view />
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  width: 100%;
  height: 50px;
  background-color: #d9400e;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#nav a {
  margin: 10px;
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: white;
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
  display: flex;
  justify-content: center;
}
</style>
