import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { ExperienceItem } from './ExperienceItem'
import { ProjectItem } from './ProjectItem'
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
      {/* Header — Lora serif name, mono subtitle */}
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
        <p
          className="text-resume-text-secondary mt-2"
          style={sectionHeadingStyle}
        >
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
        <h2
          className="text-resume-text mb-6 pb-2 border-b border-resume-primary/20"
          style={sectionHeadingStyle}
        >
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

      {/* Projects */}
      {projects && projects.length > 0 && labels.sections.projects && (
        <div className="mt-8">
          <h2
            className="text-resume-text mb-4 pb-2 border-b border-resume-primary/20"
            style={sectionHeadingStyle}
          >
            {resolve(labels.sections.projects)}
          </h2>
          <div className="space-y-1">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                title={resolve(project.title)}
                description={resolve(project.description)}
                techs={project.techs}
                url={project.url}
                github={project.github}
              />
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      <div className="mt-8">
        <h2
          className="text-resume-text mb-4 pb-2 border-b border-resume-primary/20"
          style={sectionHeadingStyle}
        >
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
    </div>
  )
}
