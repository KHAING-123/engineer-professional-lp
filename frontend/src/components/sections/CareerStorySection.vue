<script setup>
import { careerStorySection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
</script>

<template>
  <section :id="careerStorySection.id" class="section career-story section-tint section-bg-decor">
    <div class="container">
      <div class="story-heading-area">
        <div v-if="careerStorySection.decorativeLabel" class="story-bg-text" aria-hidden="true">{{ careerStorySection.decorativeLabel }}</div>

        <SectionHeading
          :number="careerStorySection.heading.number"
          :title="careerStorySection.heading.title"
          :lead="careerStorySection.heading.lead"
        />
      </div>

      <div class="story-inner">
        <div class="member-block" v-scroll-reveal-child="{ delay: 140, delaySp: 100 }">
          <p class="career-story-label" aria-hidden="true"><span>Career</span><span>Story</span></p>

          <div class="member-photo">
            <PlaceholderImage
              :src="careerStorySection.member.image"
              :label="careerStorySection.member.name"
              ratio="3 / 4"
            />
          </div>

          <p class="member-name">{{ careerStorySection.member.name }}</p>
          <p class="member-role">{{ careerStorySection.member.role }}</p>
          <p class="member-previous">前職：{{ careerStorySection.member.previousJob }}</p>
        </div>

        <ol class="timeline" v-scroll-reveal-child="{ delay: 240, delaySp: 180 }">
          <li v-for="(item, index) in careerStorySection.timeline" :key="index" class="timeline-item">
            <span class="timeline-year">{{ item.year }}</span>

            <span class="timeline-node" aria-hidden="true"></span>

            <div class="timeline-content">
              <!--
                transform競合を避けるため役割ごとに要素を分ける：
                .timeline-icon（Row Reveal）> .timeline-icon-circle（Float + Soft Circle）> svg
              -->
              <div class="timeline-icon" aria-hidden="true">
                <span class="timeline-icon-circle">
                  <svg v-if="index === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1V5Z" />
                    <path d="M12 6v13" />
                  </svg>
                  <svg v-else-if="index === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                  </svg>
                  <svg v-else-if="index === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
                    <circle cx="17.5" cy="9" r="2.3" />
                    <path d="M15.3 20c.3-2.2 1.6-3.8 3.2-4.4" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2c2 2 3 5 3 8 0 2-1 4-3 6-2-2-3-4-3-6 0-3 1-6 3-8Z" />
                    <path d="M9 14l-3 3 1 3 3-1" />
                    <path d="M15 14l3 3-1 3-3-1" />
                    <circle cx="12" cy="9" r="1.3" fill="currentColor" />
                  </svg>
                </span>
              </div>

              <div class="timeline-text">
                <p v-if="item.title" class="timeline-title">{{ item.title }}</p>
                <p class="timeline-description">{{ item.description }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section背景：Step 1の共通Visual（.section-tint / .section-bg-decor）を利用しつつ、
 * Section 03とはblobの位置・色を変えて単調にならないようにする。
 * 文字より目立たないよう不透明度は抑えめにしている。
 */
.career-story {
  --decor-1-color: var(--color-accent-soft);
  --decor-1-top: -10%;
  --decor-1-left: 30%;
  --decor-1-size: 360px;
  --decor-1-opacity: 0.4;

  --decor-2-color: var(--color-purple-soft);
  --decor-2-bottom: -12%;
  --decor-2-right: -6%;
  --decor-2-size: 340px;
  --decor-2-opacity: 0.4;
}

/*
 * 見出し背景の「CAREER →」は、Section 02（ProjectsSection.vue）の
 * .heading-area / .work-bg-text / workMarquee と同じ視覚基準で実装する。
 * SectionHeading.vue本体には手を入れず、外側に背景専用要素を重ねるだけにする。
 */
.story-heading-area {
  position: relative;
  overflow: hidden;
}

.story-heading-area :deep(.section-heading) {
  position: relative;
  z-index: 1;
}

.story-bg-text {
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
  animation: storyBgMarquee 14s linear infinite;
  will-change: transform;
}

@keyframes storyBgMarquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .story-bg-text {
    animation: none;
  }
}

.story-inner {
  display: grid;
  grid-template-columns: minmax(240px, 38%) 1fr;
  gap: var(--space-xl);
  align-items: start;
}

/* 左：Career Story手書き風ラベル＋写真＋プロフィール */
.career-story-label {
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.15;
  letter-spacing: 0.04em;
  color: var(--color-primary-dark);
  transform: rotate(-5deg);
  transform-origin: left center;
  margin-bottom: var(--space-sm);
}

.career-story-label span {
  display: block;
}

.member-photo {
  width: min(100%, 320px);
  margin-bottom: var(--space-md);
}

.member-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.member-role {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 4px;
}

.member-previous {
  font-size: 13px;
  color: var(--color-text-muted);
}

/*
 * 右：Premium Vertical Career Journey
 * 年数 → Gradient Line / Point → Soft Circle Icon → Main Message / Description
 *
 * Animationは、ol.timelineに付いている既存のv-scroll-reveal-child（ol全体のFade-up）が
 * 付与する .scroll-reveal-child / .is-revealed classだけをトリガーにし、JSは追加しない。
 * transform競合を避けるため、役割ごとに別要素へ割り当てている：
 *   ol.timeline            … 既存Scroll Reveal（変更なし）
 *   .timeline-node::after  … Line Grow（scaleY）
 *   .timeline-node::before … Point Reveal（opacity）+ Pulse（scale）
 *   .timeline-year / .timeline-icon / .timeline-text … Row Reveal（opacity + translateY）
 *   .timeline-icon-circle  … Icon Float（translateY）
 * 初期非表示は .scroll-reveal-child が付いている時だけ適用するため、
 * IntersectionObserverが無い環境でも常に通常表示になる。
 */
.timeline {
  --tl-node-center: 27px; /* Point中心・Line始点のY位置（Icon Circle中心と揃える） */
  --tl-gap: var(--space-lg); /* Row間隔 */
  --tl-line-base: 240ms; /* ol自体のReveal delay(240ms)に合わせてLineを伸ばし始める */
  --tl-line-seg: 360ms; /* 1区間あたり。3区間で約1.1s */
  --tl-row-base: 300ms;
  --tl-row-stagger: 150ms;
  --tl-row-duration: 0.7s;
  --tl-row-shift: 18px;

  /* Line Gradient：Accent Blue → Light Blue → Light Purple（BackgroundParticlesと同系色） */
  --tl-c0: rgba(47, 111, 237, 0.8);
  --tl-c1: rgba(69, 150, 249, 0.72);
  --tl-c2: rgba(103, 157, 252, 0.7);
  --tl-c3: rgba(150, 130, 245, 0.72);

  padding-top: var(--space-xs);
}

.timeline-item {
  --tl-i: 0;
  --tl-row-delay: calc(var(--tl-row-base) + var(--tl-i) * var(--tl-row-stagger));

  display: grid;
  grid-template-columns: 72px 24px 1fr;
  column-gap: var(--space-sm);
  padding-bottom: var(--tl-gap);
}

.timeline-item:nth-child(2) {
  --tl-i: 1;
}

.timeline-item:nth-child(3) {
  --tl-i: 2;
}

.timeline-item:nth-child(4) {
  --tl-i: 3;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-year {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: var(--color-primary-dark);
  padding-top: calc(var(--tl-node-center) - 13px);
  transition:
    opacity var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--tl-row-delay),
    transform var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) var(--tl-row-delay);
}

.timeline-node {
  position: relative;
}

/* Point：中心のBlue + 外側の薄いsoft ring（box-shadow）。centeringはtransformを使わずleftで行う */
.timeline-node::before {
  content: '';
  position: absolute;
  top: calc(var(--tl-node-center) - 6px);
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow:
    0 0 0 4px rgba(80, 170, 255, 0.16),
    0 0 10px rgba(47, 111, 237, 0.16);
  z-index: 1;
  transition: opacity 0.5s ease var(--tl-row-delay);
  animation: timelinePointPulse 3.6s ease-in-out infinite;
  animation-delay: calc(var(--tl-i) * 0.5s);
}

@keyframes timelinePointPulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 0 0 4px rgba(80, 170, 255, 0.16),
      0 0 10px rgba(47, 111, 237, 0.16);
  }
  50% {
    transform: scale(1.08);
    box-shadow:
      0 0 0 6px rgba(80, 170, 255, 0.1),
      0 0 14px rgba(47, 111, 237, 0.2);
  }
}

/* Line：各Pointから次のPointまでの区間。区間ごとに色を引き継ぎ、全体で1本のGradientに見せる */
.timeline-node::after {
  content: '';
  position: absolute;
  top: var(--tl-node-center);
  bottom: calc(-1 * (var(--tl-gap) + var(--tl-node-center)));
  left: calc(50% - 1px);
  width: 2px;
  border-radius: 1px;
  background: linear-gradient(to bottom, var(--tl-c0), var(--tl-c1));
  transform-origin: top center;
  transition: transform var(--tl-line-seg) linear calc(var(--tl-line-base) + var(--tl-i) * var(--tl-line-seg));
}

.timeline-item:nth-child(2) .timeline-node::after {
  background: linear-gradient(to bottom, var(--tl-c1), var(--tl-c2));
}

.timeline-item:nth-child(3) .timeline-node::after {
  background: linear-gradient(to bottom, var(--tl-c2), var(--tl-c3));
}

.timeline-item:last-child .timeline-node::after {
  display: none;
}

.timeline-content {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.timeline-icon {
  flex-shrink: 0;
  color: var(--color-accent);
  transition:
    opacity var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--tl-row-delay) + 80ms),
    transform var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--tl-row-delay) + 80ms);
}

.timeline-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(70, 130, 255, 0.08) 0%, rgba(80, 170, 255, 0.06) 50%, rgba(150, 130, 245, 0.08) 100%);
  border: 1px solid rgba(47, 111, 237, 0.1);
  animation: timelineIconFloat 4.6s ease-in-out infinite;
  animation-delay: calc(var(--tl-i) * -1.1s);
}

@keyframes timelineIconFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.timeline-icon svg {
  width: 26px;
  height: 26px;
}

.timeline-text {
  min-width: 0;
  max-width: 34em;
  padding-top: calc(var(--tl-node-center) - 13px);
  transition:
    opacity var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--tl-row-delay) + 160ms),
    transform var(--tl-row-duration) cubic-bezier(0.22, 1, 0.36, 1) calc(var(--tl-row-delay) + 160ms);
}

.timeline-title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-primary-dark);
  margin-bottom: 6px;
}

.timeline-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.9;
  color: var(--color-text-muted);
}

/* 初期状態（既存directiveが .scroll-reveal-child を付与し、まだ .is-revealed が無い間だけ） */
.timeline.scroll-reveal-child:not(.is-revealed) .timeline-year,
.timeline.scroll-reveal-child:not(.is-revealed) .timeline-icon,
.timeline.scroll-reveal-child:not(.is-revealed) .timeline-text {
  opacity: 0;
  transform: translateY(var(--tl-row-shift));
}

.timeline.scroll-reveal-child:not(.is-revealed) .timeline-node::before {
  opacity: 0;
}

.timeline.scroll-reveal-child:not(.is-revealed) .timeline-node::after {
  transform: scaleY(0);
}

/* Tablet: 2カラムは維持し、写真・余白だけ縮小する */
@media (max-width: 1024px) {
  .story-bg-text {
    font-size: clamp(58px, 13.2vw, 108px);
    top: -18px;
  }

  .story-inner {
    grid-template-columns: minmax(200px, 32%) 1fr;
    gap: var(--space-lg);
  }

  .member-photo {
    width: 100%;
  }

  .timeline {
    --tl-node-center: 24px;
  }

  .timeline-item {
    grid-template-columns: 60px 22px 1fr;
  }

  .timeline-content {
    gap: var(--space-sm);
  }

  .timeline-icon-circle {
    width: 48px;
    height: 48px;
  }

  .timeline-icon svg {
    width: 24px;
    height: 24px;
  }

  .timeline-title {
    font-size: 16px;
  }
}

/* SP: Career Story → 写真 → プロフィール → Timeline の完全な縦積み */
@media (max-width: 767px) {
  .story-bg-text {
    font-size: clamp(56px, 19.4vw, 79px);
    color: rgba(38, 126, 220, 0.14);
    top: -5px;
  }

  .story-inner {
    grid-template-columns: 1fr;
  }

  .member-block {
    max-width: 280px;
    margin-inline: auto;
    text-align: center;
  }

  .career-story-label {
    transform: rotate(-5deg);
    transform-origin: center;
  }

  .member-photo {
    width: 100%;
    margin-inline: auto;
  }

  .timeline {
    margin-top: var(--space-xl);

    /* SP：Year行の中心にPointを合わせ、移動量・stagger・Line時間を控えめにする */
    --tl-node-center: 13px;
    --tl-gap: 32px;
    --tl-line-base: 180ms; /* ol自体のdelaySp(180ms)に合わせる */
    --tl-line-seg: 330ms;
    --tl-row-base: 220ms;
    --tl-row-stagger: 100ms;
    --tl-row-duration: 0.6s;
    --tl-row-shift: 14px;
  }

  /* ●── Year / │ Icon / │ Main Message / │ Description の縦積み */
  .timeline-item {
    grid-template-columns: 22px 1fr;
    grid-template-areas:
      'node year'
      'node content';
    column-gap: 14px;
  }

  .timeline-year {
    grid-area: year;
    font-size: 16px;
    line-height: 1.6;
    padding-top: 0;
  }

  .timeline-node {
    grid-area: node;
  }

  .timeline-node::before {
    animation-name: timelinePointPulseSp;
  }

  .timeline-content {
    grid-area: content;
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
  }

  .timeline-icon-circle {
    width: 44px;
    height: 44px;
    animation-name: timelineIconFloatSp;
  }

  .timeline-icon svg {
    width: 22px;
    height: 22px;
  }

  .timeline-text {
    max-width: none;
    padding-top: 0;
  }

  .timeline-title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  @keyframes timelinePointPulseSp {
    0%,
    100% {
      transform: scale(1);
      box-shadow:
        0 0 0 4px rgba(80, 170, 255, 0.16),
        0 0 8px rgba(47, 111, 237, 0.14);
    }
    50% {
      transform: scale(1.05);
      box-shadow:
        0 0 0 5px rgba(80, 170, 255, 0.12),
        0 0 10px rgba(47, 111, 237, 0.16);
    }
  }

  @keyframes timelineIconFloatSp {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }
}

/* Animationを止めても、Timeline / Point / Icon / Textはすべて通常表示にする */
@media (prefers-reduced-motion: reduce) {
  .timeline-year,
  .timeline-icon,
  .timeline-text,
  .timeline-icon-circle,
  .timeline-node::before,
  .timeline-node::after {
    animation: none;
    transition: none;
  }

  .timeline.scroll-reveal-child:not(.is-revealed) .timeline-year,
  .timeline.scroll-reveal-child:not(.is-revealed) .timeline-icon,
  .timeline.scroll-reveal-child:not(.is-revealed) .timeline-text,
  .timeline.scroll-reveal-child:not(.is-revealed) .timeline-node::before {
    opacity: 1;
    transform: none;
  }

  .timeline.scroll-reveal-child:not(.is-revealed) .timeline-node::after {
    transform: none;
  }
}
</style>
