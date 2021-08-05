<template>
  <div class="nav-container">
    <div class="nav-header">
      <img
        class="nav-header-logo"
        src="../../assets/t1c-logo.png"
        alt="T1C logo"
      />
      <h1>{{ $t("navigation.Read my cards") }}</h1>
    </div>

    <div class="nav-content">
      <div class="list-group-flush">
        <div class="nav-item-container">
          <router-link to="/">
            <button
              type="button"
              class="list-group-item list-group-item-action"
            >
              {{ $t("navigation.Home") }}
            </button>
          </router-link>
        </div>

        <div class="nav-item-container">
          <button
            @click="dropdown()"
            type="button"
            class="list-group-item list-group-item-action dropdown-btn"
          >
            <span>{{ $t("navigation.Modules") }}</span>
            <i
              v-bind:class="{ active: dropdown_active }"
              class="fas fa-sort-down"
            ></i>
          </button>
          <div class="modules-list" v-if="dropdown_active">
            <router-link to="/modules/tokens">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.ID/Tokens") }}
              </button>
            </router-link>
            <router-link to="/modules/payment">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.Payment") }}
              </button>
            </router-link>
            <router-link to="/modules/">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.PKI") }}
              </button>
            </router-link>
            <router-link to="/modules/pki">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.Remote loading") }}
              </button>
            </router-link>
            <router-link to="/modules/transport">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.Transport") }}
              </button>
            </router-link>
            <router-link to="/modules/file-exchange">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.File exchange") }}
              </button>
            </router-link>
            <router-link to="/modules/other">
              <button
                type="button"
                class="list-sub-group-item list-group-item-action"
              >
                {{ $t("navigation.Other") }}
              </button>
            </router-link>
          </div>
        </div>

        <div class="nav-item-container">
          <router-link to="/file-explorer">
            <button
              type="button"
              class="list-group-item list-group-item-action"
            >
              {{ $t("navigation.Certificate manager") }}
            </button>
          </router-link>
        </div>

        <div class="nav-item-container">
          <router-link to="/admin">
            <button
              type="button"
              class="list-group-item list-group-item-action"
            >
              {{ $t("navigation.Admin panel") }}
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="nav-footer">
      <div class="list-group-flush">
        <div class="nav-item-container contact">
          <router-link to="/contact">
            <button
              type="button"
              class="list-group-item list-group-item-action"
            >
              {{ $t("navigation.Contact us") }}
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: () => {
    return {
      dropdown_active: false,
    };
  },
  methods: {
    dropdown() {
      this.dropdown_active = !this.dropdown_active;
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown-btn .fa-sort-down {
  transition: all 0.1s ease-in;
}

.dropdown-btn .active {
  transform: rotate(-180deg) translateY(-6px);
}

.dropdown-btn {
  display: flex;
  justify-content: space-between;
}

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

.list-sub-group-item {
  font-weight: 500;
  padding: 10px 10px 10px 30px;
  color: white;
  background-color: #e05512;
  font-size: 0.9rem;
  border: none;
  width: calc(100% - 20px);
}

.list-sub-group-item:hover {
  background-color: #d24d0d;
  color: white;
}

.list-sub-group-item:focus {
  background-color: #d24d0d;
  color: white;
}

.nav-item-container {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid white;
  margin: 0 10px 0 10px;
}

.list-group-item {
  font-weight: bold;
  padding: 15px 10px 15px 10px;
  color: white;
  background-color: #e05512;
  border: none;
  width: 100%;
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
