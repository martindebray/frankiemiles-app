<template>
  <footer id="footer" v-if="menu[0]">
    <div class="sup m-social">
      <div v-for="item in social.items">
        <a :href="item.url" :title="item.title" :class="item.title" target="_blank">
          <img v-if="item.title.toLowerCase() === `youtube`" src="~/assets/img/youtube.svg" />
          <img
            v-else-if="item.title.toLowerCase() === `pinterest`"
            src="~/assets/img/pinterest.svg"
          />
          <img v-else-if="item.title.toLowerCase() === `facebook`" src="~/assets/img/facebook.svg" />
          <img
            v-else-if="item.title.toLowerCase() === `instagram`"
            src="~/assets/img/instagram.svg"
          />
        </a>
      </div>
    </div>

    <div class="sub">
      <div class="left">
        <div v-html="menu[0].acf.left" />
      </div>

      <div class="right">
        <div
          v-for="item in menu[0].acf.right"
          :style="`background: ${item.colors[0].color};`"
          :class="`${item.image ? `imaged` : ``} item`"
        >
          <nuxt-link :to="`/${item.link.replace(`${url}/`, ``)}`">
            <img v-if="item.image.url" :src="url+item.image.url" :title="item.image.title" />
            <div>
              <div>
                <p class="p-big" :style="`color: ${item.colors[1].color};`">{{item.title}}</p>
                <p>{{item.baseline}}</p>
              </div>
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
    display: flex;
    justify-content: center;
    background: $fakewhite;
    border-bottom: solid 2px #d7dde4;

    div {
      display: inline-block;
      text-align: center;

      a {
        display: inline-block;
        padding: 44px 0;
        width: 100%;
      }
    }

    &.m-social {
      > div {
        margin: 0 12px;

        img {
          height: 20px;
          opacity: 0.4;
        }

        &:hover {
          img {
            opacity: 1;
          }
        }
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
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          height: 50%;
          text-align: center;
          display: grid;
          align-content: space-between;
        }

        &:not(.imaged) {
          a > div {
            height: 100%;
          }
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
      grid-template-columns: 100%;

      .left {
        padding: 30px 3.75%;
        justify-content: flex-start;

        > div > ul {
          grid-template-columns: 1fr 1fr;
          grid-gap: 24px 48px;
        }
      }

      .right {
        grid-template-columns: 1fr;

        div:not(.imaged) {
          a > div {
            position: relative;
            top: 0;
            left: 0;
            transform: translate(0, 0);
            height: 100%;

            &::before {
              content: "";
              position: relative;
              padding-top: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
