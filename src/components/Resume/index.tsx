import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { PdfDownload } from './PdfDownload'
import { Navbar } from './Navbar'

export function Resume() {
  const { resolve } = useTranslation()

  return (
    <div className="min-h-screen bg-resume-bg">
      {/* Sticky navbar — matches portfolio header */}
      <Navbar activePage="cv" />

      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* PDF download (kept above card) */}
        <div className="flex justify-start mb-5">
          <PdfDownload />
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
    </div>
  )
}
