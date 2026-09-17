<script setup>
import { hero } from '../../data/lpContent.js'
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <picture class="hero-visual">
        <source v-if="hero.mobileImage" :srcset="hero.mobileImage" media="(max-width: 767px)" />
        <img :src="hero.desktopImage" :alt="hero.alt" class="hero-image" />
      </picture>
    </div>
  </section>
</template>

<style scoped>
/*
 * Hero外側（.hero）は画面幅100%のまま、
 * Hero元画像の実サイズ（1658px = --lp-max-width）を超えて
 * 画像だけが無制限に拡大されないよう、内側（.hero-inner）で上限をかける。
 * 1658pxを超える大画面では左右に余白が生まれるため、
 * 画像上部・左右の色に近いグラデーションを外側の背景として敷き、
 * 余白が白く浮いて見えないようにしている。
 *
 * overflow:hidden はレイアウト上限のためだけでなく、
 * 下記のAnimation（初回のtranslateY、Slow ZoomのScale）が
 * Section外へはみ出さないようにする役割も兼ねている。
 */
.hero {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  background: linear-gradient(180deg, #f5eefd 0%, #e7eefe 25%, #d0e0fd 50%, #dde5fd 75%, #ecf2fd 100%);
}

/*
 * Animationの役割を3層に分けて、transformが競合しないようにする。
 * 1. .hero-inner … ページ表示時の1回だけのFade Up（opacity + translateY + scale）
 * 2. .hero-visual（picture） … Mouse HoverのわずかなScale（transition）
 * 3. .hero-image（img） … 常時ゆっくり繰り返すSlow Zoom + 微小な浮遊（keyframe）
 */
.hero-inner {
  width: 100%;
  max-width: var(--lp-max-width);
  margin-inline: auto;
  animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/*
 * PC/Tablet: desktopImage を width:100%; height:auto; で表示（トリミングなし）。
 * .hero-inner の max-width が上限になるため、1658pxより大きく拡大されることはない。
 * SP: mobileImage が用意されていれば <source> 側に差し替わり、
 *     未設定（null）の間は desktopImage をそのまま縮小表示するフォールバックを維持する。
 */
.hero-inner picture {
  display: block;
  width: 100%;
}

.hero-visual {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-visual:hover {
  transform: scale(1.015);
}

.hero-inner img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.hero-image {
  /* Fade Upの完了（1s）を待ってから、常時ゆっくりのSlow Zoomを開始する */
  animation: heroSlowZoom 12s ease-in-out 1s infinite;
}

@keyframes heroSlowZoom {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.025) translateY(-4px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

/* SP: 画像内の文字・人物が窮屈に見えないよう、Slow Zoomの振れ幅を小さくする */
@media (max-width: 767px) {
  .hero-image {
    animation-name: heroSlowZoomSp;
  }

  @keyframes heroSlowZoomSp {
    0% {
      transform: scale(1) translateY(0);
    }
    50% {
      transform: scale(1.01) translateY(-2px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }
}

/* Motionを抑えたい環境では、Fade Up / Slow Zoom / Hover Zoomをすべて停止し、通常表示にする */
@media (prefers-reduced-motion: reduce) {
  .hero-inner {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero-image {
    animation: none;
  }

  .hero-visual {
    transition: none;
  }

  .hero-visual:hover {
    transform: none;
  }
}
</style>
