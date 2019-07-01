<template>
  <div id="header" :data-theme="menuTheme" :class="`${menuActive ? `trigger` : ``}`">
    <div class="sup">
      <div @click="triggerMenu" id="burger">
        <span class="icon">
          <svg
            width="16px"
            height="10px"
            viewBox="0 0 16 10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                id="Styles/Menu-Burger--black"
                transform="translate(0.000000, -2.000000)"
                fill="#000"
                fill-rule="nonzero"
              >
                <g id="Group" transform="translate(0.000000, 2.000000)">
                  <rect id="Rectangle" x="0" y="0" width="16" height="1.5" />
                  <rect id="Rectangle" x="0" y="4" width="16" height="1.5" />
                  <rect id="Rectangle" x="0" y="8" width="16" height="1.5" />
                </g>
              </g>
            </g>
          </svg>
        </span>
        <span>Menu</span>
      </div>
      <div id="logo">
        <nuxt-link to="/">Frankie Miles</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/search">Search</nuxt-link>
      </div>
    </div>

    <nav id="menu">
      <div v-for="item in menu.items">
        <nuxt-link
          exact
          :to="`/${item.url.replace(`${url}/`, ``)}`"
          class="menu-link"
        >{{ item.title }}</nuxt-link>

        <div v-if="item.title === `Journal`">
          <div class="menu-sub">
            <div>
              <nuxt-link to="/journal" class="menu-link--sub">Show all</nuxt-link>
            </div>
            <div v-for="category in categories">
              <nuxt-link
                v-if="category.name !== `Uncategorized`"
                :to="`/category/${category.slug}`"
                class="menu-link--sub"
              >{{category.name}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: [],
      menuActive: false,
      menuTheme: "dark",
      categories: [],
      url: " "
    };
  },
  methods: {
    getMenu(url) {
      let data = null;

      return axios.get(`${url}/wp-json/menus/v1/menus/main`).then(res => {
        this.menu = res.data;

        axios.get(`${url}/wp-json/wp/v2/categories`).then(res => {
          this.categories = res.data;
        });
      });
    },
    triggerMenu() {
      this.menuActive = !this.menuActive;
    }
  },
  mounted() {
    this.url = process.env.API;
    this.getMenu(this.url);
  }
};
</script>

<style lang="scss">
#header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 666;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 76px;
  background: rgba(255, 255, 255, 0);
  transition: background 0.1s ease;

  .sup {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 11px;
    margin-bottom: 32px;
  }
}

#burger {
  cursor: pointer;

  .icon {
    display: inline-block;
  }
}

#logo {
  font-family: "Gilda Display", serif;
  font-size: 36px;
  letter-spacing: -1.8px;
}

#menu {
  display: none;

  a {
    text-decoration: none;
    opacity: 0.5;

    &:not(last-child) {
      margin-right: 26px;
    }

    &.nuxt-link-active,
    &:hover {
      opacity: 1;
    }
  }

  .menu-link {
    text-transform: uppercase;
  }

  a {
    &:hover,
    &.nuxt-link-active {
      ~ div > .menu-sub {
        height: 60px;
      }
    }
  }

  div a {
    position: relative;
    z-index: 1;
  }

  .menu-sub {
    display: flex;
    width: 100%;
    position: absolute;
    transform: translateY(-16px);
    padding-top: 40px;
    z-index: -1;
    width: auto;

    overflow: hidden;
    height: 0;
    transition: all 0.1s ease;

    &:hover {
      height: 60px;
    }
  }

  .menu-link--sub {
  }
}

#header.trigger {
  background: rgba(255, 255, 255, 1);

  #burger {
    .icon {
      transform: rotate(90deg);
    }
  }

  #menu {
    display: flex;
  }
}

#header[data-theme="white"] {
  color: $purewhite !important;

  a {
    color: $purewhite !important;
  }

  #burger {
    .icon {
      g {
        fill: $purewhite;
      }
    }
  }

  #logo {
    a {
      color: $purewhite;
    }
  }

  #menu {
    a {
      color: $purewhite;
    }
  }
}

#header[data-theme="dark"],
#header.trigger {
  color: $pureblack !important;

  a {
    color: $pureblack !important;
  }

  #burger {
    .icon {
      g {
        fill: $pureblack;
      }
    }
  }

  #logo {
    a {
      color: $pureblack;
    }
  }

  #menu {
    a {
      color: $pureblack;
    }
  }
}
</style>

