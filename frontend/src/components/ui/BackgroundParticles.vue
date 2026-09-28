<script setup>
/**
 * LP全体（Header〜Footer）に敷く、装飾専用のBubble背景レイヤー。
 * 各Sectionには一切手を加えず、このComponent1つだけをApp.vueの最上位に配置して使う。
 *
 * 大きいBubble(90〜150px)ほどopacityを下げ、小さいBubbleほどopacityを上げることで奥行きを出す。
 * 色はLight Blue / Cyan / Blue / Light Purpleの4系統のみを使用する。
 *
 * tier: 'core' | 'wide' | 'full' | 'sp'
 *   - core … SP/Tablet/PCすべてで表示。ページ上部〜下部（Header付近〜Footer付近）に
 *            必ず1〜2個ずつ配置し、「どのエリアにもBubbleが存在する」状態を担保する。
 *   - wide … core に加えてTablet/PCで追加表示（SPでは非表示）。
 *   - full … PCのみで追加表示（Tablet/SPでは非表示）。
 *   - sp   … SPのみで追加表示。SPはページが縦に長くBubbleが疎になりやすいため、
 *            Small〜Large（SPのLargeはこのtierのみ）を追加して密度を補う。
 * 表示数：PC 39（core 18 + wide 7 + full 14）/ Tablet 25（core + wide）/ SP 28（core + sp）。
 * sizeはPC基準のpx。Tablet ×0.85 / SP ×0.65（最小18px）で縮小する。
 * 配置は本文の真後ろを避け、主にSection左右の余白・Section境目の空白に置く。
 * 旧実装は nth-child(n+X) でDOM順の先頭からN個だけを残す間引き方をしており、
 * 配列の並び＝ページ上から下の並びだったため、SP/Tabletでは「ページ上部の
 * Bubbleしか残らない」→ 下へスクロールすると空白区間ができる、という問題があった。
 * tierベースにすることで、間引いても全エリアに最低1個は残るよう明示的に設計できる。
 */
const bubbles = [
  // ── Header / Hero 付近 ──────────────
  { top: '1%', left: '6%', size: 56, rise: -11, swayA: -7, swayB: 9, duration: 10, delay: -0.7, opacity: 0.26, color: '80, 170, 255', tier: 'core' },
  { top: '4%', left: '90%', size: 34, rise: -14, swayA: -6, swayB: 8, duration: 10, delay: -9.1, opacity: 0.32, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '2%', left: '95%', size: 150, rise: -9, swayA: -4, swayB: 7, duration: 16, delay: -1.1, opacity: 0.18, color: '130, 120, 255', tier: 'full' },
  { top: '8%', left: '3%', size: 90, rise: -7, swayA: 4, swayB: -10, duration: 19, delay: -2.4, opacity: 0.2, color: '180, 150, 255', tier: 'wide' },
  { top: '6%', left: '80%', size: 40, rise: -9, swayA: -8, swayB: 8, duration: 16, delay: -0.8, opacity: 0.3, color: '80, 170, 255', tier: 'sp' },

  // ── 01 どんな人が働いている？ 付近 ────────────
  { top: '13%', left: '94%', size: 46, rise: -9, swayA: -8, swayB: 10, duration: 12, delay: -3.5, opacity: 0.28, color: '180, 150, 255', tier: 'core' },
  { top: '15%', left: '1%', size: 120, rise: -8, swayA: -8, swayB: 6, duration: 18, delay: -14.7, opacity: 0.18, color: '80, 170, 255', tier: 'full' },
  { top: '18%', left: '4%', size: 30, rise: -8, swayA: -8, swayB: 8, duration: 20, delay: -3.8, opacity: 0.32, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '20%', left: '88%', size: 80, rise: -7, swayA: -8, swayB: 4, duration: 19, delay: -3.9, opacity: 0.2, color: '80, 170, 255', tier: 'wide' },
  { top: '22%', left: '8%', size: 36, rise: -14, swayA: 10, swayB: -6, duration: 17, delay: -10.0, opacity: 0.3, color: '130, 120, 255', tier: 'sp' },
  { top: '27.6%', left: '45%', size: 36, rise: -13, swayA: 6, swayB: -5, duration: 22, delay: -4.0, opacity: 0.24, color: '70, 210, 230', tier: 'full', ring: true },

  // ── 02 PREAIでの仕事 付近 ────────────────
  { top: '24%', left: '96%', size: 26, rise: -9, swayA: -8, swayB: 6, duration: 18, delay: -8.9, opacity: 0.34, color: '80, 170, 255', tier: 'core' },
  { top: '27%', left: '2%', size: 60, rise: -11, swayA: 6, swayB: -8, duration: 11, delay: -1.3, opacity: 0.24, color: '70, 210, 230', tier: 'core' },
  { top: '29%', left: '91%', size: 170, rise: -12, swayA: -10, swayB: 6, duration: 12, delay: -11.2, opacity: 0.16, color: '130, 120, 255', tier: 'full' },
  { top: '31%', left: '6%', size: 44, rise: -12, swayA: -9, swayB: 4, duration: 22, delay: -12.3, opacity: 0.28, color: '180, 150, 255', tier: 'wide', ring: true },
  { top: '33%', left: '92%', size: 30, rise: -11, swayA: 9, swayB: -6, duration: 19, delay: -9.4, opacity: 0.32, color: '70, 210, 230', tier: 'sp' },

  // ── 03 AIを使った働き方 付近 ────────────────
  { top: '36%', left: '93%', size: 52, rise: -13, swayA: -10, swayB: 4, duration: 14, delay: -6.6, opacity: 0.26, color: '80, 170, 255', tier: 'core' },
  { top: '38%', left: '0%', size: 140, rise: -7, swayA: -9, swayB: 9, duration: 14, delay: -9.1, opacity: 0.18, color: '70, 210, 230', tier: 'full' },
  { top: '41%', left: '5%', size: 24, rise: -13, swayA: 9, swayB: -7, duration: 20, delay: -6.9, opacity: 0.34, color: '130, 120, 255', tier: 'core' },
  { top: '43%', left: '97%', size: 70, rise: -13, swayA: 5, swayB: -8, duration: 11, delay: -5.4, opacity: 0.22, color: '180, 150, 255', tier: 'wide' },
  { top: '44%', left: '4%', size: 42, rise: -9, swayA: 5, swayB: -9, duration: 13, delay: -5.2, opacity: 0.28, color: '80, 170, 255', tier: 'sp', ring: true },
  { top: '45.5%', left: '60%', size: 30, rise: -13, swayA: -5, swayB: 7, duration: 16, delay: -8.8, opacity: 0.26, color: '80, 170, 255', tier: 'full' },

  // ── 04 社員のキャリアストーリー 付近 ──────────
  { top: '47%', left: '90%', size: 34, rise: -8, swayA: 10, swayB: -8, duration: 14, delay: -9.9, opacity: 0.3, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '49%', left: '3%', size: 100, rise: -11, swayA: 5, swayB: -5, duration: 11, delay: -1.9, opacity: 0.2, color: '80, 170, 255', tier: 'full' },
  { top: '51%', left: '7%', size: 48, rise: -9, swayA: -4, swayB: 7, duration: 19, delay: -3.5, opacity: 0.26, color: '180, 150, 255', tier: 'core' },
  { top: '53%', left: '95%', size: 190, rise: -10, swayA: -5, swayB: 7, duration: 18, delay: -6.6, opacity: 0.15, color: '80, 170, 255', tier: 'full' },
  { top: '54%', left: '88%', size: 160, rise: -11, swayA: -9, swayB: 10, duration: 18, delay: -17.1, opacity: 0.18, color: '130, 120, 255', tier: 'sp' },

  // ── 05 なぜ市場価値が高まるのか？ 付近 ────────
  { top: '57%', left: '2%', size: 38, rise: -6, swayA: 10, swayB: -10, duration: 20, delay: -16.0, opacity: 0.3, color: '80, 170, 255', tier: 'core' },
  { top: '59%', left: '92%', size: 110, rise: -12, swayA: 7, swayB: -7, duration: 11, delay: -5.3, opacity: 0.2, color: '130, 120, 255', tier: 'wide' },
  { top: '62%', left: '97%', size: 40, rise: -12, swayA: -5, swayB: 4, duration: 13, delay: -5.7, opacity: 0.22, color: '70, 210, 230', tier: 'full', ring: true },
  { top: '60%', left: '94%', size: 60, rise: -7, swayA: 8, swayB: -4, duration: 11, delay: -0.0, opacity: 0.26, color: '70, 210, 230', tier: 'sp' },

  // ── 06 / 07（キャリアサポート・面接）付近 ────
  { top: '65%', left: '96%', size: 56, rise: -8, swayA: -6, swayB: 8, duration: 10, delay: -0.7, opacity: 0.26, color: '70, 210, 230', tier: 'core' },
  { top: '67%', left: '0%', size: 160, rise: -9, swayA: 5, swayB: -9, duration: 14, delay: -13.4, opacity: 0.16, color: '180, 150, 255', tier: 'full' },
  { top: '69%', left: '4%', size: 28, rise: -11, swayA: 4, swayB: -4, duration: 17, delay: -16.9, opacity: 0.34, color: '80, 170, 255', tier: 'core', ring: true },
  { top: '71%', left: '91%', size: 90, rise: -13, swayA: 7, swayB: -6, duration: 11, delay: -1.6, opacity: 0.2, color: '80, 170, 255', tier: 'wide' },
  { top: '74%', left: '49%', size: 36, rise: -11, swayA: 7, swayB: -10, duration: 21, delay: -3.4, opacity: 0.24, color: '130, 120, 255', tier: 'full', ring: true },
  { top: '72%', left: '6%', size: 90, rise: -6, swayA: -8, swayB: 6, duration: 12, delay: -8.3, opacity: 0.2, color: '70, 210, 230', tier: 'sp' },

  // ── 08 選考フロー 付近 ────────────────────────
  { top: '76%', left: '30%', size: 34, rise: -6, swayA: 9, swayB: -10, duration: 11, delay: -7.7, opacity: 0.26, color: '130, 120, 255', tier: 'full', ring: true },
  { top: '78%', left: '3%', size: 44, rise: -10, swayA: 5, swayB: -6, duration: 22, delay: -4.9, opacity: 0.28, color: '130, 120, 255', tier: 'core' },
  { top: '80%', left: '94%', size: 130, rise: -14, swayA: 9, swayB: -5, duration: 19, delay: -15.4, opacity: 0.17, color: '70, 210, 230', tier: 'full' },
  { top: '82%', left: '89%', size: 26, rise: -9, swayA: -10, swayB: 7, duration: 21, delay: -16.9, opacity: 0.34, color: '80, 170, 255', tier: 'core' },
  { top: '81%', left: '92%', size: 130, rise: -9, swayA: 6, swayB: -9, duration: 10, delay: -9.9, opacity: 0.18, color: '180, 150, 255', tier: 'sp' },

  // ── Final CTA 付近 ──────────────────────
  { top: '86%', left: '8%', size: 34, rise: -10, swayA: 6, swayB: -5, duration: 21, delay: -12.7, opacity: 0.3, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '88%', left: '93%', size: 80, rise: -11, swayA: 10, swayB: -9, duration: 15, delay: -14.3, opacity: 0.2, color: '80, 170, 255', tier: 'wide' },
  { top: '90%', left: '48%', size: 50, rise: -11, swayA: -5, swayB: 4, duration: 13, delay: -6.1, opacity: 0.2, color: '180, 150, 255', tier: 'full' },
  { top: '89%', left: '5%', size: 50, rise: -11, swayA: -7, swayB: 8, duration: 19, delay: -16.0, opacity: 0.26, color: '80, 170, 255', tier: 'sp' },

  // ── Footer 付近 ────────────────────────────
  { top: '94%', left: '22%', size: 30, rise: -13, swayA: 10, swayB: -9, duration: 11, delay: -9.2, opacity: 0.32, color: '80, 170, 255', tier: 'core' },
  { top: '96%', left: '70%', size: 44, rise: -7, swayA: 10, swayB: -9, duration: 22, delay: -4.4, opacity: 0.28, color: '180, 150, 255', tier: 'core' },
  { top: '97%', left: '90%', size: 44, rise: -8, swayA: 10, swayB: -9, duration: 15, delay: -1.3, opacity: 0.3, color: '70, 210, 230', tier: 'sp', ring: true },
]
</script>

<template>
  <div class="bg-particles" aria-hidden="true">
    <span
      v-for="(bubble, index) in bubbles"
      :key="'bubble-' + index"
      class="bubble"
      :class="['bubble-tier-' + bubble.tier, { 'bubble-ring': bubble.ring }]"
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
 *
 * mask-imageはFooter直前のごく僅かな範囲だけソフトにフェードアウトさせ、
 * Footer付近まで自然にBubbleが見えるようにする（以前は78%から早期にフェードしていた）。
 */
.bg-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(180deg, #000 0%, #000 96%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 96%, transparent 100%);
}

/*
 * 「透明なシャボン玉」を意図したデザイン：中心はほぼ透明、縁にBlue/Cyan/Purpleが
 * ほんのり乗り、左上に柔らかいハイライトを置く。
 * 以前は縁の色が薄く blur(1px) もかかっていたため、普通にScrollすると認識しづらかった。
 * 縁の色をわずかに濃くし、blurを弱めて輪郭を少しだけはっきりさせている（Glowは控えめのまま）。
 *
 * --size-scale：Tablet ×0.85 / SP ×0.65（最小18px）。--motion-scale：SPは移動量を×0.6。
 */
.bubble {
  --size-scale: 1;
  --motion-scale: 1;

  position: absolute;
  width: max(18px, calc(var(--size) * var(--size-scale)));
  height: max(18px, calc(var(--size) * var(--size-scale)));
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 28%,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 0.12) 16%,
    transparent 36%,
    rgba(var(--bubble-color), 0.78) 76%,
    rgba(var(--bubble-color), 0.32) 100%
  );
  box-shadow:
    0 0 20px rgba(var(--bubble-color), 0.14),
    inset 0 0 14px rgba(255, 255, 255, 0.4);
  filter: blur(0.5px);
  opacity: var(--bubble-opacity, 0.24);
  will-change: transform;
  animation: bubbleFloat var(--duration, 16s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

/* 一部は塗りつぶしではなく、輪郭だけの透明Bubble（1pxのSoft Ring）にする */
.bubble.bubble-ring {
  background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.45) 0%, transparent 45%);
  border: 1px solid rgba(var(--bubble-color), 0.62);
  box-shadow: 0 0 14px rgba(var(--bubble-color), 0.14);
  filter: none;
}

/*
 * 0%と100%を同じ位置（translate 0,0）に戻す閉じたループにし、
 * 以前のように毎周期opacity:0まで消える区間を無くして、常に一定の薄さで見えるようにする。
 * 上下 rise（6〜14px）・左右 sway（4〜10px）だけのゆっくりしたDrift。Scaleは使わない。
 */
@keyframes bubbleFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(
      calc(var(--sway-a, 6px) * var(--motion-scale)),
      calc(var(--rise, -10px) * 0.5 * var(--motion-scale)),
      0
    );
  }
  50% {
    transform: translate3d(
      calc(var(--sway-b, -6px) * var(--motion-scale)),
      calc(var(--rise, -10px) * var(--motion-scale)),
      0
    );
  }
  75% {
    transform: translate3d(
      calc(var(--sway-a, 6px) * -0.5 * var(--motion-scale)),
      calc(var(--rise, -10px) * 0.45 * var(--motion-scale)),
      0
    );
  }
}

/* SP専用tierはPC/Tabletでは表示しない */
.bubble-tier-sp {
  display: none;
}

/* Tablet: PC専用(full)だけ間引く。core/wideは全エリアで維持し、サイズを少し縮める */
@media (max-width: 1024px) {
  .bubble {
    --size-scale: 0.85;
  }

  .bubble-tier-full {
    display: none;
  }
}

/* SP: wide/fullを間引き、core + SP専用(sp)を表示。サイズ・移動量はPCより小さくする */
@media (max-width: 767px) {
  .bubble {
    --size-scale: 0.65;
    --motion-scale: 0.6;
  }

  .bubble-tier-full,
  .bubble-tier-wide {
    display: none;
  }

  .bubble-tier-sp {
    display: block;
  }
}

/* Motionだけ止め、Bubble自体は静止した背景装飾として表示する */
@media (prefers-reduced-motion: reduce) {
  .bubble {
    animation: none;
    transform: none;
  }
}
</style>
