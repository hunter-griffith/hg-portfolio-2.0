/* Hero.jsx — home hero section with cover image, scroll fade, and title reveal */
function Hero({ tagline, headlineWeight = 700 }) {
  const sectionRef       = React.useRef(null);
  const scrollOverlayRef = React.useRef(null);

  /* ── Scroll fade-out ───────────────────────────── */
  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = sectionRef.current ? sectionRef.current.offsetHeight : window.innerHeight;
        const p = Math.min(window.scrollY / h, 1);
        if (scrollOverlayRef.current) scrollOverlayRef.current.style.opacity = p.toFixed(3);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 560, overflow: "hidden", background: "#000",
    }}>

      {/* Cover image */}
      <img src="cover%20photos/_CAR0321_bw_compressed.jpg" alt="" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover",
        opacity: 0.60, pointerEvents: "none",
      }} />

      {/* Top gradient — pure black fades out over top half */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, #000 0%, rgba(0,0,0,.72) 18%, rgba(0,0,0,.30) 38%, rgba(0,0,0,0) 54%)",
      }} />

      {/* Scroll fade overlay */}
      <div ref={scrollOverlayRef} style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "#000", opacity: 0, willChange: "opacity",
      }} />

      {/* Grain */}
      <div className="grain" style={{
        opacity: 0.06, position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
      }} />

      {/* Centre title */}
      <div style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center",
        zIndex: 4, padding: "0 clamp(24px, 6vw, 96px)", textAlign: "center",
      }}>
        <div>
          <h1 className="hero-reveal" style={{
            margin: 0, fontFamily: "var(--font-mono)", fontWeight: headlineWeight,
            fontSize: "clamp(32px, 7vw, 108px)", lineHeight: 1,
            letterSpacing: "-0.04em", textTransform: "uppercase", color: "var(--hg-bone)",
          }}>Hunter Griffith</h1>
          <div className="hero-reveal-late" style={{
            marginTop: 22, fontFamily: "var(--font-mono)", fontWeight: 400,
            fontSize: "clamp(10px, 1.1vw, 15px)", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "var(--hg-fog)",
          }}>
            {tagline || "Creative Production & Visual Media"}
          </div>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="hero-reveal-late hero-meta" style={{
        position: "absolute", left: "clamp(24px, 6vw, 96px)",
        right: "clamp(24px, 6vw, 96px)", bottom: 36, zIndex: 4,
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", gap: 16,
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "0.18em",
          textTransform: "uppercase", color: "var(--hg-fog)",
        }}>Director · Cinematographer · Photographer</div>
        <div className="hero-scroll-hint" style={{
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "0.22em",
          textTransform: "uppercase", color: "var(--hg-fog)", flexShrink: 0,
        }}>Scroll ↓</div>
      </div>
    </section>
  );
}

window.Hero = Hero;
