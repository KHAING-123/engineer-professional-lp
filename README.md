# Engineer Professional LP

経験者エンジニア向けの採用LP（PREAI）。

> 最終更新: 2026-09-25（この時点のコードを確認して記載）

## 1. プロジェクト概要

- 経験者エンジニアの応募者が、**会社・仕事内容・AIを使った働き方・キャリア・選考**について短時間で理解できることを目的としたLP
- 1ページ完結のSingle Page構成（ルーティングなし）
- PC / Tablet / SP を想定したレスポンシブ対応
- 文章・画像などのContentは `src/data/lpContent.js` に集約し、Componentは Layout / Design / Animation を担当する方針

## 2. 技術構成

`frontend/package.json` と実装から確認できるもののみ記載。

| 分類 | 使用技術 |
| --- | --- |
| Framework | Vue 3（`^3.5.x`、`<script setup>` SFC） |
| Build Tool | Vite（`^8.x`）+ `@vitejs/plugin-vue` |
| 言語 | JavaScript（ES Modules）/ HTML / CSS |
| Style | Plain CSS（CSS Variables + 各Componentの `scoped` style） |
| Animation | CSS Animation / Transition + IntersectionObserver |
| バージョン管理 | Git |

- UI Library、CSS Framework、Router、状態管理Library、TypeScriptは使用していない
- 外部Fontの読み込みは行っていない（`--font-sans` はOSフォント指定）

## 3. 開発環境

アプリ本体は `frontend/` 配下。npm commandは必ず `frontend/` で実行する。

```bash
cd frontend
npm install
npm run dev      # Vite dev server
```

| Command | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動（`vite`） |
| `npm run build` | Production Build（`vite build`、出力先 `frontend/dist/`） |
| `npm run preview` | Build結果のローカル確認（`vite preview`） |

- 動作確認済み環境: Node.js v24.21.0 / npm 11.19.0
- ルートの `package-lock.json` は空のstub（依存関係なし）。実際の依存関係は `frontend/package-lock.json` で管理
- `frontend/README.md` はVite初期テンプレートのまま。プロジェクトの説明はこのREADMEに集約している

## 4. ディレクトリ構成

```text
engineer-professional-lp/
├── README.md                  # このファイル
└── frontend/
    ├── index.html             # <title>経験者向け採用LP</title>
    ├── package.json
    ├── vite.config.js         # plugin-vueのみの最小構成
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.js            # CSS読み込み + scroll-reveal directive登録
        ├── App.vue            # 全Sectionの並び / 06・07の共通Band
        ├── data/
        │   └── lpContent.js   # 文章・画像・Iconの集約
        ├── directives/
        │   └── scrollReveal.js
        ├── styles/
        │   ├── variables.css  # Design Token（色・余白・幅など）
        │   ├── base.css       # Reset・共通class
        │   └── scroll-reveal.css
        ├── components/
        │   ├── layout/        # AppHeader / AppFooter
        │   ├── sections/      # 各Section
        │   └── ui/            # 共通UI部品
        └── assets/
            ├── images/        # 画像・Icon（詳細は「8. 画像・Icon管理」）
            └── projects/      # Section 02のProject画像
```

### Component一覧

| Directory | Component | 役割 |
| --- | --- | --- |
| `layout/` | `AppHeader.vue` | Header / Navigation / SP Drawer |
| | `AppFooter.vue` | Footer |
| `sections/` | `HeroSection.vue` | Hero |
| | `TeamMembersSection.vue` | 01 どんな人が働いている？ |
| | `ProjectsSection.vue` | 02 PREAIでの仕事 |
| | `AiWorkflowSection.vue` | 03 AIを使った働き方 |
| | `CareerStorySection.vue` | 04 社員のキャリアストーリー |
| | `MarketValueSection.vue` | 05 なぜ市場価値が高まるのか？ |
| | `CareerSupportSection.vue` | 06 キャリアコンサルタントによる支援 |
| | `InterviewSection.vue` | 07 面接について |
| | `SelectionFlowSection.vue` | 08 選考フロー |
| | `FinalCtaSection.vue` | Final CTA |
| `ui/` | `SectionHeading.vue` | 番号・Title・Lead付きの共通Heading（Reveal Animation付き） |
| | `BackgroundParticles.vue` | LP全体に敷くBubble背景 |
| | `PlaceholderImage.vue` | 画像があれば `<img>`、`null` ならPlaceholder表示 |
| | `TagList.vue` | `#tag` 形式のTag一覧 |
| | `CheckList.vue` | ✓付きList |

## 5. LP構成

`App.vue` の実際の並び順。

```text
BackgroundParticles（全体背景のBubble Layer）
Header
Hero
01 どんな人が働いている？        #members
02 PREAIでの仕事                 #projects
03 AIを使った働き方              #ai-workflow
04 社員のキャリアストーリー      #career-story
05 なぜ市場価値が高まるのか？    #market-value
┌ support-interview-band（06/07共通の背景Band・PCは横2カラム）
│ 06 キャリアコンサルタントによる支援  #career-support
│ 07 面接について                      #interview
└
08 選考フロー                    #selection
Final CTA                        #final-cta
Footer
```

Header Navigationのリンク先：働く人(`#members`) / 仕事背景(`#projects`) / AIを使った働き方(`#ai-workflow`) / キャリア(`#career-story`) / 選考・面談(`#selection`)

## 6. 現在までの主な実装内容

### Header

- `position: sticky` のHeader。Logo（`PREAI`テキスト）+ Navigation 5項目
- 右側に「話しを詳しく聞いて見る →」のCTA Message
  - 現在は `<span>` による装飾Messageで、リンクではない（`headerCta.href` は未使用）
  - Glow Pulse / Text Float / Underline Flow / 装飾Dot・Sparkleの浮遊Animation
- Tablet（≤1024px）: Navigation構成は維持し、間隔・文字サイズのみ縮小
- SP（≤767px）: Logo + Hamburgerのみ表示。Navigation と CTA MessageはDrawer（fixed、Fade + Slide）に格納。リンククリックでDrawerを閉じる

### Hero

- 1枚画像で構成（キャッチコピー・人物・背景はすべて画像内）。lpContent.jsでは画像とaltのみ管理
- `<picture>` で PC / SP画像を切り替え（≤767pxで `hero-main-sp.png`）
- 表示時のFade-up + 画像のゆっくりしたZoom（SP用の別keyframeあり）
- 幅は `--lp-max-width`（1658px）を上限とする

### Section 01 - どんな人が働いている？

- このSectionのみ `SectionHeading` を使わず独自markupのHeading（Reveal機構は同等のものを内蔵）
- 背景英文字 `PEOPLE`（ゆっくり揺れるDrift Animation、SP用keyframeあり）
- 手書き風Note「いろんな経験が、ここでつながっている。」（句読点で2行に分割、Float Animation、PCのみHover反応）
- 社員3名（Y.M / K.H / T.S）を独立カードではなく連続したRowで表示
  - 写真・名前/年齢・職種・前職・説明・Tag・引用符付きComment
  - Rowごとに時間差でScroll Reveal

### Section 02 - PREAIでの仕事

- 背景英文字 `WORK`（横に流れるMarquee Animation）
- Heading横の `PROJECTS` ラベル（装飾Dot / Glow / SparkleのFloat、UnderlineのPulse）。リンクではない（`linkHref` は未使用）
- Webアプリ開発 / モバイルアプリ開発 / データ分析・AI開発 の3 Row
  - Category Icon（Component内のinline SVG）・Title・説明・Tag・Project画像
  - Project画像は斜めClip形状、PCのみHoverで少し浮く
  - 手書き風Note（丸背景付き・少し傾けて配置、PCのみHover反応）
  - Rowごとに時間差でScroll Reveal
- `.section-tint` / `.section-bg-decor` による淡いGradient背景とBlob装飾

### Section 03 - AIを使った働き方

- 背景英文字 `AI WORK`（Marquee Animation）
- Heading横の手書き風Note「AIは、エンジニアの可能性を広げるパートナー。」（3行分割、Float Animation）
- 「主に使えるAIツール」: ChatGPT / GitHub Copilot / Claude / Notion AI / Figma AI（各Icon画像）
- AI Workflow 4 Step（矢印でつなぐ）: 01 情報収集 / 02 アイデア出し / 03 開発・実装 / 04 レビュー・改善（各Icon画像。画像が無い場合はinline SVGにfallback）
- Section Title中の「AI」は `SectionHeading` 側で A=Navy / I=Accent Blue に色分け
- ≤860px: Tool一覧とStepを縦並び、Stepは2×2 Grid（矢印非表示）

### Section 04 - 社員のキャリアストーリー

- 背景英文字 `CAREER`（Marquee Animation）
- 左: 手書き風「Career Story」ラベル + 社員写真（`career-member.png`）+ 名前・職種・前職
- 右: 「Premium Vertical Career Journey」Timeline（Year → Line / Point → Icon → Main Message → Description）
  - 1年目 / 3年目 / 3年目 / 5年目〜 の4項目（lpContent.jsのデータどおり。Cardにはせず縦Timelineのまま）
  - Timeline Line: 2pxのGradient（Accent Blue → Light Blue → Light Purple）。Row間の区間ごとに `::after` で描画し、区間ごとに色を引き継いで1本に見せている
  - Point: 12pxのAccent Blueの円 + 薄いLight Blueのsoft ring（box-shadow）
  - Icon: 各項目ごとのinline SVG（Component内）を、54pxの薄いBlue〜PurpleのSoft Circle（`.timeline-icon-circle`）に配置
  - Text: Main Message（`title`、Navy・700）+ Description（`description`、本文色・400）の2段構成
- Animation（すべて `CareerStorySection.vue` のscoped CSSのみ。JS追加なし）
  - Line Grow: `scaleY(0 → 1)`・`transform-origin: top`、3区間を順番に伸ばす（PC 約1.1s / SP 約1.0s）
  - Row Reveal: Year・Point → Icon（+80ms）→ Text（+160ms）の順にFade-up。PC: 18px / 0.7s / stagger 150ms、SP: 14px / 0.6s / stagger 100ms
  - Point Pulse: `scale(1 → 1.08)` 3.6s、Pointごとに0.5sずつdelay（SPは1.05）
  - Icon Float: `translateY(0 → -3px)` 4.6s、Rowごとに位相をずらす（SPは-2px）
  - トリガーはol.timelineの既存 `v-scroll-reveal-child` が付与する `.scroll-reveal-child` / `.is-revealed` class。初期非表示は `.scroll-reveal-child` が付いている間だけ適用されるため、IntersectionObserverが無い環境でも通常表示
  - transform競合を避けるため担当要素を分離: `ol`（既存Reveal）/ `.timeline-year`・`.timeline-icon`・`.timeline-text`（Row Reveal）/ `.timeline-icon-circle`（Float）/ `.timeline-node::before`（Pulse）/ `.timeline-node::after`（Line Grow）
  - `prefers-reduced-motion: reduce` ではすべて停止し、opacity 1 / transform none で通常表示
- 左ブロック → Timelineの順にScroll Reveal
- Tablet: 2カラム維持で縮小（Icon Circle 48px）/ SP（≤767px）: Section全体は縦積み。Timelineは「Point ── Year」の下にIcon → Main Message → Descriptionを縦に積み、Lineは左側に通す（Icon Circle 44px）

### Section 05 - なぜ市場価値が高まるのか？

- 背景英文字 `VALUE`（Marquee Animation）
- 01〜04 Reason Row: エンジニア経験 / AI活用 / 上流工程 / 顧客課題の解決（Rowがゆっくり上下するFloat）
- 右向きChevronの矢印（Connector）が動くAnimation
- 手書き風Note「見える景色が、きっと変わる。」（Sparkle Twinkle、Underline Pulse、Float）
- Result Box「自分でキャリアを選べるエンジニアへ！」+ `career-choice-crown.png`（Float Animation）
- Reason List → 矢印 → Result Areaの順に時間差でScroll Reveal

### Section 06 - キャリアコンサルタントによる支援

- 背景英文字 `SUPPORT`（Blue / Cyan寄り。Soft Fade / Breathing、詳細は下記「06〜08 背景英文字」）
- `career_support_member.png` + CheckList 4項目
- 下部に「Career Support」Noteカード（本文・Gradient Underline SVG・横の手書き風Messageと矢印）
  - Viewport進入時にFade + Slide、その後Float Animation
- Section 07と1つのBandにまとめて表示（下記）

### Section 07 - 面接について

- 背景英文字 `INTERVIEW`（Blue寄り。右側のNoteへ掛からない幅に抑えている）
- メインVisualは `interview-main.jpg`（面接官の名前・肩書き等は画像内に含まれるため、HTMLで重ねない）
- Heading横のNote「まずは気軽に、お話ししましょう。」（2行分割）
- 画像はViewport進入時にFade-in、その後Float Animation、PCのみHoverでわずかにZoom

### Section 06 / 07 共通Band（`App.vue`）

- `support-interview-band` で淡いGradient背景を共有し、PCでは横2カラム
- 07は06より少し下げて配置（`margin-top`、1024px/768pxで段階的に縮小）、間に薄いDivider
- ≤767pxで1カラムに切り替え、Dividerは上罫線に変更

### Section 08 - 選考フロー

- 背景英文字 `SELECTION`（Blue / Purple寄り。PCはHeading列（196px）がStep 01の手前で終わるため34pxと小さめ、Tablet以降はHeadingが上段全幅になるため大きく表示）
- 5 Step: 01 書類提出 / 02 カジュアル面談 / 03 面接 / 04 条件調整 / 05 内定
  - 各Step: 番号・Icon画像（selection-flow/、無い場合はinline SVG fallback）・Title・説明・所要期間
  - 最終Stepの期間は強調表示
- Summary Box: 「選考期間の目安 5日以内」「内定までのご連絡は 最短1週間」+ 手書き風Note（Float Animation、PCのみHover反応）
- Tablet: Heading上段 + [Flow | Summary] の2カラム / 768px: Step折り返し可 / SP: 縦Flow（矢印は↓）→ Summaryの縦積み
- Section全体に `v-scroll-reveal`

### Section 06〜08 背景英文字（SUPPORT / INTERVIEW / SELECTION）

- Typographyは02〜05に合わせている（800 / Uppercase / letter-spacing / Blue系）。02〜05は単色だが、06〜08はSectionごとにわずかに色味を変えた薄いGradient文字（`background-clip: text`）
- Animationは02〜05の横Marqueeではなく、**opacityのみのSoft Fade / Breathing**
- 配置: 各Componentの `.panel-heading`（06/07）/ `.flow-heading`（08）内、`SectionHeading` の直後に絶対配置（`z-index: 0`、Headingは `z-index: 1`）。本文・画像・Note・Stepには重ならない
- サイズ: 06/07は共通BandのColumn幅に合わせて同じ値（PC最大64px / 1024px 約56px / 768px 44px / SP 約43px）。08はPC 34px / Tablet 48〜72px / SP 約43px
- 到達判定: `SectionHeading.vue` の既存IntersectionObserverが付ける `.section-heading.is-revealed` を兄弟セレクタ（`.section-heading.is-revealed ~ .xxx-bg-text`）で参照。JS / scroll listenerの追加なし
- Animationは要素を分けてopacityの競合を避けている（transformは使わない）
  - 外側 `.xxx-bg-text`: Fade-in（opacity 0 → 1、0.9s）
  - 内側 `.xxx-bg-text-inner`: Breathing（5.6s ease-in-out infinite、Fade-in後の0.9sから開始）
- Breathing keyframes（PC / SP）

  | keyframe | PC | SP（≤767px） |
  | --- | --- | --- |
  | 0% / 100% | 0.10 | 0.08 |
  | 30%（最も濃い） | 0.17 | 0.14 |
  | 65〜80%（ほぼ消えた状態を約0.84s維持） | 0.015 | 0.015 |

- `prefers-reduced-motion: reduce`: Fade-in / Breathingを停止し、opacity 0.12の固定表示
- 1024px以上では06/07が同じBandに並ぶため、06到達時にINTERVIEWも同時に表示が始まる

### Final CTA

- Heroと同様に完成デザインの1枚画像（`final-cta.png`）のみで構成
- 画像は `--lp-max-width` を超えて拡大せず、大画面時は画像端に近い色のGradientを外側背景に敷く
- Section全体に `v-scroll-reveal`

### Footer

- Logoテキスト・リンク（利用規約 / プライバシーポリシー / クッキーポリシー）・SNS Icon（X / YouTube / Instagram、inline SVG）・Copyright
- リンク先は現在すべて `#`（仮）
- Tablet / SPでLayout調整あり

### 共通

- `BackgroundParticles.vue`: LP全体（Header〜Footer）に固定配置したBubble背景。`tier`（`core` / `wide` / `full`）で SP / Tablet / PCの表示数を切り替え、どのエリアにも最低1個は残るよう設計
- `SectionHeading.vue`: 番号・Title・Accent Line・LeadのReveal、PCのみHoverで軽く反応

## 7. コンテンツ管理（`src/data/lpContent.js`）

**方針**: 文章や画像など変更頻度の高いContentは可能な範囲で `lpContent.js` に集約し、Component側は Layout / Design / Animationを担当する。各Sectionは `{ id, heading, ...fields }` の素直な構造にしている（将来CMS等へ差し替えやすくするため）。

### lpContent.jsで管理しているもの

| export | 内容 |
| --- | --- |
| `siteMeta` / `navLinks` / `headerCta` | Logo・Navigation・Header CTA文言 |
| `hero` | PC / SP画像、alt |
| `teamMembersSection` | Heading・Note、社員3名（名前・年齢・職種・前職・説明・Tag・Comment・画像） |
| `projectsSection` | Heading、`PROJECTS`ラベル、3 Category（説明・Tag・Note・画像） |
| `aiWorkflowSection` | Heading・Note、`AI WORK`、AI Tool（名前・Icon）、4 Step（Title・説明・Icon） |
| `careerStorySection` | Heading、`CAREER`、社員情報・画像、Timeline 4項目（`year` / `title`＝Main Message / `description`） |
| `marketValueSection` | Heading・Note、`VALUE`、Reason 4項目、Result Box文言・Crown画像 |
| `careerSupportSection` | Heading、`SUPPORT`、CheckList 4項目、画像 |
| `interviewSection` | Heading、`INTERVIEW`、Note、面接官画像、ラベル（画像のaltとして使用）、`points`（現在は表示に未使用） |
| `selectionFlowSection` | Heading、`SELECTION`、期間Note（全角スペース区切りで分割表示）、Note、5 Step（説明・期間・Icon） |
| `finalCtaSection` | 画像、alt |
| `footerContent` | リンク、SNS、Copyright |

画像は `lpContent.js` で `import` してから各Sectionに渡している。画像が `null` の場合、`PlaceholderImage` がPlaceholderを表示する。

### Component側で直接管理しているもの（lpContent.js管理ではない）

- 背景英文字 `PEOPLE`（01）と `WORK`（02）※ `AI WORK` / `CAREER` / `VALUE` / `SUPPORT` / `INTERVIEW` / `SELECTION` は `decorativeLabel` としてlpContent.js管理
- Section 06のNoteカード文言（「Career Support」「一人ひとりの「やりたい」を、一緒にカタチにしていきます。」「あなたのこれからを、一緒に考えます。」）
- Section 04の「Career Story」ラベル、「前職：」などの固定ラベル
- inline SVG Icon: 02のCategory Icon、04のTimeline Icon、05の矢印、08のSummary Icon、FooterのSNS Icon、03/08のIcon fallback
- Noteの改行位置（各Componentの `noteLines` で「、」等の位置から分割。文章自体はlpContent.jsのまま）
- 背景Bubbleの配置・色・サイズ（`BackgroundParticles.vue`）

### 未使用・空のフィールド

- `headerCta.href`、`projectsSection.linkHref` … 対応要素がリンクではないため未使用
- `interviewSection.interviewer.name` / `role` … 空文字（情報は画像内に含まれる）
- `interviewSection.points` … 定義のみで、現在のテンプレートでは表示していない

## 8. 画像・Icon管理

```text
src/assets/
├── images/
│   ├── hero/
│   │   ├── hero-main.png              # Hero PC
│   │   └── hero-main-sp.png           # Hero SP（≤767px）
│   ├── members/
│   │   ├── member-01.png              # 01 社員写真
│   │   ├── member-02.png
│   │   └── member-03.png
│   ├── career/
│   │   └── career-member.png          # 04 社員写真
│   ├── support/
│   │   └── career_support_member.png  # 06 画像
│   ├── icons/
│   │   ├── ai-tools/                  # 03 AI Tool Icon
│   │   │   ├── chatGPT_icon.png
│   │   │   ├── GitHub_copilot_icon.png
│   │   │   ├── claude_icon.png
│   │   │   ├── notion_ai_icon.png
│   │   │   └── figma_ai_icon.png
│   │   ├── ai-work/                   # 03 Workflow Step Icon
│   │   │   ├── ai-work-research.png
│   │   │   ├── ai-work-idea.png
│   │   │   ├── ai-work-development.png
│   │   │   └── ai-work-review.png
│   │   ├── career-choice/             # 05 Result Box
│   │   │   └── career-choice-crown.png
│   │   └── selection-flow/            # 08 Step Icon
│   │       ├── selection-document.png
│   │       ├── selection-casual-interview.png
│   │       ├── selection-interview.png
│   │       ├── selection-conditions.png
│   │       └── selection-offer.png
│   ├── interview-main.jpg             # 07 メインVisual（images/直下）
│   └── final-cta.png                  # Final CTA（images/直下）
└── projects/                          # 02 Project画像（images/の外）
    ├── project-web-app.png
    ├── project-mobile-app.png
    └── project-data-ai.png
```

- 画像差し替え時は、同名ファイルで置き換えるか、新ファイルを追加して `lpContent.js` の `import` を変更する
- `public/` には `favicon.svg` のみ
- 注意: 現在Project画像だけ `assets/projects/`、07とFinal CTAの画像は `images/` 直下にある（Subdirectory構成が統一されていない）

## 9. Responsive対応

主なBreakpoint（各Componentの `@media` に直接記述）:

| 条件 | 対象 |
| --- | --- |
| PC | 1025px以上（基本スタイル） |
| `max-width: 1024px` | Tablet調整（余白・文字サイズ・一部2カラム化） |
| `max-width: 860px` | 01 / 02 / 03 の中間Layout調整 |
| `max-width: 768px` | Section padding縮小、08のStep折り返し等 |
| `max-width: 767px` | SP（1カラム化、Hero画像切り替え、Drawer Menu、Scroll Revealの移動量/時間短縮） |

- `variables.css` に `--breakpoint-sp` / `--breakpoint-tablet` を定義しているが、CSS変数はMedia Queryでは使えないため、実際の値は各 `@media` に直接書いている
- 画像切り替え: Hero（`<picture>`）のみPC / SPで別画像
- 幅: Hero / Headerは `--lp-max-width: 1658px`、本文Sectionは `--container-width: 1280px`
- Hover演出は `@media (hover: hover) and (pointer: fine)` 内に限定し、Touch端末では発火しない
- 横スクロール防止のため、背景英文字などの装飾は各Section内で `overflow` を制御している（`.lp-page` 自体には `overflow` を付けない＝Headerの `sticky` を壊さないため）

## 10. Animation

| 種類 | 実装箇所 |
| --- | --- |
| Scroll Reveal（Section / Content単位のFade-up） | `directives/scrollReveal.js` + `styles/scroll-reveal.css` |
| Heading Reveal | `SectionHeading.vue`、`TeamMembersSection.vue`（独自Heading） |
| 背景英文字 Marquee | 02 `WORK` / 03 `AI WORK` / 04 `CAREER` / 05 `VALUE` |
| 背景英文字 Drift | 01 `PEOPLE` |
| 背景英文字 Soft Fade / Breathing | 06 `SUPPORT` / 07 `INTERVIEW` / 08 `SELECTION`（Section到達時に開始） |
| Background Bubble | `BackgroundParticles.vue`（LP全体） |
| 手書き風Note Float | 01 / 03 / 05 / 08 Summary、06 Noteカード |
| Image Animation | Hero（Fade-up + Slow Zoom）、07（Fade-in + Float + Hover Zoom）、02（Hover Lift） |
| Float Animation | 04 Timeline Icon Circle、05 Reason Row / Result Box / 矢印、08 Summary Box |
| Timeline Animation | 04 Line Grow（上→下）/ Row順次Fade-up / Point Pulse |
| 装飾Animation | Header CTA（Glow / Text Float / Underline / Dot）、02 `PROJECTS`ラベル（Dot / Sparkle / Underline） |

- **`prefers-reduced-motion: reduce`** に対応: Scroll Reveal、Bubble、各Sectionの `animation` / `transition` は、このMedia Queryで停止または即時表示になる
- 多くのAnimationにSP用の別keyframe（`...Sp`）を用意し、移動量を小さくしている
- 注意: 同じ要素に `transform` のAnimationを重ねると競合するため、既存実装では「Reveal用wrapper」「Float用wrapper」「Hover用wrapper」のように要素を分けている（例: 07の `.interview-image-reveal` > `.interview-image-float` > `.interview-image-hover`、04の `.timeline-icon` > `.timeline-icon-circle`）

## 11. Scroll Reveal

`src/directives/scrollReveal.js` で2つのdirectiveを定義し、`main.js` でGlobal登録している。

| Directive | 付与class | 動き | 使用箇所 |
| --- | --- | --- | --- |
| `v-scroll-reveal` | `.scroll-reveal` | translateY(35px) → 0、0.8s（SP: 22px / 0.7s） | `App.vue` で 06 / 07（delay 180ms）/ 08 / Final CTA |
| `v-scroll-reveal-child` | `.scroll-reveal-child` | translateY(24px) → 0、0.7s（SP: 17px / 0.6s） | 01〜05のContent（Row・Timeline・Tool Panelなど） |

仕組み:

1. `mounted` 時に対象要素へclassを付与（CSS側では最初から非表示にしない）
2. `IntersectionObserver`（`threshold: 0.12`、`rootMargin: '0px 0px -8% 0px'`）でViewport進入を検知し `.is-revealed` を付与
3. 一度表示したら監視を解除（再度Animationしない）
4. `IntersectionObserver` が無い環境では何もせず、通常表示のまま（Progressive Enhancement）
5. `{ delay, delaySp }` を渡すと `transition-delay` を設定。mount時点で `max-width: 767px` なら `delaySp` を採用

```vue
<FooSection v-scroll-reveal />
<div v-scroll-reveal-child="{ delay: 140, delaySp: 90 }">…</div>
```

各Section内部の既存Animation（Note Float、Marquee等）はより内側の要素に付いているため、Scroll Revealの `transform` とは競合しない設計。

## 12. デザイン方針

- 配色: Deep Navy（`--color-primary: #1b3a6b`）とAccent Blue（`--color-accent: #2f6fed`）を軸に、Light Blue / Light Purple（`--color-purple-soft`）を背景に使用
- Section背景: `.section-tint`（White → Light Blue → Light Purpleの縦Gradient）+ `.section-bg-decor`（淡いBlob）。Sectionごとに Blobの位置・色をCSS変数で変えて単調さを避ける
- 手書き風Note: 少し傾けた文字・Mark・Underlineで柔らかさを出す
- 背景英文字: 各Sectionの見出し背後に大きな英単語を薄く配置
- 独立カードを並べるより、連続したRow / Tableとして情報を見せる（01 / 02 / 05）
- Hero / Final CTAは完成デザイン画像をそのまま使い、HTMLで文字を重ねない
- 余白は `--space-*`（8〜96px）、Section上下paddingは基本96px（≤768pxで64px）
- Animationは控えめなFloat / Fade中心。Hoverは「ボタンに見えない程度」の軽い反応に留める

## 13. 開発時のルール

- 一度に大きく変更せず、Section単位で修正する
- 既存デザインを変更する場合は、他Sectionへの影響を確認する
- 共通Component（`ui/`）/ Global CSS（`styles/`）/ `App.vue` を変更するときは全Sectionへの影響を確認する
- 画像差し替え時は PC / Tablet / SP で確認する
- Animation追加時は既存 `transform` との競合に注意する（必要ならwrapper要素を分ける）
- `prefers-reduced-motion` の対応も合わせて追加する
- 画像やIconは適切な `assets` directoryで管理する
- 可能なContentは `lpContent.js` で管理する
- 変更後は `npm run build` が通ることを確認する
- Consoleの 404 / error / warning を確認する
- 横スクロールが発生していないことを確認する

## 14. 動作確認Viewport

開発時の代表的な確認サイズ（対応端末を限定する意味ではない）:

| Viewport | 想定 |
| --- | --- |
| 1440px | PC |
| 1024px | Tablet（横） / 小さめPC |
| 768px | Tablet（縦） |
| 375px | SP |

1024px / 768px / 767px 付近はBreakpointの境界なので、前後の幅も確認するとよい。

## 15. Build / Deploy

```bash
cd frontend
npm run build     # frontend/dist/ に出力
npm run preview   # Build結果をローカルで確認
```

- `dist/` は `.gitignore` 対象
- リポジトリ内にVercel等のDeploy設定ファイル（`vercel.json` など）は存在しない。Deploy先の設定（Root Directory等）はリポジトリからは確認できないため、Hosting側の設定画面で確認すること
- アプリ本体が `frontend/` 配下にあるため、Hosting側でBuildする場合は `frontend` をRoot Directoryにするか、Build Commandで `frontend` に移動する必要がある

## TODO

コードから確認できる未対応・要確認項目:

- [ ] Footerのリンク（利用規約 / プライバシーポリシー / クッキーポリシー）とSNSリンクの実URL設定（現在すべて `#`）
- [ ] Header CTA「話しを詳しく聞いて見る」をリンク / Buttonにするか判断（現在は装飾Messageで `headerCta.href` 未使用）
- [ ] Section 04 Timelineの年数表記の確認（「3年目」が2回続いている）
- [ ] Section 04 Main Message「リーダーとして成長」の文言確認（「成長」はDescription本文にない表現）
- [ ] 1440pxでAnimation中に一時的に横1pxのはみ出しが出る件の確認（既存の `BackgroundParticles` の `bubble-tier-full` / Hero画像のAnimationが原因。06〜08背景英文字追加前から発生）
- [ ] 未使用フィールド（`projectsSection.linkHref`、`interviewSection.points` など）の整理
- [ ] 画像サイズの最適化（多くのPNGが1〜1.7MB程度）
- [ ] 画像ディレクトリ構成の統一（`assets/projects/`、`images/` 直下の画像）

最終確認:

- [ ] 各Sectionの最終デザイン確認
- [ ] PC / Tablet / SPの最終表示確認
- [ ] 画像・Iconの最終確認
- [ ] Animationの最終確認
- [ ] Console error / warning / 404確認
- [ ] Production Build確認
