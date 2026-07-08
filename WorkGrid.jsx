/* WorkGrid.jsx — 2-column grid of YouTube embeds. Title always visible; blurb on hover. */
function ReelTile({ project, index }) {
  const [hover, setHover] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const tileRef = React.useRef(null);

  // Mobile scroll-reveal: blurb slides open while the tile is in view,
  // retracts once you scroll past it (toggles both directions)
  React.useEffect(() => {
    const el = tileRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [thumbSrc, setThumbSrc] = React.useState(
    project.customThumb || `https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`
  );

  const onThumbLoad = (e) => {
    // YouTube returns a 120×90 placeholder when maxresdefault doesn't exist
    if (!project.customThumb && e.target.naturalWidth <= 120) {
      setThumbSrc(`https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`);
    }
  };

  const embedSrc = `https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <article
      ref={tileRef}
      className={`tile${inView ? " tile-inview" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="tile-thumb"
        onClick={() => setLoaded(true)}
        style={{ cursor: loaded ? "default" : "pointer" }}
      >
        <div className="tile-thumb-inner" style={{ position: "absolute", inset: 0 }}>
          {loaded ? (
            <iframe
              src={`${embedSrc}&autoplay=1`}
              title={project.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={thumbSrc}
                alt={project.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "brightness(0.92) contrast(1.02) saturate(0.95)",
                }}
                onLoad={onThumbLoad}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(10,10,11,0) 40%, rgba(10,10,11,0.55) 100%)",
              }} />
              <div className="grain" style={{ opacity: 0.08 }} />
              {/* Center play affordance */}
              <div style={{
                position: "absolute",
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                width: 64, height: 64, borderRadius: "50%",
                border: "1px solid rgba(232, 230, 225, 0.85)",
                display: "grid", placeItems: "center",
                background: hover ? "rgba(232,230,225,0.10)" : "rgba(10,10,11,0.25)",
                backdropFilter: "blur(2px)",
                transition: "background 320ms var(--ease-soft), transform 320ms var(--ease-cinema)",
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderLeft: "12px solid var(--hg-bone)",
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  marginLeft: 4,
                }} />
              </div>
            </>
          )}
        </div>
        {/* Bottom-left runtime chip */}
        <div style={{
          position: "absolute", left: 14, bottom: 12,
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--hg-bone)",
          background: "rgba(10,10,11,0.55)",
          padding: "4px 8px",
          backdropFilter: "blur(4px)",
          zIndex: 2,
          opacity: loaded ? 0 : 1,
          transition: "opacity 320ms var(--ease-soft)",
        }}>
          {project.runtime}
        </div>
        {/* Index marker top-left, like a slate */}
        <div style={{
          position: "absolute", left: 14, top: 12,
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: 11, letterSpacing: "0.22em",
          color: "var(--hg-bone)",
          opacity: loaded ? 0 : 0.7,
          transition: "opacity 320ms var(--ease-soft)",
          zIndex: 2,
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Caption block — title always visible, blurb reveals on hover */}
      <div style={{ paddingTop: 18, display: "flex", flexDirection: "column" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          gap: 16,
        }}>
          <h3 style={{
            margin: 0,
            fontFamily: "var(--font-mono)", fontWeight: 400,
            fontSize: "clamp(20px, 1.8vw, 26px)",
            lineHeight: 1.15, letterSpacing: "-0.01em",
            color: "var(--fg)",
          }}>
            {project.title}
          </h3>
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: "var(--font-mono)", fontWeight: 400,
          fontSize: 12, letterSpacing: "0.04em",
          color: "var(--fg-faint)",
          textTransform: "uppercase",
        }}>
          {project.role}
        </div>
        <div className="tile-blurb">
          <p style={{
            margin: 0,
            fontFamily: "var(--font-mono)", fontWeight: 400,
            fontSize: 14, lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "62ch",
            textWrap: "pretty",
          }}>
            {project.blurb}
          </p>
        </div>
      </div>
    </article>
  );
}

function WorkGrid() {
  return (
    <section style={{
      padding: "clamp(72px, 12vh, 144px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)",
      background: "var(--hg-black)",
    }} id="work">
      <header className="mob-stack" style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        gap: 32,
        marginBottom: "clamp(48px, 6vh, 80px)",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--fg-subtle)", marginBottom: 24,
          }}>Selected Work</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-mono)", fontWeight: 200,
            fontSize: "clamp(40px, 6.4vw, 96px)",
            lineHeight: 0.95, letterSpacing: "-0.035em",
            textTransform: "uppercase",
            color: "var(--fg)",
          }}>
            Previous<br />Projects
          </h2>
        </div>
        <div />
      </header>

      <div className="chrome-divider" style={{ marginBottom: "clamp(48px, 6vh, 80px)" }} />

      <div className="mob-stack" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "clamp(32px, 4vw, 64px) clamp(24px, 3vw, 48px)",
      }}>
        {window.PROJECTS.map((p, i) => (
          <ReelTile key={p.slug} project={p} index={i} />
        ))}
      </div>

    </section>
  );
}

window.WorkGrid = WorkGrid;
window.ReelTile = ReelTile;
