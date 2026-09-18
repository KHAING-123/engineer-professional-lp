<script setup>
import { computed } from 'vue'
import { marketValueSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'

/*
 * 「見える景色が、きっと変わる。」を2行に分割する。
 * TeamMembersSection.vueのnoteLinesと同じ「、」区切りの手法をそのまま使い、
 * lpContent.jsのテキスト自体は変更しない。
 */
const noteLines = computed(() => {
  const note = marketValueSection.heading.note
  if (!note) return ['', '']
  const parts = note.split('、')
  if (parts.length < 2) return [note, '']
  return [`${parts[0]}、`, parts.slice(1).join('、')]
})
</script>

<template>
  <section :id="marketValueSection.id" class="section market-value section-tint section-bg-decor">
    <div class="container">
      <SectionHeading
        :number="marketValueSection.heading.number"
        :title="marketValueSection.heading.title"
        :lead="marketValueSection.heading.lead"
      />

      <div class="value-inner">
        <ol class="reasons-list" v-scroll-reveal-child="{ delay: 140, delaySp: 95 }">
          <li v-for="reason in marketValueSection.reasons" :key="reason.number" class="reason-row">
            <span class="reason-badge">{{ reason.number }}</span>
            <span class="reason-title">{{ reason.title }}</span>
            <span class="reason-description">{{ reason.description }}</span>
          </li>
        </ol>

        <div class="connector" aria-hidden="true" v-scroll-reveal-child="{ delay: 220, delaySp: 160 }">
          <svg class="connector-chevron" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3l16 13-16 13" />
          </svg>
        </div>

        <div class="result-area" v-scroll-reveal-child="{ delay: 300, delaySp: 235 }">
          <div v-if="marketValueSection.heading.note" class="market-note-wrap">
            <span class="market-note-spark market-note-spark-1" aria-hidden="true"></span>
            <span class="market-note-spark market-note-spark-2" aria-hidden="true"></span>
            <p class="value-note">
              <span class="value-note-line">{{ noteLines[0] }}</span>
              <span class="value-note-line">{{ noteLines[1] }}</span>
            </p>
          </div>

          <div class="result-box">
            <svg class="crown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 18h16l1-9-5 4-4-6-4 6-5-4 1 9Z" />
              <path d="M4 21h16" />
            </svg>
            <p class="result-text">{{ marketValueSection.ctaBox.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section背景：Step 1の共通Visual（.section-tint / .section-bg-decor）を利用しつつ、
 * Section 04とはblobの位置・色を変える。文字より目立たないよう不透明度を抑えている。
 */
.market-value {
  --decor-1-color: var(--color-purple-soft);
  --decor-1-top: -12%;
  --decor-1-left: 55%;
  --decor-1-size: 340px;
  --decor-1-opacity: 0.35;

  --decor-2-color: var(--color-accent-soft);
  --decor-2-bottom: -10%;
  --decor-2-right: -4%;
  --decor-2-size: 360px;
  --decor-2-opacity: 0.4;

  /* 参考画像のように横長・コンパクトなSectionにする */
  padding-block: var(--space-lg);
}

.value-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 50px minmax(260px, 320px);
  align-items: center;
  gap: 20px;
  margin-top: var(--space-lg);
}

/* 左：4つのReasonを細長い横長Rowで表示（Cardではない） */
.reasons-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.reason-row {
  display: grid;
  grid-template-columns: 56px 210px 1fr;
  align-items: stretch;
  column-gap: 14px;
  min-height: 52px;
  padding: 5px 14px 5px 0;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(180, 215, 245, 0.3);
  border-radius: 12px;
  box-shadow: none;
}

.reason-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 12px 0 0 12px;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-white);
}

.reason-row:nth-child(1) .reason-badge {
  background: #1c7ef2;
}

.reason-row:nth-child(2) .reason-badge {
  background: linear-gradient(135deg, #1c9df2 0%, #1ad6e0 100%);
}

.reason-row:nth-child(3) .reason-badge {
  background: #12c2d4;
}

.reason-row:nth-child(4) .reason-badge {
  background: #10c9a8;
}

.reason-title {
  align-self: center;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-primary-dark);
}

.reason-description {
  align-self: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--color-text-muted);
}

/* 中央：4RowからResultへの接続Chevron */
.connector {
  display: flex;
  align-items: center;
  justify-content: center;
}

.connector-chevron {
  width: 26px;
  height: 34px;
  color: #10a7d9;
}

/* 右：手書きnote＋暖色グラデーションのResult Box */
.result-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/*
 * note：TeamMembersSection.vue「いろんな経験が、ここでつながっている。」と同じ
 * Visual Language（手書き風フォント・青系グラデーション・カーブした下線・
 * 浮遊アニメーション）を踏襲しつつ、Section 03（3行＋下線）とは違う個性として
 * 「短い2行メッセージ＋きらめき」にする。下線・キラキラ・浮遊はそれぞれ別の
 * duration/delayで動かし、同期して見えないようにしている。
 */
.market-note-wrap {
  position: relative;
  margin-bottom: var(--space-sm);
  margin-left: 4px;
  transform: rotate(-2deg);
  animation: marketNoteFloat 6.4s ease-in-out infinite;
}

@keyframes marketNoteFloat {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
}

@media (hover: hover) and (pointer: fine) {
  .market-note-wrap:hover {
    animation: none;
    transform: translateY(-3px) rotate(-1deg) scale(1.02);
    transition: transform 0.3s ease;
    cursor: default;
  }
}

.value-note {
  position: relative;
  font-family: 'Hiragino Maru Gothic ProN', 'Yu Gothic', 'Noto Sans JP', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.7;
  letter-spacing: 0.07em;
  white-space: pre-line;
  color: #3488db;
  background: linear-gradient(90deg, #168fe8, #448eff, #806df2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 10px rgba(50, 130, 255, 0.08));
}

.value-note-line {
  display: block;
}

.market-note-wrap::after {
  content: '';
  position: absolute;
  left: 2%;
  right: 14%;
  bottom: -6px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #20a7ef, #5b8dff, #806df2);
  transform: rotate(-1.5deg);
  animation: marketUnderlinePulse 5.2s ease-in-out infinite;
  animation-delay: 0.4s;
}

@keyframes marketUnderlinePulse {
  0%, 100% { transform: rotate(-1.5deg) scaleX(0.92); }
  50% { transform: rotate(-1.5deg) scaleX(1); }
}

.market-note-spark {
  position: absolute;
  background: linear-gradient(135deg, #31b8f4, #7b73f4);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
  pointer-events: none;
  animation: marketSparkTwinkle 4s ease-in-out infinite;
}

.market-note-spark-1 {
  top: -8px;
  right: 4px;
  width: 11px;
  height: 11px;
  animation-duration: 4.2s;
}

.market-note-spark-2 {
  bottom: 6px;
  right: -12px;
  width: 8px;
  height: 8px;
  animation-duration: 3.4s;
  animation-delay: -1.6s;
}

@keyframes marketSparkTwinkle {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.15); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .market-note-wrap,
  .market-note-wrap::after,
  .market-note-spark {
    animation: none;
  }

  .market-note-wrap:hover {
    transform: rotate(-2deg);
  }
}

.result-box {
  width: 100%;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  background: linear-gradient(135deg, #fff3dd 0%, #ffe5bf 55%, #ffd49f 100%);
  border-radius: 12px;
  box-shadow: none;
  padding: var(--space-lg);
  text-align: center;
}

.crown-icon {
  width: 38px;
  height: 38px;
  color: var(--color-accent);
}

.result-text {
  font-size: 21px;
  font-weight: 800;
  line-height: 1.6;
  color: var(--color-primary-dark);
  white-space: pre-line;
}

/* Tablet: 3カラムは維持し、Title幅・中央・右の幅だけ縮小する */
@media (max-width: 1024px) {
  .value-inner {
    grid-template-columns: minmax(0, 1fr) 40px minmax(220px, 260px);
    gap: var(--space-md);
  }

  .reason-row {
    grid-template-columns: 52px 165px 1fr;
  }

  .reason-title {
    font-size: 16px;
  }

  .result-box {
    padding: var(--space-md);
  }

  .result-text {
    font-size: 18px;
  }

  .value-note {
    font-size: 17px;
  }
}

/*
 * 768px以下: Heading → 4Row → Note/Result Box の縦構成に切り替える。
 * Chevronも右向きから下向きへ変更する。
 */
@media (max-width: 768px) {
  .value-inner {
    grid-template-columns: 1fr;
    row-gap: var(--space-lg);
  }

  .reason-row {
    grid-template-columns: 52px 1fr;
    grid-template-areas:
      'badge title'
      'badge desc';
    row-gap: 2px;
    padding-block: 8px;
  }

  .reason-badge {
    grid-area: badge;
  }

  .reason-title {
    grid-area: title;
  }

  .reason-description {
    grid-area: desc;
  }

  .connector-chevron {
    transform: rotate(90deg);
  }

  .result-area {
    align-items: center;
  }

  .market-note-wrap {
    margin-left: 0;
  }

  .value-note {
    text-align: center;
    font-size: 16px;
  }

  .result-box {
    width: 100%;
    max-width: 320px;
  }
}
</style>
