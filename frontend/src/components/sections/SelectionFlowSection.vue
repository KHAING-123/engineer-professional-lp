<script setup>
import { computed } from 'vue'
import { selectionFlowSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'

/*
 * durationNote / offerNote は「選考期間の目安　5日以内　スピーディーに対応。」のように
 * 全角スペース区切りで書かれている（lpContent.js側の既存フォーマット）。
 * 文章そのものは変更せず、区切りで分割して強調表示に使う。
 */
const durationParts = computed(() => selectionFlowSection.durationNote.split('　'))
const offerParts = computed(() => selectionFlowSection.offerNote.split('　'))
</script>

<template>
  <section :id="selectionFlowSection.id" class="section selection-flow section-tint section-bg-decor">
    <div class="container">
      <div class="selection-flow-layout">
        <div class="flow-heading">
          <SectionHeading
            :number="selectionFlowSection.heading.number"
            :title="selectionFlowSection.heading.title"
            :lead="selectionFlowSection.heading.lead"
          />

          <!--
            Title背景の英文字Decoration。SectionHeading（.section-heading.is-revealed）の直後に置き、
            既存のReveal Stateを兄弟セレクタで参照してFade-in → Breathingを開始する。
            外側：Fade-in（opacity transition）/ 内側：Breathing（opacity animation）
          -->
          <div v-if="selectionFlowSection.decorativeLabel" class="selection-bg-text" aria-hidden="true">
            <span class="selection-bg-text-inner">{{ selectionFlowSection.decorativeLabel }}</span>
          </div>
        </div>

        <ol class="flow-list">
          <li v-for="(step, index) in selectionFlowSection.steps" :key="step.step" class="flow-item">
            <div class="flow-content">
              <div class="flow-icon" aria-hidden="true">
                <img v-if="step.icon" :src="step.icon" :alt="step.title" />
                <template v-else>
                  <svg v-if="step.step === '01'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 3h7l4 4v14H7Z" />
                    <path d="M14 3v4h4" />
                    <path d="M9 13h6" />
                    <path d="M9 17h6" />
                  </svg>
                  <svg v-else-if="step.step === '02'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 5h16v11H8l-4 3V5Z" />
                  </svg>
                  <svg v-else-if="step.step === '03'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
                  </svg>
                  <svg v-else-if="step.step === '04'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="4" width="12" height="16" rx="2" />
                    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 21V4" />
                    <path d="M6 4h11l-3 4 3 4H6" />
                  </svg>
                </template>
              </div>

              <span class="flow-number">{{ step.step }}</span>
              <h3>{{ step.title }}</h3>
              <p class="flow-description">{{ step.description }}</p>
              <span class="flow-duration" :class="{ 'is-final': index === selectionFlowSection.steps.length - 1 }">
                {{ step.duration }}
              </span>
            </div>

            <!--
              Step間Connector：Dotted Line + 中央のWhite Circle + Blue→Purple Arrow。
              PCはIcon Circle同士をつなぐ横向き、900px以下は縦向き（Arrowは↓へ回転）。
            -->
            <span v-if="index < selectionFlowSection.steps.length - 1" class="flow-connector" aria-hidden="true">
              <span class="flow-connector-line"></span>
              <span class="flow-connector-circle">
                <svg class="flow-connector-arrow" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient :id="`selectionArrowGradient${index}`" gradientUnits="userSpaceOnUse" x1="5" y1="12" x2="19" y2="12">
                      <stop offset="0%" stop-color="#2f80ed" />
                      <stop offset="100%" stop-color="#7b6cf6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"
                    :stroke="`url(#selectionArrowGradient${index})`"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </span>
          </li>
        </ol>

        <div class="flow-summary">
          <div class="summary-top">
            <span class="summary-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>

            <p class="summary-duration">
              <span class="summary-label">{{ durationParts[0] }}</span>
              <span class="summary-highlight">{{ durationParts[1] }}</span>
              <span class="summary-sub">{{ durationParts[2] }}</span>
            </p>

            <p v-if="selectionFlowSection.note" class="summary-note">{{ selectionFlowSection.note }}</p>
          </div>

          <div class="summary-divider" aria-hidden="true"></div>

          <p class="summary-offer">
            <span class="summary-label">{{ offerParts[0] }}</span>
            <span class="summary-strong">{{ offerParts[1] }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section背景：Step 1の共通Visual（.section-tint / .section-bg-decor）を利用し、
 * Section 07（の帯）からFinal CTAへ自然に続くようblobの位置・色を調整する。
 * 背景よりFlow Itemが目立つよう、opacityは抑えめにしている。
 */
.selection-flow {
  --decor-1-color: var(--color-accent-soft);
  --decor-1-top: -20%;
  --decor-1-left: -6%;
  --decor-1-size: 320px;
  --decor-1-opacity: 0.35;

  --decor-2-color: var(--color-purple-soft);
  --decor-2-bottom: -20%;
  --decor-2-right: -6%;
  --decor-2-size: 300px;
  --decor-2-opacity: 0.3;

  /* 完成デザインの密度に合わせ、共通.sectionクラスの大きいpadding-blockをこのSectionだけ上書きする */
  padding-block: var(--space-lg);
}

@media (max-width: 768px) {
  .selection-flow {
    padding-block: var(--space-lg);
  }
}

/*
 * PC: 「08 Heading | 5Step Flow | Summary」を1本の横長Bandに収める。
 */
.selection-flow-layout {
  display: grid;
  grid-template-columns: 196px 1fr 256px;
  grid-template-areas: 'heading flow summary';
  align-items: center;
  gap: var(--space-sm);
}

/*
 * 右側のStep 01〜05と比べて少し下に見えるため、左Headingブロックだけを上へずらす。
 * SectionHeading.vue内部（heading-number等）はReveal Animation用に個別のtransformを
 * 持っているが、.flow-heading自体には何のtransformも無いため、ここに静的なtransformを
 * 追加しても内部Animationのtransformを上書きすることはない（親子で別要素・別プロパティ適用）。
 * margin等ではなくtransformを使うことで、Grid（Step 01〜05・Summary Box）の
 * 行の高さ・位置には一切影響を与えない。
 */
.flow-heading {
  grid-area: heading;
  transform: translateY(-24px);
}

/* SectionHeading.vue本体は変更せず、このSectionだけ大幅にコンパクト化する */
.flow-heading :deep(.section-heading) {
  margin-bottom: 0;
  display: block;
}

.flow-heading :deep(.heading-main) {
  align-items: baseline;
  gap: 8px;
}

.flow-heading :deep(.heading-number) {
  font-size: 46px;
}

.flow-heading :deep(.heading-copy h2) {
  font-size: 20px;
  margin-bottom: 2px;
  white-space: nowrap;
}

.flow-heading :deep(.heading-lead) {
  font-size: 12px;
  line-height: 1.5;
}

/*
 * 5Step Selection Journey（Cardで囲まず、背景の上に直接配置）
 *   Icon Circle → Number → Title → Description → Period Pill
 *   Step間：Dotted Line + White Circular Arrow（.flow-connector）
 *
 * PC/Tabletは各Stepを均等幅（flex: 1 1 0）にし、Connectorを「自Stepのicon右端〜次Stepのicon左端」
 * へ絶対配置する（均等幅なので次のicon中心はちょうど100%右）。900px以下は縦のJourneyに切り替える。
 * Section全体のScroll Reveal（App.vueのv-scroll-reveal = section rootのtransform）とは別要素で、
 * 今回のFloat / Arrowの動きは個別プロパティ translate を使うため、既存transformとは競合しない。
 */
.flow-list {
  --flow-icon: 72px;
  --flow-img: 46px;
  --flow-arrow-circle: 40px;

  grid-area: flow;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
}

.flow-item {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
}

.flow-content {
  position: relative;
  z-index: 1;
  min-width: 0;
  text-align: center;
}

/* Icon Circle：White + ごく薄いLight BlueのHalo、1pxの薄いBlue border、弱いBlue Shadow */
.flow-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--flow-icon);
  height: var(--flow-icon);
  margin: 0 auto 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #ffffff 0%, #ffffff 48%, rgba(233, 243, 255, 0.95) 100%);
  border: 1px solid rgba(90, 165, 240, 0.16);
  box-shadow: 0 8px 24px rgba(60, 110, 220, 0.07);
  color: var(--color-accent);
  animation: flowIconFloat 5.2s ease-in-out infinite;
}

/* 参考画像のIcon周りの小さなDot（Light Blue / Light Purpleを1つずつ） */
.flow-icon::before,
.flow-icon::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.flow-icon::before {
  top: 4%;
  right: 4%;
  width: 6px;
  height: 6px;
  background: rgba(92, 201, 255, 0.6);
}

.flow-icon::after {
  top: 42%;
  left: -3px;
  width: 5px;
  height: 5px;
  background: rgba(150, 130, 245, 0.5);
}

.flow-item:nth-child(2) .flow-icon {
  animation-delay: -1s;
}

.flow-item:nth-child(3) .flow-icon {
  animation-delay: -2s;
}

.flow-item:nth-child(4) .flow-icon {
  animation-delay: -3s;
}

.flow-item:nth-child(5) .flow-icon {
  animation-delay: -4s;
}

@keyframes flowIconFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -3px;
  }
}

.flow-icon svg,
.flow-icon img {
  width: var(--flow-img);
  height: var(--flow-img);
  object-fit: contain;
}

.flow-number {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  letter-spacing: 0.02em;
  margin-bottom: 6px;
}

.flow-content h3 {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-primary-dark);
  line-height: 1.35;
  margin-bottom: 4px;
  white-space: nowrap;
}

.flow-description {
  font-size: 12.5px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

/* Period Pill：Very Light Blue + Blue Text（Border / Shadowなし） */
.flow-duration {
  position: relative;
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-accent);
  background: #e9f3ff;
  border-radius: 999px;
  padding: 4px 14px;
  white-space: nowrap;
}

/* 05「最短1週間」だけBlue → Purple Gradient Pill + 左右の小さなAccent Line */
.flow-duration.is-final {
  color: var(--color-white);
  background: linear-gradient(90deg, #2f80ed 0%, #5b6cff 55%, #8b6cf6 100%);
  box-shadow: 0 6px 16px rgba(70, 90, 230, 0.16);
}

.flow-duration.is-final::before,
.flow-duration.is-final::after {
  content: '';
  position: absolute;
  top: 1px;
  width: 8px;
  height: 2px;
  border-radius: 1px;
}

.flow-duration.is-final::before {
  left: -11px;
  background: #4f8df0;
  transform: rotate(40deg);
}

.flow-duration.is-final::after {
  right: -11px;
  background: #8b6cf6;
  transform: rotate(-40deg);
}

/* Connector：icon右端〜次Stepのicon左端。中央にWhite Circle */
.flow-connector {
  position: absolute;
  top: calc(var(--flow-icon) / 2);
  left: calc(50% + var(--flow-icon) / 2);
  width: calc(100% - var(--flow-icon));
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
}

/* 細いDotted Line：Blue → Light Purpleの薄いGradientをdotのmaskで切り抜く */
.flow-connector-line {
  position: absolute;
  top: -2px;
  left: 3px;
  right: 3px;
  height: 4px;
  background: linear-gradient(90deg, #6fa8f2, #9b8cf3);
  -webkit-mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 0 50% / 6px 4px repeat-x;
  mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 0 50% / 6px 4px repeat-x;
  opacity: 0.55;
  animation: flowConnectorPulse 5s ease-in-out infinite;
}

@keyframes flowConnectorPulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.75;
  }
}

.flow-connector-circle {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--flow-arrow-circle);
  height: var(--flow-arrow-circle);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(110, 130, 240, 0.16);
  box-shadow: 0 6px 18px rgba(60, 110, 220, 0.12);
}

/* Arrowは「次へ」方向へごく小さく動かす（PC: 右へ3px / 縦Journey: 下へ3px） */
.flow-connector-arrow {
  --flow-arrow-shift: 3px 0;

  width: 18px;
  height: 18px;
  animation: flowArrowNudge 3s ease-in-out infinite;
}

@keyframes flowArrowNudge {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: var(--flow-arrow-shift);
  }
}

/*
 * 右：選考期間・内定目安のSummary Box（縦長カードではなく横長・コンパクトに）。
 * サイズ・背景・border-radius・内部レイアウトはそのまま維持し、
 * Box全体にだけ柔らかいShadow＋非常にゆっくりしたFloat Animationを追加して
 * 「少し浮いて見える」立体感を出す。Noteは.flow-summaryの子要素のため、
 * 別Animationを持たせなくてもBox全体と自然に一緒に浮く。
 */
.flow-summary {
  grid-area: summary;
  background: linear-gradient(135deg, rgba(222, 245, 255, 0.95), rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(27, 58, 107, 0.08);
  border-radius: 14px;
  padding: 10px var(--space-md);
  box-shadow:
    0 10px 30px rgba(55, 105, 210, 0.1),
    0 4px 12px rgba(95, 135, 230, 0.08);
  animation: selectionSummaryFloat 5s ease-in-out infinite;
}

@keyframes selectionSummaryFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (hover: hover) and (pointer: fine) {
  .flow-summary:hover {
    animation: none;
    transform: translateY(-8px);
    transition: transform 0.3s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flow-summary {
    animation: none;
  }

  .flow-summary:hover {
    transform: none;
    transition: none;
  }
}

.summary-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1688ff, #20c8df);
  color: var(--color-white);
}

.summary-icon svg {
  width: 16px;
  height: 16px;
}

.summary-duration {
  flex-shrink: 0;
  line-height: 1.3;
}

.summary-label {
  display: block;
  font-size: 10px;
  color: var(--color-text-muted);
}

.summary-highlight {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-primary-dark);
  line-height: 1.15;
}

.summary-sub {
  display: block;
  font-size: 10px;
  color: var(--color-text-muted);
}

/* 手書き風note：「5日以内」の右側に、小さな付箋のように配置する */
.summary-note {
  margin-left: auto;
  flex-shrink: 0;
  max-width: 120px;
  font-size: 11px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.03em;
  color: var(--color-accent);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
  padding: 6px 10px;
  text-align: right;
  white-space: pre-line;
  transform: rotate(-4deg);
}

.summary-divider {
  height: 1px;
  background: rgba(27, 58, 107, 0.1);
  margin-block: 8px;
}

.summary-offer {
  font-size: 11px;
  line-height: 1.5;
  color: var(--color-text-muted);
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.summary-strong {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-accent);
}

/* Tablet: Headingを上段に、[Flow | Summary] を下段の2カラムにする */
@media (max-width: 1024px) {
  .selection-flow-layout {
    grid-template-columns: 1fr 260px;
    grid-template-areas:
      'heading heading'
      'flow summary';
    row-gap: var(--space-md);
  }

  .flow-list {
    --flow-icon: 64px;
    --flow-img: 42px;
    --flow-arrow-circle: 34px;
  }

  .flow-content h3 {
    font-size: 15px;
  }

  .flow-description {
    font-size: 12px;
  }

  .flow-connector-arrow {
    width: 16px;
    height: 16px;
  }

  .summary-note {
    max-width: 100px;
  }

  .flow-heading {
    transform: translateY(-18px);
  }
}

/* 768px: 5Stepが窮屈な場合は折り返しを許可し、読みやすさを優先する */
@media (max-width: 768px) {
  .flow-heading {
    transform: translateY(-10px);
  }
}

/* SP: Heading → 01〜05（縦Flow・↓矢印）→ Summary の完全な縦積み */
@media (max-width: 767px) {
  .selection-flow-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      'heading'
      'flow'
      'summary';
    row-gap: var(--space-md);
  }

  /* SPでは縦積みレイアウトに戻るため、PC/Tablet用の上方向Offsetは解除する */
  .flow-heading {
    transform: none;
  }

  .summary-top {
    flex-wrap: wrap;
  }

  .summary-note {
    max-width: none;
    text-align: left;
    transform: rotate(-1deg);
    margin-left: 38px;
  }
}

/*
 * 900px以下：Flow列の幅（768pxで約440px）では5Stepを横に並べるとTitleが収まらないため、
 * SPと同じVertical Selection Journeyに切り替える。Connectorは縦のDotted Line + ↓Arrow。
 */
@media (max-width: 900px) {
  .flow-list {
    --flow-icon: 60px;
    --flow-img: 40px;
    --flow-arrow-circle: 36px;

    flex-direction: column;
    align-items: center;
  }

  .flow-item {
    flex: none;
    width: 100%;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flow-content {
    width: 100%;
  }

  .flow-icon {
    margin-bottom: 8px;
  }

  .flow-number {
    font-size: 17px;
    margin-bottom: 4px;
  }

  .flow-description {
    margin-bottom: 6px;
  }

  .flow-connector {
    position: relative;
    top: auto;
    left: auto;
    width: var(--flow-arrow-circle);
    height: 52px;
    margin-block: 4px;
  }

  .flow-connector-line {
    top: 0;
    bottom: 0;
    left: 50%;
    right: auto;
    width: 4px;
    height: auto;
    margin-left: -2px;
    background: linear-gradient(180deg, #6fa8f2, #9b8cf3);
    -webkit-mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 50% 0 / 4px 6px repeat-y;
    mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 50% 0 / 4px 6px repeat-y;
  }

  /* ↓方向：SVGは同じものを個別プロパティ rotate で90°回転（Nudgeのtranslateとは別プロパティ） */
  .flow-connector-arrow {
    --flow-arrow-shift: 0 2px;

    width: 16px;
    height: 16px;
    rotate: 90deg;
  }
}

/* 今回追加したMotion（Icon Float / Connector / Arrow）だけを停止。すべて通常表示のまま */
@media (prefers-reduced-motion: reduce) {
  .flow-icon,
  .flow-connector-line,
  .flow-connector-arrow {
    animation: none;
  }
}

/*
 * Section 08 Title背景の「SELECTION」（Blue / Purple寄り）。PCではHeading列（196px）がStep 01の手前で終わるため、Step側へ侵入しないサイズに抑えている。
 * Section 02〜05の背景英文字（800 / Uppercase / letter-spacing / Blue系の薄い色）と同じTypographyを使い、
 * Animationだけ横Marqueeではなく opacity のみの Soft Fade-in → Breathing にしている。
 *   到達判定 … SectionHeading.vueの既存IntersectionObserverが付ける .section-heading.is-revealed を
 *              兄弟セレクタで参照（JS / scroll listenerの追加なし）
 *   外側 .selection-bg-text       … Fade-in（opacity transition 0.9s）
 *   内側 .selection-bg-text-inner … Breathing（opacity animation 5.6s）。transformは一切使わない
 */
.flow-heading {
  position: relative;
}

.flow-heading :deep(.section-heading) {
  position: relative;
  z-index: 1;
}

.selection-bg-text {
  position: absolute;
  left: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  top: -0.5em;
  font-size: 34px;
  letter-spacing: 0.08em;
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-heading.is-revealed ~ .selection-bg-text {
  opacity: 1;
}

.selection-bg-text-inner {
  display: block;
  background: linear-gradient(90deg, #2f6fed 0%, #8278f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.1;
}

.section-heading.is-revealed ~ .selection-bg-text .selection-bg-text-inner {
  animation: selectionBgBreath 5.6s ease-in-out 0.9s infinite;
}

/*
 * 少し見える → はっきり（30%）→ ゆっくり薄くなり、ほぼ消えた状態を65〜80%（約0.8s）維持 → 再表示。
 * 各区間はease-in-outで、急な点滅にならないようにしている。
 */
@keyframes selectionBgBreath {
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
  .selection-bg-text {
    /* Tabletでは.flow-heading自体が上へ18pxずれているため、Section上端で文字が切れないよう控えめに上げる */
    top: -0.1em;
    font-size: clamp(48px, 7vw, 72px);
    letter-spacing: 0.12em;
  }
}

/* SP：文字サイズ・Breathing幅を少し控えめにする */
@media (max-width: 767px) {
  .selection-bg-text {
    top: -0.36em;
    font-size: clamp(34px, calc((100vw - 48px) * 0.13), 58px);
    letter-spacing: 0.1em;
  }

  .selection-bg-text-inner {
    opacity: 0.08;
  }

  .section-heading.is-revealed ~ .selection-bg-text .selection-bg-text-inner {
    animation-name: selectionBgBreathSp;
  }

  @keyframes selectionBgBreathSp {
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
  .selection-bg-text,
  .section-heading.is-revealed ~ .selection-bg-text {
    opacity: 1;
    transition: none;
  }

  .selection-bg-text-inner,
  .section-heading.is-revealed ~ .selection-bg-text .selection-bg-text-inner {
    animation: none;
    opacity: 0.12;
  }
}
</style>
