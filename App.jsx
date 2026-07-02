/* App.jsx — top-level page router and Tweaks wiring */
function App() {
  const [page, setPage] = React.useState("WORK");
  const [scrolled, setScrolled] = React.useState(false);

  // Tweak defaults — wrapped in editmode markers so the host can persist via __edit_mode_set_keys
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "headlineWeight": 700,
    "tagline": "Creative Production & Visual Media",
    "showWatermark": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(prev => {
          const next = window.scrollY > 40;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (label) => {
    setPage(label);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div data-screen-label={page === "WORK" ? "01 Home" : page === "ABOUT" ? "02 About" : page === "CONTACT" ? "03 Contact" : "04 Photography"}>
      <Nav active={page} scrolled={scrolled || page !== "WORK"} onNavigate={navigate} />

      {page === "WORK" && (
        <main className="page-fade">
          <Hero tagline={tweaks.tagline} headlineWeight={tweaks.headlineWeight} />
          <WorkGrid />
        </main>
      )}
      {page === "ABOUT" && <main><About /></main>}
      {page === "CONTACT" && <main><Contact /></main>}
      {page === "PHOTOGRAPHY" && <main><Photography /></main>}

      {/* Soft chrome HG watermark in the corner — design-system flourish */}

      <Footer onNavigate={navigate} />

      {/* Tweaks panel — appears when toolbar tweaks toggle is on */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Hero">
          <window.TweakText
            label="Tagline"
            value={tweaks.tagline}
            onChange={(v) => setTweak("tagline", v)}
          />
          <window.TweakRadio
            label="Headline Weight"
            value={tweaks.headlineWeight}
            options={[
              { label: "Thin",   value: 100 },
              { label: "Light",  value: 300 },
              { label: "Reg",    value: 400 },
              { label: "Bold",   value: 700 },
            ]}
            onChange={(v) => setTweak("headlineWeight", v)}
          />
        </window.TweakSection>
        <window.TweakSection title="Brand">
          <window.TweakToggle
            label="Show HG watermark"
            value={tweaks.showWatermark}
            onChange={(v) => setTweak("showWatermark", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
