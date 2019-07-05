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
        <ul v-if="menu">
          <li v-for="i in menu">
            <a :href="i.url">{{i.title}}</a>

            <ul v-if="i.child_items">
              <li v-for="j in i.child_items">
                <a :href="j.url.replace(url, '')">{{j.title}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="right">
        <div class="item imaged">
          <nuxt-link to="/about">
            <img
              src="https://debray.space/frankiemiles/wp-content/uploads/2019/05/Rectangle@2x.jpg"
            />
            <div>
              <div>
                <p class="big">Frankie Miles</p>
                <p class="t-cat">About</p>
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="item imaged">
          <nuxt-link to="/projects">
            <img
              src="https://debray.space/frankiemiles/wp-content/uploads/2019/05/Rectangle@2x.jpg"
              style="opacity:0;"
            />
            <div>
              <div>
                <p class="big">
                  Comissioned
                  <br />Projects
                </p>
                <p class="t-cat">Discover More</p>
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

      const menu = axios
        .get(`${url}/wp-json/menus/v1/menus/footer/`)
        .then(res => {
          this.menu = res.data.items;
          console.log(this.menu);
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
      padding: 42px 5%;

      ul {
        list-style: none;
        padding-left: 0;
      }

      > ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 72px;
        justify-items: center;

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
        overflow: hidden;
        transition: 0.3s ease;

        a {
          display: inline;

          > div {
            position: absolute;
            bottom: 14%;
            top: 0;
            left: 0;
            right: 0;
            color: white;
            text-align: center;
            display: grid;
            align-content: end;
          }
        }

        .big {
          margin-bottom: 72px;
          transition: 0.3s ease;
        }

        &:first-child {
          .big {
            font-family: $serif;
            font-size: 36px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: -1.8px;
          }

          p {
            color: $purewhite;
          }
        }

        &:last-child {
          background: #f15731;

          .big {
            font-size: 28px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.43;
            letter-spacing: 0.62px;
          }

          p:not(.big) {
            color: $purewhite;
          }

          &:hover {
            background: $pureblack;
          }
        }
        &:hover {
          .big {
            color: #f15731;
          }
          background: $pureblack;
        }

        img {
          transform: scale(1.05);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    @media (max-width: $smallDown) {
      grid-template-columns: 1fr;
    }

    @media (max-width: $tabletDown) {
      /* grid-template-columns: 100%; */

      .left {
        padding: 30px 3.75%;

        > ul {
          grid-template-columns: 1fr 1fr;
          grid-gap: 24px 48px;
          justify-items: start;
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
