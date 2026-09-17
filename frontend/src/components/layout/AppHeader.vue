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
          {{ headerCta.label }}
        </span>
      </nav>

      <div class="header-actions">
        <span class="nav-cta header-message">
          {{ headerCta.label }}
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

/* CTAは濃いネイビー背景の横長pill型ボタン */
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-primary-dark);
  border: none;
  border-radius: 999px;
  padding: 10px 22px;
  color: var(--color-white);
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

/*
 * 「話しを詳しく聞いて見る」はLinkではなく装飾的なMessageのため、
 * クリック可能に見えるhover演出は持たせず、常時ごくわずかにFloatingさせるだけにする。
 */
.header-message {
  cursor: default;
  user-select: none;
  will-change: transform;
  animation: headerMessageFloat 4s ease-in-out infinite;
}

@keyframes headerMessageFloat {
  0% {
    transform: translate(0, 0);
  }
  30% {
    transform: translate(1px, -4px);
  }
  60% {
    transform: translate(-1px, 1px);
  }
  100% {
    transform: translate(0, 0);
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
    font-size: 12px;
    padding: 9px 18px;
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

  .header-actions .nav-cta {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  /* SPでは画面が小さいため、Floatingの振れ幅をPCより弱くする */
  .header-message {
    animation-name: headerMessageFloatSp;
  }

  @keyframes headerMessageFloatSp {
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
 * .header-message の animation 指定（767px内のSP版も含む）より後に置くことで、
 * 同じ詳細度でも確実にこちらを上書きさせる。
 */
@media (prefers-reduced-motion: reduce) {
  .header-message {
    animation: none;
    transform: none;
  }
}
</style>
