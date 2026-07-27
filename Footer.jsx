/* Footer.jsx — minimal mono footer */

/* Social icons live here so the footer and the contact page stay identical.
   Add a network once and it appears in both places. */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/hunter_g_accidently/", icon: "assets/icons/instagram-icon.webp" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/hunter-griffith/",  icon: "assets/icons/linkedin-icon.png" },
];

function SocialIcons({ size = 22, justify = "flex-end" }) {
  return (
    <div style={{ display: "flex", justifyContent: justify, alignItems: "center", gap: 10 }}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          style={{
            display: "inline-block", lineHeight: 0,
            padding: 6,                 /* bigger tap target than the glyph */
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            opacity: 0.65, transition: "opacity 280ms var(--ease-soft)",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.65}
        >
          <img src={s.icon} alt={s.label} style={{ height: size, width: size, display: "block" }} />
        </a>
      ))}
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--hg-smoke)",
      background: "var(--hg-black)",
      padding: "clamp(48px, 8vh, 96px) clamp(24px, 6vw, 96px) clamp(28px, 4vh, 48px)",
    }}>
      <div className="chrome-divider" style={{ marginBottom: 56 }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 32,
      }}>
        {/* Left: logo (larger) + copyright */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={() => onNavigate && onNavigate("WORK")}
            style={{ all: "unset", cursor: "pointer", lineHeight: 0, display: "inline-block" }}
            aria-label="Hunter Griffith — Home"
          >
            <img src="assets/hg-logo-chrome.png" alt="HG" style={{ height: 28 }} />
          </button>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--fg-subtle)",
          }}>
            © 2026 Hunter Griffith
          </div>
        </div>

        {/* Center: spacer */}
        <div />

        {/* Right: social icons */}
        <SocialIcons />
      </div>
    </footer>
  );
}

window.Footer = Footer;
window.SocialIcons = SocialIcons;
