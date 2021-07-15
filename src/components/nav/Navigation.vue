<template>
  <div class="nav-container">
    <div class="nav-header">
      <img
        class="nav-header-logo"
        src="../../assets/t1c-logo.png"
        alt="T1C logo"
      />
      <h1>Read my cards</h1>
    </div>

    <div class="nav-content">
      <div class="list-group-flush">
        <router-link to="/">
          <button type="button" class="list-group-item list-group-item-action">
            Home
          </button>
        </router-link>
        <button type="button" class="list-group-item list-group-item-action">
          Modules
        </button>
        <router-link to="/file-explorer">
          <button type="button" class="list-group-item list-group-item-action">
            File explorer
          </button>
        </router-link>
        <router-link to="/admin">
          <button type="button" class="list-group-item list-group-item-action">
            Admin panel
          </button>
        </router-link>
      </div>
    </div>

    <div class="nav-footer">
      <div class="list-group-flush">
        <router-link to="/contact">
          <button
            type="button"
            class="list-group-item list-group-item-action contact"
          >
            Contact us
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({}),
  methods: {},
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-container {
  width: 300px;
  background-color: #e05512;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-right: 3px solid #d24d0d;
  margin-right: 10px;
}

.nav-container .nav-header {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nav-container .nav-header h1 {
  font-size: 2.2rem;
  text-align: center;
  color: white;
  font-weight: bold;
  margin-top: 15px;
}

.nav-container .nav-header .nav-header-logo {
  width: 75px;
}

.nav-container .nav-content {
  width: 100%;
  flex-grow: 2;
}

.nav-container .footer {
  width: 100%;
}

.list-group-flush a {
  text-decoration: none;
}

.list-group-item {
  font-weight: bold;
  padding: 15px 10px 15px 10px;
  color: white;
  background-color: #e05512;
  margin: 0 10px 0 10px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid white;
  width: calc(100% - 20px);
}

.list-group-item:hover {
  background-color: #d24d0d;
  color: white;
}

.list-group-item:focus {
  background-color: #d24d0d;
  color: white;
}

.router-link-active .list-group-item {
  background-color: #cd4b0c;
  color: white;
}

.contact {
  border: none;
}
</style>
