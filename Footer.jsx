/* Footer.jsx — minimal mono footer */
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

        {/* Right: Instagram only */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", opacity: 0.65, transition: "opacity 280ms var(--ease-soft)" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.65}
            aria-label="Instagram"
          >
            <img src="assets/icons/instagram-icon.webp" alt="Instagram" style={{ height: 22, width: 22, display: "block" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
