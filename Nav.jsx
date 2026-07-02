/* Nav.jsx */
function Nav({ active, onNavigate, scrolled }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 680);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = (label) => { onNavigate(label); setMenuOpen(false); };

  const linkStyle = (label) => {
    const isActive = label === active;
    return {
      all: "unset", cursor: "pointer",
      fontFamily: "var(--font-mono)", fontWeight: 500,
      fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
      color: isActive ? "var(--fg)" : "var(--fg-subtle)",
      paddingBottom: 3,
      borderBottom: isActive ? "1px solid var(--hg-chrome-200)" : "1px solid transparent",
      transition: "color 180ms var(--ease-soft), border-color 320ms var(--ease-cinema)",
    };
  };

  const NavLink = ({ label }) => (
    <button
      onClick={() => navigate(label)}
      style={linkStyle(label)}
      onMouseEnter={(e) => { if (label !== active) e.currentTarget.style.color = "var(--fg)"; }}
      onMouseLeave={(e) => { if (label !== active) e.currentTarget.style.color = "var(--fg-subtle)"; }}
    >{label}</button>
  );

  const navBase = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    background: scrolled || menuOpen ? "rgba(10,10,11,0.92)" : "transparent",
    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
    borderBottom: scrolled || menuOpen ? "1px solid rgba(42,42,47,0.7)" : "1px solid transparent",
    transition: "background 320ms var(--ease-soft), border-color 320ms var(--ease-soft)",
    willChange: "background",
    transform: "translateZ(0)",
  };

  if (isMobile) {
    return (
      <>
        <nav style={{ ...navBase, padding: "16px 24px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          {/* Left spacer — mirrors hamburger width so logo stays centred */}
          <div style={{ width: 38 }} />
          <button onClick={() => navigate("WORK")} style={{ all: "unset", cursor: "pointer", lineHeight: 0, justifySelf: "center" }} aria-label="Home">
            <img src="assets/hg-logo-chrome.png" alt="HG" style={{ height: 38, display: "block" }} />
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8, justifySelf: "end" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", borderRadius: 1,
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              transition: "transform 280ms var(--ease-cinema)" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", borderRadius: 1,
              opacity: menuOpen ? 0 : 1, transition: "opacity 200ms" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--fg)", borderRadius: 1,
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition: "transform 280ms var(--ease-cinema)" }} />
          </button>
        </nav>

        {/* Full-screen mobile menu */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 49,
          background: "rgba(10,10,11,0.97)",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "0 40px",
          gap: 8,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 280ms var(--ease-cinema)",
        }}>
          {["WORK", "PHOTOGRAPHY", "ABOUT", "CONTACT"].map((label, i) => (
            <button key={label} onClick={() => navigate(label)} style={{
              all: "unset", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontWeight: 200,
              fontSize: "clamp(44px, 13vw, 72px)",
              letterSpacing: "-0.03em", textTransform: "uppercase",
              color: active === label ? "var(--fg)" : "var(--fg-subtle)",
              lineHeight: 1.15,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition: `color 180ms, transform 320ms var(--ease-cinema) ${i * 60}ms, opacity 320ms ${i * 60}ms`,
              opacity: menuOpen ? 1 : 0,
            }}>{label}</button>
          ))}
          <div style={{
            marginTop: 48,
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--fg-faint)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 320ms 200ms",
          }}>Hunter Griffith — Visual Media</div>
        </div>
      </>
    );
  }

  return (
    <nav style={{
      ...navBase,
      padding: "20px clamp(24px, 6vw, 96px)",
      display: "grid", gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center", gap: 32,
    }}>
      <div />
      <button onClick={() => navigate("WORK")} style={{ all: "unset", cursor: "pointer", display: "block", lineHeight: 0 }} aria-label="Hunter Griffith — Home">
        <img src="assets/hg-logo-chrome.png" alt="HG" style={{ height: scrolled ? 44 : 56, display: "block", transition: "height 320ms var(--ease-cinema)" }} />
      </button>
      <div style={{ display: "flex", gap: 40, justifySelf: "end" }}>
        <NavLink label="WORK" />
        <NavLink label="PHOTOGRAPHY" />
        <NavLink label="ABOUT" />
        <NavLink label="CONTACT" />
      </div>
    </nav>
  );
}

window.Nav = Nav;
