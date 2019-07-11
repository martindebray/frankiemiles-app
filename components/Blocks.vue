<template>
  <div>
    <div v-for="(i, k) in data" :key="k">
      <div v-html="i.innerHTML" v-animate="'r-slide-down'" v-if="i.innerBlocks.length === 0" />
      <div
        v-html="i.innerHTML"
        v-animate="'r-slide-down'"
        v-else-if="i.blockName === `core/media-text`"
      />
      <div v-animate="'r-slide-down'" v-else-if="i.blockName === `core/columns`">
        <div class="wp-block-columns has-2-columns">
          <div class="wp-block-column" v-html="i.innerBlocks[0].innerBlocks[0].innerHTML"></div>
          <div class="wp-block-column" v-html="i.innerBlocks[1].innerBlocks[0].innerHTML"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    this.data.map((i, k) => {
      if (i.blockName) {
        if (i.innerBlocks.length > 0) {
          if (i.blockName === `core/media-text`) {
            const _els = document.querySelector(
              ".wp-block-media-text__content"
            );
            _els.innerHTML = i.innerBlocks[0].innerHTML;
          }
        }
      }
    });
  }
};
</script>
