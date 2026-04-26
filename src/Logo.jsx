/* ── CAIG LOGO MARK ─────────────────────────────────────────────
   Geometric cornerstone mark — a pentagon (square with beveled
   top-right corner) referencing both a cornerstone/foundation stone
   and AI precision. Works at any size, amber on dark or light.
──────────────────────────────────────────────────────────────── */

export function LogoMark({ size = 24 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pentagon (cornerstone body) */}
      <path d="M3 3 L15 3 L21 9 L21 21 L3 21 Z" fill="#F59E0B" />
      {/* Beveled corner triangle — depth effect */}
      <path d="M15 3 L21 9 L15 9 Z" fill="rgba(0,0,0,0.22)" />
      {/* Horizontal bisector */}
      <line x1="3" y1="12" x2="21" y2="12" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      {/* Vertical bisector */}
      <line x1="12" y1="3" x2="12" y2="21" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
    </svg>
  )
}

export function Logo({
  size = 24,
  showWordmark = true,
  sub = 'AI Engineering Studio',
  className = '',
}) {
  return (
    <div className={`caig-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={size} />
      {showWordmark && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: size * 0.625,
              letterSpacing: '-0.03em',
              color: 'var(--t0)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Cornerstone AI Group
          </span>
          {sub && (
            <span
              style={{
                fontSize: size * 0.42,
                color: 'var(--t3)',
                letterSpacing: '0.01em',
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              {sub}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
