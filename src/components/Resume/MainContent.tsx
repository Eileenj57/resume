import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { ExperienceItem } from './ExperienceItem'
import { EducationItem } from './EducationItem'

// Shared heading style matching portfolio section titles
const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.62rem',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
}

export function MainContent() {
  const { resolve, resolveArray } = useTranslation()
  const { personal, experiences, projects, education, labels } = resumeConfig
  const [expandedExp, setExpandedExp] = useState<string | null>(null)

  const toggleExp = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id)
  }

  const experienceLabels = {
    mainTasks: resolve(labels.experience.mainTasks),
    moreTasks: resolve(labels.experience.moreTasks),
    training: labels.experience.training ? resolve(labels.experience.training) : undefined,
    techEnv: resolve(labels.experience.techEnv),
    technologies: resolve(labels.experience.technologies),
  }

  return (
    <div className="md:w-[62%] p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-resume-text"
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {personal.name.split(' ')[0]}{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--resume-primary)' }}>
            {personal.name.split(' ').slice(1).join(' ')}
          </em>
        </h1>
        <p className="text-resume-text-secondary mt-2" style={sectionHeadingStyle}>
          {resolve(personal.title)}
        </p>
        {personal.subtitle && (
          <p
            className="text-resume-primary mt-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em' }}
          >
            {resolve(personal.subtitle)}
          </p>
        )}
      </div>

      {/* Experiences */}
      <div className="relative">
        <h2 className="text-resume-text mb-6 pb-2 border-b border-resume-primary/20" style={sectionHeadingStyle}>
          {resolve(labels.sections.experience)}
        </h2>
        <div className="space-y-2">
          {experiences.map((exp) => (
            <ExperienceItem
              key={exp.id}
              year={resolve(exp.period)}
              company={resolve(exp.company)}
              type={exp.type ? resolve(exp.type) : undefined}
              role={resolve(exp.role)}
              description={resolve(exp.description)}
              techs={exp.techs}
              expanded={expandedExp === exp.id}
              onToggle={() => toggleExp(exp.id)}
              details={
                exp.details
                  ? {
                      context: resolve(exp.details.context),
                      tasks: exp.details.tasks ? resolveArray(exp.details.tasks) : undefined,
                      training: exp.details.training ? resolveArray(exp.details.training) : undefined,
                      env: resolve(exp.details.env),
                    }
                  : undefined
              }
              subItem={
                exp.subItem
                  ? {
                      title: resolve(exp.subItem.title),
                      description: resolve(exp.subItem.description),
                    }
                  : undefined
              }
              labels={experienceLabels}
              isHighlighted={exp.isHighlighted}
            />
          ))}
        </div>
      </div>

      {/* Certifications — most recent first */}
      {projects && projects.length > 0 && labels.sections.projects && (
        <div className="mt-8">
          <h2 className="text-resume-text mb-4 pb-2 border-b border-resume-primary/20" style={sectionHeadingStyle}>
            {resolve(labels.sections.projects)}
          </h2>
          <div className="space-y-2">
            {[...projects].reverse().map((project) => (
              <div key={project.id} className="flex items-start gap-3 py-1.5">
                <span
                  className="mt-0.5 text-resume-primary shrink-0"
                  style={{ fontSize: '0.7rem', lineHeight: '1.6' }}
                >
                  ✦
                </span>
                <div className="min-w-0">
                  <p
                    className="text-resume-text leading-snug"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 500 }}
                  >
                    {resolve(project.title)}
                  </p>
                  <p
                    className="text-resume-text-secondary mt-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem' }}
                  >
                    {resolve(project.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      <div className="mt-8">
        <h2 className="text-resume-text mb-4 pb-2 border-b border-resume-primary/20" style={sectionHeadingStyle}>
          {resolve(labels.sections.education)}
        </h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <EducationItem
              key={`${resolve(edu.school)}-${resolve(edu.degree)}-${edu.period ?? i}`}
              school={resolve(edu.school)}
              degree={resolve(edu.degree)}
              specialty={edu.specialty ? resolve(edu.specialty) : undefined}
              period={edu.period}
              logo={edu.logo}
            />
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-8">
        <h2 className="text-resume-text mb-4 pb-2 border-b border-resume-primary/20" style={sectionHeadingStyle}>
          {resolve({ en: 'RECOMMENDATION', fr: 'RECOMMANDATION' })}
        </h2>
        <div className="relative rounded-xl border border-resume-primary/20 bg-resume-primary/5 px-5 py-4">
          {/* Decorative quote mark */}
          <span
            className="absolute -top-3 left-4 text-resume-primary/30 select-none"
            style={{ fontFamily: "'Lora', serif", fontSize: '3rem', lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </span>

          <blockquote
            className="text-resume-text-secondary leading-relaxed"
            style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.82rem', fontStyle: 'italic', textAlign: 'justify'}}
          >
            {resolve({
              en: "Eileen successfully bridged two complex and very distinct fields: reinforcement learning (aligned with her training) and high-contrast imaging in astronomy (new to her). Despite this significant challenge, she contributed meaningfully to this research topic, integrated smoothly into our team, and demonstrated autonomy, commitment, and strong communication skills in both French and English.",
              fr: "Eileen a su connecter deux domaines complexes et très distincts : l'apprentissage par renforcement (en lien avec sa formation) et l'imagerie à haut contraste en astronomie (nouveau pour elle). Malgré ce défi important, elle a contribué de manière significative à ce sujet de recherche, s'est intégrée naturellement à notre équipe, et a fait preuve d'autonomie, d'engagement et de solides compétences en communication en français et en anglais.",
            })}
          </blockquote>

          {/* Signature + download button */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p
              className="text-resume-text-secondary"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.04em' }}
            >
              {resolve({
                en: 'Gilles Orban de Xivry — Research Staff in Astronomy, Univ. of Liège · 2025',
                fr: 'Gilles Orban de Xivry — Chercheur en Astronomie, Univ. de Liège · 2025',
              })}
            </p>
            <a
              href="LoR(GOX)_for_Eileen_Jovenin_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg border border-resume-primary/30 text-resume-primary hover:bg-resume-primary/10 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.06em' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {resolve({ en: 'Full letter', fr: 'Lettre complète' })}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
