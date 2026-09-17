<script setup>
import { finalCtaSection } from '../../data/lpContent.js'
</script>

<template>
  <section :id="finalCtaSection.id" class="final-cta">
    <div class="final-cta-inner">
      <img :src="finalCtaSection.image" :alt="finalCtaSection.alt" class="final-cta-image" />
    </div>
  </section>
</template>

<style scoped>
/*
 * Final CTAは完成デザインの1枚画像のみで構成する。
 * キャッチコピー・人物・CTA Visualはすべて画像内に含まれているため、
 * HTML/CSSで同じ内容を重ねて表示しない。
 *
 * ただしHero同様、LP全体の幅基準（--lp-max-width）には従わせる。
 * 外側（.final-cta）は画面幅100%のままだが、画像本体は .final-cta-inner の
 * max-width: var(--lp-max-width) を超えて拡大しない。
 * --lp-max-width を超える大画面・ブラウザZoom Out時は、画像の端に近い色を
 * 外側の背景として敷き、左右の余白が不自然に白く浮かないようにする。
 */
.final-cta {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  line-height: 0;
  background: linear-gradient(90deg, #787483 0%, #8c8494 50%, #9f95a5 100%);
}

.final-cta-inner {
  width: 100%;
  max-width: var(--lp-max-width);
  margin-inline: auto;
}

.final-cta-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
</style>
