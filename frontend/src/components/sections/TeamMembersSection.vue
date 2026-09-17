<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { teamMembersSection } from '../../data/lpContent.js'
import TagList from '../ui/TagList.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'

/*
 * 他Section（SectionHeading.vue）と同じReveal Animationの仕組みを、
 * このSectionだけ独自markupのHeadingにも適用する。
 */
const headingRef = ref(null)
const isRevealed = ref(false)
let observer = null

onMounted(() => {
  if (!headingRef.value || typeof IntersectionObserver === 'undefined') {
    isRevealed.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )
  observer.observe(headingRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section :id="teamMembersSection.id" class="section team-members">
    <div class="container">
      <!-- Heading背景の「PEOPLE」はaria-hidden装飾。本文の後ろ（z-index:0）に固定し、操作不可にする -->
      <div class="heading-area">
        <div class="people-bg-text" aria-hidden="true">PEOPLE</div>

        <div ref="headingRef" class="section-heading-01" :class="{ 'is-revealed': isRevealed }">
          <div class="heading-main">
            <span class="heading-number">{{ teamMembersSection.heading.number }}</span>
            <div class="heading-copy">
              <h2>{{ teamMembersSection.heading.title }}</h2>
              <span class="heading-accent" aria-hidden="true"></span>
              <p v-if="teamMembersSection.heading.lead" class="heading-lead">
                {{ teamMembersSection.heading.lead }}
              </p>
            </div>
          </div>
          <p v-if="teamMembersSection.heading.note" class="heading-note">
            {{ teamMembersSection.heading.note }}
          </p>
        </div>
      </div>

      <!-- 3名を独立カードではなく、1つの連続した紹介エリアとして表示する -->
      <div class="member-table">
        <div v-for="member in teamMembersSection.members" :key="member.id" class="member-row">
          <div class="member-photo">
            <PlaceholderImage :src="member.image" :label="member.name" ratio="16 / 9" />
          </div>

          <div class="member-info">
            <p class="member-name">{{ member.name }} / {{ member.age }}歳</p>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-previous">前職：{{ member.previousJob }}</p>
            <p class="member-description">{{ member.description }}</p>
            <TagList class="member-tags" :tags="member.tags" />
          </div>

          <div class="member-comment">
            <span class="quote quote-open" aria-hidden="true">&#8220;</span>
            <p>{{ member.comment }}</p>
            <span class="quote quote-close" aria-hidden="true">&#8221;</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section 01専用の背景。Section全体を白〜非常に淡いブルーのグラデーションにし、
 * 他Section（白背景）と視覚的に区切る。強い青にはしない。
 */
.team-members {
  background: linear-gradient(180deg, #ffffff 0%, #f2f8ff 35%, #eef5ff 65%, #ffffff 100%);
}

/* Heading背景の「PEOPLE」演出用ラッパー。はみ出しをここで確実にclipする */
.heading-area {
  position: relative;
  overflow: hidden;
}

.people-bg-text {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  font-size: clamp(75px, 12vw, 148px);
  font-weight: 800;
  letter-spacing: 0.12em;
  white-space: nowrap;
  color: rgba(45, 125, 220, 0.11);
  animation: peopleDrift 10s ease-in-out infinite;
  will-change: transform;
}

@keyframes peopleDrift {
  0% {
    transform: translate(-8%, 0);
  }
  25% {
    transform: translate(-3%, -4px);
  }
  50% {
    transform: translate(8%, 2px);
  }
  75% {
    transform: translate(3%, -3px);
  }
  100% {
    transform: translate(-8%, 0);
  }
}

/* SP: 横幅が狭いため、左右の移動量をPCより少し小さくする */
@keyframes peopleDriftSp {
  0% {
    transform: translate(-5%, 0);
  }
  25% {
    transform: translate(-2%, -3px);
  }
  50% {
    transform: translate(5%, 2px);
  }
  75% {
    transform: translate(2%, -2px);
  }
  100% {
    transform: translate(-5%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .people-bg-text {
    animation: none;
  }
}

/*
 * 見出し：大きな「01」＋太いタイトルを横並びにし、その下にリード文、
 * 右側に手書き風メモを置く。他Sectionが使う共通の SectionHeading.vue とは
 * 見た目が異なるため、このSectionだけローカルにマークアップする。
 */
.section-heading-01 {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
  flex-wrap: wrap;
  margin-bottom: var(--space-lg);
}

.heading-main {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

/*
 * Numberは単純な太字ではなく、Deep Navy + ごく弱い立体感（白のリフト影 + 淡いBlueの拡散影）
 * + 背後の非常に薄いBlue Glowで、他Section（SectionHeading.vue）と同じDesign Systemに揃える。
 */
.heading-number {
  position: relative;
  isolation: isolate;
  font-size: 72px;
  font-weight: 900;
  line-height: 1;
  color: #0a2b57;
  letter-spacing: -0.04em;
  text-shadow:
    0 2px 0 rgba(255, 255, 255, 0.8),
    0 6px 16px rgba(19, 91, 180, 0.12);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.heading-number::after {
  content: '';
  position: absolute;
  left: 2px;
  bottom: 4px;
  width: 55px;
  height: 18px;
  background: rgba(40, 150, 255, 0.16);
  filter: blur(14px);
  z-index: -1;
  pointer-events: none;
}

.heading-copy {
  position: relative;
}

.heading-copy h2 {
  font-size: 32px;
  font-weight: 800;
  color: #0a2b57;
  letter-spacing: -0.035em;
  line-height: 1.25;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9),
    0 4px 12px rgba(12, 74, 150, 0.08);
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    letter-spacing 0.4s ease;
  transition-delay: 0.1s;
}

/* Titleの下の短いBlue Accent Line。Reveal時に0→32pxへ伸びる装飾 */
.heading-accent {
  display: block;
  width: 0;
  height: 3px;
  margin: 6px 0 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #168fe5, #5cc9ff);
  transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.26s;
}

.heading-lead {
  font-size: 14px;
  color: var(--color-text-muted);
  max-width: 50ch;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.18s;
}

.section-heading-01.is-revealed .heading-number,
.section-heading-01.is-revealed .heading-copy h2,
.section-heading-01.is-revealed .heading-lead {
  opacity: 1;
  transform: translateY(0);
}

.section-heading-01.is-revealed .heading-accent {
  width: 32px;
}

/* PCのみ：Heading付近へのHoverでごく軽く反応する（Buttonのようには見せない） */
@media (hover: hover) and (pointer: fine) {
  .section-heading-01:hover .heading-number {
    transform: translateY(-2px);
  }

  .section-heading-01:hover .heading-copy h2 {
    letter-spacing: -0.03em;
  }

  .section-heading-01:hover .heading-accent {
    width: 42px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .heading-number,
  .heading-copy h2,
  .heading-lead,
  .heading-accent {
    transition: none;
  }

  .heading-number,
  .heading-copy h2,
  .heading-lead {
    opacity: 1;
    transform: none;
  }

  .heading-accent {
    width: 32px;
  }

  .section-heading-01:hover .heading-number {
    transform: none;
  }

  .section-heading-01:hover .heading-copy h2 {
    letter-spacing: -0.035em;
  }

  .section-heading-01:hover .heading-accent {
    width: 32px;
  }
}

.heading-note {
  font-size: 17px;
  font-weight: 500;
  color: #3488db;
  line-height: 1.7;
  letter-spacing: 0.08em;
  white-space: pre-line;
  text-align: right;
  transform: rotate(-4deg);
}

/* 連続した社員紹介エリア（独立カードにしない） */
.member-table {
  border-top: 1px solid rgba(27, 58, 107, 0.1);
}

.member-row {
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(400px, 1fr) minmax(260px, 320px);
  gap: var(--space-lg);
  align-items: center;
  padding-block: 22px;
  border-bottom: 1px solid rgba(27, 58, 107, 0.1);
}

.member-photo {
  width: 100%;
}

/*
 * PlaceholderImage は src が無い間は独自に aspect-ratio を確保するが、
 * 実画像を渡した <img> 側には比率指定が無いため、ここで明示しておく。
 * 実画像追加時にこのCSSを変更する必要が出ないようにするための対応。
 */
.member-photo :deep(.placeholder-image-real) {
  aspect-ratio: 16 / 9;
  border-radius: 12px;
}

.member-photo :deep(.placeholder-image) {
  border-radius: 12px;
}

.member-name {
  font-size: 19px;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.member-role {
  font-size: 18px;
  font-weight: 800;
  color: var(--color-primary-dark);
  margin-bottom: 4px;
}

.member-previous {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.member-description {
  font-size: 13px;
  line-height: 1.55;
  color: var(--color-text-muted);
  margin-bottom: var(--space-sm);
}

.member-tags {
  gap: 5px;
}

.member-tags :deep(li) {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  background: #e9f4ff;
  color: #376c9c;
}

/* コメントは淡いBlue背景のBoxにする */
.member-comment {
  display: flex;
  flex-direction: column;
  background: rgba(235, 247, 255, 0.65);
  border-radius: 10px;
  padding: 20px;
}

.member-comment .quote {
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
  color: var(--color-accent);
}

.member-comment .quote-open {
  align-self: flex-start;
}

.member-comment .quote-close {
  align-self: flex-end;
}

.member-comment p {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.7;
  color: var(--color-primary-dark);
  margin-block: 4px;
}

/* Tablet: 写真+社員情報を2列、コメントは下に全幅で回す */
@media (max-width: 1024px) {
  .member-row {
    grid-template-columns: 220px 1fr;
    gap: var(--space-md);
  }

  .member-comment {
    grid-column: 1 / -1;
  }

  .people-bg-text {
    font-size: clamp(58px, 14vw, 115px);
  }
}

/* 768px: Photo|Profile と Quote の2段構成に切り替える */
@media (max-width: 860px) {
  .member-row {
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      'photo info'
      'comment comment';
    row-gap: var(--space-sm);
  }

  .member-photo {
    grid-area: photo;
  }

  .member-info {
    grid-area: info;
  }

  .member-comment {
    grid-area: comment;
  }
}

/* SP: 写真 → 社員情報（タグ含む） → コメント の縦積み */
@media (max-width: 767px) {
  .heading-main {
    gap: var(--space-sm);
  }

  .heading-number {
    font-size: 44px;
  }

  .heading-copy h2 {
    font-size: 22px;
  }

  .section-heading-01 {
    flex-direction: column;
    align-items: flex-start;
  }

  .heading-note {
    text-align: left;
  }

  .people-bg-text {
    font-size: clamp(64px, 22vw, 90px);
    /* letter-spacingをPC基準のままにすると、中央寄せの文字幅がSP画面幅を超えて左端の「P」が欠ける */
    letter-spacing: 0.02em;
    color: rgba(45, 125, 220, 0.14);
    animation-name: peopleDriftSp;
  }

  .member-row {
    grid-template-columns: 1fr;
    grid-template-areas:
      'photo'
      'info'
      'comment';
    text-align: center;
    padding-block: var(--space-md);
  }

  .member-photo {
    max-width: 320px;
    margin-inline: auto;
  }

  .member-info :deep(.tag-list) {
    justify-content: center;
  }

  .member-comment {
    align-items: center;
  }
}
</style>
