<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { interviewSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'

/*
 * note（「まずは気軽に、お話ししましょう。」）を句読点で2行に分割して表示する。
 * 文章自体はlpContent.jsの既存データそのままで、改行位置だけをテンプレート側で決めている。
 */
const noteLines = computed(() => {
  const parts = interviewSection.note.split('、')
  if (parts.length < 2) return [interviewSection.note, '']
  return [`${parts[0]}、`, parts.slice(1).join('、')]
})

/*
 * interview-main.jpg がViewportに入った瞬間だけFade-in Animationを発火させる。
 * 一度表示されたらobserverを切断し、以降のScrollで再度Animationしないようにする。
 */
const revealRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  if (!revealRef.value || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.25 }
  )
  observer.observe(revealRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div :id="interviewSection.id" class="interview-panel">
    <div class="interview-top">
      <div class="panel-heading">
        <SectionHeading
          :number="interviewSection.heading.number"
          :title="interviewSection.heading.title"
          :lead="interviewSection.heading.lead"
        />

        <!--
          Title背景の英文字Decoration。SectionHeading（.section-heading.is-revealed）の直後に置き、
          既存のReveal Stateを兄弟セレクタで参照してFade-in → Breathingを開始する。
          外側：Fade-in（opacity transition）/ 内側：Breathing（opacity animation）
        -->
        <div v-if="interviewSection.decorativeLabel" class="interview-bg-text" aria-hidden="true">
          <span class="interview-bg-text-inner">{{ interviewSection.decorativeLabel }}</span>
        </div>
      </div>

      <p v-if="interviewSection.note" class="interview-note">
        <span class="note-accent" aria-hidden="true"></span>
        <span class="note-line">{{ noteLines[0] }}</span>
        <span class="note-line">{{ noteLines[1] }}</span>
      </p>
    </div>

    <!--
      interview-main.jpg には「こんな人が面接します」「株式会社PREAI」
      「代表取締役 / CEO」「小川 浩輝」などがすでに含まれているため、
      Checklistやプロフィール文言をHTMLで重ねて表示せず、画像をメインVisualとして使う。
      noteも画像の外側（上の.interview-top側）に置き、画像に重ねない。
    -->
    <div class="interview-visual">
      <div ref="revealRef" class="interview-image-reveal" :class="{ 'is-visible': isVisible }">
        <div class="interview-image-float">
          <div class="interview-image-hover">
            <img
              :src="interviewSection.interviewer.image"
              :alt="interviewSection.interviewerLabel"
              class="interview-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * App.vue側の共通Band（.support-interview-band）に収まる「パネル」としての実装。
 * Section 06と大きな背景・paddingを持たない点は変更していない。
 */
.interview-panel {
  height: 100%;
}

/* 上段：見出し＋Description（左） と note（右）を通常フロー（Grid）で並べる */
.interview-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 20px;
}

.panel-heading :deep(.section-heading) {
  margin-bottom: 0;
}

.panel-heading :deep(.heading-number) {
  font-size: 44px;
}

.panel-heading :deep(.heading-copy h2) {
  font-size: 21px;
}

/* 白い紙風のnote。画像には重ねず、Descriptionの右側に配置する */
.interview-note {
  position: relative;
  justify-self: end;
  display: inline-block;
  background: rgba(255, 255, 255, 0.94);
  padding: 10px 18px;
  border-radius: 6px;
  color: #1687d9;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.06em;
  white-space: nowrap;
  transform: rotate(-5deg);
  box-shadow: 0 8px 24px rgba(30, 80, 130, 0.06);
}

.note-line {
  display: block;
}

/* note右上の小さいBlueアクセント（2本線） */
.note-accent::before,
.note-accent::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 14px;
  background: var(--color-accent);
  border-radius: 1px;
}

.note-accent::before {
  top: -10px;
  right: 16px;
  transform: rotate(-25deg);
}

.note-accent::after {
  top: -4px;
  right: 6px;
  transform: rotate(-25deg);
}

/* Checklistが無くなった分のスペースを使い、画像をメインVisualとして大きく表示する */
.interview-visual {
  margin-top: var(--space-md);
}

/*
 * Animationの役割を3層に分けて、transformが競合しないようにする。
 * 1. .interview-image-reveal … Viewportに入った時の1回だけのFade In（opacity + translateY + scale）
 * 2. .interview-image-float  … 表示完了後、常時ごくゆっくり繰り返すSlow Float
 * 3. .interview-image-hover  … Mouse HoverのわずかなZoom（overflow:hiddenで角丸の外へはみ出さないよう制御）
 * 画像がpanel左端に張り付かないよう中央寄せし、以前より少し大きめに表示する（サイズはここで指定）。
 */
.interview-image-reveal {
  width: 100%;
  max-width: 460px;
  margin-inline: auto;
  opacity: 0;
  transform: translateY(30px) scale(0.97);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.interview-image-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Fade完了後だけ動き出すよう、Floatは.is-visible配下でのみanimationを付与する */
.interview-image-reveal.is-visible .interview-image-float {
  animation: interviewFloat 6s ease-in-out infinite;
}

@keyframes interviewFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.interview-image-hover {
  overflow: hidden;
  border-radius: var(--radius-md);
}

.interview-image {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Hover Zoomは、マウスを持つDeviceだけで有効にする（SPでは不要） */
@media (hover: hover) and (pointer: fine) {
  .interview-image-hover:hover .interview-image {
    transform: scale(1.02);
  }
}

/* Tablet: 横並びが窮屈な場合はnoteを見出しの下・右寄せに落とす */
@media (max-width: 1024px) {
  .interview-top {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .interview-note {
    justify-self: end;
  }
}

@media (max-width: 767px) {
  .interview-note {
    font-size: 12px;
    padding: 8px 14px;
  }

  .interview-image-reveal {
    max-width: 320px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .interview-image-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .interview-image-reveal.is-visible .interview-image-float {
    animation: none;
  }

  .interview-image {
    transition: none;
  }

  .interview-image-hover:hover .interview-image {
    transform: none;
  }
}

/*
 * Section 07 Title背景の「INTERVIEW」（Blue寄り）。06のSUPPORTと同じ文字サイズで、右側のnoteへ大きく掛からない幅にしている。
 * Section 02〜05の背景英文字（800 / Uppercase / letter-spacing / Blue系の薄い色）と同じTypographyを使い、
 * Animationだけ横Marqueeではなく opacity のみの Soft Fade-in → Breathing にしている。
 *   到達判定 … SectionHeading.vueの既存IntersectionObserverが付ける .section-heading.is-revealed を
 *              兄弟セレクタで参照（JS / scroll listenerの追加なし）
 *   外側 .interview-bg-text       … Fade-in（opacity transition 0.9s）
 *   内側 .interview-bg-text-inner … Breathing（opacity animation 5.6s）。transformは一切使わない
 */
.panel-heading {
  position: relative;
}

.panel-heading :deep(.section-heading) {
  position: relative;
  z-index: 1;
}

.interview-bg-text {
  position: absolute;
  left: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  top: -0.42em;
  font-size: clamp(44px, calc((min(100vw, 1280px) - 96px) * 0.06), 64px);
  letter-spacing: 0.12em;
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-heading.is-revealed ~ .interview-bg-text {
  opacity: 1;
}

.interview-bg-text-inner {
  display: block;
  background: linear-gradient(90deg, #2f6fed 0%, #4f9af7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.1;
}

.section-heading.is-revealed ~ .interview-bg-text .interview-bg-text-inner {
  animation: interviewBgBreath 5.6s ease-in-out 0.9s infinite;
}

/*
 * 少し見える → はっきり（30%）→ ゆっくり薄くなり、ほぼ消えた状態を65〜80%（約0.8s）維持 → 再表示。
 * 各区間はease-in-outで、急な点滅にならないようにしている。
 */
@keyframes interviewBgBreath {
  0%,
  100% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.17;
  }
  65%,
  80% {
    opacity: 0.015;
  }
}

@media (max-width: 1024px) {
  .interview-bg-text {
    font-size: clamp(44px, calc((100vw - 96px) * 0.06), 58px);
  }
}

/* SP：文字サイズ・Breathing幅を少し控えめにする */
@media (max-width: 767px) {
  .interview-bg-text {
    top: -0.36em;
    font-size: clamp(34px, calc((100vw - 48px) * 0.13), 58px);
    letter-spacing: 0.1em;
  }

  .interview-bg-text-inner {
    opacity: 0.08;
  }

  .section-heading.is-revealed ~ .interview-bg-text .interview-bg-text-inner {
    animation-name: interviewBgBreathSp;
  }

  @keyframes interviewBgBreathSp {
    0%,
    100% {
      opacity: 0.08;
    }
    30% {
      opacity: 0.14;
    }
    65%,
    80% {
      opacity: 0.015;
    }
  }
}

/* Animationは止めるが、文字自体は薄い背景Decorationとして常に表示する */
@media (prefers-reduced-motion: reduce) {
  .interview-bg-text,
  .section-heading.is-revealed ~ .interview-bg-text {
    opacity: 1;
    transition: none;
  }

  .interview-bg-text-inner,
  .section-heading.is-revealed ~ .interview-bg-text .interview-bg-text-inner {
    animation: none;
    opacity: 0.12;
  }
}
</style>
