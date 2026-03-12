import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { SidebarSection } from './SidebarSection'
import { ContactItem } from './ContactItem'
import { SkillCategory } from './SkillCategory'
import { TechBadge } from './TechBadge'

const PHOTO_ANIMATION_DURATION = 0.8

function SidebarPhoto({ photo, name, emoji }: { photo: string; name: string; emoji?: string }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleFlip = () => {
    if (isSpinning) return
    setIsSpinning(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  if (hasError) {
    return (
      <div className="flex justify-center mb-7">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-resume-primary to-resume-primary-light flex items-center justify-center ring-4 ring-resume-primary/20 shadow-lg">
          <span className="text-4xl">{emoji || '👩‍💻'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-7" style={{ perspective: '300px' }}>
      <motion.div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        onAnimationComplete={() => setIsSpinning(false)}
        animate={{ rotateY: isSpinning ? 360 : 0 }}
        transition={{ duration: PHOTO_ANIMATION_DURATION, ease: 'easeInOut' }}
        className="relative w-28 h-28 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        role="button"
        tabIndex={0}
        aria-label={`Photo of ${name} — click to flip`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-resume-primary/20 shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={photo}
            alt={`Profile photo of ${name}`}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-full ring-4 ring-resume-primary/20 shadow-lg bg-gradient-to-br from-resume-primary to-resume-primary-light flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-4xl">{emoji || '👩‍💻'}</span>
        </div>
      </motion.div>
    </div>
  )
}

export function Sidebar() {
  const { resolve } = useTranslation()
  const { personal, contact, skills, hobbies, labels } = resumeConfig

  return (
    <div className="md:w-[38%] bg-gradient-to-b from-resume-sidebar-from to-resume-sidebar-to p-8">
      {/* Photo */}
      {personal.photo && (
        <SidebarPhoto
          photo={assetUrl(personal.photo)}
          name={personal.name}
          emoji={personal.photoBackEmoji}
        />
      )}

      {/* Contact */}
      <SidebarSection title={resolve(labels.sections.contact)}>
        <div className="space-y-3">
          {contact.map((item) => (
            <ContactItem key={`${item.type}-${item.label}`} type={item.type} label={item.label} href={item.href} />
          ))}
        </div>
      </SidebarSection>

      {/* Skills */}
      <SidebarSection title={resolve(labels.sections.skills)}>
        <div className="space-y-4">
          {skills.map((category, i) => (
            <SkillCategory key={`${resolve(category.title)}-${i}`} title={resolve(category.title)}>
              {category.type === 'badges' && (
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => {
                    const techName = typeof item.name === 'string' ? item.name : Object.values(item.name)[0]
                    return <TechBadge key={techName} tech={techName} color={item.color} />
                  })}
                </div>
              )}
              {category.type === 'text' && (
                <p
                  className="text-resume-text-secondary"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', lineHeight: 1.6 }}
                >
                  {category.items
                    .map((item) => (typeof item.name === 'string' ? item.name : resolve(item.name)))
                    .join(', ')}
                </p>
              )}
              {category.type === 'languages' && (
                <div className="space-y-1.5">
                  {category.items.map((item, j) => {
                    const name = typeof item.name === 'string' ? item.name : resolve(item.name)
                    return (
                      <div key={`${name}-${j}`} className="flex items-baseline gap-2">
                        <span
                          className="text-resume-text"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500 }}
                        >
                          {name}
                        </span>
                        {item.level && (
                          <span
                            className="text-resume-primary"
                            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem' }}
                          >
                            {resolve(item.level)}
                          </span>
                        )}
                        {item.details && (
                          <span
                            className="text-resume-text-secondary/60"
                            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem' }}
                          >
                            {item.details}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </SkillCategory>
          ))}
        </div>
      </SidebarSection>

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && labels.sections.hobbies && (
        <SidebarSection title={resolve(labels.sections.hobbies)}>
          <div className="grid grid-cols-2 gap-2.5">
            {hobbies.map((hobby, i) => (
              <div key={`${resolve(hobby.title)}-${i}`}>
                <p
                  className="text-resume-text"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', fontWeight: 500 }}
                >
                  {resolve(hobby.title)}
                </p>
                {hobby.details?.map((detail, j) => (
                  <p
                    key={j}
                    className="text-resume-text-secondary"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', marginTop: '1px' }}
                  >
                    {resolve(detail)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </SidebarSection>
      )}
    </div>
  )
}
