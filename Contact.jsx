/* Contact.jsx — sends to huntergriffithmedia@gmail.com via Formspree */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjlknyb";

function Contact() {
  const [form, setForm] = React.useState({
    name: "", email: "", project: "Brand Film", budget: "", timeline: "", message: "",
  });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const [errorDetail, setErrorDetail] = React.useState("");

  /* Synchronous guard — React state updates are async, so a ref is what
     actually prevents a double-send when both the click handler and the
     native form submit fire in the same tick. */
  const busyRef = React.useRef(false);
  const formRef = React.useRef(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Not a valid email";
    if (!form.message.trim()) errs.message = "Tell me about the project";
    return errs;
  };

  const onSubmit = (e) => {
    if (e) e.preventDefault();
    if (busyRef.current) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Scroll the first invalid field into view — on mobile the errors can
      // sit above the fold and it just looks like nothing happened.
      const el = formRef.current && formRef.current.querySelector(".hg-input");
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    busyRef.current = true;
    setStatus("sending");

    /* FormData (multipart) rather than JSON: a JSON body forces a CORS
       preflight OPTIONS request, which is what fails silently on some
       mobile browsers / carrier proxies / content blockers. */
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("project", form.project);
    fd.append("budget", form.budget);
    fd.append("timeline", form.timeline);
    fd.append("message", form.message);
    fd.append("_replyto", form.email);
    fd.append("_subject", `New inquiry — ${form.name} (${form.project})`);

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
      mode: "cors",
    })
      .then((res) =>
        res.json().catch(() => ({})).then((data) => {
          if (res.ok) {
            setStatus("sent");
          } else {
            const msg =
              (data.errors && data.errors.map((x) => x.message).join(", ")) ||
              data.error ||
              `Server responded ${res.status}`;
            setErrorDetail(msg);
            setStatus("error");
          }
        })
      )
      .catch((err) => {
        setErrorDetail(err && err.message ? err.message : "Network request failed");
        setStatus("error");
      })
      .finally(() => { busyRef.current = false; });
  };

  const imgRef = React.useRef(null);
  const gradRef = React.useRef(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 680px)");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const img = imgRef.current;
        const grad = gradRef.current;
        if (img) {
          // Mobile: no scroll-shrink — scaling exposed a sliver of background
          // at the bottom edge of the cover. Keep the photo locked to frame.
          if (mq.matches) {
            img.style.transform = "none";
            if (grad) grad.style.opacity = 0;
          } else {
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
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const PROJECT_TYPES = ["Brand Film", "Documentary", "Music Video", "Commercial", "Editorial / Stills", "Other"];

  if (status === "error") {
    return (
      <section className="page-fade" style={{
        padding: "calc(20px + 80px + 56px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)",
        minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center",
      }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--status-error)", marginBottom: 28,
          }}>Something went wrong</div>
          <p style={{
            fontFamily: "var(--font-mono)", fontWeight: 300, fontSize: 18,
            lineHeight: 1.6, color: "var(--fg-muted)",
          }}>
            The message couldn't be sent. Email directly at{" "}
            <a href="mailto:huntergriffithmedia@gmail.com" style={{ color: "var(--fg)" }}>
              huntergriffithmedia@gmail.com
            </a>
          </p>
          {errorDetail && (
            <p style={{
              fontFamily: "var(--font-mono)", fontWeight: 300, fontSize: 12,
              lineHeight: 1.6, color: "var(--fg-faint)", marginTop: 16,
            }}>{errorDetail}</p>
          )}
          <button onClick={() => { setErrorDetail(""); setStatus("idle"); }} style={{
            appearance: "none", WebkitAppearance: "none",
            background: "transparent", border: 0,
            touchAction: "manipulation", minHeight: 44,
            cursor: "pointer", marginTop: 40,
            fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--fg)", paddingBottom: 4, borderBottom: "1px solid var(--hg-chrome-200)",
          }}>← Try again</button>
        </div>
      </section>
    );
  }

  if (status === "sent") {
    return (
      <section className="page-fade" style={{
        padding: "calc(20px + 80px + 56px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)",
        minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center",
      }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--status-positive)", marginBottom: 28,
          }}>
            <span style={{
              display: "inline-block", width: 6, height: 6, borderRadius: "50%",
              background: "var(--status-positive)", marginRight: 10, verticalAlign: "middle",
            }} />
            Message received
          </div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-mono)", fontWeight: 200,
            fontSize: "clamp(40px, 6vw, 88px)",
            lineHeight: 0.95, letterSpacing: "-0.035em",
            textTransform: "uppercase", color: "var(--fg)",
          }}>
            Thanks, {form.name.split(" ")[0] || "friend"}.
          </h2>
          <p style={{
            margin: "32px auto 0",
            fontFamily: "var(--font-mono)", fontWeight: 300,
            fontSize: 18, lineHeight: 1.6, color: "var(--fg-muted)", maxWidth: "52ch",
          }}>
            I'll get back to you within two business days. Most projects start with a thirty-minute call to talk through scope, schedule, and references.
          </p>
          <button
            onClick={() => { setStatus("idle"); setForm({ name: "", email: "", project: "Brand Film", budget: "", timeline: "", message: "" }); }}
            style={{
              appearance: "none", WebkitAppearance: "none",
              background: "transparent", border: 0,
              touchAction: "manipulation", minHeight: 44,
              cursor: "pointer", marginTop: 48,
              fontFamily: "var(--font-mono)", fontWeight: 500,
              fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--fg)", paddingBottom: 4, borderBottom: "1px solid var(--hg-chrome-200)",
            }}
          >← Send another</button>
        </div>
      </section>
    );
  }

  return (
    <div className="page-fade" style={{ background: "var(--hg-black)", minHeight: "100vh" }}>

      {/* Cover image hero */}
      <div style={{ marginTop: 80 }}>
        <div className="cover-hero" style={{ position: "relative", width: "100%", overflow: "hidden", aspectRatio: "2.35 / 1" }}>
          <img
            ref={imgRef}
            src="cover%20images/iphone-contact-cover-image.png"
            alt="Contact"
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
            }}>Contact ⁄ Inquiry</div>
            <h1 style={{
              margin: 0,
              fontFamily: "var(--font-mono)", fontWeight: 200,
              fontSize: "clamp(38px, 6.4vw, 102px)",
              lineHeight: 0.95, letterSpacing: "-0.04em",
              textTransform: "uppercase", color: "var(--fg)", maxWidth: "14ch",
            }}>
              Let's Connect
            </h1>
          </div>
        </div>
      </div>

      {/* Form section */}
      <section style={{
        padding: "clamp(64px, 10vh, 112px) clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)",
      }}>
      <div className="chrome-divider" style={{ marginBottom: "clamp(48px, 8vh, 96px)" }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 7fr) minmax(0, 4fr)",
        gap: "clamp(40px, 6vw, 96px)",
        alignItems: "start",
      }} className="mob-stack">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          action={FORMSPREE_ENDPOINT}
          method="POST"
          acceptCharset="UTF-8"
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: 36 }}
        >
          <Field label="Name" error={errors.name}>
            <input className="hg-input" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={set("name")} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input className="hg-input" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" placeholder="you@studio.com" value={form.email} onChange={set("email")} />
          </Field>

          <Field label="Project Type">
            <input type="hidden" name="project" value={form.project} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
              {PROJECT_TYPES.map((t) => {
                const active = form.project === t;
                return (
                  <button
                    type="button" key={t}
                    onClick={() => setForm((f) => ({ ...f, project: t }))}
                    style={{
                      all: "unset", cursor: "pointer",
                      padding: "8px 14px",
                      fontFamily: "var(--font-mono)", fontWeight: 500,
                      fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                      color: active ? "var(--hg-black)" : "var(--fg-muted)",
                      background: active ? "var(--hg-bone)" : "transparent",
                      border: "1px solid",
                      borderColor: active ? "var(--hg-bone)" : "var(--hg-smoke)",
                      borderRadius: 999,
                      transition: "all 320ms var(--ease-cinema)",
                    }}
                  >{t}</button>
                );
              })}
            </div>
          </Field>

          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
            <Field label="Budget Range (optional)">
              <input className="hg-input" name="budget" placeholder="$500 – $25,000" value={form.budget} onChange={set("budget")} />
            </Field>
            <Field label="Timeline (optional)">
              <input className="hg-input" name="timeline" placeholder="Shoot mid-Q3" value={form.timeline} onChange={set("timeline")} />
            </Field>
          </div>

          <Field label="Project Brief" error={errors.message}>
            <textarea
              className="hg-input" name="message" rows={6}
              placeholder="A few sentences about the project, audience, and deliverables. References welcome."
              value={form.message} onChange={set("message")}
              style={{ resize: "vertical", minHeight: 140, paddingTop: 14 }}
            />
          </Field>

          <div className="submit-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, marginTop: 8 }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontWeight: 400,
              fontSize: 12, color: "var(--fg-faint)",
            }}>
              Response time usually within 2 business days.
            </div>
            {/* NOTE: this button used `all: unset`, which strips the native
                button appearance and drops it to `display: inline`. On iOS
                Safari that combination can leave the control with a broken
                hit area so taps never reach the form. Explicit resets keep
                the look while preserving real button behaviour. */}
            <button
              type="submit" disabled={status === "sending"}
              onClick={onSubmit}
              style={{
                appearance: "none", WebkitAppearance: "none",
                display: "inline-block", margin: 0,
                cursor: status === "sending" ? "default" : "pointer",
                padding: "16px 28px",
                minHeight: 48,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                fontFamily: "var(--font-mono)", fontWeight: 500,
                fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
                lineHeight: 1.2, textAlign: "center", whiteSpace: "nowrap",
                borderRadius: 0,
                color: "var(--hg-black)", background: "var(--hg-bone)",
                border: "1px solid var(--hg-bone)",
                opacity: status === "sending" ? 0.6 : 1,
                transition: "all 320ms var(--ease-cinema)",
                boxShadow: "var(--shadow-chrome)",
              }}
              onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "var(--hg-pure)"; }}
              onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.background = "var(--hg-bone)"; }}
            >
              {status === "sending" ? "Sending…" : "Send Inquiry →"}
            </button>
          </div>
        </form>

        <aside className="mob-aside" style={{
          display: "flex", flexDirection: "column", gap: 28,
          paddingLeft: "clamp(0px, 2vw, 32px)",
          borderLeft: "1px solid var(--hg-smoke)",
        }}>
          <ContactBlock label="Direct" lines={[
            { v: "huntergriffithmedia@gmail.com", href: "mailto:huntergriffithmedia@gmail.com" },
          ]} />
          <ContactBlock label="LinkedIn" lines={[
            { v: "hunter-griffith", href: "https://www.linkedin.com/in/hunter-griffith/" },
          ]} />
          <ContactBlock label="Available to Travel" lines={[
            { v: "Pacifica, CA — worldwide" },
          ]} />
        </aside>
      </div>
      </section>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--fg-subtle)",
      }}>
        <span>{label}</span>
        {error && <span style={{ color: "var(--status-error)", letterSpacing: "0.18em" }}>{error}</span>}
      </div>
      {children}
    </label>
  );
}

function ContactBlock({ label, lines }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--fg-subtle)", marginBottom: 10,
      }}>{label}</div>
      <div style={{
        display: "flex", flexDirection: "column", gap: 6,
        fontFamily: "var(--font-mono)", fontWeight: 400,
        fontSize: 14, color: "var(--fg)",
      }}>
        {lines.map((l, i) => l.href ? (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="link-sweep" style={{ color: "var(--fg)", textDecoration: "none" }}>{l.v}</a>
        ) : (
          <span key={i} style={{ color: "var(--fg-muted)" }}>{l.v}</span>
        ))}
      </div>
    </div>
  );
}

window.Contact = Contact;
