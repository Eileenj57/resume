import { DownloadIcon } from '@/components/icons'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'

const monoStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.68rem',
  fontWeight: 500,
  letterSpacing: '0.04em',
}

export function PdfDownload() {
  const { language, resolve } = useTranslation()

  if (!resumeConfig.pdf) return null

  const { path, label } = resumeConfig.pdf

  const resolvedPath = typeof path === 'string'
    ? path
    : path[language] ?? null

  if (!resolvedPath) return null

  const downloadLabel = label
    ? resolve(label)
    : resumeConfig.labels.actions.downloadPdf
      ? resolve(resumeConfig.labels.actions.downloadPdf)
      : 'Download PDF'

  return (
    <a
      href={assetUrl(resolvedPath)}
      download={resolvedPath.split('/').pop() ?? 'resume.pdf'}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-resume-primary/25 text-resume-primary hover:bg-resume-primary/10 hover:border-resume-primary/50 transition-all"
      style={monoStyle}
    >
      <DownloadIcon className="w-3.5 h-3.5" />
      {downloadLabel}
    </a>
  )
}
