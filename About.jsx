/* About.jsx — quiet bio page, mono editorial */
function About() {
  const bio = `I'm a filmmaker, photographer, and creative storyteller passionate about helping brands communicate ideas that matter. From concept development to final delivery, I collaborate with teams to shape compelling narratives and create content that is both visually engaging and strategically driven. My work has appeared across a range of platforms, including Forbes and billboard campaigns in SoHo, New York. Inspired by the intersection of art and technology, I seek out stories that spark curiosity, create connection, and leave a lasting impact.`;

  const imgRef = React.useRef(null);
  const gradRef = React.useRef(null);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const img = imgRef.current;
        const grad = gradRef.current;
        if (img) {
          const scrollY = window.scrollY;
          const containerH = img.parentElement.offsetHeight;
          const progress = Math.min(scrollY / containerH, 1);
          const scale = 1 - progress * 0.22;
          img.style.transform = `scale(${scale})`;
          if (grad) {
            const gradProgress = Math.min(Math.max(progress / 0.30, 0), 1);
            grad.style.opacity = gradProgress;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const TOOLS = [
    { file: "Premiere Pro.png",              label: "Premiere Pro" },
    { file: "Photoshop.png",                 label: "Photoshop" },
    { file: "Media Encoder.png",             label: "Media Encoder" },
    { file: "Lightroom.png",                 label: "Lightroom" },
    { file: "after effects.png",             label: "After Effects" },
    { file: "DaVinci Logo.png",              label: "DaVinci Resolve" },
    { file: "frame-io.png",                  label: "Frame.io" },
    { file: "Blender_logo_no_text.svg.png",  label: "Blender" },
  ];

  return (
    <div className="page-fade" style={{ background: "var(--hg-black)", minHeight: "100vh" }}>

      {/* Cover image hero */}
      <div style={{ marginTop: 80 }}>
        <div className="cover-hero" style={{ position: "relative", width: "100%", overflow: "hidden", aspectRatio: "2.35 / 1" }}>
          <img
            ref={imgRef}
            src="cover%20images/about-me-hero-image_EDITED.jpg"
            alt="Hunter Griffith at work"
            style={{
              display: "block", width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              filter: "brightness(0.85) contrast(1.04) saturate(0.9)",
              transformOrigin: "center center",
              willChange: "transform",
              transition: "transform 0.05s linear",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.55) 55%, rgba(10,10,11,0.92) 80%, #0A0A0B 100%)",
            opacity: 0, transition: "opacity 0.05s linear",
          }} ref={gradRef} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,11,0.85) 85%, #0A0A0B 100%)",
            pointerEvents: "none",
          }} />
          <div className="grain" style={{ opacity: 0.06, position: "absolute", inset: 0 }} />

          <div className="cover-heading" style={{
            position: "absolute", left: "clamp(24px, 6vw, 96px)", right: "clamp(24px, 6vw, 96px)",
            top: "clamp(24px, 28%, 196px)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontWeight: 500,
              fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--hg-fog)", marginBottom: 24,
            }}>About ⁄ Studio</div>
            <h1 style={{
              margin: 0,
              fontFamily: "var(--font-mono)", fontWeight: 200,
              fontSize: "clamp(38px, 6.4vw, 102px)",
              lineHeight: 0.95, letterSpacing: "-0.04em",
              textTransform: "uppercase", color: "var(--fg)", maxWidth: "14ch",
            }}>
              A studio of one,<br />working close.
            </h1>
          </div>
        </div>
      </div>

      {/* Body content */}
      <section style={{
        padding: "clamp(64px, 10vh, 112px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)",
      }}>
        <div className="chrome-divider" style={{ marginBottom: "clamp(48px, 8vh, 96px)" }} />

        {/* Two-column: bio left, sidebar right */}
        <div className="mob-stack" style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 7fr) minmax(0, 4fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}>
          {/* Bio */}
          <div>
            <div style={{
              fontFamily: "var(--font-mono)", fontWeight: 500,
              fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--fg-subtle)", marginBottom: 24,
            }}>Bio</div>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-mono)", fontWeight: 300,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.55, letterSpacing: "-0.005em",
              color: "var(--fg)", maxWidth: "62ch", textWrap: "pretty",
            }}>
              {bio}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="mob-aside" style={{
            display: "flex", flexDirection: "column", gap: 28,
            paddingLeft: "clamp(0px, 2vw, 32px)",
            borderLeft: "1px solid var(--hg-smoke)",
          }}>
            <FactBlock label="Work" lines={["Case Study Films", "Customer Spotlights", "Brand Identity", "Social Media Marketing", "Photography", "End-to-End Video Production"]} />
            <FactBlock label="Post-Production" lines={["Color Grading", "Video Editing", "Photo Editing", "Motion Design", "Graphic Design", "CGI Renderings", "Social Media Formats"]} />
            <div>
              <div style={{
                fontFamily: "var(--font-mono)", fontWeight: 500,
                fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
                color: "var(--fg-subtle)", marginBottom: 10,
              }}>Location Based</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontWeight: 400,
                fontSize: 14, color: "var(--fg)",
              }}>Pacifica, CA</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontWeight: 400,
                fontSize: 11, color: "var(--fg-faint)",
                marginTop: 5, letterSpacing: "0.04em",
              }}>*available to travel</div>
            </div>
          </aside>
        </div>

        <div className="chrome-divider" style={{ margin: "clamp(64px, 10vh, 128px) 0 48px" }} />

        {/* Software & Tools */}
        <div className="mob-stack" style={{
          display: "grid",
          gridTemplateColumns: "minmax(160px, 220px) 1fr",
          gap: "clamp(24px, 4vw, 64px)",
          alignItems: "start",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--fg-subtle)", paddingTop: 6,
          }}>Software &amp; Tools</div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "clamp(16px, 2.5vw, 32px)",
          }}>
            {TOOLS.map((tool) => (
              <ToolIcon key={tool.label} file={tool.file} label={tool.label} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

function ToolIcon({ file, label }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 10, cursor: "default",
      }}
    >
      {/* Icon container */}
      <div style={{
        position: "relative",
        width: 64, height: 64,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 12,
        overflow: "hidden",
        transition: "transform 320ms var(--ease-cinema)",
        transform: hover ? "scale(1.12)" : "scale(1)",
      }}>
        <img
          src={`assets/icons/${file}`}
          alt={label}
          style={{ width: 56, height: 56, objectFit: "contain", display: "block" }}
        />
        {/* Subtle overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(232,230,225,0.08)",
          opacity: hover ? 1 : 0,
          transition: "opacity 320ms var(--ease-cinema)",
          borderRadius: 12,
        }} />
      </div>

      {/* Label — drops down on hover */}
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        color: hover ? "var(--fg)" : "var(--fg-subtle)",
        textAlign: "center",
        transform: hover ? "translateY(3px)" : "translateY(0)",
        transition: "color 280ms var(--ease-cinema), transform 320ms var(--ease-cinema)",
        lineHeight: 1.4,
      }}>
        {label}
      </div>
    </div>
  );
}

function FactBlock({ label, lines }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--fg-subtle)", marginBottom: 10,
      }}>{label}</div>
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 400,
        fontSize: 14, lineHeight: 1.7, color: "var(--fg)",
      }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

window.About = About;
