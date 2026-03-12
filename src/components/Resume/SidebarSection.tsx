import { useId } from 'react'
import { cn } from '@/lib/utils'

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  const titleId = useId()

  return (
    <section className={cn('mb-6', className)} aria-labelledby={titleId}>
      <h3
        id={titleId}
        className="text-resume-text mb-3 pb-1 border-b border-resume-primary/20"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  )
}
