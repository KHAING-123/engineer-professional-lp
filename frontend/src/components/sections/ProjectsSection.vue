<script setup>
import { projectsSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import TagList from '../ui/TagList.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'

/*
 * 各categoryのnoteを、参考画像と同じ自然な位置で2行に分割する。
 * lpContent.jsの文章自体は変更せず、category.idごとに区切り位置だけをここで決める。
 */
const noteLines = (category) => {
  const note = category.note
  if (category.id === 'web') {
    const splitIndex = note.indexOf('で') + 1
    return [note.slice(0, splitIndex), note.slice(splitIndex)]
  }
  if (category.id === 'mobile') {
    const splitIndex = note.indexOf('ら') + 1
    return [note.slice(0, splitIndex), note.slice(splitIndex)]
  }
  const parts = note.split('、')
  if (parts.length < 2) return [note, '']
  return [`${parts[0]}、`, parts.slice(1).join('、')]
}
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
          <span class="projects-label">
            <span class="projects-decor" aria-hidden="true">
              <span class="pdeco pdot-1"></span>
              <span class="pdeco pdot-2"></span>
              <span class="pdeco pdot-3"></span>
              <span class="pdeco pdot-4"></span>
              <span class="pdeco pdot-5"></span>
              <span class="pdeco pdot-6"></span>
              <span class="pdeco pglow-1"></span>
              <span class="pdeco pglow-2"></span>
              <span class="pdeco pstar-1"></span>
              <span class="pdeco pstar-2"></span>
            </span>
            <span class="projects-label__text">{{ projectsSection.linkLabel }}</span>
          </span>
        </div>
      </div>

      <!-- 3つの仕事を独立カードではなく、連続した横長Rowとして表示する -->
      <div class="category-table">
        <div
          v-for="(category, index) in projectsSection.categories"
          :key="category.id"
          class="category-row"
          v-scroll-reveal-child="{ delay: 130 + index * 90, delaySp: 90 + index * 80 }"
        >
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

          <div class="note-wrap" :class="`note-wrap-${category.id}`">
            <p class="category-note">
              <span class="note-line">{{ noteLines(category)[0] }}</span>
              <span class="note-line note-line-2">{{ noteLines(category)[1] }}</span>
            </p>
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

/*
 * 「PROJECTS」はLinkではなく、Section 02右上の装飾的なタイトルとして表示する。
 * クリック不可・cursor:default・ButtonやCard風の囲みは一切持たせない。
 * ::beforeで背後に非常に薄いGlow、周囲にBlue/Cyan/Purpleの小さな装飾（span×4）を浮かせる。
 */
.projects-label {
  position: relative;
  isolation: isolate;
  overflow: visible;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  margin-top: var(--space-xs);
  /*
   * .heading-row は justify-content:space-between のため、このLabelは
   * .heading-area（overflow:hidden、WORK文字のClip用）の右端にほぼ隙間なく接している。
   * 右へ広がるBubble/Glowが確実にclipされないよう、20pxの余白を確保する。
   */
  margin-right: 20px;
  cursor: default;
  user-select: none;
}

/* Layer順: 文字が最前面(2) → Bubble/Sparkle(1) → 背後のGlow(0)。isolationでこのLabel内だけに閉じる */
.projects-label::before {
  content: '';
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 35px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(69, 157, 255, 0.12), rgba(145, 112, 246, 0.05) 55%, transparent 75%);
  filter: blur(8px);
  pointer-events: none;
}

.projects-label__text {
  position: relative;
  z-index: 2;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.15em;
  background: linear-gradient(90deg, #0b2d5c 0%, #168ee8 55%, #7568ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 文字自体は非常に小さいFloatだけにとどめ、周囲のBubbleの方が目立つようにする */
  animation: projectsLabelFloat 5s ease-in-out infinite;
}

@keyframes projectsLabelFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

/* 手書きで引いたような短いUnderline。border-bottomは使わずtext自身の::afterで表現する */
.projects-label__text::after {
  content: '';
  position: absolute;
  left: 4%;
  bottom: -7px;
  width: 92%;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #16a6e8, #428cff, #9875f4);
  transform: rotate(-2deg);
  transform-origin: center;
  animation: projectsUnderlinePulse 6s ease-in-out infinite;
}

@keyframes projectsUnderlinePulse {
  0%,
  100% {
    transform: rotate(-2deg) scaleX(0.94);
  }
  50% {
    transform: rotate(-2deg) scaleX(1);
  }
}

/*
 * PROJECTS周囲のCircle/Bubble/Sparkle。文字の外側へ左上・右上・左中央・右中央・左下・右下と
 * 非対称に散らし、それぞれ違うduration/delay/animationで同時に動かないようにする。
 * .projects-labelがisolation:isolateを持つため、z-index:1はこのLabel内だけで文字(2)の
 * 後ろ・背景Glow(0)の前に安定して収まる。
 */
.projects-decor {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.pdeco {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  will-change: transform, opacity;
}

/* small: Cyan */
.pdot-1 {
  top: -1px;
  left: -14px;
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, #20bceb, rgba(32, 188, 235, 0.3));
  opacity: 0.85;
  animation: projectsBubbleFloatA 3.2s ease-in-out infinite;
}

/* medium: Blue */
.pdot-2 {
  top: -7px;
  left: 28%;
  width: 9px;
  height: 9px;
  background: radial-gradient(circle, #398bff, rgba(57, 139, 255, 0.25));
  opacity: 0.62;
  animation: projectsBubbleFloatB 4.1s ease-in-out infinite;
  animation-delay: -1.2s;
}

/* small: Purple */
.pdot-3 {
  top: 1px;
  right: -10px;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #9674f5, rgba(150, 116, 245, 0.3));
  opacity: 0.8;
  animation: projectsBubbleFloatC 4.8s ease-in-out infinite;
  animation-delay: -2.1s;
}

/* large: Light Blue（大きいものほどopacityを落として奥行きを出す） */
.pdot-4 {
  top: 45%;
  left: -22px;
  width: 15px;
  height: 15px;
  background: radial-gradient(circle, #58c8ff, rgba(88, 200, 255, 0.2));
  opacity: 0.4;
  animation: projectsBubbleFloatA 5.5s ease-in-out infinite;
  animation-delay: -3s;
}

/* medium: Light Purple */
.pdot-5 {
  bottom: -12px;
  right: 8px;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #c69bff, rgba(198, 155, 255, 0.25));
  opacity: 0.55;
  animation: projectsBubbleFloatB 6.2s ease-in-out infinite;
  animation-delay: -0.5s;
}

/* small: Cyan */
.pdot-6 {
  bottom: -18px;
  left: 25%;
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, #20bceb, rgba(32, 188, 235, 0.3));
  opacity: 0.78;
  animation: projectsBubbleFloatC 3.2s ease-in-out infinite;
  animation-delay: -1.8s;
}

/* Glow Bubble: Blue */
.pglow-1 {
  top: 20%;
  right: -14px;
  width: 18px;
  height: 18px;
  background: rgba(67, 174, 255, 0.35);
  box-shadow: 0 0 10px rgba(67, 174, 255, 0.35), 0 0 20px rgba(122, 111, 255, 0.18);
  animation: projectsBubbleFloatA 4.1s ease-in-out infinite;
  animation-delay: -2.5s;
}

/* Glow Bubble: Purple */
.pglow-2 {
  bottom: -4px;
  left: -18px;
  width: 14px;
  height: 14px;
  background: rgba(150, 116, 245, 0.32);
  box-shadow: 0 0 9px rgba(150, 116, 245, 0.32), 0 0 18px rgba(67, 174, 255, 0.15);
  animation: projectsBubbleFloatB 4.8s ease-in-out infinite;
  animation-delay: -0.9s;
}

/* 4方向に尖ったSparkle。画像ではなくclip-pathで形を作る */
.pstar-1 {
  top: -5px;
  left: 45%;
  width: 10px;
  height: 10px;
  border-radius: 0;
  background: linear-gradient(135deg, #25b8f1, #398bff);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
  animation: projectsSparkleTwinkle 4s ease-in-out infinite;
}

.pstar-2 {
  bottom: -14px;
  right: 30%;
  width: 9px;
  height: 9px;
  border-radius: 0;
  background: linear-gradient(135deg, #9674f5, #c69bff);
  clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
  animation: projectsSparkleTwinkle 4.6s ease-in-out infinite;
  animation-delay: -2s;
}

@keyframes projectsBubbleFloatA {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(5px, -7px) scale(1.15);
  }
}

@keyframes projectsBubbleFloatB {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-6px, 5px) scale(0.9);
  }
}

@keyframes projectsBubbleFloatC {
  0%,
  100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(4px, -5px);
  }
  66% {
    transform: translate(-3px, -8px);
  }
}

@keyframes projectsSparkleTwinkle {
  0%,
  100% {
    transform: scale(0.8) rotate(-6deg);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.25) rotate(6deg);
    opacity: 0.9;
  }
}

/* Tablet: Circle/Bubbleを8個→6個に間引く（5〜7個の目安） */
@media (max-width: 1024px) {
  .pdot-4,
  .pglow-2 {
    display: none;
  }
}

/* SP: Circle/Bubbleを6個→4個、Sparkleを2個→1個に間引く（4〜5個の目安） */
@media (max-width: 767px) {
  .pdot-2,
  .pdot-5,
  .pstar-2 {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-label__text,
  .projects-label__text::after,
  .pdeco {
    animation: none;
  }
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
  grid-template-columns: 80px minmax(300px, 1fr) minmax(230px, 280px) 190px;
  grid-template-areas:
    'icon title image note'
    'icon desc  image note'
    'icon tags  image note';
  column-gap: var(--space-md);
  row-gap: 4px;
  align-items: center;
  padding: 28px 28px;
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

/*
 * 画像コンテナ：左上・右下が斜めに切れたParallelogram型に加工する。
 * サイズ（width/height）は既存のまま維持し、aspect-ratioは
 * width/heightが明示されている限り無効（サイズへの影響なし）。
 */
.category-image {
  grid-area: image;
  align-self: center;
  position: relative;
  width: 100%;
  height: 120px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 18px;
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
  box-shadow: 0 18px 40px rgba(32, 72, 150, 0.12);
  transition: transform 0.35s ease;
}

@media (hover: hover) and (pointer: fine) {
  .category-image:hover {
    transform: translateY(-6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .category-image {
    transition: none;
  }
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

/*
 * note：テキスト＋背景円を「1つのwrapper」としてまとめてrotateすることで、
 * 参考画像のように手書きメモを少し斜めに置いたような一体感を出す。
 * 円は.note-wrap::beforeで作成し（画像不使用）、wrapperごと傾けるためcircle自体には
 * 個別のrotateを持たせない。3note共通のサイズ・角度・文字スタイルにし、円の色だけを変える。
 */
.note-wrap {
  grid-area: note;
  align-self: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 170px;
  padding-right: 10px;
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .note-wrap:hover {
    transform: rotate(-3deg) translateY(-4px) scale(1.02);
  }
}

.note-wrap::before {
  content: '';
  position: absolute;
  z-index: 0;
  top: 50%;
  right: 0;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: rgba(185, 216, 255, 0.35);
  transform: translateY(-50%);
  pointer-events: none;
}

.note-wrap-mobile::before {
  background: rgba(207, 196, 255, 0.32);
}

.note-wrap-data::before {
  background: rgba(180, 225, 255, 0.35);
}

.category-note {
  position: relative;
  z-index: 1;
  font-family: 'Hiragino Maru Gothic ProN', 'Yu Gothic', 'Noto Sans JP', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-align: left;
  color: #1768c5;
  background: linear-gradient(135deg, #245fad 0%, #3d7fc9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 2px 2px rgba(30, 100, 190, 0.16),
    0 5px 10px rgba(30, 100, 190, 0.1);
}

.note-line {
  display: block;
  white-space: nowrap;
}

.note-line-2 {
  margin-left: 5px;
}

@media (prefers-reduced-motion: reduce) {
  .note-wrap {
    transition: none;
  }

  .note-wrap:hover {
    transform: rotate(-5deg);
  }
}

/* Tablet（1024px）: 4ゾーン構成は維持し、サイズだけ縮小する */
@media (max-width: 1024px) {
  .work-bg-text {
    /* top はフォントサイズに比例して縮める（クリップされる面積比を一定に保つため） */
    font-size: clamp(66px, 15vw, 123px);
    top: -18px;
  }

  .category-row {
    grid-template-columns: 64px 1fr 210px 160px;
    column-gap: var(--space-sm);
    padding: 22px var(--space-lg);
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
    height: 108px;
  }

  .note-wrap {
    min-height: 140px;
  }

  .note-wrap::before {
    width: 140px;
    height: 140px;
  }

  .category-note {
    font-size: 18px;
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
    grid-template-columns: 56px 1fr 150px;
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
    height: 124px;
  }

  .note-wrap {
    min-height: 120px;
  }

  .note-wrap::before {
    width: 120px;
    height: 120px;
  }

  .category-note {
    font-size: 14px;
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

  .projects-label {
    align-self: flex-end;
  }

  .projects-label__text {
    font-size: 17px;
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
    height: 204px;
  }

  .note-wrap {
    justify-self: center;
    min-height: 200px;
    padding-right: 8px;
  }

  .note-wrap::before {
    width: 200px;
    height: 200px;
  }

  .category-note {
    font-size: 16px;
  }
}
</style>
