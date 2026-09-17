<script setup>
/**
 * LP全体（Header〜Footer）に敷く、装飾専用のBubble背景レイヤー。
 * 各Sectionには一切手を加えず、このComponent1つだけをApp.vueの最上位に配置して使う。
 *
 * 大きいBubble(160〜200px)ほどopacityを下げ、小さいBubbleほどopacityを上げることで奥行きを出す。
 * 色はLight Blue / Cyan / Blue / Light Purpleの4系統のみを使用する。
 */
const bubbles = [
  { top: '3%', left: '12%', size: 180, rise: -190, swayA: 16, swayB: -14, duration: 34, delay: 0, opacity: 0.22, color: '80, 170, 255' },
  { top: '8%', left: '82%', size: 60, rise: -140, swayA: -14, swayB: 12, duration: 20, delay: 3, opacity: 0.32, color: '130, 120, 255', ring: true },
  { top: '16%', left: '46%', size: 34, rise: -110, swayA: 12, swayB: -10, duration: 18, delay: 6, opacity: 0.36, color: '70, 210, 230' },
  { top: '24%', left: '18%', size: 90, rise: -160, swayA: -10, swayB: 14, duration: 26, delay: 2, opacity: 0.26, color: '180, 150, 255' },
  { top: '32%', left: '68%', size: 200, rise: -200, swayA: 15, swayB: -16, duration: 34, delay: 9, opacity: 0.2, color: '80, 170, 255' },
  { top: '40%', left: '32%', size: 44, rise: -120, swayA: -12, swayB: 10, duration: 19, delay: 5, opacity: 0.33, color: '70, 210, 230', ring: true },
  { top: '48%', left: '90%', size: 70, rise: -145, swayA: 13, swayB: -12, duration: 24, delay: 1, opacity: 0.28, color: '130, 120, 255' },
  { top: '56%', left: '6%', size: 160, rise: -180, swayA: -16, swayB: 15, duration: 28, delay: 8, opacity: 0.26, color: '180, 150, 255' },
  { top: '63%', left: '56%', size: 30, rise: -100, swayA: 11, swayB: -9, duration: 18, delay: 4, opacity: 0.38, color: '80, 170, 255' },
  { top: '70%', left: '24%', size: 66, rise: -135, swayA: -11, swayB: 13, duration: 22, delay: 7, opacity: 0.3, color: '70, 210, 230' },
  { top: '75%', left: '80%', size: 46, rise: -115, swayA: 14, swayB: -11, duration: 21, delay: 10, opacity: 0.3, color: '130, 120, 255', ring: true },
  { top: '80%', left: '40%', size: 120, rise: -165, swayA: -13, swayB: 16, duration: 26, delay: 3, opacity: 0.24, color: '180, 150, 255' },
]
</script>

<template>
  <div class="bg-particles" aria-hidden="true">
    <span
      v-for="(bubble, index) in bubbles"
      :key="'bubble-' + index"
      class="bubble"
      :class="{ 'bubble-ring': bubble.ring }"
      :style="{
        top: bubble.top,
        left: bubble.left,
        '--size': bubble.size + 'px',
        '--rise': bubble.rise + 'px',
        '--sway-a': bubble.swayA + 'px',
        '--sway-b': bubble.swayB + 'px',
        '--duration': bubble.duration + 's',
        '--delay': bubble.delay + 's',
        '--bubble-opacity': bubble.opacity,
        '--bubble-color': bubble.color,
      }"
    ></span>
  </div>
</template>

<style scoped>
/*
 * position: absolute + 親(.lp-page)の position: relative により、
 * ページ全体（Header〜Footerの合計の高さ）ぴったりに広がる。
 * z-index は各Sectionのroot（position:static、またはisolation:isolateのみでz-index:autoの
 * どちらか）より確実に上、かつHeader(sticky, z-index:100)より確実に下になるよう1にしている。
 */
.bg-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  /* Final CTA（完成画像）〜Footer付近では控えめ〜見えなくなるよう、下端をフェードアウトさせる */
  mask-image: linear-gradient(180deg, #000 0%, #000 78%, transparent 94%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 78%, transparent 94%);
}

/*
 * 「透明なシャボン玉」を意図したデザイン：中心はほぼ透明、縁にBlue/Cyan/Purpleが
 * ほんのり乗り、左上に柔らかいハイライトを置く。blurは輪郭が消えない程度に弱くする。
 */
.bubble {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 28%,
    rgba(255, 255, 255, 0.65) 0%,
    rgba(255, 255, 255, 0.1) 16%,
    transparent 38%,
    rgba(var(--bubble-color), 0.62) 78%,
    rgba(var(--bubble-color), 0.2) 100%
  );
  box-shadow:
    0 0 24px rgba(var(--bubble-color), 0.16),
    inset 0 0 16px rgba(255, 255, 255, 0.35);
  filter: blur(1px);
  opacity: 0;
  will-change: transform, opacity;
  animation: bubbleFloat var(--duration, 24s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

/* 一部は塗りつぶしではなく、輪郭だけの透明Bubbleにする */
.bubble.bubble-ring {
  background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.4) 0%, transparent 45%);
  border: 1.5px solid rgba(var(--bubble-color), 0.42);
  box-shadow: 0 0 18px rgba(var(--bubble-color), 0.16);
  filter: blur(0.5px);
}

/*
 * 0%/100%をどちらもopacity:0・同じtransformにすることで、
 * ループの継ぎ目で位置が瞬間移動しても見た目には現れないようにしている。
 * 下側でフェードイン → 上昇しながら「左→右→左」と横にDrift → 上側でフェードアウト。
 */
@keyframes bubbleFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(0.92);
    opacity: 0;
  }
  10% {
    opacity: var(--bubble-opacity, 0.2);
  }
  25% {
    transform: translate3d(var(--sway-a, 12px), calc(var(--rise, -140px) * 0.18), 0) scale(1);
  }
  50% {
    transform: translate3d(calc(var(--sway-a, 12px) * -1), calc(var(--rise, -140px) * 0.5), 0) scale(1.05);
  }
  75% {
    transform: translate3d(var(--sway-b, 12px), calc(var(--rise, -140px) * 0.82), 0) scale(0.97);
  }
  90% {
    opacity: var(--bubble-opacity, 0.2);
  }
  100% {
    transform: translate3d(0, var(--rise, -140px), 0) scale(0.9);
    opacity: 0;
  }
}

/* Tablet: 6〜8個程度になるよう間引く */
@media (max-width: 1024px) {
  .bubble:nth-child(n + 8) {
    display: none;
  }
}

/* SP: 4〜5個程度になるよう間引き、サイズも一回り小さくする */
@media (max-width: 767px) {
  .bubble:nth-child(n + 6) {
    display: none;
  }

  .bubble {
    width: calc(var(--size) * 0.7);
    height: calc(var(--size) * 0.7);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble {
    animation: none;
    transform: none;
    opacity: var(--bubble-opacity, 0.2);
  }
}
</style>
