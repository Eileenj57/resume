import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { PdfDownload } from './PdfDownload'

export function Resume() {
  const { resolve } = useTranslation()

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <PdfDownload />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle label={resolve(resumeConfig.labels.actions.switchTheme)} />
        </div>
      </div>

      {/* Resume card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-resume-bg-card rounded-2xl shadow-xl overflow-hidden border border-resume-primary/10"
      >
        <div className="flex flex-col-reverse md:flex-row">
          <Sidebar />
          <MainContent />
        </div>
      </motion.div>

      {/* Hint */}
      <p
        className="text-center text-resume-text-secondary mt-5"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.08em' }}
      >
        {resolve(resumeConfig.labels.actions.clickHint)}
      </p>
    </div>
  )
}
