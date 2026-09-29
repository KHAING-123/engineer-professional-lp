<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { careerSupportSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import PlaceholderImage from '../ui/PlaceholderImage.vue'

/*
 * 下側の「Career Support」Noteカードは、Viewportに入った瞬間だけFade+Slide Animationを発火させる。
 * 一度表示されたらobserverを切断し、以降のScrollで再度Animationしないようにする。
 */
const noteRef = ref(null)
const isNoteVisible = ref(false)
let observer = null

onMounted(() => {
  if (!noteRef.value || typeof IntersectionObserver === 'undefined') {
    isNoteVisible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isNoteVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )
  observer.observe(noteRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div :id="careerSupportSection.id" class="career-support-panel">
    <div class="panel-heading">
      <SectionHeading
        :number="careerSupportSection.heading.number"
        :title="careerSupportSection.heading.title"
        :lead="careerSupportSection.heading.lead"
      />

      <!--
        Title背景の英文字Decoration。SectionHeading（.section-heading.is-revealed）の直後に置き、
        既存のReveal Stateを兄弟セレクタで参照してFade-in → Breathingを開始する。
        外側：Fade-in（opacity transition）/ 内側：Breathing（opacity animation）
      -->
      <div v-if="careerSupportSection.decorativeLabel" class="support-bg-text" aria-hidden="true">
        <span class="support-bg-text-inner">{{ careerSupportSection.decorativeLabel }}</span>
      </div>
    </div>

    <!--
      Premium Career Support：左 Consultant Visual | 右 Soft Glass Support Panel ×4。
      transformの担当を分ける：
        .support-visual（装飾Glowの基準）> .support-visual-frame（Float：translate）> 画像
        .support-item（Reveal：既存 v-scroll-reveal-child）> .support-item-inner（Float：translate）
    -->
    <div class="support-body">
      <div class="support-visual">
        <span class="support-visual-glow support-visual-glow-1" aria-hidden="true"></span>
        <span class="support-visual-glow support-visual-glow-2" aria-hidden="true"></span>
        <div class="support-visual-frame">
          <PlaceholderImage :src="careerSupportSection.image" label="キャリアコンサルタント" ratio="1086 / 1159" />
        </div>
      </div>

      <ul class="support-list">
        <li
          v-for="(point, index) in careerSupportSection.points"
          :key="point"
          class="support-item"
          v-scroll-reveal-child="{ delay: 120 + index * 100, delaySp: 80 + index * 80 }"
        >
          <div class="support-item-inner">
            <span class="support-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 12.5l4 4 8-9" />
              </svg>
            </span>
            <span class="support-text">{{ point }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!--
      Section 06下側の空白を活用したCareer Support Note。
      Section 07とは独立したこのSection内だけの装飾のため、位置・サイズはここで完結させる。
    -->
    <div class="support-note-area">
      <span class="note-blob" aria-hidden="true"></span>

      <div ref="noteRef" class="support-note-reveal" :class="{ 'is-visible': isNoteVisible }">
        <span class="note-glow-purple" aria-hidden="true"></span>

        <div class="support-note-float">
          <div class="support-note-card">
            <span class="note-tick note-tick-1" aria-hidden="true"></span>
            <span class="note-tick note-tick-2" aria-hidden="true"></span>
            <span class="note-tick note-tick-3" aria-hidden="true"></span>

            <p class="note-eyebrow">Career Support</p>
            <p class="note-body">
              一人ひとりの「やりたい」を、<br />
              一緒にカタチにしていきます。
            </p>

            <svg class="note-underline" viewBox="0 0 200 16" aria-hidden="true">
              <defs>
                <linearGradient id="careerSupportUnderlineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#168fe5" />
                  <stop offset="50%" stop-color="#5cc9ff" />
                  <stop offset="100%" stop-color="#b79dfa" />
                </linearGradient>
              </defs>
              <path
                d="M4 10 C 42 3, 92 14, 138 6 S 184 9, 196 5"
                fill="none"
                stroke="url(#careerSupportUnderlineGradient)"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <div class="support-note-side">
          <p class="side-message">
            あなたの<br />
            これからを、<br />
            一緒に考えます。
          </p>
          <svg class="side-arrow" viewBox="0 0 56 36" aria-hidden="true">
            <path d="M50 4 C 32 8, 18 20, 8 30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
            <path
              d="M16 26 L7 31 L11 21"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * App.vue側の共通Band（.support-interview-band）に収まる「パネル」としての実装。
 * Section 06/07自身は独立した大きなSectionには見えないよう、外側背景・大きいpaddingは持たない。
 *
 * 以前は height: 100% でSection07（画像を含みより背が高い）と強制的に高さを揃えていたが、
 * これがCareer Support Noteエリアの下に大きな空白を生む原因になっていたため削除した。
 * 親Grid（.support-interview-inner, align-items:start）はSection06を自身のコンテンツ分の
 * 高さで自然に配置するだけなので、height指定が無くてもSection08との重なりは発生しない。
 */
.career-support-panel {
  height: auto;
}

/* SectionHeading.vue本体は変更せず、このパネル内だけ番号・タイトルをコンパクトにする */
.panel-heading :deep(.section-heading) {
  margin-bottom: var(--space-md);
}

.panel-heading :deep(.heading-number) {
  font-size: 44px;
}

.panel-heading :deep(.heading-copy h2) {
  font-size: 21px;
}

/*
 * Premium Career Support：Consultant Visual（約40%）| Soft Glass Support Panel ×4（約60%）。
 * Section 06は共通Band（App.vue）の片側パネルのため、その幅の中で2カラムを組む。
 * 1024px以下はパネル幅が狭くなるため縦並び（Visual → Panel）に切り替える。
 */
.support-body {
  display: grid;
  grid-template-columns: 40% 1fr;
  align-items: center;
  gap: 22px;
}

/* Consultant Visual：大きめの角丸・薄いBlue border・Blue系Soft Shadow + 背後の淡いGlow 2個 */
.support-visual {
  position: relative;
}

.support-visual-glow {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
}

.support-visual-glow-1 {
  top: -22px;
  right: -26px;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(170, 150, 255, 0.28) 0%, rgba(170, 150, 255, 0.1) 55%, transparent 72%);
}

.support-visual-glow-2 {
  bottom: -26px;
  left: -28px;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(110, 175, 255, 0.26) 0%, rgba(110, 175, 255, 0.1) 55%, transparent 72%);
}

.support-visual-frame {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(100, 150, 255, 0.12);
  background: #ffffff;
  box-shadow:
    0 18px 40px rgba(60, 100, 200, 0.12),
    0 4px 12px rgba(90, 120, 220, 0.06);
  animation: supportVisualFloat 6s ease-in-out infinite;
}

/* 画像比率（1086 × 1159）のまま表示し、人物がcropされないようにする */
.support-visual-frame :deep(.placeholder-image-real) {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 1086 / 1159;
  object-fit: cover;
  border-radius: 0;
}

@keyframes supportVisualFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -4px;
  }
}

/* Soft Glass Support Panel */
.support-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* List付近の小さなBubble 1個（装飾・操作不可） */
.support-list::before {
  content: '';
  position: absolute;
  top: -18px;
  right: 18px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.9), rgba(120, 170, 255, 0.55));
  pointer-events: none;
}

/*
 * Reveal（既存の v-scroll-reveal-child）を、このSection内だけ少し軽くする（14px / 0.6s）。
 * .scroll-reveal-child が付いている間だけ効くため、IntersectionObserverが無い環境では常に通常表示。
 */
.support-item.scroll-reveal-child {
  transform: translateY(14px);
  transition-duration: 0.6s;
}

.support-item.scroll-reveal-child.is-revealed {
  transform: translateY(0);
}

.support-item-inner {
  --check-a: #6aa8ff;
  --check-b: #2f6fed;
  --check-glow: 47, 111, 237;

  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px 14px 12px;
  border-radius: 24px;
  border: 1px solid rgba(100, 150, 255, 0.1);
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.9) 0%, rgba(246, 250, 255, 0.84) 100%);
  box-shadow: 0 10px 28px rgba(70, 110, 200, 0.08);
  animation: supportItemFloat 6s ease-in-out infinite;
}

/* Check Circleの色味だけ Blue / Purple / Cyan / Blue-Purple で少しずつ変える */
.support-item:nth-child(2) .support-item-inner {
  --check-a: #c09cfb;
  --check-b: #8b6cf6;
  --check-glow: 139, 108, 246;

  animation-delay: 0.4s;
}

.support-item:nth-child(3) .support-item-inner {
  --check-a: #6fe3f0;
  --check-b: #1fb4d8;
  --check-glow: 31, 180, 216;

  animation-delay: 0.8s;
}

.support-item:nth-child(4) .support-item-inner {
  --check-a: #8a9cfb;
  --check-b: #6a5cf0;
  --check-glow: 106, 92, 240;

  animation-delay: 1.2s;
}

@keyframes supportItemFloat {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -2px;
  }
}

.support-check {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--check-a) 0%, var(--check-b) 100%);
  box-shadow:
    0 0 0 5px rgba(var(--check-glow), 0.08),
    0 6px 14px rgba(var(--check-glow), 0.22);
  color: #ffffff;
}

.support-check svg {
  width: 20px;
  height: 20px;
}

/* 文節の区切りで折り返し、「ご / 提案」のような単語途中の改行を避ける（非対応ブラウザは通常の折り返し） */
.support-text {
  min-width: 0;
  word-break: auto-phrase;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.55;
  color: var(--color-primary-dark);
}

/* 1024px：2カラムを維持し、gap・Check・文字を少しだけ詰める */
@media (max-width: 1024px) {
  .support-body {
    gap: 18px;
  }

  .support-item-inner {
    gap: 12px;
    padding: 12px 14px 12px 12px;
    border-radius: 20px;
  }

  .support-check {
    width: 40px;
    height: 40px;
  }

  .support-check svg {
    width: 18px;
    height: 18px;
  }

  .support-text {
    font-size: 13.5px;
  }
}

/* 900px以下：パネル幅が狭くなるため Visual → Panel の縦並び（Visualは幅を抑えて中央） */
@media (max-width: 900px) {
  .support-body {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .support-visual {
    width: min(100%, 300px);
    justify-self: center;
  }
}

@media (max-width: 767px) {
  .support-visual {
    width: min(100%, 280px);
  }

  /* 狭い画面で装飾Glowが画面外へはみ出して横スクロールを作らないよう、はみ出し量を抑える */
  .support-visual-glow-1 {
    right: -8px;
  }

  .support-visual-glow-2 {
    left: -8px;
  }

  .support-visual-frame {
    border-radius: 24px;
    animation-name: supportVisualFloatSp;
  }

  .support-item.scroll-reveal-child {
    transform: translateY(11px);
  }

  .support-item.scroll-reveal-child.is-revealed {
    transform: translateY(0);
  }

  .support-item-inner {
    gap: 12px;
    padding: 12px 14px 12px 12px;
    border-radius: 20px;
    text-align: left;
    animation-name: supportItemFloatSp;
  }

  .support-check {
    width: 38px;
    height: 38px;
  }

  .support-check svg {
    width: 17px;
    height: 17px;
  }

  .support-text {
    font-size: 14px;
  }

  @keyframes supportVisualFloatSp {
    0%,
    100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -2px;
    }
  }

  @keyframes supportItemFloatSp {
    0%,
    100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -1.5px;
    }
  }
}

/* 追加したFloat / Fade-upを停止。Image・Panel・Check・Textはすべて通常表示 */
@media (prefers-reduced-motion: reduce) {
  .support-visual-frame,
  .support-item-inner {
    animation: none;
  }

  .support-item.scroll-reveal-child,
  .support-item.scroll-reveal-child.is-revealed {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/*
 * Section 06下側に生まれていた空白を、手書き風の「Career Support」Noteカードで自然に埋める。
 * 左寄りに大きめのCard、その右側〜右下に小さな手書きMessageという構成にする。
 * Messageはflexの「残りスペース」に依存すると大きいCard幅では入りきらないため、
 * .support-note-reveal（Card基準の幅）に対する position:absolute; left:100%; で
 * Cardの右端を基準に配置する（Cardの実際の幅に関わらず崩れない）。
 */
.support-note-area {
  position: relative;
  margin-top: var(--space-lg);
  /* Note全体の下に自然な余白を残しつつ、Cardを縮小した分だけ間延びしないよう調整 */
  margin-bottom: 52px;
}

/* 左下の淡いLight Blue Circle。Cardの縮小に合わせて少し小さくする */
.note-blob {
  position: absolute;
  z-index: 0;
  left: -20px;
  bottom: -16px;
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(140, 190, 255, 0.4) 0%, rgba(140, 190, 255, 0.14) 60%, transparent 80%);
  filter: blur(8px);
  pointer-events: none;
}

/*
 * Animationを3層に分ける。
 * 1. .support-note-reveal … Viewportに入った時の1回だけのFade In（opacity + translateY）
 * 2. .support-note-float  … 表示完了後、常時ごくゆっくり繰り返すSlow Float
 * 3. .support-note-card   … rotate(-4deg)の固定傾き + Hoverでの浮き上がり（transition）
 * rotateは.support-note-cardだけに持たせ、他の層と重ね掛けにならないようにしている。
 */
.support-note-reveal {
  position: relative;
  z-index: 1;
  /* 以前(clamp(370px,70%,415px)、実質415px)から約17%縮小し、少し右へ寄せる */
  width: clamp(300px, 58%, 340px);
  margin-top: 28px;
  margin-left: 56px;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.support-note-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.support-note-reveal.is-visible .support-note-float {
  animation: supportNoteFloat 6s ease-in-out infinite;
}

@keyframes supportNoteFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.support-note-float {
  position: relative;
  z-index: 1;
}

/* Card後ろに覗く、淡いBlue→PurpleのGlow（2枚目の紙が後ろにあるような効果）。Cardの縮小に合わせてoffsetも縮める */
.note-glow-purple {
  position: absolute;
  z-index: 0;
  inset: 11px -13px -13px 13px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(120, 150, 255, 0.22), rgba(190, 150, 255, 0.32));
  filter: blur(3px);
  transform: rotate(2deg);
  pointer-events: none;
}

.support-note-card {
  position: relative;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 16px;
  padding: 24px 30px 26px;
  box-shadow: 0 15px 36px rgba(50, 90, 160, 0.1);
  transform: rotate(-4deg);
  transition: transform 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .support-note-card:hover {
    transform: translateY(-4px) rotate(-3deg);
  }
}

/* カード左上、外側に飛び出す「＼＼｜」のような手書きAccent（3本）。Cardの縮小に合わせて少し短くする */
.note-tick {
  position: absolute;
  top: -13px;
  width: 2px;
  height: 12px;
  border-radius: 1px;
  background: linear-gradient(180deg, #2d8ff0, transparent);
}

.note-tick-1 {
  left: 9px;
  transform: rotate(-24deg);
}

.note-tick-2 {
  left: 17px;
  height: 10px;
  opacity: 0.8;
  transform: rotate(-14deg);
}

.note-tick-3 {
  left: 25px;
  height: 8px;
  opacity: 0.6;
  transform: rotate(-2deg);
}

/* 手書きサイン風の「Career Support」。既存fontのcursive/italic fallbackのみで表現する */
.note-eyebrow {
  font-family: 'Segoe Script', 'Bradley Hand', 'Snell Roundhand', cursive;
  font-style: italic;
  font-weight: 500;
  font-size: 23px;
  letter-spacing: 0.01em;
  color: #2d9bf0;
  margin-bottom: 15px;
}

/*
 * font-sizeはCardの新しい幅（実質340px、padding差引後 約280px）で
 * 「一人ひとりの「やりたい」を、」が確実に1行へ収まる値を優先している
 * （white-space:nowrapと合わせて、3〜4行への不自然な分割を避けるため）。
 */
.note-body {
  font-size: 18px;
  font-weight: 800;
  color: #0c2b59;
  line-height: 1.6;
  white-space: nowrap;
}

.note-underline {
  display: block;
  width: 70%;
  height: auto;
  margin-top: 10px;
}

/* 右側の小さな手書き風メッセージ + 曲線矢印（Cardの右端を基準に絶対配置） */
.support-note-side {
  position: absolute;
  z-index: 1;
  left: 100%;
  top: 54%;
  margin-left: 60px;
  width: 124px;
  pointer-events: none;
}

.side-message {
  font-style: italic;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
  color: #568cf5;
  white-space: nowrap;
  transform: rotate(-2deg);
}

.side-arrow {
  display: block;
  width: 48px;
  height: 32px;
  margin-top: 6px;
  margin-left: 4px;
  color: #6b8ff7;
}

@media (max-width: 1024px) {
  .support-note-reveal {
    width: clamp(260px, 62%, 300px);
    margin-top: 22px;
    margin-left: 30px;
  }

  .support-note-card {
    padding: 20px 26px 24px;
  }

  .note-eyebrow {
    font-size: 19px;
  }

  .note-body {
    font-size: 16px;
  }

  .support-note-side {
    top: 54%;
    width: 96px;
    margin-left: 40px;
  }

  .side-message {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .support-note-area {
    margin-bottom: 48px;
  }

  .support-note-reveal {
    width: 100%;
    max-width: 290px;
    margin-top: 0;
    margin-left: 0;
    margin-inline: auto;
  }

  .support-note-card {
    padding: 20px 24px 24px;
  }

  .support-note-side {
    position: static;
    width: auto;
    max-width: 220px;
    margin-left: auto;
    margin-top: var(--space-sm);
    pointer-events: auto;
  }

  .side-message {
    text-align: right;
  }

  .side-arrow {
    margin-inline: auto 8px;
  }
}

@media (max-width: 767px) {
  .support-note-card {
    transform: rotate(-2deg);
  }

  /* 狭い画面でnote-body（white-space:nowrap）がCardの外へはみ出さないよう、さらに縮小する */
  .note-eyebrow {
    font-size: 17px;
  }

  .note-body {
    font-size: 14px;
  }

  @media (hover: hover) and (pointer: fine) {
    .support-note-card:hover {
      transform: translateY(-4px) rotate(-1deg);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .support-note-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .support-note-reveal.is-visible .support-note-float {
    animation: none;
  }

  .support-note-card {
    transition: none;
  }

  .support-note-card:hover {
    transform: rotate(-4deg);
  }

  @media (max-width: 767px) {
    .support-note-card:hover {
      transform: rotate(-2deg);
    }
  }
}

/*
 * Section 06 Title背景の「SUPPORT」（Blue / Cyan寄り）。06/07の共通BandのColumn幅に収まるサイズにしている。
 * Section 02〜05の背景英文字（800 / Uppercase / letter-spacing / Blue系の薄い色）と同じTypographyを使い、
 * Animationだけ横Marqueeではなく opacity のみの Soft Fade-in → Breathing にしている。
 *   到達判定 … SectionHeading.vueの既存IntersectionObserverが付ける .section-heading.is-revealed を
 *              兄弟セレクタで参照（JS / scroll listenerの追加なし）
 *   外側 .support-bg-text       … Fade-in（opacity transition 0.9s）
 *   内側 .support-bg-text-inner … Breathing（opacity animation 5.6s）。transformは一切使わない
 */
.panel-heading {
  position: relative;
}

.panel-heading :deep(.section-heading) {
  position: relative;
  z-index: 1;
}

.support-bg-text {
  position: absolute;
  left: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  top: -0.42em;
  font-size: clamp(44px, calc((min(100vw, 1280px) - 96px) * 0.06), 64px);
  letter-spacing: 0.12em;
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-heading.is-revealed ~ .support-bg-text {
  opacity: 1;
}

.support-bg-text-inner {
  display: block;
  background: linear-gradient(90deg, #168fe5 0%, #3fb6e8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.1;
}

.section-heading.is-revealed ~ .support-bg-text .support-bg-text-inner {
  animation: supportBgBreath 5.6s ease-in-out 0.9s infinite;
}

/*
 * 少し見える → はっきり（30%）→ ゆっくり薄くなり、ほぼ消えた状態を65〜80%（約0.8s）維持 → 再表示。
 * 各区間はease-in-outで、急な点滅にならないようにしている。
 */
@keyframes supportBgBreath {
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
  .support-bg-text {
    font-size: clamp(44px, calc((100vw - 96px) * 0.06), 58px);
  }
}

/* SP：文字サイズ・Breathing幅を少し控えめにする */
@media (max-width: 767px) {
  .support-bg-text {
    top: -0.36em;
    font-size: clamp(34px, calc((100vw - 48px) * 0.13), 58px);
    letter-spacing: 0.1em;
  }

  .support-bg-text-inner {
    opacity: 0.08;
  }

  .section-heading.is-revealed ~ .support-bg-text .support-bg-text-inner {
    animation-name: supportBgBreathSp;
  }

  @keyframes supportBgBreathSp {
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
  .support-bg-text,
  .section-heading.is-revealed ~ .support-bg-text {
    opacity: 1;
    transition: none;
  }

  .support-bg-text-inner,
  .section-heading.is-revealed ~ .support-bg-text .support-bg-text-inner {
    animation: none;
    opacity: 0.12;
  }
}
</style>
