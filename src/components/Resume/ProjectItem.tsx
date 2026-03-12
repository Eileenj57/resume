import { TechBadge } from './TechBadge'
import { GitHubIcon, ExternalLinkIcon } from '@/components/icons'

interface ProjectItemProps {
  title: string
  description: string
  techs: string[]
  url?: string
  github?: string
}

export function ProjectItem({ title, description, techs, url, github }: ProjectItemProps) {
  return (
    <div className="py-3 px-3 -mx-3 rounded-xl hover:bg-resume-primary/5 transition-colors group">
      <div className="flex items-center gap-2 mb-1">
        <h3
          className="text-resume-text"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLinkIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`}
            className="opacity-0 group-hover:opacity-100 transition-opacity">
            <GitHubIcon className="w-3.5 h-3.5 text-resume-primary" />
          </a>
        )}
      </div>
      <p
        className="text-resume-text-secondary mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', lineHeight: 1.55 }}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {techs.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>
    </div>
  )
}
