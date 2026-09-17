<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  note: { type: String, default: '' },
})

/*
 * タイトル中の「AI」だけ、A=通常色（Deep Navy）/ I=Accent Blueに分けて表示する。
 * 「PREAI」のように他のLatin文字と連続している「AI」は対象外にする
 * （(?<![A-Za-z])/(?![A-Za-z]) で前後がLatin文字でないことを確認）。
 * v-htmlは使わず、文字列をセグメント配列に分解してv-forで描画する。
 */
const titleSegments = computed(() => {
  const title = props.title
  const regex = /(?<![A-Za-z])AI(?![A-Za-z])/g
  const segments = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(title)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: title.slice(lastIndex, match.index), type: 'plain' })
    }
    segments.push({ text: 'A', type: 'ai-a' })
    segments.push({ text: 'I', type: 'ai-i' })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < title.length) {
    segments.push({ text: title.slice(lastIndex), type: 'plain' })
  }
  return segments
})

/*
 * SectionがViewportに入った瞬間だけReveal Animationを発火させる。
 * 一度表示されたらobserverを切断し、以降のScrollで再度Animationしないようにする。
 */
const rootRef = ref(null)
const isRevealed = ref(false)
let observer = null

onMounted(() => {
  if (!rootRef.value || typeof IntersectionObserver === 'undefined') {
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
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="rootRef" class="section-heading" :class="{ 'is-revealed': isRevealed }">
    <div class="heading-main">
      <span class="heading-number">{{ number }}</span>
      <div class="heading-copy">
        <h2>
          <template v-for="(segment, index) in titleSegments" :key="index">
            <span v-if="segment.type === 'ai-a'" class="ai-a">{{ segment.text }}</span>
            <span v-else-if="segment.type === 'ai-i'" class="ai-i">{{ segment.text }}</span>
            <template v-else>{{ segment.text }}</template>
          </template>
        </h2>
        <span class="heading-accent" aria-hidden="true"></span>
        <p v-if="lead" class="heading-lead">{{ lead }}</p>
      </div>
    </div>
    <p v-if="note" class="heading-note">{{ note }}</p>
  </div>
</template>

<style scoped>
.section-heading {
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
 * + 背後の非常に薄いBlue Glowで、Modern / AI Tech LPらしい存在感を出す。
 * ::afterのGlowはisolation:isolateでこの要素だけのstacking contextに閉じ込め、
 * Bubble Layer等ページ全体のz-indexと干渉しないようにする。
 */
.heading-number {
  position: relative;
  isolation: isolate;
  font-size: 64px;
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
  font-size: 30px;
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

/* 「AI」の A=通常色（継承） / I=Accent Blue。AI全体ではなくIだけを塗る */
.ai-a {
  color: inherit;
}

.ai-i {
  color: #168fe5;
}

/* Titleの下の短いBlue Accent Line。Underlineではなく、Reveal時に0→32pxへ伸びる装飾 */
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
  font-size: 15px;
  color: var(--color-text-muted);
  max-width: 46ch;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.18s;
}

.heading-note {
  font-size: 14px;
  color: var(--color-accent);
  font-style: italic;
  white-space: pre-line;
  text-align: right;
}

.section-heading.is-revealed .heading-number,
.section-heading.is-revealed .heading-copy h2,
.section-heading.is-revealed .heading-lead {
  opacity: 1;
  transform: translateY(0);
}

.section-heading.is-revealed .heading-accent {
  width: 32px;
}

/* PCのみ：Heading付近へのHoverでごく軽く反応する（Buttonのようには見せない） */
@media (hover: hover) and (pointer: fine) {
  .section-heading:hover .heading-number {
    transform: translateY(-2px);
  }

  .section-heading:hover .heading-copy h2 {
    letter-spacing: -0.03em;
  }

  .section-heading:hover .heading-accent {
    width: 42px;
  }
}

@media (max-width: 767px) {
  .section-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .heading-main {
    gap: var(--space-sm);
  }

  .heading-number {
    font-size: 40px;
  }

  .heading-copy h2 {
    font-size: 22px;
  }

  .heading-note {
    text-align: left;
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

  .section-heading:hover .heading-number {
    transform: none;
  }

  .section-heading:hover .heading-copy h2 {
    letter-spacing: -0.035em;
  }

  .section-heading:hover .heading-accent {
    width: 32px;
  }
}
</style>
