import { getTechColor } from '@/data/tech-registry'

interface TechBadgeProps {
  tech: string
  color?: string
}

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.round(r + (255 - r) * amount)
  const lg = Math.round(g + (255 - g) * amount)
  const lb = Math.round(b + (255 - b) * amount)
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`
}

function ensureDarkModeReadable(hex: string): string {
  let color = hex
  let luminance = getLuminance(color)
  let step = 0
  while (luminance < 0.25 && step < 10) {
    color = lightenColor(color, 0.2)
    luminance = getLuminance(color)
    step++
  }
  return color
}

const LUMINANCE_THRESHOLD = 0.4

const badgeStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  fontWeight: 400,
  letterSpacing: '0.02em',
  padding: '2px 7px',
  borderRadius: '4px',
}

export function TechBadge({ tech, color: colorOverride }: TechBadgeProps) {
  const color = colorOverride ?? getTechColor(tech)
  const isLight = getLuminance(color) > LUMINANCE_THRESHOLD
  const darkModeColor = ensureDarkModeReadable(color)

  return (
    <>
      {/* Light mode */}
      <span
        className="dark:hidden"
        style={{
          ...badgeStyle,
          backgroundColor: `${color}18`,
          color: isLight ? '#374151' : color,
          border: `1px solid ${color}30`,
        }}
      >
        {tech}
      </span>
      {/* Dark mode */}
      <span
        className="hidden dark:inline"
        style={{
          ...badgeStyle,
          backgroundColor: `${darkModeColor}18`,
          color: darkModeColor,
          border: `1px solid ${darkModeColor}30`,
        }}
      >
        {tech}
      </span>
    </>
  )
}
