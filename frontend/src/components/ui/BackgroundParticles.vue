<script setup>
/**
 * LP全体（Header〜Footer）に敷く、装飾専用のBubble背景レイヤー。
 * 各Sectionには一切手を加えず、このComponent1つだけをApp.vueの最上位に配置して使う。
 *
 * 大きいBubble(90〜150px)ほどopacityを下げ、小さいBubbleほどopacityを上げることで奥行きを出す。
 * 色はLight Blue / Cyan / Blue / Light Purpleの4系統のみを使用する。
 *
 * tier: 'core' | 'wide' | 'full'
 *   - core … SP/Tablet/PCすべてで表示。ページ上部〜下部（Header付近〜Footer付近）に
 *            必ず1〜2個ずつ配置し、「どのエリアにもBubbleが存在する」状態を担保する。
 *   - wide … core に加えてTablet/PCで追加表示（SPでは非表示）。
 *   - full … PCのみで追加表示（Tablet/SPでは非表示）。
 * 旧実装は nth-child(n+X) でDOM順の先頭からN個だけを残す間引き方をしており、
 * 配列の並び＝ページ上から下の並びだったため、SP/Tabletでは「ページ上部の
 * Bubbleしか残らない」→ 下へスクロールすると空白区間ができる、という問題があった。
 * tierベースにすることで、間引いても全エリアに最低1個は残るよう明示的に設計できる。
 */
const bubbles = [
  // ── Header / Hero 付近 ──────────────────────────────
  { top: '1%', left: '8%', size: 56, rise: -18, swayA: 14, swayB: -12, duration: 16, delay: 0, opacity: 0.32, color: '80, 170, 255', tier: 'core' },
  { top: '5%', left: '73%', size: 24, rise: -14, swayA: -10, swayB: 12, duration: 13, delay: 4, opacity: 0.38, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '2%', left: '95%', size: 130, rise: -22, swayA: 16, swayB: -14, duration: 20, delay: 2, opacity: 0.2, color: '130, 120, 255', tier: 'full' },

  // ── 01 どんな人が働いている？ 付近 ──────────────────
  { top: '13%', left: '22%', size: 46, rise: -16, swayA: -12, swayB: 10, duration: 15, delay: 6, opacity: 0.28, color: '180, 150, 255', tier: 'core' },
  { top: '17%', left: '84%', size: 80, rise: -20, swayA: 14, swayB: -16, duration: 18, delay: 1, opacity: 0.2, color: '80, 170, 255', tier: 'wide' },

  // ── 02 PREAIでの仕事 付近 ────────────────────────────
  { top: '23%', left: '8%', size: 30, rise: -14, swayA: 10, swayB: -11, duration: 14, delay: 8, opacity: 0.34, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '27%', left: '58%', size: 60, rise: -18, swayA: -14, swayB: 12, duration: 17, delay: 3, opacity: 0.26, color: '80, 170, 255', tier: 'core' },
  { top: '25%', left: '92%', size: 150, rise: -24, swayA: 18, swayB: -15, duration: 22, delay: 9, opacity: 0.15, color: '130, 120, 255', tier: 'full' },

  // ── 03 AIを使った働き方 付近 ─────────────────────────
  { top: '34%', left: '40%', size: 22, rise: -12, swayA: -9, swayB: 10, duration: 12, delay: 5, opacity: 0.36, color: '80, 170, 255', tier: 'core' },
  { top: '38%', left: '10%', size: 70, rise: -19, swayA: 12, swayB: -13, duration: 19, delay: 10, opacity: 0.22, color: '70, 210, 230', tier: 'wide' },

  // ── 04 社員のキャリアストーリー 付近 ────────────────
  { top: '44%', left: '70%', size: 50, rise: -17, swayA: -13, swayB: 14, duration: 16, delay: 2, opacity: 0.28, color: '180, 150, 255', tier: 'core' },
  { top: '48%', left: '26%', size: 34, rise: -15, swayA: 11, swayB: -10, duration: 13, delay: 7, opacity: 0.32, color: '70, 210, 230', tier: 'core', ring: true },
  { top: '46%', left: '92%', size: 110, rise: -23, swayA: 15, swayB: -17, duration: 21, delay: 4, opacity: 0.18, color: '80, 170, 255', tier: 'full' },

  // ── 05 なぜ市場価値が高まるのか？ 付近 ──────────────
  { top: '54%', left: '16%', size: 56, rise: -18, swayA: -12, swayB: 13, duration: 18, delay: 0, opacity: 0.26, color: '80, 170, 255', tier: 'core' },
  { top: '58%', left: '82%', size: 120, rise: -21, swayA: 16, swayB: -14, duration: 20, delay: 6, opacity: 0.17, color: '130, 120, 255', tier: 'full' },

  // ── 06 / 07（キャリアサポート・面接）付近 ──────────
  { top: '64%', left: '86%', size: 66, rise: -19, swayA: -14, swayB: 12, duration: 15, delay: 9, opacity: 0.28, color: '70, 210, 230', tier: 'core' },
  { top: '68%', left: '12%', size: 38, rise: -14, swayA: 10, swayB: -11, duration: 14, delay: 3, opacity: 0.3, color: '180, 150, 255', tier: 'wide', ring: true },
  { top: '71%', left: '50%', size: 100, rise: -24, swayA: 17, swayB: -15, duration: 22, delay: 11, opacity: 0.18, color: '80, 170, 255', tier: 'full' },

  // ── 08 選考フロー 付近 ───────────────────────────────
  { top: '77%', left: '32%', size: 44, rise: -16, swayA: -11, swayB: 12, duration: 16, delay: 5, opacity: 0.28, color: '70, 210, 230', tier: 'core' },

  // ── Final CTA 付近 ──────────────────────────────────
  { top: '86%', left: '70%', size: 30, rise: -13, swayA: 10, swayB: -9, duration: 13, delay: 8, opacity: 0.32, color: '130, 120, 255', tier: 'core', ring: true },
  { top: '89%', left: '14%', size: 64, rise: -18, swayA: 13, swayB: -14, duration: 19, delay: 1, opacity: 0.22, color: '80, 170, 255', tier: 'wide' },
  { top: '88%', left: '92%', size: 90, rise: -20, swayA: 15, swayB: -16, duration: 21, delay: 7, opacity: 0.18, color: '70, 210, 230', tier: 'full' },

  // ── Footer 付近 ─────────────────────────────────────
  { top: '93%', left: '22%', size: 26, rise: -13, swayA: 9, swayB: -10, duration: 14, delay: 2, opacity: 0.3, color: '80, 170, 255', tier: 'core' },
  { top: '96%', left: '68%', size: 40, rise: -15, swayA: -12, swayB: 11, duration: 17, delay: 10, opacity: 0.26, color: '180, 150, 255', tier: 'core' },
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
  animation: bubbleFloat var(--duration, 16s) ease-in-out infinite;
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
 * 下側でフェードイン → ごくゆっくり上昇しながら「左→右→左」と横にDrift → 上側でフェードアウト。
 * rise/swayはいずれも10〜25px程度に収め、激しく動かない「ふわっと浮く」動きにする。
 */
@keyframes bubbleFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(0.92);
    opacity: 0;
  }
  10% {
    opacity: var(--bubble-opacity, 0.24);
  }
  25% {
    transform: translate3d(var(--sway-a, 12px), calc(var(--rise, -16px) * 0.3), 0) scale(1);
  }
  50% {
    transform: translate3d(calc(var(--sway-a, 12px) * -1), calc(var(--rise, -16px) * 0.6), 0) scale(1.05);
  }
  75% {
    transform: translate3d(var(--sway-b, 12px), calc(var(--rise, -16px) * 0.85), 0) scale(0.97);
  }
  90% {
    opacity: var(--bubble-opacity, 0.24);
  }
  100% {
    transform: translate3d(0, var(--rise, -16px), 0) scale(0.9);
    opacity: 0;
  }
}

/* Tablet: PC専用(full)だけ間引く。core/wideは全エリアで維持する */
@media (max-width: 1024px) {
  .bubble-tier-full {
    display: none;
  }
}

/* SP: Tablet/PC専用(wide/full)を間引き、coreだけ残す。coreは既に全エリアへ分散済み */
@media (max-width: 767px) {
  .bubble-tier-full,
  .bubble-tier-wide {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble {
    animation: none;
    transform: none;
    opacity: var(--bubble-opacity, 0.24);
  }
}
</style>
