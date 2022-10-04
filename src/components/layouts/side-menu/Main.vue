<template>
  <div>
    <MobileMenu />
    <div class="flex">
      <nav class="side-nav">
        <router-link :to="{ name: 'side-menu-home' }" class="flex items-center pl-5 pt-4">
          <img alt="Read my cards" class="w-6" src="/assets/images/t1c-logo.png" />
          <span class="hidden xl:block text-white text-lg ml-3"> Read my cards </span>
        </router-link>
        <div class="side-nav__devider my-6"></div>
        <ul>
          <template v-for="(menu, menuKey) in formattedMenu">
            <li v-if="menu == 'devider'" :key="menu + menuKey" class="side-nav__devider my-6"></li>
            <li v-else :key="menu + menuKey">
              <SideMenuTooltip
                tag="a"
                :content="menu.title"
                :href="menu.subMenu ? 'javascript:;' : router.resolve({ name: menu.pageName }).path"
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router, $event)"
              >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              </SideMenuTooltip>
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                    <SideMenuTooltip
                      tag="a"
                      :content="subMenu.title"
                      :href="subMenu.subMenu ? 'javascript:;' : router.resolve({ name: subMenu.pageName }).path"
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active }"
                      @click="linkTo(subMenu, router, $event)"
                    >
                      <div class="side-menu__icon">
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div
                          v-if="subMenu.subMenu"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown,
                          }"
                        >
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                          <SideMenuTooltip
                            tag="a"
                            :content="lastSubMenu.title"
                            :href="
                              lastSubMenu.subMenu ? 'javascript:;' : router.resolve({ name: lastSubMenu.pageName }).path
                            "
                            class="side-menu"
                            :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click="linkTo(lastSubMenu, router, $event)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </SideMenuTooltip>
                        </li>
                      </ul>
                    </transition>
                  </li>
                </ul>
              </transition>
            </li>
          </template>
        </ul>
      </nav>
      <div class="content">
        <TopBar />
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TopBar } from '@/components/UIComponents';
import MobileMenu from '@/components/_framework/mobile-menu/Main';
import DarkModeSwitcher from '@/components/_framework/dark-mode-switcher/Main';
import SideMenuTooltip from '@/components/_framework/side-menu-tooltip/Main';
import Footer from '../footer/Main';
import $ from 'cash-dom';
import { linkTo, nestedMenu, enter, leave } from './index';

export default defineComponent({
  components: {
    TopBar,
    MobileMenu,
    DarkModeSwitcher,
    SideMenuTooltip,
    Footer,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formattedMenu = ref([]);
    const sideMenu = computed(() => nestedMenu(store.state.sideMenu.menu, route));

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = JSON.parse(JSON.stringify(sideMenu.value));
      },
    );

    onMounted(() => {
      $('body').removeClass('error-page').removeClass('login').addClass('main');
      formattedMenu.value = JSON.parse(JSON.stringify(sideMenu.value));
    });

    return {
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
    };
  },
});
</script>
