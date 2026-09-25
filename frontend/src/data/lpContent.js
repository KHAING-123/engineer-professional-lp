/**
 * LP掲載コンテンツ（文章・社員情報・画像パスなど）
 *
 * 会社側の担当者が更新しやすいよう、コンポーネントには文章を直接書かず
 * このファイルにまとめている。将来 WordPress (REST API / ACF) へ移行する際に
 * 差し替えやすいよう、各セクションは { heading, ...fields } の素直な構造にしている。
 *
 * 画像は現時点で実データが無いものは image: null としている。
 * null の場合は PlaceholderImage コンポーネントが代わりにプレースホルダーを表示する。
 * 実画像を用意できたら src/assets/images/ 配下に置き、ここで import して
 * image に差し替えるだけでよい。
 */

import heroMainDesktop from '../assets/images/hero/hero-main.png'
import heroMainMobile from '../assets/images/hero/hero-main-sp.png'
import finalCtaImage from '../assets/images/final-cta.png'
import interviewMain from '../assets/images/interview-main.jpg'
import projectWebApp from '../assets/projects/project-web-app.png'
import projectMobileApp from '../assets/projects/project-mobile-app.png'
import projectDataAi from '../assets/projects/project-data-ai.png'
import member01 from '../assets/images/members/member-01.png'
import member02 from '../assets/images/members/member-02.png'
import member03 from '../assets/images/members/member-03.png'
import chatGptIcon from '../assets/images/icons/ai-tools/chatGPT_icon.png'
import githubCopilotIcon from '../assets/images/icons/ai-tools/GitHub_copilot_icon.png'
import claudeIcon from '../assets/images/icons/ai-tools/claude_icon.png'
import notionAiIcon from '../assets/images/icons/ai-tools/notion_ai_icon.png'
import figmaAiIcon from '../assets/images/icons/ai-tools/figma_ai_icon.png'
import careerMember from '../assets/images/career/career-member.png'
import careerSupportMember from '../assets/images/support/career_support_member.png'
import aiWorkResearch from '../assets/images/icons/ai-work/ai-work-research.png'
import aiWorkIdea from '../assets/images/icons/ai-work/ai-work-idea.png'
import aiWorkDevelopment from '../assets/images/icons/ai-work/ai-work-development.png'
import aiWorkReview from '../assets/images/icons/ai-work/ai-work-review.png'
import careerChoiceCrown from '../assets/images/icons/career-choice/career-choice-crown.png'
import selectionDocument from '../assets/images/icons/selection-flow/selection-document.png'
import selectionCasualInterview from '../assets/images/icons/selection-flow/selection-casual-interview.png'
import selectionInterview from '../assets/images/icons/selection-flow/selection-interview.png'
import selectionConditions from '../assets/images/icons/selection-flow/selection-conditions.png'
import selectionOffer from '../assets/images/icons/selection-flow/selection-offer.png'

export const siteMeta = {
  name: 'PREAI',
  logoText: 'PREAI',
}

export const navLinks = [
  { label: '働く人', href: '#members' },
  { label: '仕事背景', href: '#projects' },
  { label: 'AIを使った働き方', href: '#ai-workflow' },
  { label: 'キャリア', href: '#career-story' },
  { label: '選考・面談', href: '#selection' },
]

export const headerCta = {
  label: '話しを詳しく聞いて見る',
  href: '#final-cta',
}

/**
 * Hero（ファーストビュー）は1枚の画像で構成する。
 * キャッチコピー・リード文・人物・背景などはすべて画像側に含まれているため、
 * ここではテキストではなく画像パスと alt テキストのみを管理する。
 *
 * mobileImage を設定すると、HeroSection側の<picture>が
 * 767px以下でこちらを自動的に出し分ける（テンプレート・CSSは変更不要）。
 */
export const hero = {
  alt: 'AIを使いこなし、これからの市場で求められるエンジニアへ。PREAI',
  desktopImage: heroMainDesktop,
  mobileImage: heroMainMobile,
}

export const teamMembersSection = {
  id: 'members',
  heading: {
    number: '01',
    title: 'どんな人が働いている？',
    lead: '様々なバックグラウンドを持つエンジニアが、それぞれの強みを活かして活躍しています。',
    note: 'いろんな経験が、ここでつながっている。',
  },
  members: [
    {
      id: 'ym',
      name: 'Y.Mさん',
      age: 27,
      role: 'フロントエンドエンジニア',
      previousJob: 'Web制作会社',
      description:
        'AIツールを活用して業務効率を上げ、もっと良いサービスをつくれるようになりました。',
      tags: ['Vue.js', 'TypeScript', 'AI活用'],
      comment: '好きな技術をもっと深く、そして、社会に役立つものをつくりたい。',
      image: member01,
    },
    {
      id: 'kh',
      name: 'K.Hさん',
      age: 33,
      role: 'バックエンドエンジニア',
      previousJob: 'SIer',
      description:
        '上流工程や顧客課題解決に関わることで、エンジニアとしての視野が広がっています。',
      tags: ['Java', 'Python', '顧客課題'],
      comment: '技術で課題を解決する楽しさを、あらためて感じています。',
      image: member02,
    },
    {
      id: 'ts',
      name: 'T.Sさん',
      age: 29,
      role: 'データエンジニア',
      previousJob: 'SES',
      description:
        'データ分析とAIの組み合わせで、社会に役立つサービスに関われるのがやりがいです。',
      tags: ['Python', 'SQL', 'データ分析'],
      comment: 'データから新しい価値を生み出し、人の役に立つことがやりがいです。',
      image: member03,
    },
  ],
}

export const projectsSection = {
  id: 'projects',
  heading: {
    number: '02',
    title: 'PREAIでの仕事',
    lead: '多様なプロジェクトで、スキルを磨きながら実践的な経験を積むことができます。',
  },
  linkLabel: 'PROJECTS',
  linkHref: '#',
  categories: [
    {
      id: 'web',
      title: 'Webアプリ開発',
      description:
        '業務システム・SaaSの設計・開発・運用・改善など、様々な業界・規模のプロジェクトに関われます。',
      tags: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Node.js', 'PHP'],
      note: 'Webで社会を動かす。',
      image: projectWebApp,
    },
    {
      id: 'mobile',
      title: 'モバイルアプリ開発',
      description: 'iOS / Androidアプリの設計・開発・運用・改善で、日常に寄り添うサービスを届けます。',
      tags: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Dart'],
      note: 'スマホから新しい体験を。',
      image: projectMobileApp,
    },
    {
      id: 'data',
      title: 'データ分析・AI開発',
      description: 'データ分析基盤やAIモデルの構築・検証・運用で、データ力で新しい価値をつくります。',
      tags: ['Python', 'R', 'TensorFlow', 'Scikit-learn'],
      note: 'データで、未来をつくる。',
      image: projectDataAi,
    },
  ],
}

export const aiWorkflowSection = {
  id: 'ai-workflow',
  heading: {
    number: '03',
    title: 'AIを使った働き方',
    lead: '最新のAIツールを日常の業務に取り入れ、アイデアから開発・改善までをスピーディーに進めます。',
    note: 'AIは、エンジニアの可能性を広げるパートナー。',
  },
  decorativeLabel: 'AI WORK',
  toolsLabel: '主に使えるAIツール',
  tools: [
    { id: 'chatgpt', name: 'ChatGPT', icon: chatGptIcon },
    { id: 'copilot', name: 'GitHub Copilot', icon: githubCopilotIcon },
    { id: 'claude', name: 'Claude', icon: claudeIcon },
    { id: 'notion-ai', name: 'Notion AI', icon: notionAiIcon },
    { id: 'figma-ai', name: 'Figma AI', icon: figmaAiIcon },
  ],
  steps: [
    { step: '01', title: '情報収集', description: 'AIで情報を素早くキャッチアップ', icon: aiWorkResearch },
    { step: '02', title: 'アイデア出し', description: 'AIで発想を広げ、最適な解決策を検討', icon: aiWorkIdea },
    { step: '03', title: '開発・実装', description: 'コード生成や補助で開発スピードを向上', icon: aiWorkDevelopment },
    { step: '04', title: 'レビュー・改善', description: 'AIでレビューや改善案を提案し品質を高める', icon: aiWorkReview },
  ],
}

export const careerStorySection = {
  id: 'career-story',
  heading: {
    number: '04',
    title: '社員のキャリアストーリー',
    lead: '実際のメンバーの成長イメージです。あなたらしい未来を描けます。',
  },
  decorativeLabel: 'CAREER',
  member: {
    name: 'Y.Mさん',
    role: 'フロントエンドエンジニア',
    previousJob: 'Web制作会社',
    image: careerMember,
  },
  timeline: [
    {
      year: '1年目',
      title: 'AIツールを活用',
      description: 'AIツールを活用しながらコーディングやタスクを習得。Web開発の基礎を実践的に身につける。',
    },
    {
      year: '3年目',
      title: '設計にも携わる',
      description: '複数の案件を経験し、設計にも携わる。チームの中で信頼される存在に。',
    },
    {
      year: '3年目',
      title: 'リーダーとして成長',
      description: 'フロントエンドのリーダーとしてメンバーをサポート。案件を越えた上流工程にも関わる。',
    },
    {
      year: '5年目〜',
      title: '技術リーダーとして活躍',
      description: '新規サービス開発の技術リーダーとして活躍。技術選定や開発の推進にも関わるエンジニアへ。',
    },
  ],
}

export const marketValueSection = {
  id: 'market-value',
  heading: {
    number: '05',
    title: 'なぜ市場価値が高まるのか？',
    lead: 'PREAIでの経験を通して、他社にもない価値を積み上げていきます。',
    note: '見える景色が、きっと変わる。',
  },
  decorativeLabel: 'VALUE',
  reasons: [
    { number: '01', title: 'エンジニア経験', description: 'これまでの開発経験をベースにスキルを発展' },
    { number: '02', title: 'AI活用', description: 'AIを使いこなし、生産性とアウトプットを最大化' },
    { number: '03', title: '上流工程', description: '要件定義や企画など上流工程にも挑戦' },
    { number: '04', title: '顧客課題の解決', description: 'ビジネス視点で課題を捉え、解決できる力を身につける' },
  ],
  ctaBox: {
    title: '自分でキャリアを選べるエンジニアへ！',
    crownImage: careerChoiceCrown,
  },
}

export const careerSupportSection = {
  id: 'career-support',
  heading: {
    number: '06',
    title: 'キャリアコンサルタントによる支援',
    lead: '現場のキャリアコンサルタントが、あなたの成長をキャリア面でサポートします。',
  },
  decorativeLabel: 'SUPPORT',
  points: [
    '案件や成長に合わせた最適なご提案',
    'スキルアップや学習計画をサポート',
    '定期的なキャリア面談で目標設定',
    '将来的なキャリアプランを一緒に考える',
  ],
  image: careerSupportMember,
}

export const interviewSection = {
  id: 'interview',
  heading: {
    number: '07',
    title: '面接について',
    lead: '面接では、あなたのこれまでとこれからについてお話しします。',
  },
  decorativeLabel: 'INTERVIEW',
  interviewerLabel: 'こんな人が面接します',
  interviewer: {
    name: '',
    role: '',
    image: interviewMain,
  },
  points: [
    'これまでのご経験・スキルについて',
    'PREAIでやってみたいこと',
    '今後のキャリアの希望',
    '当社で実現できることのご紹介',
  ],
  note: 'まずは気軽に、お話ししましょう。',
}

export const selectionFlowSection = {
  id: 'selection',
  heading: {
    number: '08',
    title: '選考フロー',
    lead: 'シンプルなステップで、選考を進めます。',
  },
  decorativeLabel: 'SELECTION',
  durationNote: '選考期間の目安　5日以内　スピーディーに対応。',
  offerNote: '内定までのご連絡は　最短1週間',
  note: 'スピーディーに\n次のステップへ…',
  steps: [
    { step: '01', title: '書類提出', description: '履歴書・職務経歴書', duration: '即日〜1日', icon: selectionDocument },
    { step: '02', title: 'カジュアル面談', description: '気軽にお話ししましょう', duration: '1〜2日', icon: selectionCasualInterview },
    { step: '03', title: '面接', description: '現場担当者との面接', duration: '1〜2日', icon: selectionInterview },
    { step: '04', title: '条件調整', description: '条件のご相談', duration: '1〜2日', icon: selectionConditions },
    { step: '05', title: '内定', description: '内定のご連絡', duration: '最短1週間', icon: selectionOffer },
  ],
}

/*
 * Final CTAはHero同様、完成デザインの1枚画像をそのまま使用する。
 * キャッチコピー・人物・背景などはすべて画像側に含まれているため、
 * ここでは画像パスと alt テキストのみを管理する。
 */
export const finalCtaSection = {
  id: 'final-cta',
  alt: '新しいキャリアの一歩を、ここから。面接で詳しく話してみませんか？ PREAI',
  image: finalCtaImage,
}

export const footerContent = {
  logoText: 'PREAI',
  links: [
    { label: '利用規約', href: '#' },
    { label: 'プライバシーポリシー', href: '#' },
    { label: 'クッキーポリシー', href: '#' },
  ],
  social: [
    { label: 'X', href: '#', icon: 'x' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
  ],
  copyright: '© 2026 PREAI Inc.',
}
