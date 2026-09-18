/*
 * Scroll Reveal専用directive。
 *
 * 各Sectionコンポーネントの内部（テンプレート・script・scoped style）にあるopacity/
 * transform/animationには一切触れず、対象要素に .scroll-reveal(-child) / .is-revealed
 * classを付け外しするだけで完結する。実際の見た目はすべて src/styles/scroll-reveal.css
 * 側で定義しており、既存Sectionのtransform/animation/opacityを直接上書きすることはない。
 *
 * IntersectionObserverが使えない環境では何もせず、要素は最初から通常表示のまま
 * （Progressive Enhancement）。一度表示された要素はunobserve + disconnectし、
 * 再度画面外に出てもopacityを戻したりAnimationをやり直したりしない。
 *
 * v-scroll-reveal … Section root用（06/07/08/Final CTAで使用中、35px/0.8s系）。
 * v-scroll-reveal-child … Section内部のHeading/Content個別reveal用（24px/0.7s系）。
 *   SPだけ少し軽く・速くしたいdelayは { delay, delaySp } の両方を渡すと、
 *   mount時点のviewport幅（max-width:767px）に応じてどちらかを採用する。
 *
 * 使い方：
 *   <FooSection v-scroll-reveal />
 *   <div v-scroll-reveal-child="{ delay: 140, delaySp: 90 }">…</div>
 */
function createRevealDirective(className) {
  return {
    mounted(el, binding) {
      if (typeof IntersectionObserver === 'undefined') {
        return
      }

      el.classList.add(className)

      const opts = binding.value || {}
      const isSp =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(max-width: 767px)').matches
      const delay = isSp && opts.delaySp !== undefined ? opts.delaySp : opts.delay
      if (delay) {
        el.style.transitionDelay = `${delay}ms`
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('is-revealed')
              observer.unobserve(el)
              observer.disconnect()
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )

      observer.observe(el)
    },
  }
}

export const vScrollReveal = createRevealDirective('scroll-reveal')
export const vScrollRevealChild = createRevealDirective('scroll-reveal-child')
