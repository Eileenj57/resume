import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@/components/icons'
import { useBreakpoints } from '@/lib/hooks/useBreakpoints'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'
import { TechBadge } from './TechBadge'
import { ExperienceDetailsContent } from './ExperienceDetails'

interface ExperienceItemProps {
  year: string
  company: string
  type?: string
  role: string
  description: string
  techs: string[]
  expanded: boolean
  onToggle: () => void
  details?: {
    context: string
    tasks?: string[]
    training?: string[]
    env: string
  }
  subItem?: { title: string; description: string }
  labels: {
    mainTasks: string
    moreTasks: string
    training?: string
    techEnv: string
    technologies: string
  }
  isHighlighted?: boolean
}

export function ExperienceItem({
  year,
  company,
  type,
  role,
  description,
  techs,
  expanded,
  onToggle,
  details,
  subItem,
  labels,
  isHighlighted = false,
}: ExperienceItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDesktop } = useBreakpoints()

  const handleClick = () => {
    if (!details) return
    if (isDesktop) {
      onToggle()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isHighlighted ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        aria-expanded={details ? expanded : undefined}
        className="w-full text-left group relative z-10 cursor-pointer"
      >
        <div
          className={cn(
            'flex items-start gap-4 py-3 rounded-xl px-3 -mx-3 transition-all duration-300',
            isHighlighted
              ? 'border border-resume-primary/25 bg-resume-primary/5 hover:border-resume-primary/50 hover:bg-resume-primary/8 hover:shadow-sm'
              : 'hover:bg-resume-primary/5'
          )}
        >
          {/* Year — mono pill */}
          <div className="w-20 flex-shrink-0 pt-0.5">
            <span
              className="text-resume-primary"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {year}
            </span>
          </div>

          <div className="flex-1 min-w-0 relative">
            {details && (
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0.5 right-0"
              >
                <ChevronDownIcon className="w-3.5 h-3.5 text-resume-primary/60" />
              </motion.div>
            )}

            {/* Company + type badge */}
            <div className="flex items-center gap-2 flex-wrap pr-6 md:pr-0">
              <h3
                className="text-resume-text"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 500, letterSpacing: '-0.01em' }}
              >
                {company}
              </h3>
              {type && (
                <span
                  className="px-1.5 py-0.5 rounded-md bg-resume-primary/10 text-resume-primary"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.04em' }}
                >
                  {type}
                </span>
              )}
            </div>

            {/* Role — mono small */}
            <p
              className="text-resume-primary/70 mt-0.5"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.63rem', letterSpacing: '0.03em' }}
            >
              {role}
            </p>

            {/* Description */}
            <p
              className="text-resume-text-secondary mt-1.5 line-clamp-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', lineHeight: 1.55 }}
            >
              {description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {techs.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            {subItem && (
              <div className="mt-3 pl-3 border-l-2 border-resume-primary/20">
                <p className="text-xs font-medium text-resume-text">{subItem.title}</p>
                <p className="text-xs text-resume-text-secondary">{subItem.description}</p>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Inline expanded details (desktop) */}
      {isDesktop && details && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="ml-24 mt-2 mb-4 p-4 bg-resume-bg rounded-xl border border-resume-primary/15">
                <ExperienceDetailsContent
                  context={details.context}
                  tasks={details.tasks}
                  training={details.training}
                  env={details.env}
                  labels={labels}
                  variant="inline"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Modal (mobile) */}
      {details && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          header={
            <div>
              <h2
                className="text-resume-text"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem' }}
              >
                {company}
              </h2>
              <p
                className="text-resume-primary mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.03em' }}
              >
                {role}
              </p>
              <p
                className="text-resume-text-secondary mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem' }}
              >
                {year}
              </p>
            </div>
          }
        >
          <ExperienceDetailsContent
            context={details.context}
            tasks={details.tasks}
            training={details.training}
            env={details.env}
            techs={techs}
            description={description}
            labels={labels}
            variant="modal"
          />
          {subItem && (
            <div className="pt-3 mt-3 border-t border-resume-primary/20">
              <p className="text-sm font-medium text-resume-text mb-1">{subItem.title}</p>
              <p className="text-sm text-resume-text-secondary">{subItem.description}</p>
            </div>
          )}
        </Modal>
      )}
    </motion.div>
  )
}
