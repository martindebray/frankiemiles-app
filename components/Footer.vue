<template>
  <footer id="footer" v-if="menu[0]">
    <div class="sup social">
      <div v-for="item in social.items">
        <a :href="item.url" :title="item.title" target="_blank">{{item.title}}</a>
      </div>
    </div>

    <div class="sub">
      <div class="left">
        <div v-html="menu[0].acf.left"/>
      </div>

      <div class="right">
        <div
          v-for="item in menu[0].acf.right"
          class="item"
          :style="`background: ${item.colors[0].color};`"
        >
          <nuxt-link :to="`/${item.link.replace(`${url}/`, ``)}`">
            <img v-if="item.image.url" :src="item.image.url" :title="item.image.title">
            <div>
              <p class="p-big" :style="`color: ${item.colors[1].color};`">{{item.title}}</p>
              <p>{{item.baseline}}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: [],
      social: [],
      url: ""
    };
  },
  methods: {
    getMenu(url) {
      let data = null;

      const menu = axios.get(`${url}/wp-json/wp/v2/footer/`).then(res => {
        this.menu = res.data;
      });

      const social = axios
        .get(`${url}/wp-json/menus/v1/menus/social`)
        .then(res => {
          this.social = res.data;
        });
    }
  },
  mounted() {
    this.url = process.env.API;
    this.getMenu(this.url);
  }
};
</script>

<style lang="scss">
#footer {
  .sup {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    background: $fakewhite;
    border-bottom: solid 2px #d7dde4;

    div {
      display: inline-block;
      width: 100%;
      text-align: center;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      a {
        display: inline-block;
        padding: 44px 0;
        width: 100%;
      }
    }

    @media (max-width: $tabletDown) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .sub {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: $fakewhite;

    .left {
      display: grid;
      align-content: center;
      justify-content: center;

      ul {
        list-style: none;
        padding-left: 0;
      }

      > div > ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 72px;

        > li {
          > a {
            font-size: 10px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 1.2px;
          }

          > ul {
            margin-top: 12px;

            > li {
              margin-top: 6px;

              > a {
                font-size: 12px;
                font-weight: 300;
                font-style: normal;
                font-stretch: normal;
                line-height: 2;
                letter-spacing: 0.3px;
                color: #828282;

                &:hover {
                  color: $pureblack;
                }
              }
            }
          }
        }
      }

      pre {
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: 0.3px;
        color: #828282;
        font-family: $sans;

        a {
          color: #828282;

          &:hover {
            color: $pureblack;
          }
        }
      }
    }

    .right {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .item {
        position: relative;

        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -15%);
          color: white;
          text-align: center;
          height: 50%;
          text-align: center;
          display: grid;
          align-content: space-between;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        p:last-child {
          font-size: 10px;
          font-weight: 900;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 1.2px;
        }
      }
    }

    @media (max-width: $tabletDown) {
      grid-template-columns: 1fr;

      .left {
        padding: 48px;
        justify-content: flex-start;

        > div > ul {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
}
</style>
