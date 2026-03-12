import { assetUrl } from '@/lib/utils'

interface EducationItemProps {
  school: string
  degree: string
  specialty?: string
  period?: string
  logo?: string
}

export function EducationItem({ school, degree, specialty, period, logo }: EducationItemProps) {
  return (
    <div className="flex items-start gap-4">
      {logo && (
        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-resume-primary/10">
          <img src={assetUrl(logo)} alt={`${school} logo`} className="object-contain w-full h-full" loading="lazy" />
        </div>
      )}
      <div>
        <p
          className="text-resume-text"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          {school}
        </p>
        <p
          className="text-resume-text-secondary mt-0.5"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}
        >
          {degree}
        </p>
        {specialty && (
          <p
            className="text-resume-primary mt-0.5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.63rem', letterSpacing: '0.04em' }}
          >
            {specialty}
          </p>
        )}
        {period && (
          <p
            className="text-resume-text-secondary/60 mt-0.5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.06em' }}
          >
            {period}
          </p>
        )}
      </div>
    </div>
  )
}
