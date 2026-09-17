<script setup>
import { footerContent } from '../../data/lpContent.js'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <p class="footer-brand">{{ footerContent.logoText }}</p>

        <nav class="footer-links">
          <a v-for="link in footerContent.links" :key="link.label" :href="link.href">{{ link.label }}</a>
        </nav>
      </div>

      <div class="footer-right">
        <ul class="footer-social">
          <li v-for="item in footerContent.social" :key="item.label">
            <a :href="item.href" :aria-label="item.label">
              <svg v-if="item.icon === 'x'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M4 4l16 16" />
                <path d="M20 4L4 20" />
              </svg>
              <svg v-else-if="item.icon === 'youtube'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="6" width="18" height="12" rx="4" />
                <path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="16.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </li>
        </ul>

        <p class="footer-copyright">{{ footerContent.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/*
 * 夕景のFinal CTA画像から、明るいFooterへ切り替える。
 * 濃紺背景は廃止し、非常に淡いBlue/Grayの背景にする（今回は変更しない）。
 */
.app-footer {
  background: var(--color-bg-soft);
}

/*
 * Footer背景はviewport全幅のままでよいが、Content自体はFinal CTA画像と同じ
 * --lp-max-width基準で中央配置し、他Sectionと不自然にサイズ差が出ないようにする。
 */
.footer-inner {
  width: 100%;
  max-width: var(--lp-max-width);
  margin-inline: auto;
  padding-inline: var(--container-padding);
  padding-block: 22px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

/* 左：PREAI + Legal Links */
.footer-left {
  display: flex;
  align-items: center;
  gap: 32px;
  min-width: 0;
}

.footer-brand {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-primary-dark);
  white-space: nowrap;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 12px;
}

.footer-links a {
  color: var(--color-text-muted);
  white-space: nowrap;
  position: relative;
}

.footer-links a:not(:last-child)::after {
  content: '｜';
  position: absolute;
  right: -12px;
  color: var(--color-border);
}

.footer-links a:hover {
  color: var(--color-primary-dark);
}

/* 右：SNS + Copyright */
.footer-right {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--color-text-muted);
  background: var(--color-white);
}

.footer-social a:hover {
  color: var(--color-accent);
}

.footer-social svg {
  width: 14px;
  height: 14px;
}

.footer-copyright {
  font-size: 12px;
  white-space: nowrap;
  color: var(--color-text-muted);
}

/* Tablet: 1行を維持しつつ、gap/font-sizeだけ縮める */
@media (max-width: 1024px) {
  .footer-left {
    gap: 20px;
  }

  .footer-brand {
    font-size: 20px;
  }

  .footer-links {
    gap: 14px;
    font-size: 11px;
  }

  .footer-links a:not(:last-child)::after {
    right: -8px;
  }

  .footer-right {
    gap: 20px;
  }
}

/* SP: 1行を維持せず、自然にwrap/縦積みする */
@media (max-width: 767px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: var(--space-md);
  }

  .footer-left {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 4px;
  }

  .footer-right {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
