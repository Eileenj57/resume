import type { ResumeConfig } from './types'

export const resumeConfig: ResumeConfig = {
  // ===== PERSONAL INFO =====
  personal: {
    name: 'Eileen Jovenin',
    photo: '/images/photo.jpg',
    photoBackEmoji: '👩🏻‍🦰',
    title: {
      en: 'Computer Science Engineer',
      fr: 'Ingénieur Informatique',
    },
    subtitle: {
      en: 'AI, Data & Software Development',
      fr: 'IA, Data & Développement Logiciel',
    },
    location: 'Toulouse, France',
  },

  // ===== SEO =====
  seo: {
    title: 'Eileen Jovenin — Computer Science Engineer | AI & Data',
    description: 'Interactive resume of Eileen Jovenin, Computer Science Engineer specializing in AI, Machine Learning, and Software Development.',
  },

  // ===== LANGUAGES =====
  languages: {
    default: 'fr',
    available: ['fr', 'en'],
    labels: {
      en: 'EN',
      fr: 'FR',
    },
  },

  // ===== CONTACT =====
  contact: [
    { type: 'email', label: 'jovenineileen@gmail.com' },
    { type: 'phone', label: '+33 6 22 71 34 87' },
    { type: 'linkedin', label: 'Eileen Jovenin', href: 'https://linkedin.com/in/eileen-jovenin-916109193' },
    { type: 'github', label: 'Eileenj57', href: 'https://github.com/Eileenj57' },
    { type: 'location', label: 'Toulouse, France' },
  ],

  // ===== SKILLS =====
  skills: [
    {
      title: { en: 'Languages', fr: 'Langues' },
      type: 'languages',
      items: [
        { name: { en: 'French', fr: 'Français' }, level: { en: 'Native', fr: 'Natif' } },
        { name: { en: 'English', fr: 'Anglais' }, level: { en: 'C1', fr: 'C1' }, details: 'Linguaskill B2 - 179/180' },
        { name: { en: 'German', fr: 'Allemand' }, level: { en: 'B1', fr: 'B1' }, details: 'Goethe-Zertifikat B1' },
        { name: { en: 'Chinese', fr: 'Chinois' }, level: { en: 'A2-B1', fr: 'A2-B1' }, details: 'HSK2 - 186/200' },
      ],
    },
    {
      title: { en: 'Programming', fr: 'Programmation' },
      type: 'badges',
      items: [
        { name: 'Python' },
        { name: 'C/C++' },
        { name: 'C#' },
        { name: 'Java' },
        { name: 'SQL' },
        { name: 'JavaScript' },
        { name: 'HTML/CSS' },
      ],
    },
    {
      title: { en: 'AI & Data', fr: 'IA & Data' },
      type: 'badges',
      items: [
        { name: 'Machine Learning' },
        { name: 'Deep Learning' },
        { name: 'PyTorch' },
        { name: 'Scikit-learn' },
        { name: 'NumPy' },
        { name: 'Pandas' },
        { name: 'Matplotlib' },
      ],
    },
    {
      title: { en: 'Software Development', fr: 'Développement logiciel' },
      type: 'badges',
      items: [
        { name: 'Git' },
        { name: 'Visual Studio' },
        { name: 'IntelliJ' },
        { name: 'Jupyter' },
      ],
    },
    {
      title: { en: 'Other Tools', fr: 'Autres outils' },
      type: 'badges',
      items: [
        { name: 'Unity' },
        { name: 'Blender' },
      ],
    },
    {
      title: { en: 'Soft Skills', fr: 'Compétences humaines' },
      type: 'text',
      items: [
        { 
          name: { 
            en: 'Teamwork, Autonomy, Rigor, Technical Communication', 
            fr: 'Travail en équipe, Autonomie, Rigueur, Communication technique' 
          } 
        },
      ],
    },
  ],

  // ==== PROFESSIONAL EXPERIENCES ====
  experiences: [
    {
      id: 'uliege',
      company: { en: 'University of Liège – STAR Institute (PSILab)', fr: 'Université de Liège – STAR Institute (PSILab)' },
      role: { en: 'AI Engineer / Data Scientist', fr: 'Ingénieure IA / Data Scientist' },
      type: { en: 'End-of-studies Internship', fr: 'Stage de fin d\'études' },
      period: { en: 'Feb.–Jul. 2025', fr: 'Fév.–Juil. 2025' },
      description: {
        en: 'Design and implementation of Machine Learning and Reinforcement Learning models in Python (PyTorch). Set up simulation, training, and evaluation pipelines on GPU.',
        fr: 'Conception et implémentation de modèles de Machine Learning et Reinforcement Learning en Python (PyTorch). Mise en place de pipelines de simulation, d\'entraînement et d\'évaluation sur GPU.',
      },
      techs: ['Python', 'PyTorch', 'Machine Learning', 'Deep Learning'],
      isHighlighted: true,
      details: {
        context: {
          en: 'Research internship at PSILab (STAR Institute), working on advanced AI models for space applications. GPU-accelerated computing environment with focus on optimization and performance.',
          fr: 'Stage de recherche au PSILab (STAR Institute), travail sur des modèles d\'IA avancés pour applications spatiales. Environnement de calcul accéléré par GPU avec focus sur l\'optimisation et les performances.',
        },
        tasks: {
          en: [
            'Designed and implemented Machine Learning and Reinforcement Learning models in Python using PyTorch',
            'Built complete simulation, training, and evaluation pipelines optimized for GPU computing',
            'Improved measured performance by 35% through algorithm optimization and cost function refinement',
            'Conducted results analysis with comprehensive data visualization',
            'Produced detailed technical documentation of models and methodologies',
            'Collaborated with research team on iterative model improvements',
          ],
          fr: [
            'Conception et implémentation de modèles de Machine Learning et Reinforcement Learning en Python avec PyTorch',
            'Création de pipelines complets de simulation, d\'entraînement et d\'évaluation optimisés pour GPU',
            'Amélioration de 35% des performances mesurées via l\'optimisation des algorithmes et des fonctions de coût',
            'Réalisation d\'analyses de résultats avec visualisation complète des données',
            'Production de documentation technique détaillée des modèles et méthodologies',
            'Collaboration avec l\'équipe de recherche sur les améliorations itératives des modèles',
          ],
        },
        env: {
          en: 'Python / PyTorch / NumPy / Pandas / Matplotlib / GPU Computing / Jupyter',
          fr: 'Python / PyTorch / NumPy / Pandas / Matplotlib / Calcul GPU / Jupyter',
        },
      },
    },
    {
      id: '3ma',
      company: { en: '3ma Group', fr: '3ma Group' },
      role: { en: 'Full Stack Software Developer', fr: 'Développement logiciel Full Stack' },
      type: { en: 'Engineering Internship', fr: 'Stage ingénieur' },
      period: { en: 'Sep. 2023–Feb. 2024', fr: 'Sept. 2023–Fév. 2024' },
      description: {
        en: 'Full stack development of internal application. Functional requirements analysis, complete back-end and front-end development (C#, CSHTML), interface design and user experience implementation.',
        fr: 'Développement full stack d\'une application interne. Analyse des besoins fonctionnels, développement complet du back-end et du front-end (C#, CSHTML), conception des interfaces et implémentation de l\'expérience utilisateur.',
      },
      techs: ['C#', 'HTML/CSS', 'Git'],
      details: {
        context: {
          en: 'Software development internship at 3ma Group in Rouffach. Worked on an internal business application with focus on improving operational efficiency and user experience.',
          fr: 'Stage de développement logiciel chez 3ma Group à Rouffach. Travail sur une application métier interne avec focus sur l\'amélioration de l\'efficacité opérationnelle et de l\'expérience utilisateur.',
        },
        tasks: {
          en: [
            'Analyzed functional requirements and designed application features',
            'Developed complete back-end and front-end using C# and CSHTML',
            'Designed user interfaces and implemented user workflows',
            'Set up functional tests and validated scenarios',
            'Participated in production deployment process',
            'Optimized testing processes, reducing manual validation time by 45%',
            'Collaborated with stakeholders to refine requirements',
          ],
          fr: [
            'Analyse des besoins fonctionnels et conception des fonctionnalités de l\'application',
            'Développement complet du back-end et du front-end (C#, CSHTML)',
            'Conception des interfaces et implémentation des parcours utilisateurs',
            'Mise en place de tests fonctionnels et validation des scénarios',
            'Participation à la mise en production',
            'Optimisation des processus de test, réduisant le temps de validation manuelle de 45%',
            'Collaboration avec les parties prenantes pour affiner les besoins',
          ],
        },
        env: {
          en: 'C# / CSHTML / HTML/CSS / Visual Studio / Git',
          fr: 'C# / CSHTML / HTML/CSS / Visual Studio / Git',
        },
      },
    },
  ],

  // ===== PROJECTS =====
  projects: [
    {
      id: 'multi-agent',
      title: { en: 'Multi-Agent Patrolling System', fr: 'Système multi-agents de patrouille' },
      description: {
        en: 'Multi-agent system optimized using Ant Colony Optimization and K-means clustering algorithms.',
        fr: 'Système multi-agents optimisé par Ant Colony Optimization et K-means.',
      },
      techs: ['Python', 'Machine Learning'],
    },
    {
      id: 'life-vair',
      title: { en: 'LIFE V-AIR Project', fr: 'Projet LIFE V-AIR' },
      description: {
        en: 'Serious game in augmented and virtual reality for environmental awareness.',
        fr: 'Serious game en réalité augmentée et virtuelle pour la sensibilisation environnementale.',
      },
      techs: ['Unity', 'C#'],
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      school: { 
        en: 'University of Technology of Belfort-Montbéliard (UTBM)', 
        fr: 'Université de Technologie de Belfort-Montbéliard (UTBM)' 
      },
      degree: { 
        en: 'Engineering Degree in Computer Science', 
        fr: 'Diplôme d\'ingénieur en Informatique' 
      },
      specialty: { 
        en: 'Artificial Intelligence specialization', 
        fr: 'Spécialisation Intelligence Artificielle' 
      },
      period: '2020–2025',
    },
    {
      school: { en: 'High School', fr: 'Lycée' },
      degree: { 
        en: 'Scientific Baccalaureate, Mathematics specialty', 
        fr: 'Baccalauréat scientifique, spécialité mathématiques' 
      },
      specialty: { 
        en: 'Honors: Très Bien', 
        fr: 'Mention Très Bien' 
      },
      period: '2020',
    },
  ],

  // ===== HOBBIES =====
  hobbies: [
    {
      title: { en: 'Scuba Diving', fr: 'Plongée sous-marine' },
      details: [
        { en: 'N1 FFESSM certification', fr: 'N1 FFESSM' },
      ],
    },
    {
      title: { en: 'Astronomy', fr: 'Astronomie' },
    },
    {
      title: { en: 'Travel', fr: 'Voyages' },
    },
    {
      title: { en: 'Art', fr: 'Art' },
    },
  ],

  // ===== PDF =====
  pdf: {
    label: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    path: { en: '/cv/CV_Eileen_Jovenin_EN.pdf', fr: '/cv/CV_Eileen_Jovenin.pdf' },
  },

  // ===== THEME =====
  theme: {
    preset: 'minimal',
    colors: {
      // Light mode - tech-inspired blue/purple
      primary: '#5B21B6',
      primaryLight: '#8B5CF6',
      // Dark mode
      primaryDark: '#A78BFA',
      primaryLightDark: '#C4B5FD',
    },
  },

  // ===== UI LABELS =====
  labels: {
    sections: {
      contact: { en: 'CONTACT', fr: 'CONTACT' },
      skills: { en: 'SKILLS', fr: 'COMPÉTENCES' },
      experience: { en: 'PROFESSIONAL EXPERIENCE', fr: 'EXPÉRIENCE PROFESSIONNELLE' },
      education: { en: 'EDUCATION', fr: 'FORMATION' },
      projects: { en: 'PROJECTS', fr: 'PROJETS' },
      hobbies: { en: 'INTERESTS', fr: 'CENTRES D\'INTÉRÊT' },
    },
    experience: {
      mainTasks: { en: 'Main tasks:', fr: 'Tâches principales :' },
      moreTasks: { en: 'more tasks...', fr: 'autres tâches...' },
      training: { en: 'Training:', fr: 'Formations :' },
      techEnv: { en: 'Tech environment:', fr: 'Env. technique :' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
    },
    actions: {
      clickHint: { en: 'Click on experiences to see more details', fr: 'Cliquez sur les expériences pour voir plus de détails' },
      switchTheme: { en: 'Toggle dark mode', fr: 'Changer le thème' },
      downloadPdf: { en: 'Download PDF', fr: 'Télécharger le PDF' },
    },
  },
}