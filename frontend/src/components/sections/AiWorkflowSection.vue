<script setup>
import { aiWorkflowSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
</script>

<template>
  <section :id="aiWorkflowSection.id" class="section ai-workflow section-tint section-bg-decor">
    <div class="container">
      <SectionHeading
        :number="aiWorkflowSection.heading.number"
        :title="aiWorkflowSection.heading.title"
        :lead="aiWorkflowSection.heading.lead"
        :note="aiWorkflowSection.heading.note"
      />

      <div class="workflow-inner">
        <div class="tools-panel">
          <p class="tools-label">{{ aiWorkflowSection.toolsLabel }}</p>
          <ul class="tools-list">
            <li v-for="tool in aiWorkflowSection.tools" :key="tool.id">
              <span class="tool-icon" aria-hidden="true">{{ tool.name.charAt(0) }}</span>
              <span class="tool-name">{{ tool.name }}</span>
            </li>
          </ul>
        </div>

        <ol class="steps-flow">
          <li v-for="(step, index) in aiWorkflowSection.steps" :key="step.step" class="step-item">
            <div class="step-card">
              <span class="step-number">{{ step.step }}</span>

              <div class="step-icon" aria-hidden="true">
                <svg v-if="step.step === '01'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="10" cy="10" r="6" />
                  <path d="M20 20l-5.5-5.5" />
                </svg>
                <svg v-else-if="step.step === '02'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-3 11.2c.5.3.8.9.8 1.5V16h4.4v-.3c0-.6.3-1.2.8-1.5A6 6 0 0 0 12 3Z" />
                </svg>
                <svg v-else-if="step.step === '03'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 8l-4 4 4 4" />
                  <path d="M16 8l4 4-4 4" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 17l5-5 4 4 8-8" />
                  <path d="M15 8h5v5" />
                </svg>
              </div>

              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>

            <span v-if="index < aiWorkflowSection.steps.length - 1" class="step-arrow" aria-hidden="true"></span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section背景：Step 1の共通Visual（.section-tint / .section-bg-decor）を利用しつつ、
 * Section 02とは異なるblob配置・色合いにして「同じではないが自然につながる」印象にする。
 */
.ai-workflow {
  --decor-1-color: var(--color-purple-soft);
  --decor-1-top: 12%;
  --decor-1-left: -4%;
  --decor-1-size: 320px;
  --decor-1-opacity: 0.4;

  --decor-2-color: var(--color-accent-soft);
  --decor-2-bottom: -14%;
  --decor-2-right: 8%;
  --decor-2-size: 400px;
  --decor-2-opacity: 0.4;

  /* 参考画像のように横長・コンパクトなSectionにする */
  padding-block: var(--space-lg);
}

/* SectionHeading.vue本体は変更せず、noteだけこのSection専用の手書き風スタイルに上書きする */
.ai-workflow :deep(.heading-note) {
  max-width: 170px;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: 1.7;
  letter-spacing: 0.05em;
  color: #3282d6;
  transform: rotate(-4deg);
}

.workflow-inner {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-lg);
  align-items: start;
  margin-top: var(--space-lg);
}

/* 左：AIツール一覧（大きいpillではなく、コンパクトな縦リスト） */
.tools-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-md);
}

.tools-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tools-list li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent) 0%, #22c1e0 100%);
  color: var(--color-white);
  font-size: 11px;
  font-weight: 700;
}

.tool-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary-dark);
}

/* 右：4ステップの横Flow（カードとカードの間に矢印） */
.steps-flow {
  display: flex;
  align-items: stretch;
  gap: var(--space-sm);
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1 1 0;
  min-width: 0;
}

.step-card {
  flex: 1;
  min-width: 0;
  min-height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(180, 215, 245, 0.4);
  border-radius: 10px;
  box-shadow: none;
  padding: 16px;
  text-align: center;
}

.step-number {
  display: block;
  align-self: flex-start;
  font-size: 27px;
  font-weight: 800;
  line-height: 1;
  color: var(--color-accent);
  margin-bottom: 6px;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-xs);
  color: var(--color-accent);
}

.step-icon svg {
  width: 42px;
  height: 42px;
}

.step-card h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.step-card p {
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.step-arrow {
  flex-shrink: 0;
  font-size: 28px;
  font-weight: 700;
  color: #149fe5;
}

.step-arrow::after {
  content: '\2192';
}

/* 1024px: AI Tool List | 4Stepの1Row構成を維持し、gap/paddingだけ縮める */
@media (max-width: 1024px) {
  .workflow-inner {
    grid-template-columns: 180px 1fr;
    gap: var(--space-md);
  }

  .step-card {
    min-height: 150px;
    padding: 12px;
  }

  .step-number {
    font-size: 22px;
  }

  .step-icon svg {
    width: 36px;
    height: 36px;
  }

  .step-card h3 {
    font-size: 15px;
  }
}

/*
 * 860px: 横幅が厳しいため、見出し行を縦積みにしてnoteを下へ落とし、
 * AI Tool Listを上段・4Stepを2×2グリッドに組み替える（矢印は非表示）。
 */
@media (max-width: 860px) {
  .ai-workflow :deep(.section-heading) {
    flex-direction: column;
    align-items: flex-start;
  }

  .ai-workflow :deep(.heading-note) {
    text-align: left;
  }

  .workflow-inner {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .tools-list {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: var(--space-lg);
    row-gap: 8px;
  }

  .steps-flow {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }

  .step-item {
    flex: none;
  }

  .step-arrow {
    display: none;
  }
}

/*
 * SP: Heading → note → AI Tool List → 01 → 02 → 03 → 04 の完全な縦構成。
 * 矢印も → ではなく ↓ に変える。
 */
@media (max-width: 767px) {
  .tools-list {
    flex-direction: column;
  }

  .steps-flow {
    display: flex;
    flex-direction: column;
  }

  .step-item {
    flex-direction: column;
  }

  .step-arrow {
    display: block;
    transform: rotate(90deg);
  }
}
</style>
