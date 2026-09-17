<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { careerSupportSection } from '../../data/lpContent.js'
import SectionHeading from '../ui/SectionHeading.vue'
import CheckList from '../ui/CheckList.vue'
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
    </div>

    <div class="support-body">
      <div class="support-photo">
        <PlaceholderImage :src="careerSupportSection.image" label="キャリアコンサルタント" ratio="4 / 3" />
      </div>

      <CheckList class="support-checklist" :items="careerSupportSection.points" />
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

.support-body {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.support-photo {
  width: 190px;
  flex-shrink: 0;
}

.support-checklist {
  flex: 1;
  min-width: 0;
}

.support-checklist :deep(li) {
  font-size: 13px;
  margin-bottom: 8px;
}

.support-checklist :deep(li:last-child) {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .support-body {
    flex-direction: column;
    align-items: flex-start;
  }

  .support-photo {
    width: 170px;
  }
}

@media (max-width: 767px) {
  .support-body {
    align-items: center;
    text-align: center;
  }

  .support-photo {
    width: 180px;
    margin-inline: auto;
  }

  .support-checklist {
    width: 100%;
  }

  .support-checklist :deep(li) {
    text-align: left;
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
</style>
