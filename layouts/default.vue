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
  /* min-height: 100vh; */
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

      @media (max-width: $mediumDown) {
        font-size: 16px;
        line-height: 1.5;
      }
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

.h1,
h1 {
  font-size: 68px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.06;
  letter-spacing: 1.5px;
  margin-bottom: 16px;

  @media (max-width: $tabletDown) {
    font-size: 32px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.71px;
  }
}

.h2,
h2 {
  font-size: 48px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.6px;

  @media (max-width: $mediumDown) {
    font-size: 26px;
  }
}

.h3,
h3 {
  font-size: 28px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.62px;

  &.wide {
    max-width: 1300px !important;
  }

  @media (max-width: $mediumDown) {
    font-size: 32px;
  }

  @media (max-width: $tabletDown) {
    font-size: 20px;
    line-height: 1.2;
  }
}

p.has-large-font-size {
  font-size: 22px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;
  color: #090909;

  &.wide {
    max-width: 1300px !important;
  }

  @media (max-width: $tabletDown) {
    font-size: 18px;
    line-height: 1.56;
  }
}

p,
blockquote {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: normal;
  color: #090909;

  margin: 18px auto;

  &.wide {
    max-width: 1300px !important;
  }

  @media (max-width: $tabletDown) {
    font-size: 14px;
  }
}

p.has-small-font-size,
blockquote {
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.93;
  letter-spacing: normal;
  color: #090909;

  &.wide {
    max-width: 1300px !important;
  }

  @media (max-width: $tabletDown) {
    font-size: 12px;
    line-height: 1.67;
  }
}

blockquote {
  font-size: 16px;
  font-family: $serif;

  p {
    margin-bottom: 8px !important;
  }

  cite {
    font-size: 12px;
    color: #787878;
  }

  @media (max-width: $tabletDown) {
    font-size: 12px;

    cite {
      font-style: 9px;
    }
  }
}

blockquote.is-style-large {
  p {
    font-size: 20px;
  }

  cite {
    font-size: 14px;
  }

  @media (max-width: $tabletDown) {
    p {
      font-size: 16px;
    }

    cite {
      font-style: 11px;
    }
  }
}

.t-cat {
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin: 9px 0 4px;
}

.t-big-serif {
  p {
    font-family: $serif;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.78;
    letter-spacing: normal;
    text-align: center;
    color: #747474;

    @media (max-width: $tabletDown) {
      font-size: 16px;
      line-height: 1.5;
    }
  }
}

.cta {
  margin: 96px auto !important;

  a {
    border-radius: 25.5px;
    background-color: #28387b;
    color: $purewhite !important;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 3;
    letter-spacing: 0.8px;
    text-align: center;
    color: #ffffff;
    display: block;
    width: max-content;
    margin: 0 auto;
    padding: 2px 16px;
    text-transform: uppercase;
    text-decoration: none !important;
    transition: 0.3s ease;

    &:hover {
      background: rgb(241, 87, 49);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
      transform: translateY(-2px);
    }
  }

  opacity: 1;
  transition: 0.3s ease;

  @media (max-width: $tabletDown) {
    margin: 40px auto !important;
  }

  &.hidden {
    opacity: 0;
    margin: 0;
  }
}

.grid-md {
  .grid-item {
    text-align: left;

    .t-cat {
      margin: 9px 0 5px;
    }

    .grid-item-title {
      font-size: 19px;
      letter-spacing: 0.63px;
      font-weight: normal;
      margin: 0;
    }
  }
}

.grid-sm {
  .grid-item {
    text-align: left;

    .t-cat {
      margin: 9px 0 5px;
    }

    .grid-item-title {
      font-size: 14px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.71;
      letter-spacing: 0.4px;
      margin: 0;
    }
  }
}

.wp-block-image {
  margin: 74px auto 72px;

  .aligncenter {
    width: 100%;
    display: flex;
    flex-direction: column;
    width: fit-content;
    justify-content: center;
    justify-items: center;
    align-content: center;
    margin: 40px auto;
    width: 65%;
  }

  @media (max-width: $tabletDown) {
    .aligncenter {
      width: 90%;
    }
  }
}

.wp-block-columns {
  &.has-2-columns {
    padding: 0 10%;
    width: 100%;
    display: flex;
    flex-direction: row;
    width: fit-content;
    justify-content: center;
    justify-items: center;
    align-content: center;
    margin: 40px auto;
    width: 100%;

    > * {
      width: 46%;
      margin: 0 1%;
    }

    img {
      width: 100%;
    }
  }

  @media (max-width: $tabletDown) {
    &.has-2-columns {
      flex-direction: column;

      .wp-block-image {
        margin: 0;
      }

      > * {
        width: 100%;
        margin: 1% 0;
      }
    }
  }
}

.columns-5 {
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: fit-content;
  justify-content: center;
  justify-items: center;
  align-content: center;
  margin: 40px auto;
  width: 100%;
  align-items: center;

  list-style: none;

  > * {
    padding: 20%;
  }

  img {
    width: 100%;
  }

  @media (max-width: $mediumDown) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: $smallDown) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: $tabletDown) {
    grid-template-columns: 1fr 1fr;
  }
}

.wp-block-media-text {
  padding: 0 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  margin: 40px auto;
  width: 100%;

  &.wide {
    max-width: 1300px !important;
  }

  > * {
    width: 46%;
    margin: 0 1%;
  }

  img {
    width: 100%;
  }

  &.has-media-on-the-right {
    figure {
      order: 2;
    }

    div {
      order: 1;
    }
  }

  &.alignwide {
    padding: 0;
  }

  @media (max-width: $tablet) {
    flex-direction: column;
    text-align: center;

    > * {
      width: 100%;
      margin: 0 auto 96px;
    }

    &.has-media-on-the-right {
      figure {
        margin-bottom: 0;
      }
    }
  }
}

figcaption {
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0.4px;
  color: #787878;
  margin-top: 4px;
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

.markup {
  padding-top: 32px;

  p {
    a {
      font-weight: normal;
      color: #999999;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

/**
 * Page Animations
 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}

/**
 * Reveal Animations
 */
.animate {
  transition-delay: 0.025s;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier($cubic1);

  @media (max-width: $tabletDown) {
    transition-delay: 0s;
    transition-duration: 0.1s;
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
