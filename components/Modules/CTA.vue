<template>
  <div class="cta">
    <nuxt-link :to="cta.link">{{cta.label}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      cta: this.data
    };
  }
};
</script>

<style lang="scss">
.cta {
  margin: 0 auto 40px;
  text-align: center;

  &.hidden {
    opacity: 0;
    transition: 0.3s ease;
    pointer-events: none;
    display: none;
  }

  a {
    display: inline-block;
    padding: 6px 22px;
    width: 100%;
    width: max-content;
    background: $royalblue;
    border-radius: 25px;
    text-align: center;
    text-transform: uppercase;
    color: $purewhite;
    overflow: hidden;

    z-index: 1;
    position: relative;

    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 3;
    letter-spacing: 0.8px;

    color: white;
    outline: none;
    border: none;
    background-color: hsl(236, 32%, 26%);

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #2642b7;
      transform-origin: center bottom;
      transform: scaleY(0);
      transition: transform 0.25s ease-in-out;
    }
  }

  &:hover {
    a {
      &::before {
        transform-origin: center top;
        transform: scaleY(1);
      }
    }
  }
}
</style>

