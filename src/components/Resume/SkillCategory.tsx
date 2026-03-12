interface SkillCategoryProps {
  title: string
  children: React.ReactNode
}

export function SkillCategory({ title, children }: SkillCategoryProps) {
  return (
    <div>
      <p
        className="text-resume-text-secondary mb-1.5"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0.75,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}
