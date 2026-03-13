import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Navbar } from '@/components/Resume/Navbar'

// ─── Types ───────────────────────────────────────────────────────────────────

type Filter = 'all' | 'work' | 'ai' | 'game' | 'web' | 'side'
type BadgeType = 'work' | 'side' | 'academic'

interface CardDetail {
  ctx: string
  tasks: string[]
  env: string
}

interface Project {
  id: string
  icon: string
  badge: BadgeType
  badgeKey: string
  titleFr: string
  titleEn: string
  descFr: string
  descEn: string
  meta: string
  metaKey?: string
  period?: string
  location?: string
  tags: string[]
  category: string[]
  href?: string
  expandable?: boolean
  details?: {
    fr: CardDetail
    en: CardDetail
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'p1',
    icon: '🔭',
    badge: 'work',
    badgeKey: 'b_intern',
    titleFr: "RL pour l'imagerie astronomique — PSILab, ULiège",
    titleEn: 'RL for Astronomical Imaging — PSILab, ULiège',
    descFr: "Application du Reinforcement Learning au contrôle du front d'onde en optique adaptative, pour améliorer la qualité d'images d'exoplanètes à haut contraste.",
    descEn: 'Application of Reinforcement Learning to wavefront control in adaptive optics, to improve high-contrast image quality for exoplanet detection.',
    meta: 'Fév. – Juil. 2025',
    location: 'Liège, Belgique',
    tags: ['Python', 'PyTorch', 'SAC', 'A2C', 'HCIPy', 'WandB'],
    category: ['work', 'ai'],
    expandable: true,
    details: {
      fr: {
        ctx: "Effectué au PSILab (Planetary and Stellar system Imagery Laboratory), rattaché à l'Institut STAR de l'Université de Liège — partenaire de l'ESA et de l'ESO. Objectif : corriger les aberrations optiques résiduelles (NCPA) non corrigées par l'optique adaptative classique, directement à partir des images du plan focal, sans capteur de front d'onde.",
        tasks: [
          "Implémentation de deux environnements de simulation optique (<em>sharpening</em> et <em>dark hole</em>) avec HCIPy, à partir d'un framework existant.",
          "Entraînement et comparaison des algorithmes SAC et A2C sur configurations de complexité croissante : PSF idéale → bruit → aberrations dynamiques.",
          "Optimisation des hyperparamètres par Bayesian Optimisation et grilles réduites.",
          "Refonte du pipeline d'entraînement (callbacks, checkpoints, WandB offline) : gain de 35–50 % sur les temps d'exécution.",
          "Conception et affinage des fonctions de récompense pour le <em>dark hole</em> : suppression localisée de speckles lumineux autour d'une étoile coronographiée.",
          "Présentations hebdomadaires à l'équipe ; réunions mensuelles avec l'ESO sur l'usage du RL en optique adaptative."
        ],
        env: 'Python · PyTorch · TorchRL · Stable-Baselines3 · HCIPy · NumPy · SciPy · Matplotlib · WandB · cProfile · Git / Gitflow · GPU Server'
      },
      en: {
        ctx: "Carried out at PSILab (Planetary and Stellar system Imagery Laboratory), STAR Institute, University of Liège — partner of ESA and ESO. Goal: correct residual optical aberrations (NCPA) not handled by conventional adaptive optics, directly from focal-plane images without a wavefront sensor.",
        tasks: [
          "Implemented two optical simulation environments (<em>sharpening</em> and <em>dark hole</em>) using HCIPy, adapting an existing framework.",
          "Trained and compared SAC and A2C algorithms across progressively complex configurations: ideal PSF → noise → dynamic aberrations.",
          "Optimized hyperparameters via Bayesian Optimization and reduced grid searches.",
          "Overhauled the training pipeline (callbacks, checkpoints, offline WandB): 35–50% reduction in execution time.",
          "Designed and refined reward functions for the <em>dark hole</em> task: localized suppression of stellar speckles around a coronagraphed star.",
          "Weekly progress presentations to the team; monthly meetings with ESO on RL for adaptive optics."
        ],
        env: 'Python · PyTorch · TorchRL · Stable-Baselines3 · HCIPy · NumPy · SciPy · Matplotlib · WandB · cProfile · Git / Gitflow · GPU Server'
      }
    }
  },
  {
    id: 'p2',
    icon: '💼',
    badge: 'work',
    badgeKey: 'b_eng',
    titleFr: 'Développement Full Stack — 3ma Group',
    titleEn: 'Full Stack Development — 3ma Group',
    descFr: "Développement complet d'une application interne en autonomie : analyse des besoins, conception des interfaces, développement back-end et front-end, mise en production.",
    descEn: 'Full development of an internal business application: requirements analysis, UI design, back-end and front-end development, production deployment.',
    meta: 'Sept. 2023 – Fév. 2024',
    location: 'Rouffach, France',
    tags: ['C#', 'CSHTML', 'HTML/CSS', 'Git'],
    category: ['work', 'web'],
    expandable: true,
    details: {
      fr: {
        ctx: "Stage ingénieur de 6 mois chez 3ma Group, PME spécialisée dans la maîtrise des risques industriels. Développement d'une application métier interne en grande autonomie, de la spécification à la mise en production.",
        tasks: [
          "Analyse des besoins fonctionnels avec les utilisateurs métier et rédaction des spécifications.",
          "Développement back-end C# et front-end CSHTML / HTML / CSS sous Visual Studio.",
          "Conception des interfaces utilisateur et implémentation des parcours.",
          "Mise en place de tests fonctionnels et validation des scénarios métier.",
          "Participation au déploiement en production.",
          "Optimisation des processus de test : réduction de 45 % du temps de validation manuelle."
        ],
        env: 'C# · CSHTML · HTML/CSS · Visual Studio · Git'
      },
      en: {
        ctx: "6-month engineering internship at 3ma Group, a company specialized in industrial risk management. Developed an internal business application with high autonomy, from specification to production deployment.",
        tasks: [
          "Analyzed functional requirements with business users and wrote specifications.",
          "Back-end development in C# and front-end in CSHTML / HTML / CSS using Visual Studio.",
          "Designed user interfaces and implemented user workflows.",
          "Set up functional tests and validated business scenarios.",
          "Participated in the production deployment process.",
          "Optimized testing processes, reducing manual validation time by 45%."
        ],
        env: 'C# · CSHTML · HTML/CSS · Visual Studio · Git'
      }
    }
  },
  {
    id: 'p3',
    icon: '🤖',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'Simulation Multi-Agents de Patrouille',
    titleEn: 'Multi-Agent Patrol Simulation',
    descFr: 'Simulation de patrouilles dans un musée virtuel configurable. Étude et comparaison de K-Means, ACO et algorithmes génétiques pour optimiser les trajectoires. Interface Pygame, architecture MVC, intégration continue SonarCloud.',
    descEn: 'Simulation of patrol routes in a configurable virtual museum. Study and comparison of K-Means, ACO and genetic algorithms to optimize paths. Pygame interface, MVC architecture, SonarCloud CI.',
    meta: 'Groupe · Pygame · MVC · CI',
    tags: ['Python', 'ACO', 'K-Means', 'NumPy', 'Pytest'],
    category: ['ai'],
    href: 'https://github.com/Gilles-Maurer-Organization/AI50_patrolling'
  },
  {
    id: 'p4',
    icon: '🐍',
    badge: 'side',
    badgeKey: 'b_side',
    titleFr: 'Snake — Reinforcement Learning',
    titleEn: 'Snake — Reinforcement Learning',
    descFr: "Agent autonome apprenant à jouer au Snake par RL. Le réseau de neurones optimise sa politique de déplacement uniquement par récompenses — sans règles explicites — jusqu'à atteindre des scores élevés.",
    descEn: 'Autonomous agent learning to play Snake via RL. The neural network optimizes its policy purely from rewards — no explicit rules — achieving high scores through trial and error.',
    meta: 'Solo · Personnel',
    tags: ['Python', 'RL', 'PyTorch', 'Deep Learning'],
    category: ['ai', 'side'],
    href: 'https://github.com/Eileenj57/SnakeRL'
  },
  {
    id: 'p5',
    icon: '♟️',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'Pogo — Jeu de stratégie avec IA (MinMax)',
    titleEn: 'Pogo — Strategy Game with AI (MinMax)',
    descFr: "Adaptation du jeu de plateau Pogo pour 2 joueurs. IA basée sur MinMax avec fonction d'évaluation sur mesure (position, mobilité, menaces). Trois modes : 2 joueurs, humain vs IA, IA vs IA. Interface graphique Qt.",
    descEn: 'Computer adaptation of the Pogo board game. AI based on MinMax with a custom evaluation function (position, mobility, threats). Three modes: 2 players, human vs AI, AI vs AI. Qt interface.',
    meta: 'Groupe · MinMax · Qt',
    tags: ['Python', 'MinMax', 'Qt'],
    category: ['ai', 'game'],
    href: 'https://github.com/Eileenj57/IA41-Project'
  },
  {
    id: 'p6',
    icon: '🌿',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'LIFE V-AIR — Serious Game AR/VR',
    titleEn: 'LIFE V-AIR — AR/VR Serious Game',
    descFr: "Serious game en réalité augmentée et virtuelle pour la sensibilisation environnementale. Les joueurs interagissent avec des écosystèmes simulés pour comprendre les impacts humains. Mécaniques pédagogiques immersives sous Unity.",
    descEn: 'Augmented and virtual reality serious game for environmental awareness. Players interact with simulated ecosystems. Immersive educational mechanics developed in Unity.',
    meta: 'Groupe · AR / VR',
    tags: ['Unity', 'C#', 'AR/VR'],
    category: ['game'],
    href: 'https://github.com/LifeVair/Life-VaiR-Serious-Game'
  },
  {
    id: 'p7',
    icon: '🎮',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'Mini-jeux Unity — Apple Catcher, Brick Breaker, Furapi Bird',
    titleEn: 'Unity Mini-games — Apple Catcher, Brick Breaker, Furapi Bird',
    descFr: "Trois mini-jeux développés sous Unity. Première prise en main de Unity et C#, avec un focus sur la mécanique de jeu, les animations et l'architecture orientée objet.",
    descEn: "Three mini-games built in Unity. First hands-on with Unity and C#, focusing on game mechanics, animations, and object-oriented architecture.",
    meta: 'Groupe',
    tags: ['Unity', 'C#'],
    category: ['game'],
    href: 'https://github.com/Eileenj57/LP2B-Unity-Game'
  },
  {
    id: 'p8',
    icon: '🧩',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'Tetris — Java Swing',
    titleEn: 'Tetris — Java Swing',
    descFr: "Recréation complète du Tetris classique en Java avec Swing. Gestion du score, des niveaux et des animations. Support multilingue via fichiers de propriétés, intégration musicale.",
    descEn: 'Full recreation of classic Tetris in Java with Swing. Score, levels, animations, multilingual support via properties files, music integration.',
    meta: 'Groupe',
    tags: ['Java', 'Swing'],
    category: ['game'],
    href: 'https://github.com/Eileenj57/LP2A-Tetris'
  },
  {
    id: 'p9',
    icon: '🐢',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: "Twitturtle — Réseau social pour propriétaires d'animaux",
    titleEn: 'Twitturtle — Social Network for Pet Owners',
    descFr: "Réseau social dédié aux animaux de compagnie : profil avec mascotte, posts géolocalisés, tags d'animaux, système d'adoption avec notifications. APIs Google Cloud, envoi d'e-mails via PHPMailer et Sendinblue.",
    descEn: 'Social network for pet owners: mascot profile, geolocated posts, animal tagging, adoption system with notifications. Google Cloud APIs, PHPMailer, Sendinblue.',
    meta: 'Groupe',
    tags: ['JavaScript', 'PHP', 'Google Cloud', 'PHPMailer'],
    category: ['web'],
    href: 'https://github.com/DynaTiuM/WE4A_Twitturtle_Project'
  },
  {
    id: 'p10',
    icon: '🎲',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: 'Ludiq — Plateforme de partage de loisirs',
    titleEn: 'Ludiq — Hobby Sharing Platform',
    descFr: "Plateforme communautaire pour partager ses centres d'intérêt, créer des discussions et organiser des événements. Back-end PHP, front-end Angular, architecture Model–Services–Controller.",
    descEn: "Community platform to share hobbies, create discussions and organize events. PHP back-end, Angular front-end, Model–Services–Controller architecture.",
    meta: 'Groupe',
    tags: ['Angular', 'PHP', 'MVC'],
    category: ['web'],
    href: 'https://github.com/AlanHerve/Ludiq'
  },
  {
    id: 'p11',
    icon: '🧬',
    badge: 'academic',
    badgeKey: 'b_acad',
    titleFr: "Algorithmes Génétiques — Simulation d'optimisation",
    titleEn: 'Genetic Algorithms — Optimization Simulation',
    descFr: "Implémentation d'une version simplifiée d'algorithmes génétiques pour l'optimisation. Types abstraits Individu (séquence de bits) et Population, avec sélection, croisement et mutation.",
    descEn: "Simplified implementation of genetic algorithms for optimization. Abstract types Individual (bit sequence) and Population, with selection, crossover, and mutation.",
    meta: 'Solo',
    tags: ['Python', 'Algorithmes génétiques', 'Optimisation'],
    category: ['ai'],
    href: 'https://github.com/Eileenj57/RN40-Project'
  },
  {
    id: 'p12',
    icon: '🤖',
    badge: 'side',
    badgeKey: 'b_side',
    titleFr: 'Bot Telegram — Recherche & envoi de fichiers',
    titleEn: 'Telegram Bot — File Search & Delivery',
    descFr: "Bot Telegram privé avec système de recherche multi-sources, envoi de fichiers via différents canaux, et gestion des utilisateurs par liste blanche. Intégration Gmail OAuth, MongoDB et VirusTotal.",
    descEn: "Private Telegram bot with multi-source search, file delivery via multiple channels, and user access control via whitelist. Integrates Gmail OAuth, MongoDB and VirusTotal.",
    meta: 'Solo · Personnel',
    tags: ['Python', 'Telegram API', 'Gmail API', 'MongoDB', 'VirusTotal'],
    category: ['side'],
  },
  {
  id: 'p13',
  icon: '👁️',
  badge: 'side',
  badgeKey: 'b_side',
  titleFr: 'Computer Vision Classifier — PyTorch',
  titleEn: 'Computer Vision Classifier — PyTorch',
  descFr: "Classification d'images sur FashionMNIST avec PyTorch. Implémentation et comparaison de modèles : baseline linéaire, CNN custom et TinyVGG. Suivi des métriques d'entraînement et visualisation des résultats.",
  descEn: 'Image classification on FashionMNIST with PyTorch. Implementation and comparison of models: linear baseline, custom CNN and TinyVGG. Training metrics tracking and results visualization.',
  meta: 'Solo · Personnel',
  tags: ['Python', 'PyTorch', 'CNN', 'Computer Vision', 'Deep Learning'],
  category: ['ai', 'side'],
  href: 'https://www.learnpytorch.io/03_pytorch_computer_vision/'
},
]

const FILTERS: { key: Filter; labelFr: string; labelEn: string }[] = [
  { key: 'all', labelFr: 'Tous', labelEn: 'All' },
  { key: 'work', labelFr: 'Expériences pro', labelEn: 'Professional' },
  { key: 'ai', labelFr: 'IA & ML', labelEn: 'AI & ML' },
  { key: 'game', labelFr: 'Jeu & Unity', labelEn: 'Game & Unity' },
  { key: 'web', labelFr: 'Web', labelEn: 'Web' },
  { key: 'side', labelFr: 'Side projects', labelEn: 'Side projects' },
]

const BADGE_LABELS = {
  b_intern: { fr: "Stage de fin d'études", en: 'End-of-studies internship' },
  b_eng: { fr: 'Stage ingénieur', en: 'Engineering internship' },
  b_acad: { fr: 'Académique', en: 'Academic' },
  b_side: { fr: 'Side project', en: 'Side project' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ type, labelKey, lang }: { type: BadgeType; labelKey: string; lang: string }) {
  const label = BADGE_LABELS[labelKey as keyof typeof BADGE_LABELS]?.[lang as 'fr' | 'en'] ?? labelKey
  const cls =
    type === 'work'
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
      : type === 'side'
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
        : 'bg-resume-primary/10 text-resume-primary'
  return (
    <span
      className={`inline-block text-[0.6rem] font-medium tracking-wider uppercase px-2 py-0.5 rounded ${cls}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4 text-resume-text-secondary flex-shrink-0 mt-0.5 transition-all group-hover:text-resume-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-resume-text-secondary flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-90 !text-resume-primary' : ''}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function ProjectCard({ project, lang }: { project: Project; lang: string }) {
  const [open, setOpen] = useState(false)
  const title = lang === 'fr' ? project.titleFr : project.titleEn
  const desc = lang === 'fr' ? project.descFr : project.descEn
  const details = project.details?.[lang as 'fr' | 'en']

  const cardBase =
    'bg-resume-bg-card border border-resume-primary/10 rounded-xl p-5 flex flex-col gap-2.5 transition-all duration-200 relative overflow-hidden group'

  const topBar = (
    <div
      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-resume-primary to-resume-primary-light origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
      style={open ? { transform: 'scaleX(1)' } : {}}
    />
  )

  const inner = (
    <>
      {topBar}
      <div className="flex justify-between items-start">
        <div className="w-9 h-9 rounded-lg bg-resume-primary/10 flex items-center justify-center text-base flex-shrink-0">
          {project.icon}
        </div>
        {project.expandable ? <ChevronIcon open={open} /> : <ArrowIcon />}
      </div>
      <Badge type={project.badge} labelKey={project.badgeKey} lang={lang} />
      <p className="text-[0.87rem] font-medium text-resume-text leading-snug tracking-tight">{title}</p>
      <p className="text-[0.78rem] text-resume-text-secondary leading-relaxed flex-1">{desc}</p>
      <p className="text-[0.62rem] text-resume-text-secondary/60 flex items-center gap-1.5 flex-wrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {project.meta}
        {project.location && <><span className="w-1 h-1 rounded-full bg-current inline-block" />{project.location}</>}
      </p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {project.tags.map(t => (
          <span key={t} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-resume-primary/10 text-resume-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
        ))}
      </div>

      {/* Expandable details */}
      {project.expandable && details && (
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? '800px' : '0', opacity: open ? 1 : 0 }}
        >
          <div className="h-px bg-resume-primary/10 my-2" />
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[0.6rem] text-resume-text-secondary/50 uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {lang === 'fr' ? 'Contexte' : 'Context'}
              </p>
              <p className="text-[0.78rem] text-resume-text-secondary leading-relaxed">{details.ctx}</p>
            </div>
            <div>
              <p className="text-[0.6rem] text-resume-text-secondary/50 uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {lang === 'fr' ? 'Réalisations' : 'Achievements'}
              </p>
              <ul className="flex flex-col gap-1">
                {details.tasks.map((t, i) => (
                  <li key={i} className="text-[0.77rem] text-resume-text-secondary leading-relaxed pl-4 relative">
                    <span className="absolute left-0 text-resume-primary text-[0.7rem] leading-[1.8]">→</span>
                    <span dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6rem] text-resume-text-secondary/50 uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {lang === 'fr' ? 'Environnement technique' : 'Tech environment'}
              </p>
              <p className="text-[0.63rem] text-resume-text-secondary/60 bg-resume-bg border border-resume-primary/10 px-3 py-2 rounded leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {details.env}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )

  if (project.expandable) {
    return (
      <div className={`${cardBase} cursor-pointer`} onClick={() => setOpen(o => !o)}>
        {inner}
      </div>
    )
  }

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={`${cardBase} hover:-translate-y-0.5 hover:shadow-lg hover:border-resume-primary/20`}>
      {inner}
    </a>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Portfolio() {
  const { language } = useTranslation()
  const lang = language
  const [filter, setFilter] = useState<Filter>('all')
  const [photoLoaded, setPhotoLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setPhotoLoaded(true)
    img.src = 'https://eileenj57.github.io/resume/images/photo.jpg'
  }, [])

  const filtered = PROJECTS.filter(p =>
    filter === 'all' || p.category.includes(filter)
  )

  return (
    <div className="min-h-screen bg-resume-bg">
      <Navbar activePage="portfolio" />

      <div className="max-w-4xl mx-auto px-4">
        {/* Hero */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr_170px] gap-8 items-start">
          <div>
            <p
              className="text-resume-primary text-[0.68rem] uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="inline-block w-4 h-px bg-resume-primary" />
              {lang === 'fr' ? 'Portfolio — Ingénieure Informatique' : 'Portfolio — Computer Science Engineer'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight text-resume-text mb-4" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              Eileen<br />
              <em className="not-italic text-resume-primary">Jovenin</em>
            </h1>
            <p className="text-[0.93rem] text-resume-text-secondary leading-relaxed mb-6 max-w-lg">
              {lang === 'fr'
                ? "Ingénieure en informatique diplômée de l'UTBM, spécialisée en Intelligence Artificielle et Machine Learning. Passionnée par la recherche appliquée, des systèmes d'optique adaptative aux agents intelligents, en passant par le développement logiciel."
                : 'Computer Science Engineer graduated from UTBM, specialized in AI and Machine Learning. Passionate about applied research — from adaptive optics to intelligent agents and software development.'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                { href: 'https://github.com/Eileenj57', label: 'GitHub', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg> },
                { href: 'https://linkedin.com/in/eileen-jovenin-916109193', label: 'LinkedIn', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.76rem] font-medium text-resume-text-secondary border border-resume-primary/15 px-3 py-1 rounded-lg bg-resume-bg-card hover:border-resume-primary hover:text-resume-primary hover:bg-resume-primary/5 transition-all"
                >
                  {link.icon}{link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-resume-primary/20 shadow-xl bg-resume-primary/10 flex items-center justify-center text-5xl">
              {photoLoaded
                ? <img src="https://eileenj57.github.io/resume/images/photo.jpg" alt="Eileen Jovenin" className="w-full h-full object-cover" />
                : '👩🏻‍🦰'}
            </div>
            <div className="flex gap-5">
              {[
                { num: '10+', lbl: lang === 'fr' ? 'projets' : 'projects' },
              ].map(s => (
                <div key={s.lbl} className="flex flex-col items-center gap-0.5">
                  <span className="text-2xl text-resume-text font-light tracking-tight" style={{ fontFamily: "'Lora', serif" }}>{s.num}</span>
                  <span className="text-[0.6rem] text-resume-text-secondary/50 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects section */}
        <div className="border-t border-resume-primary/10 py-12">
          <p className="text-[0.65rem] text-resume-text-secondary/40 uppercase tracking-widest mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {lang === 'fr' ? '— Projets & expériences' : '— Projects & experience'}
          </p>
          <h2 className="text-[1.45rem] text-resume-text mb-6 tracking-tight" style={{ fontFamily: "'Lora', serif" }}>
            {lang === 'fr' ? 'Travaux & réalisations' : 'Work & Projects'}
          </h2>

          {/* Filter bar */}
          <div className="flex gap-1.5 flex-wrap mb-6">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-[0.65rem] font-medium uppercase tracking-wider px-3 py-1 rounded border transition-all ${
                  filter === f.key
                    ? 'bg-resume-primary/10 border-resume-primary text-resume-primary'
                    : 'bg-resume-bg-card border-resume-primary/15 text-resume-text-secondary hover:border-resume-primary hover:text-resume-primary hover:bg-resume-primary/5'
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {lang === 'fr' ? f.labelFr : f.labelEn}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} lang={lang} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-resume-primary/10 py-6 text-center text-[0.68rem] text-resume-text-secondary/40 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {lang === 'fr' ? 'Construit avec ♥' : 'Built with ♥'}
        </footer>
      </div>
    </div>
  )
}
