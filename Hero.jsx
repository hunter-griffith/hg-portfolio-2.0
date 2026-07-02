/* Hero.jsx — WebGL fisheye lens: localized barrel distortion + chromatic aberration + blur */
function Hero({ tagline, headlineWeight = 700 }) {
  const sectionRef       = React.useRef(null);
  const canvasRef        = React.useRef(null);
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

  /* ── WebGL fisheye ─────────────────────────────── */
  React.useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false })
            || canvas.getContext("experimental-webgl");
    if (!gl) return;

    /* ---------- shaders ---------- */
    const VS = `
      attribute vec2 a_pos;
      varying   vec2 v_uv;
      void main(){
        v_uv        = vec2(a_pos.x*.5+.5, 1.-(a_pos.y*.5+.5));
        gl_Position = vec4(a_pos, 0., 1.);
      }`;

    const FS = `
      precision mediump float;
      uniform sampler2D u_tex;
      uniform vec2      u_res;        /* canvas w,h   */
      uniform float     u_imgAspect;  /* img w/h      */
      uniform vec2      u_mouse;      /* 0..1 NDC     */
      uniform float     u_intensity;  /* 0..1         */
      varying vec2      v_uv;

      /* object-fit: cover */
      vec4 cover(vec2 uv){
        float ca = u_res.x / u_res.y;
        vec2  c  = uv;
        if(ca > u_imgAspect){
          float s = ca / u_imgAspect;
          c.y = (uv.y - .5) / s + .5;
        } else {
          float s = u_imgAspect / ca;
          c.x = (uv.x - .5) / s + .5;
        }
        return texture2D(u_tex, clamp(c, 0., 1.));
      }

      void main(){
        vec2  uv       = v_uv;
        float ca       = u_res.x / u_res.y;

        /* aspect-correct distance to mouse */
        vec2  toM      = (uv - u_mouse) * vec2(ca, 1.);
        float dist     = length(toM);
        float lensR    = 0.26;           /* lens radius in aspect-space */

        if(dist < lensR && u_intensity > .001){
          float t       = dist / lensR;                  /* 0=center 1=edge */
          float blend   = smoothstep(1., .72, t);        /* soft edge        */

          /* barrel fisheye: push pixels outward → centre magnifies */
          float k       = u_intensity * blend * 2.8;
          float tOut    = t + k * t * t * (1. - t);      /* biased outward  */
          tOut          = min(tOut, 1.);

          vec2  uvDir   = normalize(toM) / vec2(ca, 1.); /* back to uv space */
          vec2  wUv     = u_mouse + uvDir * tOut * lensR;

          /* chromatic aberration — R shifts outward, B inward */
          float chroma  = u_intensity * blend * .011;
          float r       = cover(wUv + uvDir * chroma ).r;
          float g       = cover(wUv                  ).g;
          float b       = cover(wUv - uvDir * chroma ).b;

          /* subtle blur: 4-tap cross */
          float bAmt    = u_intensity * blend * .0045;
          vec2  bx      = vec2(bAmt, 0.);
          vec2  by      = vec2(0., bAmt);
          vec3  tap0    = vec3(r, g, b);
          vec3  tap1    = cover(wUv + bx).rgb;
          vec3  tap2    = cover(wUv - bx).rgb;
          vec3  tap3    = cover(wUv + by).rgb;
          vec3  tap4    = cover(wUv - by).rgb;
          vec3  warped  = (tap0*2. + tap1 + tap2 + tap3 + tap4) / 6.;

          vec3  orig    = cover(uv).rgb;
          gl_FragColor  = vec4(mix(orig, warped, blend), 1.);
        } else {
          gl_FragColor  = cover(uv);
        }
      }`;

    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VS));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog); gl.useProgram(prog);

    /* full-screen quad */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* uniforms */
    const uRes       = gl.getUniformLocation(prog, "u_res");
    const uImgAspect = gl.getUniformLocation(prog, "u_imgAspect");
    const uMouse     = gl.getUniformLocation(prog, "u_mouse");
    const uIntensity = gl.getUniformLocation(prog, "u_intensity");

    /* texture */
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
                  gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,255]));

    let imgAspect = 1.5; // 1920/1280 — updated once image loads
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgAspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.src = "cover%20photos/_CAR0321_bw_compressed.jpg";

    /* resize */
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    /* animation state */
    let curMX = 0.5, curMY = 0.5, tgtMX = 0.5, tgtMY = 0.5;
    let curInt = 0,  tgtInt = 0;
    let rafId, resetTimer;
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      curMX  = lerp(curMX,  tgtMX,  0.10);
      curMY  = lerp(curMY,  tgtMY,  0.10);
      curInt = lerp(curInt, tgtInt, 0.07);

      gl.uniform2f(uRes,       canvas.width, canvas.height);
      gl.uniform1f(uImgAspect, imgAspect);
      gl.uniform2f(uMouse,     curMX, curMY);
      gl.uniform1f(uIntensity, curInt);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* events */
    const onMove = (x, y) => {
      const r = section.getBoundingClientRect();
      tgtMX = (x - r.left)  / r.width;
      tgtMY = (y - r.top)   / r.height;
      tgtInt = 1.0;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { tgtInt = 0; }, 200);
    };
    const onLeave = () => { clearTimeout(resetTimer); tgtInt = 0; };

    const onMM = (e) => onMove(e.clientX, e.clientY);
    const onTM = (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); };

    section.addEventListener("mousemove",  onMM,    { passive: true });
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("touchmove",  onTM,    { passive: true });
    section.addEventListener("touchend",   onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resetTimer);
      ro.disconnect();
      section.removeEventListener("mousemove",  onMM);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("touchmove",  onTM);
      section.removeEventListener("touchend",   onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 560, overflow: "hidden", background: "#000",
    }}>

      {/* WebGL canvas — replaces the static <img> */}
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
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
