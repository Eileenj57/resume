import { TechBadge } from './TechBadge'

interface ExperienceDetailsContentProps {
  context: string
  tasks?: string[]
  training?: string[]
  env: string
  techs?: string[]
  description?: string
  labels: {
    mainTasks: string
    moreTasks: string
    training?: string
    techEnv: string
    technologies: string
  }
  variant: 'inline' | 'modal'
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.58rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}

export function ExperienceDetailsContent({
  context,
  tasks,
  training,
  env,
  techs,
  description,
  labels,
  variant,
}: ExperienceDetailsContentProps) {
  const MAX_INLINE_TASKS = 6

  return (
    <div className="space-y-3">
      {variant === 'modal' && description && (
        <p
          className="text-resume-text-secondary leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}
        >
          {description}
        </p>
      )}

      {/* Context — italic quote with left border */}
      <p
        className="text-resume-text-secondary italic border-l-2 border-resume-primary/40 pl-3"
        style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.78rem', lineHeight: 1.65 }}
      >
        {context}
      </p>

      {variant === 'modal' && techs && techs.length > 0 && (
        <div>
          <p className="text-resume-text mb-2" style={labelStyle}>{labels.technologies}</p>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div>
          <p className="text-resume-text mb-2" style={labelStyle}>{labels.mainTasks}</p>
          <ul className="text-resume-text-secondary space-y-1.5">
            {(variant === 'inline' ? tasks.slice(0, MAX_INLINE_TASKS) : tasks).map((task, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary mt-0.5 shrink-0" style={{ fontSize: '0.6rem' }}>◆</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.77rem', lineHeight: 1.55 }}>{task}</span>
              </li>
            ))}
            {variant === 'inline' && tasks.length > MAX_INLINE_TASKS && (
              <li className="text-resume-primary italic" style={{ fontFamily: "'Lora', sans-serif", fontSize: '0.75rem' }}>
                +{tasks.length - MAX_INLINE_TASKS} {labels.moreTasks}
              </li>
            )}
          </ul>
        </div>
      )}

      {training && training.length > 0 && labels.training && (
        <div>
          <p className="text-resume-text mb-2" style={labelStyle}>{labels.training}</p>
          <ul className="text-resume-text-secondary space-y-1.5">
            {training.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary mt-0.5 shrink-0" style={{ fontSize: '0.6rem' }}>◆</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.77rem', lineHeight: 1.55 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech env */}
      <div className={variant === 'modal' ? 'pt-3 border-t border-resume-primary/15' : ''}>
        <p className="text-resume-primary" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', lineHeight: 1.7 }}>
          <span style={{ ...labelStyle, color: 'var(--resume-primary)' }}>{labels.techEnv}</span>{' '}
          {env}
        </p>
      </div>
    </div>
  )
}
