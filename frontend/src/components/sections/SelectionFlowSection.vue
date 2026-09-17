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
        </div>

        <ol class="flow-list">
          <li v-for="(step, index) in selectionFlowSection.steps" :key="step.step" class="flow-item">
            <div class="flow-content">
              <span class="flow-number">{{ step.step }}</span>

              <div class="flow-icon" aria-hidden="true">
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
              </div>

              <h3>{{ step.title }}</h3>
              <p class="flow-description">{{ step.description }}</p>
              <span class="flow-duration" :class="{ 'is-final': index === selectionFlowSection.steps.length - 1 }">
                {{ step.duration }}
              </span>
            </div>

            <span v-if="index < selectionFlowSection.steps.length - 1" class="flow-arrow" aria-hidden="true"></span>
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

/* 5Stepの小さく低いFlow（カード廃止、矢印もコンパクトに、Step同士を近づける） */
.flow-list {
  grid-area: flow;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.flow-item {
  display: flex;
  align-items: center;
  flex: 0 1 146px;
  min-width: 0;
}

.flow-content {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.flow-number {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 3px;
}

.flow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  margin-bottom: 5px;
}

.flow-icon svg {
  width: 30px;
  height: 30px;
}

.flow-content h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary-dark);
  line-height: 1.3;
  margin-bottom: 4px;
  white-space: nowrap;
}

.flow-description {
  font-size: 11.5px;
  line-height: 1.4;
  color: var(--color-text-muted);
  margin-bottom: 5px;
}

.flow-duration {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-accent);
  background: #e7f2ff;
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
}

.flow-duration.is-final {
  color: var(--color-white);
  background: var(--color-accent);
}

/* Step間の矢印。Stepの中央付近に来るよう、余白を作らず小さく配置する */
.flow-arrow {
  flex-shrink: 0;
  width: 12px;
  font-size: 13px;
  color: #8bbcff;
  text-align: center;
}

.flow-arrow::after {
  content: '\2192';
}

/* 右：選考期間・内定目安のSummary Box（縦長カードではなく横長・コンパクトに） */
.flow-summary {
  grid-area: summary;
  background: linear-gradient(135deg, rgba(222, 245, 255, 0.95), rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(27, 58, 107, 0.08);
  border-radius: 14px;
  padding: 10px var(--space-md);
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

  .flow-item {
    flex-basis: 108px;
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
  .flow-list {
    flex-wrap: wrap;
    row-gap: var(--space-sm);
  }

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

  .flow-list {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }

  .flow-item {
    flex-direction: column;
    flex-basis: auto;
    width: 100%;
    max-width: 220px;
  }

  .flow-arrow {
    width: auto;
    transform: rotate(90deg);
    margin-block: 2px;
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
</style>
