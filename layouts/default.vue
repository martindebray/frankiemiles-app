<template>
  <div>
    <CustomHeader :key="key" />
    <main id="main">
      <nuxt />
    </main>
    <CustomFooter />
  </div>
</template>

<script>
import Vue from "vue";
import VueAnimate from "vue-animate-scroll";

import retina from "retinajs";
import VueRetina from "vue-retina";

import CustomHeader from "~/components/Header";
import CustomFooter from "~/components/Footer";

Vue.use(VueAnimate);
Vue.use(VueRetina, { retina });

export default {
  components: {
    CustomHeader,
    CustomFooter
  },
  data() {
    return {
      key: 0
    };
  },
  watch: {
    $route(to, from) {
      this.key = this.key + 1;
      /**
       * we need that to refresh the header each route change
       * otherwise the theme would be messed up
       * we do not want that
       */
    }
  },
  transition: "slide"
};
</script>


<style lang="scss">
html {
  font-family: $sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

main {
  min-height: 100vh;
}

.wrap {
  max-width: 1280px;
  margin: 166px auto 0;
  padding: 0 8.6% 130px;

  .text {
    margin-bottom: 80px;
    text-align: center;

    h2 {
      margin-bottom: 12px;
    }

    div {
      font-family: $serif;
      font-size: 18px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.78;
      letter-spacing: normal;
      color: #747474;
    }
  }

  @media (max-width: $tabletDown) {
    padding: 0 8.6% 40px;
    margin: 110px auto 0;

    .text {
      margin-bottom: 45px;
    }
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
  color: initial;
  cursor: pointer;
}

img {
  object-fit: cover;
  max-width: 100%;
}

.t-cat {
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.2px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 18px;
}

.t-serif {
  font-family: $serif;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.78;
  letter-spacing: normal;
  text-align: center;
  color: #747474;
}

.h1 {
  font-size: 68px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.06;
  letter-spacing: 1.5px;
  margin-bottom: 16px;

  @media (max-width: $mediumDown) {
    font-size: 32px;
  }
}

.h2 {
  font-size: 48px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.6px;
  text-align: center;

  @media (max-width: $mediumDown) {
    font-size: 32px;
  }
}

.text_l p,
.p-big {
  font-size: 28px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.6px;

  @media (max-width: $mediumDown) {
    font-size: 22px;
  }
}

.text_m p,
.p-med {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
}

.text_s p,
.p-small {
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.93;
}

p {
  font-size: 22px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;

  @media (max-width: $mediumDown) {
    font-size: 18px;
  }
}

figcaption {
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.4;
  letter-spacing: 0.4px;
  color: #787878;
}

.j-tit {
  font-size: 28px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.62px;
  text-align: center;
}

.j-txt {
  /* padding: 0 5%; */
}

.t-wrap {
  max-width: 894px;
  margin: 14px auto;
}

#sorting {
  padding: 0 3.7% 130px;

  h2 {
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
  }

  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;

    li {
      margin: 0 12px;
      float: left;
      cursor: pointer;

      font-family: $sans;
      font-size: 16px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;

      &:last-child {
        margin-right: 0;
      }

      &::before {
        content: "";
        width: 12px;
        height: 12px;
        background: $purewhite;
        display: inline-block;
        border: 1px solid $pureblack;
        border-radius: 100%;
        vertical-align: middle;
        margin-right: 10px;
        transform: translateY(-1.5px);
      }

      &:hover {
        &::before {
          background: $pureblack;
        }
      }
    }
  }

  .alpha {
    .alpha {
      &::before {
        background: $pureblack;
      }
    }
  }

  .chrono {
    .chrono {
      &::before {
        background: $pureblack;
      }
    }
  }

  @media (max-width: $tabletDown) {
    padding: 0 0 80px;

    .text {
      flex-direction: column;

      > div {
        width: min-content;
      }
    }

    ul {
      margin-top: 24px;
      padding-left: 0;
      display: flex;

      li {
        width: max-content;

        &:last-child {
          margin-right: 12px;
        }
      }
    }
  }
}

.m-social {
  display: flex;

  &:not(.sup) {
    margin-right: 34px;
  }

  > div {
    margin: 0 5px;
  }
}

.g-item {
  > a {
    display: inline-block;
    transition: all 0.5s;
    opacity: 1;

    h3,
    h4 {
      max-width: 80%;
    }

    &.loaded {
      opacity: 1;
    }
  }

  h4 {
    margin: 12px 0 6px;
    font-size: 10px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1.2px;
    color: #383839;
    text-transform: uppercase;
  }

  h3 {
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: 0.4px;
  }

  .projects,
  .press {
    h3 {
      margin-top: 6px;
      font-size: 19px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.63px;
    }
  }
}
/**
 * Page Animations
 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.7s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}

/**
 * Reveal Animations
 */
.animate {
  transition-delay: 0.05s;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier($cubic1);

  @media (max-width: $tabletDown) {
    transition-delay: 0s;
    transition-duration: 0.2s;
  }
}

.r-slide-down {
  opacity: 0;
  transform: translateY(40px);

  @media (max-width: $tabletDown) {
    transform: translateY(20px);
  }
}

.r-slide-down.animate-active {
  opacity: 1;
  transform: translateY(0px);
}
</style>
