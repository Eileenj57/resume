import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

const PORTFOLIO_URL = 'https://eileenj57.github.io/portfolio/'
const CV_URL = 'https://eileenj57.github.io/resume/'

const [firstName, ...rest] = resumeConfig.personal.name.split(' ')
const lastName = rest.join(' ')

interface NavbarProps {
  /** Which page is currently active */
  activePage: 'cv' | 'portfolio'
}

export function Navbar({ activePage }: NavbarProps) {
  const { resolve, language } = useTranslation()

  const portfolioHref = `${PORTFOLIO_URL}?lang=${language}`
  const cvHref = `${CV_URL}?lang=${language}`

  const navLinks = [
    {
      key: 'portfolio',
      labelFr: 'Projets',
      labelEn: 'Projects',
      href: portfolioHref,
    },
    {
      key: 'cv',
      labelFr: 'CV',
      labelEn: 'CV',
      href: cvHref,
    },
  ]

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-resume-primary/10 bg-resume-bg/90"
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <a
          href={cvHref}
          className="text-resume-text hover:text-resume-primary transition-colors shrink-0"
          style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1rem', letterSpacing: '-0.01em', fontWeight: 500 }}
        >
          {firstName}{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--resume-primary)' }}>{lastName}</em>
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-5">
          {navLinks.map(({ key, labelFr, labelEn, href }) => {
            const isActive = key === activePage
            const label = language === 'fr' ? labelFr : labelEn
            return (
              <a
                key={key}
                href={href}
                className={`relative transition-colors ${isActive ? 'text-resume-primary' : 'text-resume-text-secondary hover:text-resume-primary'}`}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase' }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-resume-primary rounded-full"
                    style={{ marginBottom: '-1px' }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <ThemeToggle label={resolve(resumeConfig.labels.actions.switchTheme)} />
          {activePage === 'portfolio' && (
            <a
              href={cvHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-resume-primary text-white hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.04em' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              {language === 'fr' ? 'Voir le CV' : 'View CV'}
            </a>
          )}
          {activePage === 'cv' && (
            <a
              href={portfolioHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-resume-primary text-white hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.04em' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              {language === 'fr' ? 'Projets' : 'Projects'}
            </a>
          )}
        </div>

      </div>
    </header>
  )
}
