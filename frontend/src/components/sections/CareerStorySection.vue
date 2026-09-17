<script setup>
import { careerStorySection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
</script>

<template>
  <section :id="careerStorySection.id" class="section career-story section-tint section-bg-decor">
    <div class="container">
      <SectionHeading
        :number="careerStorySection.heading.number"
        :title="careerStorySection.heading.title"
        :lead="careerStorySection.heading.lead"
      />

      <div class="story-inner">
        <div class="member-block">
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

        <ol class="timeline">
          <li v-for="(item, index) in careerStorySection.timeline" :key="index" class="timeline-item">
            <span class="timeline-year">{{ item.year }}</span>

            <span class="timeline-node" aria-hidden="true"></span>

            <div class="timeline-content">
              <div class="timeline-icon" aria-hidden="true">
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
              </div>

              <p class="timeline-description">{{ item.description }}</p>
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

/* 右：年数 → 縦ライン/node → icon → 説明 のTimeline */
.timeline {
  padding-top: var(--space-xs);
}

.timeline-item {
  display: grid;
  grid-template-columns: 72px 24px 1fr;
  column-gap: var(--space-sm);
  padding-bottom: var(--space-lg);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-year {
  font-size: 15px;
  font-weight: 800;
  color: var(--color-primary-dark);
  padding-top: 2px;
}

.timeline-node {
  position: relative;
}

.timeline-node::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  z-index: 1;
}

.timeline-node::after {
  content: '';
  position: absolute;
  top: 4px;
  bottom: calc(-1 * var(--space-lg));
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: var(--color-accent);
  opacity: 0.3;
}

.timeline-item:last-child .timeline-node::after {
  display: none;
}

.timeline-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}

.timeline-icon {
  flex-shrink: 0;
  color: var(--color-accent);
}

.timeline-icon svg {
  width: 26px;
  height: 26px;
}

.timeline-description {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-muted);
  padding-top: 2px;
}

/* Tablet: 2カラムは維持し、写真・余白だけ縮小する */
@media (max-width: 1024px) {
  .story-inner {
    grid-template-columns: minmax(200px, 32%) 1fr;
    gap: var(--space-lg);
  }

  .member-photo {
    width: 100%;
  }

  .timeline-item {
    grid-template-columns: 60px 22px 1fr;
  }
}

/* SP: Career Story → 写真 → プロフィール → Timeline の完全な縦積み */
@media (max-width: 767px) {
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
  }
}
</style>
