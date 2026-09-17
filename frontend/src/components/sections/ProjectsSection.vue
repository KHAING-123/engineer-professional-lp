<script setup>
import { projectsSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import TagList from '../ui/TagList.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'
</script>

<template>
  <section :id="projectsSection.id" class="section projects section-tint section-bg-decor">
    <div class="container">
      <!-- Heading背景の「WORK」はSection 01のPEOPLEと同じ思想の装飾。本文の後ろ（z-index:0）に固定し、操作不可にする -->
      <div class="heading-area">
        <div class="work-bg-text" aria-hidden="true">WORK</div>

        <div class="heading-row">
          <SectionHeading
            :number="projectsSection.heading.number"
            :title="projectsSection.heading.title"
            :lead="projectsSection.heading.lead"
          />
          <a :href="projectsSection.linkHref" class="link">{{ projectsSection.linkLabel }} →</a>
        </div>
      </div>

      <!-- 3つの仕事を独立カードではなく、連続した横長Rowとして表示する -->
      <div class="category-table">
        <div v-for="category in projectsSection.categories" :key="category.id" class="category-row">
          <div class="category-icon" :class="`category-icon-${category.id}`">
            <svg v-if="category.id === 'web'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M8 20h8" />
              <path d="M12 16v4" />
            </svg>
            <svg v-else-if="category.id === 'mobile'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <path d="M11 18h2" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 20V10" />
              <path d="M12 20V4" />
              <path d="M20 20v-7" />
              <path d="M2 20h20" />
            </svg>
          </div>

          <h3 class="category-title">{{ category.title }}</h3>
          <p class="category-description">{{ category.description }}</p>
          <TagList class="category-tags" :tags="category.tags" />

          <div class="category-image">
            <PlaceholderImage :src="category.image" :label="category.title" ratio="16 / 9" />
          </div>

          <div class="note-wrap">
            <p class="category-note">{{ category.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Section背景：Step 1で用意した共通Visual（.section-tint / .section-bg-decor）を利用し、
 * このSectionだけブロブの位置・色・濃さをCSS変数で上書きする。
 * 文字・写真が主役になるよう、装飾は控えめな不透明度にしている。
 */
.projects {
  --decor-1-color: var(--color-accent-soft);
  --decor-1-top: -8%;
  --decor-1-left: -6%;
  --decor-1-size: 360px;
  --decor-1-opacity: 0.5;

  --decor-2-color: var(--color-purple-soft);
  --decor-2-bottom: -10%;
  --decor-2-right: -6%;
  --decor-2-size: 380px;
  --decor-2-opacity: 0.45;
}

/* Heading背景の「WORK」演出用ラッパー。はみ出しをここで確実にclipする（Section 01の.heading-areaと同じ考え方） */
.heading-area {
  position: relative;
  overflow: hidden;
}

.work-bg-text {
  position: absolute;
  top: -28px;
  left: 0;
  width: 100%;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  text-align: left;
  font-size: clamp(82px, 13vw, 156px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.12em;
  white-space: nowrap;
  color: rgba(38, 126, 220, 0.11);
  animation: workMarquee 14s linear infinite;
  will-change: transform;
}

/*
 * 左画面外 → Section中央を右方向へ通過 → 右画面外 → 次Loopで再び左から。
 * .work-bg-text の width を親（.heading-area）と揃えているため、
 * translateX(-100%)/translateX(100%) が「自分の要素幅」ではなく
 * 「コンテナ1つ分」の移動量になり、テキスト自身の実際の幅に関わらず
 * 確実に左右の画面外まで出入りする。
 */
@keyframes workMarquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-bg-text {
    animation: none;
  }
}

.heading-row {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.heading-row :deep(.section-heading) {
  flex: 1 1 420px;
  margin-bottom: 0;
}

.link {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-primary-dark);
  white-space: nowrap;
  margin-top: var(--space-xs);
}

/* 3段の仕事Rowをまとめて1つの緩やかな連続Visualにする（独立カードにしない） */
.category-table {
  margin-top: var(--space-lg);
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(27, 58, 107, 0.1);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.category-row {
  display: grid;
  grid-template-columns: 80px minmax(300px, 1fr) minmax(230px, 280px) 140px;
  grid-template-areas:
    'icon title image note'
    'icon desc  image note'
    'icon tags  image note';
  column-gap: var(--space-md);
  row-gap: 4px;
  align-items: center;
  padding: 18px 28px;
  border-bottom: 1px solid rgba(27, 58, 107, 0.08);
}

.category-row:last-child {
  border-bottom: none;
}

.category-icon {
  grid-area: icon;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: linear-gradient(135deg, #05b9df 0%, #0879e6 100%);
  color: var(--color-white);
}

.category-icon svg {
  width: 36px;
  height: 36px;
}

.category-title {
  grid-area: title;
  font-size: 21px;
  font-weight: 800;
  color: var(--color-primary-dark);
}

.category-description {
  grid-area: desc;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--color-text-muted);
}

.category-tags {
  grid-area: tags;
  margin-top: 2px;
  gap: 5px;
}

.category-tags :deep(li) {
  background: #e8f3ff;
  color: #315f91;
  font-size: 11px;
  font-weight: 600;
  border-radius: 5px;
  padding: 2px 7px;
}

.category-image {
  grid-area: image;
  align-self: center;
  width: 100%;
  height: 96px;
}

.category-image :deep(.placeholder-image),
.category-image :deep(.placeholder-image-real) {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.category-image :deep(.placeholder-image-real) {
  object-fit: cover;
}

/* Noteの背景にある淡いBlueの円形Visual */
.note-wrap {
  grid-area: note;
  align-self: center;
  position: relative;
  display: grid;
  place-items: center;
  min-height: 90px;
}

.note-wrap::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(70, 155, 245, 0.1);
}

.category-note {
  position: relative;
  z-index: 1;
  max-width: 120px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.05em;
  color: #3978bd;
  text-align: center;
  transform: rotate(-5deg);
}

/* Tablet（1024px）: 4ゾーン構成は維持し、サイズだけ縮小する */
@media (max-width: 1024px) {
  .work-bg-text {
    /* top はフォントサイズに比例して縮める（クリップされる面積比を一定に保つため） */
    font-size: clamp(66px, 15vw, 123px);
    top: -18px;
  }

  .category-row {
    grid-template-columns: 64px 1fr 210px 120px;
    column-gap: var(--space-sm);
    padding: 16px var(--space-lg);
  }

  .category-icon {
    width: 64px;
    height: 64px;
  }

  .category-icon svg {
    width: 28px;
    height: 28px;
  }

  .category-image {
    height: 84px;
  }

  .note-wrap::before {
    width: 84px;
    height: 84px;
  }

  .category-note {
    font-size: 15px;
    max-width: 100px;
  }
}

/*
 * 768px前後: 横幅が厳しいため、上段[Icon + Title/Description/Tags]、
 * 下段[Image + Note]の2段構成に組み替える。
 */
@media (max-width: 860px) {
  .work-bg-text {
    font-size: clamp(57px, 16vw, 98px);
    top: -10px;
  }

  .category-row {
    grid-template-columns: 56px 1fr 110px;
    grid-template-areas:
      'icon title title'
      'icon desc  desc'
      'icon tags  tags'
      '.    image note';
    row-gap: 8px;
  }

  .category-icon {
    width: 56px;
    height: 56px;
  }

  .category-icon svg {
    width: 24px;
    height: 24px;
  }

  .category-image {
    height: 100px;
  }
}

/*
 * SP: [icon + title] → [description] → [tags] → [image] → [note] の縦積みに組み替える。
 * DOM順は変えず、grid-template-areas だけを再配置する。
 */
@media (max-width: 767px) {
  .work-bg-text {
    font-size: clamp(64px, 22vw, 90px);
    color: rgba(38, 126, 220, 0.14);
    top: -5px;
  }

  .heading-row {
    flex-direction: column;
    align-items: flex-start;
  }

  /*
   * flex-basis: 420px は横並び時（PC/Tablet）に幅の目安として指定したもの。
   * flex-direction: column に切り替わると同じ値が高さの下限として効いてしまうため、
   * SPでは解除する。
   */
  .heading-row :deep(.section-heading) {
    flex-basis: auto;
  }

  .link {
    align-self: flex-end;
  }

  .category-row {
    grid-template-columns: 48px 1fr;
    grid-template-areas:
      'icon title'
      'desc desc'
      'tags tags'
      'image image'
      'note note';
    row-gap: var(--space-sm);
    padding: var(--space-md);
  }

  .category-icon {
    width: 48px;
    height: 48px;
    align-self: center;
  }

  .category-icon svg {
    width: 22px;
    height: 22px;
  }

  .category-title {
    align-self: center;
  }

  .category-image {
    height: 180px;
  }

  .note-wrap {
    justify-self: center;
  }

  .category-note {
    transform: none;
  }
}
</style>
