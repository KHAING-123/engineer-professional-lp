<script setup>
import BackgroundParticles from './components/ui/BackgroundParticles.vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import TeamMembersSection from './components/sections/TeamMembersSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import AiWorkflowSection from './components/sections/AiWorkflowSection.vue'
import CareerStorySection from './components/sections/CareerStorySection.vue'
import MarketValueSection from './components/sections/MarketValueSection.vue'
import CareerSupportSection from './components/sections/CareerSupportSection.vue'
import InterviewSection from './components/sections/InterviewSection.vue'
import SelectionFlowSection from './components/sections/SelectionFlowSection.vue'
import FinalCtaSection from './components/sections/FinalCtaSection.vue'
</script>

<template>
  <div class="lp-page">
    <BackgroundParticles />

    <AppHeader />
    <main>
      <HeroSection />
      <TeamMembersSection />
      <ProjectsSection />
      <AiWorkflowSection />
      <CareerStorySection />
      <MarketValueSection />

      <div class="support-interview-band">
        <div class="container support-interview-inner">
          <CareerSupportSection />
          <InterviewSection />
        </div>
      </div>

      <SelectionFlowSection />
      <FinalCtaSection />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
/*
 * BackgroundParticles（position:absolute; inset:0;）がページ全体（Header〜Footerの
 * 合計の高さ）ぴったりに広がるよう、position:relativeだけを与える。
 * overflow/transformは付けない（Headerのposition:stickyを壊さないため）。
 * isolation:isolateで.lp-page自体のstacking contextを明確にし、
 * 各SectionのbackgroundがBubble Layer(z-index:1)を覆わないようにする。
 */
.lp-page {
  position: relative;
  isolation: isolate;
}

/* mainを明示的にposition:relativeにし、内部のSectionが確実にBubble Layerより
   下（またはBubbleと同じ土俵）のstacking contextに収まるようにする */
main {
  position: relative;
}

/*
 * Section 06（キャリアコンサルタントによる支援）と07（面接について）を
 * 1つの共通Bandにまとめて横2カラムで表示する。
 * 06/07それぞれは大きな背景・paddingを持たず、この帯だけが
 * Section 05→08へ自然につながる淡い背景を担う。
 */
.support-interview-band {
  padding-block: var(--space-2xl);
  background: linear-gradient(180deg, #ffffff 0%, #eef5ff 35%, #f2eefc 70%, #ffffff 100%);
}

@media (max-width: 768px) {
  .support-interview-band {
    padding-block: var(--space-xl);
  }
}

.support-interview-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
  align-items: start;
}

/*
 * 中央の薄いdivider（gapの中央に来るよう、マイナスmarginで位置調整）。
 * 07 Panel全体を06よりも少し下げて非対称にする（transformではなくmargin-topを使うことで、
 * .support-interview-bandの高さ計算にも正しく反映され、08との間隔が崩れない）。
 * margin-topの起点が下がる分、border-leftの開始位置も自然に下へずれるため、
 * 「06|07を単純に分割している」印象も同時に弱くなる。
 */
.support-interview-inner :deep(.interview-panel) {
  border-left: 1px solid rgba(27, 58, 107, 0.12);
  margin-left: -24px;
  padding-left: 24px;
  margin-top: 80px;
}

@media (max-width: 1024px) {
  .support-interview-inner :deep(.interview-panel) {
    margin-top: 56px;
  }
}

@media (max-width: 768px) {
  .support-interview-inner :deep(.interview-panel) {
    margin-top: 36px;
  }
}

@media (max-width: 767px) {
  .support-interview-inner {
    grid-template-columns: 1fr;
    row-gap: 48px;
  }

  .support-interview-inner :deep(.interview-panel) {
    border-left: none;
    border-top: 1px solid rgba(27, 58, 107, 0.12);
    margin-left: 0;
    padding-left: 0;
    padding-top: var(--space-xl);
    margin-top: 0;
  }
}
</style>
