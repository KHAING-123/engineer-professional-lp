<script setup>
import { useId } from 'vue'

/*
 * PREAI Wordmark（Header / Footer共通）。
 *   PRE … 既存フォントの極太テキスト（Dark Navy）
 *   AI  … inline SVG。横棒の無いGeometricな「A」（Λ型）+ 内側下部の丸いDot + 縦棒の「I」を
 *         1つのCyan → Blue → Purple Gradientで塗る。
 * SVGの高さはPREの大文字高さ（約0.73em）に合わせているため、親のfont-sizeを変えるだけで
 * Wordmark全体が比例して拡大縮小する。
 * 読み上げは全体を role="img" + aria-label="PREAI" にし、中身はaria-hiddenにする。
 * Gradient IDはHeader / Footerで重複しないよう useId() で固有にする。
 */
const gradientId = `preai-ai-gradient-${useId()}`
</script>

<template>
  <span class="preai-logo" role="img" aria-label="PREAI">
    <span class="preai-logo__pre" aria-hidden="true">PRE</span>
    <svg class="preai-logo__ai" viewBox="0 0 124 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient :id="gradientId" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="124" y2="90">
          <stop offset="0%" stop-color="#34c3f0" />
          <stop offset="50%" stop-color="#2f6fed" />
          <stop offset="100%" stop-color="#8b6cf6" />
        </linearGradient>
      </defs>
      <g :fill="`url(#${gradientId})`">
        <!-- A：横棒の無いΛ型（左右の太い斜めStroke） -->
        <path d="M0 100 L34 0 H54 L88 100 H66 L44 34 L22 100 Z" />
        <!-- A内側・中央下の丸いDot（Aの高さの約14%） -->
        <circle cx="44" cy="80" r="7" />
        <!-- I -->
        <rect x="104" y="0" width="20" height="100" />
      </g>
    </svg>
  </span>
</template>

<style scoped>
.preai-logo {
  display: inline-flex;
  align-items: baseline;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.preai-logo__pre {
  color: var(--color-primary-dark);
  letter-spacing: 0.02em;
}

/* 大文字の高さに揃え、baselineでPREと並べる。E → A の間隔はmarginで調整 */
.preai-logo__ai {
  display: block;
  height: 0.73em;
  width: calc(0.73em * 1.24);
  margin-left: 0.08em;
}
</style>
