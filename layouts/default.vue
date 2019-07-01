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

import CustomHeader from "~/components/Header";
import CustomFooter from "~/components/Footer";

Vue.use(VueAnimate);

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
  max-width: 1176px;
  margin: 181px auto 0;
  padding: 0 0 130px;

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
  max-width: 100%;
}

.h1 {
  font-size: 68px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.06;
  letter-spacing: 1.5px;
  margin-bottom: 16px;

  @media (max-width: $mediumDown) {
    font-size: 48px;
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
    font-size: 36px;
  }
}

.text_l p,
.p-big {
  font-size: 28px;
  font-weight: 500;
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
