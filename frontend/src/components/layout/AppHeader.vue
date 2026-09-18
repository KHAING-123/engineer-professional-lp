<script setup>
import { ref } from 'vue'
import { siteMeta, navLinks, headerCta } from '../../data/lpContent.js'

const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="app-header-inner">
      <a href="#" class="logo">{{ siteMeta.logoText }}</a>

      <nav class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <ul>
          <li v-for="link in navLinks" :key="link.label">
            <a :href="link.href" @click="closeMenu">{{ link.label }}</a>
          </li>
        </ul>
        <span class="nav-cta drawer-cta header-message">
          <span class="cta-decor" aria-hidden="true">
            <span class="decor-dot decor-dot-1"></span>
            <span class="decor-check"></span>
            <span class="decor-star-left"></span>
            <span class="decor-dot decor-dot-4"></span>
            <span class="decor-dot decor-dot-2"></span>
            <span class="decor-dot decor-dot-5"></span>
            <span class="decor-star"></span>
            <span class="decor-line"></span>
            <span class="decor-dot decor-dot-3"></span>
            <span class="decor-dot decor-dot-6"></span>
          </span>
          <span class="nav-cta-text">{{ headerCta.label }}</span>
          <span class="nav-cta-arrow" aria-hidden="true">→</span>
          <span class="nav-cta-underline" aria-hidden="true"></span>
        </span>
      </nav>

      <div class="header-actions">
        <span class="cta-divider" aria-hidden="true"></span>

        <span class="nav-cta header-message">
          <span class="cta-decor" aria-hidden="true">
            <span class="decor-dot decor-dot-1"></span>
            <span class="decor-check"></span>
            <span class="decor-star-left"></span>
            <span class="decor-dot decor-dot-4"></span>
            <span class="decor-dot decor-dot-2"></span>
            <span class="decor-dot decor-dot-5"></span>
            <span class="decor-star"></span>
            <span class="decor-line"></span>
            <span class="decor-dot decor-dot-3"></span>
            <span class="decor-dot decor-dot-6"></span>
          </span>
          <span class="nav-cta-text">{{ headerCta.label }}</span>
          <span class="nav-cta-arrow" aria-hidden="true">→</span>
          <span class="nav-cta-underline" aria-hidden="true"></span>
        </span>

        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="isMenuOpen"
          aria-label="メニューを開閉する"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/*
 * Header背景は画面幅いっぱい（full width）、
 * Header内容（.app-header-inner）だけ大画面で広がりすぎないよう max-width を設ける。
 * どちらも固定 width / min-width / vw は使わず、% ベースでビューポート幅に追従させる。
 */
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: 100%;
  /* Hero画像の上部（白〜淡いブルー・水色・パープル）に合わせたグラデーション */
  background: linear-gradient(100deg, #f8f6fd 0%, #f8fbfe 25%, #eef7fe 50%, #c9e6fd 75%, #d7dffc 100%);
}

.app-header-inner {
  width: min(100% - 48px, var(--lp-max-width));
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding-block: 16px;
}

.logo {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  color: var(--color-primary-dark);
  letter-spacing: 0.04em;
  flex-shrink: 0;
  /* ロゴの右側をすべて余白として使い、以降の要素（ナビ/CTA/メニュー）を右寄せにする */
  margin-right: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  min-width: 0;
}

.nav-links ul {
  display: flex;
  gap: var(--space-md);
}

.nav-links a {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary-dark);
  white-space: nowrap;
  transition: transform 0.25s ease, color 0.25s ease, text-shadow 0.25s ease;
}

/* Hoverで軽く浮き上がる＋Accent Blueへ。キーボード操作時は:focus-visibleでも同じ状態にする */
.nav-links a:hover,
.nav-links a:focus-visible {
  transform: translateY(-4px);
  color: var(--color-accent);
  text-shadow: 0 4px 10px rgba(16, 35, 63, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .nav-links a {
    transition: none;
  }

  .nav-links a:hover,
  .nav-links a:focus-visible {
    transform: none;
  }
}

/* .nav-cta.drawer-cta と2クラス指定にして、.nav-cta の display 指定より詳細度を上げる */
.nav-cta.drawer-cta {
  display: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

/* CTAの左に立てる細い縦線。「Navigation | CTA」の区切りとして機能する */
.cta-divider {
  width: 1px;
  height: 54px;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(120, 170, 255, 0.55), rgba(180, 150, 255, 0.55));
}

/*
 * CTAはButton/Pillではなく、装飾（Glow・Sparkle・手書き風Underline）に囲まれた
 * 「浮遊するTitle文字」として表現する。background/border/border-radiusは持たせず、
 * 背景は常にtransparent。
 */
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  position: relative;
  background: transparent;
  border: none;
  padding: 6px 4px 10px;
  color: #0a2b57;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
  white-space: nowrap;
  text-decoration: none;
}

/*
 * 「話しを詳しく聞いて見る」はLinkではなく装飾的なMessageのため、
 * クリック可能に見えるhover演出は持たせず、Glow/Sparkleが周囲をふわっと漂う。
 * ::before/::afterはCyan/PurpleのGlow（box化せず、blurしたradial-gradientのみ）。
 * isolation:isolateで、z-index:-1のGlowがこの要素の外（Bubble Layer等）に
 * 影響したり隠れたりしないよう、ローカルなstacking contextに閉じ込める。
 */
.header-message {
  cursor: default;
  user-select: none;
  isolation: isolate;
}

.header-message::before,
.header-message::after {
  content: '';
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(16px);
}

.header-message::before {
  left: -8%;
  bottom: -90%;
  width: 55%;
  height: 220%;
  background: radial-gradient(circle, rgba(70, 210, 230, 0.26) 0%, transparent 72%);
  animation: ctaGlowPulse 7s ease-in-out infinite;
}

.header-message::after {
  right: -10%;
  top: -90%;
  width: 55%;
  height: 220%;
  background: radial-gradient(circle, rgba(160, 120, 250, 0.22) 0%, transparent 72%);
  animation: ctaGlowPulse 8s ease-in-out infinite;
  animation-delay: 1.2s;
}

@keyframes ctaGlowPulse {
  0%,
  100% {
    opacity: 0.7;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

/*
 * 文字色はNavy一色ではなく、左=Navy→中央=Blue→右=Purpleへ自然につながる
 * グラデーションにする（background-clip:textで文字自体をグラデーション塗りにする）。
 * colorは非対応ブラウザ向けのFallback（background-clip:text自体が無視された場合に
 * 通常のNavy〜Blueで表示される）。
 * 文字自体も非常に小さくFloatingする（装飾とは別レイヤーで、Hover時のfilterと競合しないようにする）。
 */
.nav-cta-text {
  display: inline-block;
  color: #164db5;
  background: linear-gradient(90deg, #082a72 0%, #164db5 35%, #6046d9 70%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ctaTextFloat 4.2s ease-in-out infinite;
  transition: filter 0.28s ease;
}

@keyframes ctaTextFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Arrowは完全なNavyにせず、文字のグラデーション右端に近いBlue〜Purple系のアクセントカラーにする */
.nav-cta-arrow {
  display: inline-block;
  color: #5b4fd6;
  transition: transform 0.28s ease;
}

/*
 * テキスト＋矢印の下に敷く、手書き風のAccent Underline。
 * .header-messageの::before/::afterは左右のGlowで既に使用しているため、
 * Underlineは専用のspan要素として実装している（実質的に::afterと同じ「文字を囲まない飾り線」）。
 * 直線に見えすぎないよう、ごくわずかにrotateさせている。
 */
.nav-cta-underline {
  position: absolute;
  left: 4px;
  right: 6px;
  bottom: 0;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #18bdf2, #3488ff, #8b5cf6, #c084fc, #18bdf2);
  background-size: 220% 100%;
  transform: rotate(-1.1deg);
  animation: ctaUnderlineFlow 7s linear infinite;
  transition: filter 0.28s ease, opacity 0.28s ease;
}

/* 下線に非常に弱い左右方向のgradient animationを加える */
@keyframes ctaUnderlineFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

/*
 * 装飾は左上Cluster（Blue系：丸・V字Check・4方向キラキラ・小さい点）と
 * 右上/右下Cluster（Purple系：丸×2・薄いPurpleの点・キラキラ・斜めLine・小さい点）に分けて配置する。
 * CTA文字から離して配置し、文字と重ならないようにしている。
 * まとめて包むLayer（.cta-decor）はHover時にLayerごと少し広がる。
 * opacity 0.75〜1 / duration 2〜4s / 移動量5〜8px・scale最大1.3程度まで、
 * それぞれ視認しやすいよう強めに調整している。
 */
.cta-decor {
  position: absolute;
  inset: -14px -6px;
  pointer-events: none;
  transition: transform 0.35s ease;
}

.decor-dot,
.decor-star,
.decor-star-left {
  position: absolute;
  will-change: transform, opacity;
}

.decor-dot {
  border-radius: 50%;
}

/* 左上Cluster：水色の丸 */
.decor-dot-1 {
  top: 2px;
  left: -2px;
  width: 7px;
  height: 7px;
  background: radial-gradient(circle, #19bdf2, rgba(25, 189, 242, 0.25));
  animation: ctaDotFloatA 3.2s ease-in-out infinite;
}

/* 左上Cluster：小さいBlueの点 */
.decor-dot-4 {
  top: 8px;
  left: -6px;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #2196f3, rgba(33, 150, 243, 0.25));
  animation: ctaDotFloatA 2.6s ease-in-out infinite;
  animation-delay: 1.1s;
}

/* 左上Cluster：小さいBlueのV字（Check）Accent */
.decor-check {
  position: absolute;
  top: -18px;
  left: 14px;
  width: 12px;
  height: 10px;
  animation: ctaCheckFloat 3.6s ease-in-out infinite;
  animation-delay: 0.5s;
}

.decor-check::before,
.decor-check::after {
  content: '';
  position: absolute;
  height: 2.5px;
  border-radius: 1px;
  background: #3b82f6;
}

.decor-check::before {
  width: 6px;
  left: 0;
  top: 6px;
  transform: rotate(38deg);
}

.decor-check::after {
  width: 9px;
  left: 5px;
  top: 1px;
  transform: rotate(-40deg);
}

/* 左上Cluster：4方向に尖ったBlueのキラキラ。画像ではなくclip-pathで形を作る */
.decor-star-left {
  top: -20px;
  left: 36px;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #19bdf2, #3b82f6);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
  animation: ctaSparkleTwinkle 3.4s ease-in-out infinite;
  animation-delay: 1.6s;
}

/* 右上Cluster：Purpleの丸 */
.decor-dot-2 {
  top: -6px;
  right: -4px;
  width: 7px;
  height: 7px;
  background: radial-gradient(circle, #8b5cf6, rgba(139, 92, 246, 0.25));
  animation: ctaDotFloatB 3.8s ease-in-out infinite;
  animation-delay: 0.3s;
}

/* 右上Cluster：薄いPurpleの小さい点 */
.decor-dot-5 {
  top: 6px;
  right: -6px;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #c084fc, rgba(192, 132, 252, 0.25));
  animation: ctaDotFloatA 2.8s ease-in-out infinite;
  animation-delay: 1.4s;
}

/* 右上Cluster：小さいPurpleのキラキラ */
.decor-star {
  top: -20px;
  right: 10px;
  width: 9px;
  height: 9px;
  background: linear-gradient(135deg, #a855f7, #c084fc);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
  animation: ctaSparkleTwinkle 3s ease-in-out infinite;
  animation-delay: 2s;
}

/* 右下Cluster：Purpleの短い斜めLine */
.decor-line {
  position: absolute;
  bottom: -12px;
  right: -2px;
  width: 16px;
  height: 2.5px;
  border-radius: 1px;
  background: linear-gradient(90deg, #8b5cf6, #a855f7);
  transform: rotate(-32deg);
  animation: ctaLineFloat 3.6s ease-in-out infinite;
  animation-delay: 0.8s;
}

/* 右下Cluster：Purpleの丸 */
.decor-dot-3 {
  bottom: -14px;
  right: 14px;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #a855f7, rgba(168, 85, 247, 0.25));
  animation: ctaDotFloatA 3.2s ease-in-out infinite;
  animation-delay: 1.9s;
}

/* 右下Cluster：小さいPurpleの点 */
.decor-dot-6 {
  bottom: -4px;
  right: 30px;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #c084fc, rgba(192, 132, 252, 0.25));
  animation: ctaDotFloatB 2.4s ease-in-out infinite;
  animation-delay: 0.6s;
}

/* 丸・V字：ゆっくり上下に浮く（5〜8px） */
@keyframes ctaCheckFloat {
  0%,
  100% {
    transform: translateY(0) rotate(-4deg) scale(1);
    opacity: 0.75;
  }
  50% {
    transform: translateY(-7px) rotate(4deg) scale(1.15);
    opacity: 1;
  }
}

@keyframes ctaDotFloatA {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.75;
  }
  50% {
    transform: translate(3px, -6px) scale(1.3);
    opacity: 1;
  }
}

@keyframes ctaDotFloatB {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.75;
  }
  50% {
    transform: translate(-3px, 6px) scale(1.25);
    opacity: 1;
  }
}

/* キラキラ：小さく→大きく→小さく */
@keyframes ctaSparkleTwinkle {
  0%,
  100% {
    transform: translateY(0) rotate(-6deg) scale(0.85);
    opacity: 0.75;
  }
  50% {
    transform: translateY(-6px) rotate(8deg) scale(1.3);
    opacity: 1;
  }
}

/* 短いLine：少し回転しながら上下する */
@keyframes ctaLineFloat {
  0%,
  100% {
    transform: rotate(-32deg) translateY(0) scaleX(1);
    opacity: 0.75;
  }
  50% {
    transform: rotate(-22deg) translateY(-5px) scaleX(1.15);
    opacity: 1;
  }
}

/*
 * Hoverは控えめに、以下の3点だけに絞る：
 * 1. 文字色を少し明るいBlueへ（colorはanimationで触れていないので単純にtransitionできる）
 * 2. Arrowを右へ3〜5px
 * 3. Underlineのgradientを少し強調（filter: saturate/brightness）
 * 派手な拡大・浮き上がりAnimationは付けない。
 */
@media (hover: hover) and (pointer: fine) {
  .header-message:hover .nav-cta-text {
    filter: brightness(1.15) saturate(1.15);
  }

  .header-message:hover .nav-cta-arrow {
    transform: translateX(4px);
    color: #7c5cf0;
  }

  .header-message:hover .nav-cta-underline {
    opacity: 1;
    filter: saturate(1.35) brightness(1.08);
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.menu-toggle span {
  display: block;
  height: 2px;
  background: var(--color-primary-dark);
}

/* Tablet: 詰め込みすぎないよう間隔・文字サイズのみ調整（ナビ構成は維持） */
@media (max-width: 1024px) {
  .app-header-inner {
    gap: var(--space-sm);
  }

  .nav-links ul {
    gap: var(--space-sm);
  }

  .nav-links a {
    font-size: 13px;
  }

  .header-actions {
    gap: var(--space-sm);
  }

  .nav-cta {
    gap: 16px;
    font-size: 14px;
    padding: 6px 4px 9px;
  }

  .cta-divider {
    height: 46px;
  }
}

/* SP: ロゴ + ハンバーガーのみを表示し、ナビとCTAはドロワーに格納 */
@media (max-width: 767px) {
  .nav-links {
    position: fixed;
    inset: 65px 0 0 0;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
    background: var(--color-white);
    padding: var(--space-md) var(--container-padding);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 90;
  }

  .nav-links.is-open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-links ul {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .nav-cta.drawer-cta {
    display: inline-flex;
    width: fit-content;
    min-width: 190px;
    justify-content: center;
  }

  .header-actions .nav-cta,
  .cta-divider {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  /* SPでは装飾を10個から2〜3個程度に間引く（dot-1・line・starだけ残す） */
  .decor-check,
  .decor-star-left,
  .decor-dot-4,
  .decor-dot-2,
  .decor-dot-5,
  .decor-dot-3,
  .decor-dot-6 {
    display: none;
  }

  /* SPでは画面が小さいため、文字Floatingの振れ幅をPCより弱くする */
  .nav-cta-text {
    animation-name: ctaTextFloatSp;
  }

  @keyframes ctaTextFloatSp {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }
}

/*
 * .nav-cta-text 等のanimation指定（767px内のSP版も含む）より後に置くことで、
 * 同じ詳細度でも確実にこちらを上書きさせる。
 */
@media (prefers-reduced-motion: reduce) {
  .nav-cta-text,
  .nav-cta-underline,
  .header-message::before,
  .header-message::after,
  .decor-dot,
  .decor-star,
  .decor-star-left,
  .decor-check,
  .decor-line {
    animation: none;
  }

  .cta-decor,
  .nav-cta-arrow,
  .nav-cta-text,
  .nav-cta-underline {
    transition: none;
  }

  .header-message:hover .nav-cta-text {
    filter: none;
  }

  .header-message:hover .nav-cta-arrow {
    transform: none;
    color: #5b4fd6;
  }

  .header-message:hover .nav-cta-underline {
    filter: none;
  }
}
</style>
