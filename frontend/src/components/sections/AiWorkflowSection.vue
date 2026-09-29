<script setup>
import { computed } from 'vue'
import { aiWorkflowSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'

/*
 * 「AIは、エンジニアの可能性を広げるパートナー。」を3行に分割して表示する。
 * SectionHeading.vue自体は変更禁止のため、noteプロパティは渡さずこのSectionだけで
 * ローカルにnoteを描画する（ProjectsSectionのlinkLabelと同じ発想）。
 * 文章自体はlpContent.jsの既存データそのままで、改行位置だけをここで決めている
 * （TeamMembersSection.vueのnoteLinesと同じ手法。3行目は「を」の直後で分割する）。
 */
const noteLines = computed(() => {
  const note = aiWorkflowSection.heading.note
  if (!note) return ['', '', '']
  const [first, rest] = note.split('、')
  if (!rest) return [note, '', '']
  const splitIndex = rest.indexOf('を') + 1
  if (splitIndex <= 0) return [`${first}、`, rest, '']
  return [`${first}、`, rest.slice(0, splitIndex), rest.slice(splitIndex)]
})
</script>

<template>
  <section :id="aiWorkflowSection.id" class="section ai-workflow section-tint section-bg-decor">
    <div class="container">
      <div class="workflow-heading-area">
        <div v-if="aiWorkflowSection.decorativeLabel" class="workflow-bg-text" aria-hidden="true">{{ aiWorkflowSection.decorativeLabel }}</div>

        <div class="workflow-heading-row">
          <SectionHeading
            :number="aiWorkflowSection.heading.number"
            :title="aiWorkflowSection.heading.title"
            :lead="aiWorkflowSection.heading.lead"
          />

          <div v-if="aiWorkflowSection.heading.note" class="workflow-note-wrap">
            <span class="workflow-note-mark workflow-note-mark-1" aria-hidden="true"></span>
            <span class="workflow-note-mark workflow-note-mark-2" aria-hidden="true"></span>
            <p class="workflow-note">
              <span class="workflow-note-line">{{ noteLines[0] }}</span>
              <span class="workflow-note-line">{{ noteLines[1] }}</span>
              <span class="workflow-note-line">{{ noteLines[2] }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="workflow-inner">
        <!--
          MIDDLE：AI Tool Network。Revealは既存どおりこのwrapper（.tools-panel）が担当し、
          内側のTool Card Float / Orb / Arrowは別要素・個別プロパティ（translate / scale）で動かす。
        -->
        <div class="tools-panel" v-scroll-reveal-child="{ delay: 135, delaySp: 90 }">
          <p class="tools-label">{{ aiWorkflowSection.toolsLabel }}</p>

          <div class="tool-network">
            <!-- 装飾：Orbit Line / Small Orb / Central AI Orb（すべてaria-hidden・操作不可） -->
            <svg class="network-orbit" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="aiNetworkOrbitGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#8ec5ff" />
                  <stop offset="50%" stop-color="#5cc9ff" />
                  <stop offset="100%" stop-color="#b9a6ff" />
                </linearGradient>
              </defs>
              <ellipse cx="500" cy="150" rx="430" ry="118" fill="none" stroke="url(#aiNetworkOrbitGradient)" stroke-width="1.4" vector-effect="non-scaling-stroke" transform="rotate(-4 500 150)" />
              <ellipse cx="500" cy="150" rx="300" ry="72" fill="none" stroke="url(#aiNetworkOrbitGradient)" stroke-width="1.2" vector-effect="non-scaling-stroke" transform="rotate(6 500 150)" />
            </svg>

            <span v-for="n in 7" :key="n" class="network-orb" :class="`network-orb-${n}`" aria-hidden="true"></span>

            <div class="ai-core" aria-hidden="true">
              <span class="ai-core-text">AI</span>
              <span class="ai-core-spark"></span>
            </div>

            <ul class="tools-list">
              <li v-for="tool in aiWorkflowSection.tools" :key="tool.id" class="tool-card" :class="`tool-card-${tool.id}`">
                <span class="tool-icon" aria-hidden="true">
                  <img v-if="tool.icon" :src="tool.icon" :alt="tool.name" class="tool-icon-img" />
                  <template v-else>{{ tool.name.charAt(0) }}</template>
                </span>
                <span class="tool-body">
                  <span class="tool-name">{{ tool.name }}</span>
                  <span v-if="tool.description" class="tool-description">{{ tool.description }}</span>
                </span>
                <!-- 装飾のみ（リンクではない） -->
                <span class="tool-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          <span class="network-down" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 5l6 6 6-6" />
              <path d="M6 12l6 6 6-6" />
            </svg>
          </span>
        </div>

        <ol class="steps-flow" v-scroll-reveal-child="{ delay: 225, delaySp: 170 }">
          <li v-for="(step, index) in aiWorkflowSection.steps" :key="step.step" class="step-item">
            <div class="step-card">
              <span class="step-number">{{ step.step }}</span>

              <div class="step-icon" aria-hidden="true">
                <img v-if="step.icon" :src="step.icon" :alt="step.title" />
                <template v-else>
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
                </template>
              </div>

              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>

            <!--
              Step間のFloating Motion Arrow：薄い点線Trail + 固定のWhite Circle + 中のArrowだけが進行方向へ動く。
              PC / Tabletは隣のCardとの間（gap）に絶対配置、SPはCardの下に置き↓へ回転する。
            -->
            <span v-if="index < aiWorkflowSection.steps.length - 1" class="step-arrow" aria-hidden="true">
              <span class="step-arrow-circle">
                <svg class="step-arrow-icon" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient :id="`aiWorkflowArrowGradient${index}`" gradientUnits="userSpaceOnUse" x1="5" y1="12" x2="19" y2="12">
                      <stop offset="0%" stop-color="#2f6fed" />
                      <stop offset="100%" stop-color="#22c1e0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"
                    :stroke="`url(#aiWorkflowArrowGradient${index})`"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </span>
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

/*
 * 見出し背景の「AI WORK →」は、Section 02（ProjectsSection.vue）の
 * .heading-area / .work-bg-text / workMarquee と同じ思想・同じ見た目基準で実装する
 * （Vue scoped CSSはComponentをまたいで共有できないため、keyframes自体はこのComponent内に
 * 複製しているが、duration/timing-function/移動距離/opacity/colorはSection 02と揃えている）。
 */
.workflow-heading-area {
  position: relative;
  overflow: hidden;
}

.workflow-bg-text {
  position: absolute;
  top: -28px;
  left: 0;
  width: 100%;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  text-align: left;
  font-size: clamp(72px, 11.4vw, 137px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.12em;
  white-space: nowrap;
  color: rgba(38, 126, 220, 0.11);
  animation: workflowBgMarquee 14s linear infinite;
  will-change: transform;
}

@keyframes workflowBgMarquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .workflow-bg-text {
    animation: none;
  }
}

/*
 * 見出し行：SectionHeading.vue本体は変更せず、隣にnoteを独自要素として配置する
 * （ProjectsSection.vueの.heading-rowと同じ構成）。
 * 背景の.workflow-bg-text（z-index:0）より前面に出すため、position:relative + z-index:1を持たせる。
 */
.workflow-heading-row {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.workflow-heading-row :deep(.section-heading) {
  flex: 1 1 420px;
  margin-bottom: 0;
}

/*
 * note：TeamMembersSection.vue「いろんな経験が、ここでつながっている。」と同じ
 * Visual Language（手書き風フォント・青系グラデーション・カーブした下線・
 * 浮遊アニメーション）を踏襲しつつ、3行構成・青単色グラデーションでSection固有の
 * 個性を出す（紫は使わずSection01と差別化）。
 */
.workflow-note-wrap {
  position: relative;
  flex: 0 0 auto;
  margin-top: 4px;
  transform: rotate(-2deg);
  animation: workflowNoteFloat 5.5s ease-in-out infinite;
}

@keyframes workflowNoteFloat {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-4px) rotate(-1deg); }
}

@media (hover: hover) and (pointer: fine) {
  .workflow-note-wrap:hover {
    animation: none;
    transform: translateY(-3px) rotate(-1deg) scale(1.02);
    transition: transform 0.3s ease;
    cursor: default;
  }
}

.workflow-note-mark {
  position: absolute;
  top: -8px;
  width: 2px;
  height: 11px;
  border-radius: 1px;
  background: linear-gradient(180deg, #20a7ef, transparent);
  pointer-events: none;
}

.workflow-note-mark-1 { right: 16px; transform: rotate(14deg); }
.workflow-note-mark-2 { right: 9px; height: 8px; opacity: 0.7; transform: rotate(14deg); }

.workflow-note {
  position: relative;
  max-width: 220px;
  font-family: 'Hiragino Maru Gothic ProN', 'Yu Gothic', 'Noto Sans JP', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.75;
  letter-spacing: 0.05em;
  white-space: pre-line;
  text-align: right;
  background: linear-gradient(90deg, #159de4, #359df5, #4b8dff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 4px 12px rgba(50, 130, 255, 0.08));
}

.workflow-note-line {
  display: block;
}

.workflow-note-wrap::after {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -7px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #20a7ef, #4b8dff, #6fb6f7);
  transform: rotate(-1.5deg);
}

@media (prefers-reduced-motion: reduce) {
  .workflow-note-wrap {
    animation: none;
  }

  .workflow-note-wrap:hover {
    transform: rotate(-2deg);
  }
}

/*
 * MIDDLE / BOTTOM を縦に積む（以前の「左：AI Tool List | 右：4 Step」の2カラムは廃止）。
 * 参考画像：TOP（Heading・Lead | Message）→ MIDDLE（AI Tool Network）→ BOTTOM（01〜04 Workflow）
 */
.workflow-inner {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: var(--space-lg);
}

.tools-panel {
  position: relative;
  z-index: 1;
}

.tools-label {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  color: var(--color-primary-dark);
  margin-bottom: 18px;
}

/*
 * AI Tool Network（PC）：中央のAI Orbを囲むように5枚のTool Cardを絶対配置する。
 *   左上 ChatGPT / 右上 GitHub Copilot / 左下 Claude / 右下 Notion AI / 中央下 Figma AI
 * 完全な左右対称にしないよう、左右の位置・高さを少しずらしている。
 * Layer：Orbit Line・Small Orb（z-index 0）→ AI Orb（1）→ Tool Card（2）。装飾はすべて操作不可。
 */
.tool-network {
  --tool-card-w: 29%;

  position: relative;
  height: 390px;
}

.network-orbit {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0.28;
  pointer-events: none;
}

.network-orb {
  --orb-c: 80, 170, 255;

  position: absolute;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.9) 0%, rgba(var(--orb-c), 0.55) 55%, rgba(var(--orb-c), 0.35) 100%);
  opacity: 0.55;
  pointer-events: none;
  animation: networkOrbFloat 8s ease-in-out infinite;
}

/* Blue / Cyan / Purple / Pink / Peach。小さいもの中心、一部Medium。Card / Textに被らない余白へ配置 */
.network-orb-1 { --orb-c: 70, 210, 230; top: -6px; left: 40%; width: 18px; height: 18px; }
.network-orb-2 { --orb-c: 255, 170, 130; top: 124px; left: 6%; width: 14px; height: 14px; animation-delay: -2s; }
.network-orb-3 { --orb-c: 80, 170, 255; top: 126px; left: 38%; width: 24px; height: 24px; animation-delay: -4s; }
.network-orb-4 { --orb-c: 120, 130, 255; top: 196px; right: 36%; width: 28px; height: 28px; animation-delay: -1s; }
.network-orb-5 { --orb-c: 180, 150, 255; top: 300px; left: 22%; width: 40px; height: 40px; opacity: 0.45; animation-delay: -5s; }
.network-orb-6 { --orb-c: 255, 150, 210; top: 238px; right: 40%; width: 16px; height: 16px; animation-delay: -3s; }
.network-orb-7 { --orb-c: 70, 210, 230; top: 292px; right: 24%; width: 22px; height: 22px; animation-delay: -6s; }

@keyframes networkOrbFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 3px -4px;
  }
}

/* Central AI Orb：淡いBlue / Cyan / PurpleのGradient + ごく弱いGlow。ほぼ固定（scale 1.015のみ） */
.ai-core {
  position: absolute;
  z-index: 1;
  top: 64px;
  left: 50%;
  width: 164px;
  height: 164px;
  margin-left: -82px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background:
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 55%),
    radial-gradient(circle at 50% 55%, rgba(210, 236, 255, 0.95) 0%, rgba(160, 205, 255, 0.75) 60%, rgba(190, 175, 255, 0.7) 100%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 0 36px rgba(110, 170, 255, 0.22),
    0 16px 40px rgba(90, 120, 220, 0.12),
    inset 0 -10px 24px rgba(150, 140, 255, 0.18);
  pointer-events: none;
  animation: aiCoreBreath 8s ease-in-out infinite;
}

@keyframes aiCoreBreath {
  0%,
  100% {
    scale: 1;
  }
  50% {
    scale: 1.015;
  }
}

.ai-core-text {
  font-size: 50px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #3f8cf5 0%, #2f6fed 50%, #7b6cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 「AI」右上の小さなSparkle（CSSのみの4方向の星形） */
.ai-core-spark {
  position: absolute;
  top: 44px;
  right: 40px;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #5b8cff, #8b6cf6);
  clip-path: polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%);
}

/* Tool Card */
.tools-list {
  display: block;
}

.tool-card {
  --tool-tint: 90, 215, 190;

  position: absolute;
  z-index: 2;
  width: var(--tool-card-w);
  display: grid;
  grid-template-columns: 72px 1fr 40px;
  align-items: center;
  gap: 14px;
  padding: 16px 18px 16px 16px;
  border-radius: 26px;
  border: 1px solid rgba(150, 170, 240, 0.16);
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  box-shadow:
    0 18px 45px rgba(65, 105, 190, 0.08),
    0 5px 16px rgba(95, 135, 220, 0.05);
  animation: toolCardFloat 6s ease-in-out infinite;
}

/* 配置（Organic Layout）と Icon後ろのSoft Circleの色 */
.tool-card-chatgpt {
  top: 0;
  left: 6%;
}

.tool-card-copilot {
  --tool-tint: 90, 160, 255;

  top: 6px;
  right: 7%;
  animation-delay: -1.2s;
}

.tool-card-claude {
  --tool-tint: 255, 170, 130;

  top: 148px;
  left: 3%;
  animation-delay: -2.4s;
}

.tool-card-notion-ai {
  --tool-tint: 170, 150, 255;

  top: 156px;
  right: 2%;
  animation-delay: -3.6s;
}

/* 中央下：centering用のtransformとFloat用のtranslate（個別プロパティ）は独立 */
.tool-card-figma-ai {
  --tool-tint: 255, 150, 200;

  top: 262px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: -4.8s;
}

@keyframes toolCardFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -3px;
  }
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(var(--tool-tint), 0.2) 70%, rgba(var(--tool-tint), 0.26) 100%);
  color: var(--color-accent);
  font-size: 20px;
  font-weight: 700;
}

.tool-icon-img {
  width: 54px;
  height: 54px;
  object-fit: contain;
  border-radius: 50%;
}

.tool-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.tool-name {
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--color-primary-dark);
}

.tool-description {
  font-size: 12.5px;
  font-weight: 400;
  line-height: 1.65;
  color: var(--color-text-muted);
}

/* 装飾のArrow（リンクではない）。Small White Circle + Blue Arrow */
.tool-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(120, 170, 240, 0.16);
  box-shadow: 0 6px 16px rgba(55, 115, 220, 0.1);
  color: #2f80ed;
}

.tool-arrow svg {
  width: 17px;
  height: 17px;
}

/* Network → Workflow への視線誘導（Double Down Arrow） */
.network-down {
  display: block;
  width: 30px;
  height: 30px;
  margin: 14px auto 0;
  color: #8ab8f5;
  animation: networkDownMove 2.4s ease-in-out infinite;
}

.network-down svg {
  width: 100%;
  height: 100%;
}

@keyframes networkDownMove {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .network-orb,
  .ai-core,
  .tool-card,
  .network-down {
    animation: none;
  }
}

/*
 * 右：4 Step「Soft Premium AI Workflow」。
 *   Soft Floating Card（Number → Icon + Soft Shape → Title → Description）
 *   + Card間のFloating Motion Arrow（薄い点線Trail + White Circle + 動くArrow）。
 * 4つのliを均等幅にし、ArrowはCard間のgapへ絶対配置する（最後のCardだけ広くならない）。
 * Scroll Revealは既存どおり ol.steps-flow（transform）が担当。Card Float / Arrowの動きは
 * 個別プロパティ translate を別要素に付けるため、Revealのtransformとは競合しない。
 */
.steps-flow {
  --step-gap: 60px;
  --step-arrow-circle: 48px;
  --step-card-float: -3px;

  display: flex;
  align-items: stretch;
  gap: var(--step-gap);
}

.step-item {
  position: relative;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
}

.step-card {
  --step-a: 80, 170, 255;

  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 18px 24px;
  border-radius: 24px;
  border: 1px solid rgba(90, 140, 220, 0.1);
  background: linear-gradient(165deg, #ffffff 0%, #ffffff 40%, rgba(var(--step-a), 0.08) 100%);
  box-shadow:
    0 18px 45px rgba(56, 105, 190, 0.09),
    0 6px 18px rgba(90, 130, 220, 0.06);
  text-align: center;
  animation: aiStepCardFloat 6.5s ease-in-out infinite;
  animation-delay: 0.3s;
}

/* 同じDesign Systemのまま、背景・Soft Shape・Numberの色味だけをわずかに変える */
.step-item:nth-child(2) .step-card {
  --step-a: 205, 150, 245;

  animation-delay: 0.8s;
}

.step-item:nth-child(3) .step-card {
  --step-a: 70, 210, 230;

  animation-delay: 1.3s;
}

.step-item:nth-child(4) .step-card {
  --step-a: 170, 140, 255;

  animation-delay: 1.8s;
}

@keyframes aiStepCardFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 var(--step-card-float);
  }
}

.step-number {
  position: absolute;
  top: 20px;
  left: 22px;
  z-index: 1;
  display: block;
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-accent);
  background: linear-gradient(135deg, #2f6fed 0%, #4f9af7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.step-item:nth-child(2) .step-number {
  background-image: linear-gradient(135deg, #2f6fed 0%, #8b78f0 100%);
}

.step-item:nth-child(4) .step-number {
  background-image: linear-gradient(135deg, #7b6cf6 0%, #9b6cf0 100%);
}

.step-item:nth-child(3) .step-number {
  background-image: linear-gradient(135deg, #22c1e0 0%, #2f6fed 100%);
}

/* Icon：既存画像を少し大きく。後ろに非常に薄いSoft Blob + 小さなDotを1個 */
.step-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 96px;
  margin: 2px 0 12px;
  color: var(--color-accent);
}

.step-icon::before,
.step-icon::after {
  content: '';
  position: absolute;
  z-index: 0;
  pointer-events: none;
}

.step-icon::before {
  inset: 2px 6px;
  border-radius: 52% 48% 55% 45% / 48% 55% 45% 52%;
  background: radial-gradient(circle at 40% 38%, rgba(var(--step-a), 0.16) 0%, rgba(var(--step-a), 0.07) 60%, transparent 100%);
}

.step-icon::after {
  top: 6px;
  right: 4px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(var(--step-a), 0.28);
}

.step-icon svg,
.step-icon img {
  position: relative;
  z-index: 1;
  width: 84px;
  height: 84px;
  object-fit: contain;
}

.step-card h3 {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--color-primary-dark);
  margin-bottom: 8px;
}

.step-card p {
  max-width: 15em;
  font-size: 12.5px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-muted);
}

/* Floating Motion Arrow：Card間のgap中央。Trailは薄い点線、Circleは固定、Arrowだけ進む */
.step-arrow {
  position: absolute;
  top: 50%;
  left: 100%;
  width: var(--step-gap);
  height: var(--step-arrow-circle);
  margin-top: calc(var(--step-arrow-circle) / -2);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.step-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  margin-top: -2px;
  background: linear-gradient(90deg, #6fa8f2, #5cc9ff, #9b8cf3);
  -webkit-mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 0 50% / 6px 4px repeat-x;
  mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 0 50% / 6px 4px repeat-x;
  opacity: 0.3;
}

.step-arrow-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--step-arrow-circle);
  height: var(--step-arrow-circle);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(120, 170, 240, 0.18);
  box-shadow: 0 8px 20px rgba(55, 115, 220, 0.1);
}

.step-arrow-icon {
  --step-arrow-shift: 6px 0;

  width: 20px;
  height: 20px;
  animation: aiStepArrowMove 2.1s ease-in-out infinite;
}

@keyframes aiStepArrowMove {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: var(--step-arrow-shift);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-card,
  .step-arrow-icon {
    animation: none;
  }
}

/* 1024px: AI Tool List | 4Stepの1Row構成を維持し、gap/paddingだけ縮める */
@media (max-width: 1024px) {
  .workflow-bg-text {
    font-size: clamp(58px, 13.2vw, 108px);
    top: -18px;
  }

  /* Network：同じ配置を保ち、Cardを少し広く・Icon / Orbを小さくする */
  .tool-network {
    --tool-card-w: 35%;

    height: 400px;
  }

  .tool-card {
    grid-template-columns: 58px 1fr 34px;
    gap: 12px;
    padding: 14px 14px 14px 12px;
    border-radius: 22px;
  }

  .tool-card-chatgpt,
  .tool-card-claude {
    left: 0;
  }

  .tool-card-copilot,
  .tool-card-notion-ai {
    right: 0;
  }

  .tool-card-figma-ai {
    top: 276px;
  }

  .tool-icon {
    width: 58px;
    height: 58px;
  }

  .tool-icon-img {
    width: 44px;
    height: 44px;
  }

  .tool-name {
    font-size: 15px;
  }

  .tool-description {
    font-size: 12px;
  }

  .tool-arrow {
    width: 34px;
    height: 34px;
  }

  .ai-core {
    top: 70px;
    width: 132px;
    height: 132px;
    margin-left: -66px;
  }

  .ai-core-text {
    font-size: 40px;
  }

  .ai-core-spark {
    top: 34px;
    right: 30px;
    width: 13px;
    height: 13px;
  }

  /* Workflow：Card幅が狭くなるため、Numberは左上の絶対配置をやめてIconの上に戻す */
  .step-number {
    position: static;
    align-self: flex-start;
  }

  .steps-flow {
    --step-gap: 44px;
    --step-arrow-circle: 40px;
  }

  .step-card {
    padding: 16px 12px 20px;
    border-radius: 22px;
  }

  .step-number {
    font-size: 26px;
  }

  .step-icon {
    width: 88px;
    height: 80px;
  }

  .step-icon svg,
  .step-icon img {
    width: 70px;
    height: 70px;
  }

  .step-card h3 {
    font-size: 15px;
  }

  .step-card p {
    font-size: 12px;
  }

  .step-arrow-icon {
    width: 17px;
    height: 17px;
  }

  .workflow-note {
    font-size: 16px;
  }
}

/*
 * 860px: 横幅が厳しいため、見出し行を縦積みにしてnoteを下へ落とし、
 * AI Tool Listを上段・4Stepを2×2グリッドに組み替える（矢印は非表示）。
 */
@media (max-width: 860px) {
  .workflow-bg-text {
    font-size: clamp(50px, 14.1vw, 86px);
    top: -10px;
  }

  .workflow-heading-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .workflow-heading-row :deep(.section-heading) {
    flex: 1 1 auto;
  }

  .workflow-note-wrap {
    align-self: flex-start;
    margin-top: var(--space-sm);
    margin-left: 24px;
  }

  .workflow-note {
    text-align: left;
  }

  /* Network：Orbitを省略し、AI Orb → Tool Card 2カラム（Figma AIは下段中央）のCompact Layoutへ */
  .tool-network {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .network-orbit,
  .network-orb {
    display: none;
  }

  .network-orb-3,
  .network-orb-4 {
    display: block;
    top: 40px;
  }

  .network-orb-3 {
    left: 30%;
  }

  .network-orb-4 {
    right: 30%;
  }

  .ai-core {
    position: relative;
    top: auto;
    left: auto;
    margin: 0 0 20px;
    width: 116px;
    height: 116px;
  }

  .ai-core-text {
    font-size: 36px;
  }

  .ai-core-spark {
    top: 28px;
    right: 24px;
    width: 12px;
    height: 12px;
  }

  .tools-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    width: 100%;
  }

  .tool-card,
  .tool-card-chatgpt,
  .tool-card-copilot,
  .tool-card-claude,
  .tool-card-notion-ai,
  .tool-card-figma-ai {
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    width: auto;
    transform: none;
  }

  .tool-card-figma-ai {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc(50% - 7px);
  }

  /* 2 × 2（01 → 02 / 03 → 04）。横のArrowは同じ段の間だけに置く */
  .steps-flow {
    --step-gap: 56px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--step-gap);
    row-gap: var(--space-md);
  }

  .step-item {
    flex: none;
  }

  .step-item:nth-child(2) .step-arrow {
    display: none;
  }
}

/*
 * SP: Heading → note → AI Tool List → 01 → 02 → 03 → 04 の完全な縦構成。
 * 矢印も → ではなく ↓ に変える。
 */
@media (max-width: 767px) {
  .workflow-bg-text {
    font-size: clamp(56px, 19.4vw, 79px);
    color: rgba(38, 126, 220, 0.14);
    top: -5px;
  }

  .workflow-note-wrap {
    margin-left: 54px;
  }

  .workflow-note {
    max-width: none;
    font-size: 15px;
  }

  /* SP：Small AI Orb → Tool Card 1列（ChatGPT → Copilot → Claude → Notion AI → Figma AI） */
  .tools-label {
    font-size: 18px;
    margin-bottom: 14px;
  }

  .ai-core {
    width: 96px;
    height: 96px;
    margin-bottom: 16px;
  }

  .ai-core-text {
    font-size: 30px;
  }

  .ai-core-spark {
    top: 22px;
    right: 18px;
    width: 10px;
    height: 10px;
  }

  .network-orb-3 {
    top: 30px;
    left: 18%;
  }

  .network-orb-4 {
    top: 30px;
    right: 18%;
  }

  .tools-list {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .tool-card-figma-ai {
    width: auto;
    justify-self: stretch;
  }

  .tool-card {
    grid-template-columns: 54px 1fr 32px;
    gap: 12px;
    padding: 14px 14px 14px 12px;
    border-radius: 20px;
  }

  .tool-icon {
    width: 54px;
    height: 54px;
  }

  .tool-icon-img {
    width: 42px;
    height: 42px;
  }

  .tool-name {
    font-size: 16px;
  }

  .tool-description {
    font-size: 12.5px;
  }

  .tool-arrow {
    width: 32px;
    height: 32px;
  }

  .tool-arrow svg {
    width: 15px;
    height: 15px;
  }

  /* SP：01 ↓ 02 ↓ 03 ↓ 04 の縦Workflow。ArrowはCardの下に置き、↓へ回転して下へ進む */
  .steps-flow {
    --step-arrow-circle: 44px;
    --step-card-float: -2px;

    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .step-item {
    flex-direction: column;
  }

  .step-card {
    padding: 20px 22px 24px;
    border-radius: 22px;
    box-shadow:
      0 12px 32px rgba(56, 105, 190, 0.08),
      0 4px 12px rgba(90, 130, 220, 0.05);
  }

  .step-number {
    font-size: 26px;
  }

  .step-icon {
    width: 92px;
    height: 84px;
  }

  .step-icon svg,
  .step-icon img {
    width: 74px;
    height: 74px;
  }

  .step-card h3 {
    font-size: 17px;
  }

  .step-card p {
    max-width: 18em;
    font-size: 13px;
  }

  .step-item:nth-child(2) .step-arrow,
  .step-arrow {
    position: relative;
    top: auto;
    left: auto;
    display: flex;
    align-self: center;
    width: var(--step-arrow-circle);
    height: 76px;
    margin: 6px 0;
  }

  .step-arrow::before {
    top: 0;
    bottom: 0;
    left: 50%;
    right: auto;
    width: 4px;
    height: auto;
    margin: 0 0 0 -2px;
    background: linear-gradient(180deg, #6fa8f2, #5cc9ff, #9b8cf3);
    -webkit-mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 50% 0 / 4px 6px repeat-y;
    mask: radial-gradient(circle, #000 1.1px, transparent 1.6px) 50% 0 / 4px 6px repeat-y;
  }

  /* ↓方向：同じSVGを個別プロパティ rotate で90°回転（Moveのtranslateとは別プロパティ） */
  .step-arrow-icon {
    --step-arrow-shift: 0 5px;

    width: 18px;
    height: 18px;
    rotate: 90deg;
  }
}
</style>
