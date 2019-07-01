<template>
  <div>
    <div
      v-for="mod in data.modules"
      :class="`mod mod-${mod.acf_fc_layout}`"
      v-animate="'r-slide-down'"
    >
      <TextMod v-if="mod.acf_fc_layout === `text_l`" :data="mod" />
      <TextMod v-if="mod.acf_fc_layout === `text_m`" :data="mod" />
      <TextMod v-if="mod.acf_fc_layout === `text_s`" :data="mod" />
      <ImageMod v-if="mod.acf_fc_layout === `image`" :data="mod" />
      <ImageImage v-if="mod.acf_fc_layout === `image_image`" :data="mod" />
      <TextImage v-if="mod.acf_fc_layout === `text_image`" :data="mod" />
      <Logos v-if="mod.acf_fc_layout === `logos`" :data="mod" />
      <CTA v-if="mod.acf_fc_layout === `cta`" :data="mod" />
    </div>
  </div>
</template>

<script>
import TextMod from "~/components/Modules/Text";
import ImageMod from "~/components/Modules/Image";
import ImageImage from "~/components/Modules/ImageImage";
import TextImage from "~/components/Modules/TextImage";
import Logos from "~/components/Modules/Logos";
import CTA from "~/components/Modules/CTA";

export default {
  props: ["data"],
  components: {
    TextMod,
    ImageMod,
    ImageImage,
    TextImage,
    Logos,
    CTA
  }
};
</script>

<style lang="scss">
.mod {
  padding: 18px 0;
  margin-top: 42px;
  margin-bottom: 42px;

  &:not(.mod-hero) {
  }
}
</style>

