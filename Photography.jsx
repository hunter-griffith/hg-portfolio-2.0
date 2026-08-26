/* Photography.jsx — product + landscape + film masonry grids with shared lightbox */

const PRODUCT_PHOTOS = [
  { src: "product%20photography/FORWARD%202-Edit%20v01_compressed.jpg",                    alt: "Forward" },
  { src: "product%20photography/Freeform-pads-printing-3_compressed.jpg",                  alt: "Freeform Pads Printing" },
  { src: "product%20photography/Griphoria-Kitten-Heel-2x-angle%20(1)_compressed.jpg",      alt: "Griphoria Kitten Heel" },
  { src: "product%20photography/climacool-laced-2x-up_compressed.jpg",                     alt: "Climacool Laced" },
  { src: "product%20photography/climacool-laced-close-up_1920x1080_no-logo_compressed.jpg",alt: "Climacool Close Up" },
  { src: "product%20photography/climacool-off-white-6_compressed.jpg",                     alt: "Climacool Off-White" },
  { src: "product%20photography/riddell-axiom3d-lattice-pads-14_compressed.jpg",           alt: "Riddell Axiom 3D Pads" },
  { src: "product%20photography/riddell-axiom3d-lattice-pads-22_compressed.jpg",           alt: "Riddell Axiom 3D Pads 22" },
  { src: "product%20photography/schutt-f7-carbon-studio-5_compressed.jpg",                 alt: "Schutt F7 Carbon Studio" },
  { src: "product%20photography/schutt-f7-hero-poster-v01_compressed.jpg",                 alt: "Schutt F7 Hero" },
  { src: "product%20photography/4dfwd%20midsole%20m2%20wide-ig%20story_compressed.jpg",    alt: "4DFWD Midsole" },
  { src: "product%20photography/LV-gravity-11_compressed.jpg",                             alt: "LV Gravity 11" },
  { src: "product%20photography/LV-gravity-5_compressed.jpg",                              alt: "LV Gravity 5" },
  { src: "product%20photography/LV-gravity-7_compressed.jpg",                              alt: "LV Gravity 7" },
  { src: "product%20photography/LV-gravity-9_compressed.jpg",                              alt: "LV Gravity 9" },
  { src: "product%20photography/lv-gravity-studio_001_compressed.jpg",                     alt: "LV Gravity Studio 001" },
  { src: "product%20photography/lv-gravity-studio_002_compressed.jpg",                     alt: "LV Gravity Studio 002" },
  { src: "product%20photography/24AW_Social_BR_ASAP-Rocky_Sept_Mostro3D_1x1_1200x1200_compressed.jpg", alt: "ASAP Rocky Mostro 3D" },
  { src: "product%20photography/mostro-IG-story-04_compressed.jpg",                        alt: "Mostro IG Story" },
  { src: "product%20photography/mostro-motion-blur_compressed.jpg",                        alt: "Mostro Motion Blur" },
  { src: "product%20photography/mostro-slimer-05%20(1)_compressed.jpg",                    alt: "Mostro Slimer" },
  { src: "product%20photography/puma-slimer-mostro3d_compressed.jpg",                      alt: "Puma Slimer Mostro 3D" },
  { src: "product%20photography/Image_20230427_124403_272_compressed.jpg",                 alt: "Product Photography" },
  { src: "product%20photography/Vicis-Social-BLOG-PROMO_1x1_1920x1920.jpg",               alt: "Vicis Social" },
  { src: "product%20photography/DSC00504_compressed.jpg",                                  alt: "Product" },
  { src: "product%20photography/DSC00549_compressed.jpg",                                  alt: "Product" },
  { src: "product%20photography/DSC01897_compressed.jpg",                                  alt: "Product" },
  { src: "product%20photography/airscape%20and%20airspeed%20hero-01_compressed.jpg",       alt: "Airscape and Airspeed" },
  { src: "product%20photography/bioabsorbable-resin-edit-13.jpg",                          alt: "Bioabsorbable Resin" },
  { src: "product%20photography/flexcera-base-ultra-studio-15.jpg",                        alt: "Flexcera Base Ultra" },
  { src: "product%20photography/lotus-seat-cushion-m3-max-6_compressed.jpg",              alt: "Lotus Seat Cushion" },
  { src: "product%20photography/epu-pro-slide-studio-02_compressed.jpg",                  alt: "EPU Pro Studio" },
  { src: "product%20photography/Hollow-Lattice-Midsoles-4_compressed.jpg",               alt: "Hollow Lattice Midsoles" },
  { src: "product%20photography/puma-midsole-L1-printing-7_compressed.jpg",              alt: "Puma Midsole L1 Printing" },
  { src: "product%20photography/puma-mcu-neutral-banner-01_compressed.jpg",              alt: "Puma MCU Neutral Banner" },
  { src: "product%20photography/MOBA-on-shelf-01_compressed.jpg",                        alt: "Modern Barrel Co. Vessel" },
  { src: "product%20photography/MOBA-on-shelf-06_compressed.jpg",                        alt: "Modern Barrel Co. Vessel with Barrel" },
  { src: "product%20photography/MOBA-in-action-15_compressed.jpg",                       alt: "Modern Barrel Co. Aging Detail" },
  { src: "product%20photography/hypsole-studio-1_compressed.jpg",                        alt: "Hypsole Studio" },
  { src: "product%20photography/hypsole-studio-16_compressed.jpg",                       alt: "Hypsole Studio" },
  { src: "product%20photography/hypsole-studio-17_compressed.jpg",                       alt: "Hypsole Studio" },
  { src: "product%20photography/DSC02867_compressed.jpg",                                alt: "Automated Dispensing Array" },
  { src: "product%20photography/DSC02940_compressed.jpg",                                alt: "Production Floor" },
  { src: "product%20photography/DSC02963_compressed.jpg",                                alt: "Print Operator" },
  { src: "product%20photography/DSC04525_compressed.jpg",                                alt: "Lattice Print Under UV" },
  { src: "product%20photography/pico-lithos-customer-visit-53_compressed.jpg",           alt: "Pico Lithos Production" },
  { src: "product%20photography/pico-lithos-customer-visit-55_compressed.jpg",           alt: "Pico Lithos Assembly Line" },
  { src: "product%20photography/fp3d-workflow-image-01_compressed.jpg",                  alt: "Dental Appliance Workflow" },
  { src: "product%20photography/sprint-ray-3x_compressed.jpg",                           alt: "SprintRay Aligner Triptych" },
  { src: "product%20photography/tow%20cap-in%20hand-02_compressed.jpg",                  alt: "Toe Cap in Hand" },
  { src: "product%20photography/Rosalinds-HG-Photos-5_compressed.jpg",                   alt: "Rosalind's Bakery" },
  { src: "product%20photography/Rosalinds-HG-Photos-8_compressed.jpg",                   alt: "Rosalind's Bakery Bench" },
  { src: "product%20photography/ovial-studio-3_compressed.jpg",                        alt: "OVIAL Studio" },
  { src: "product%20photography/ovial-studio-57_compressed.jpg",                       alt: "OVIAL Studio" },
  { src: "product%20photography/ovial-pre-packets-kitchen-2_compressed.jpg",           alt: "OVIAL Pre-Packets Kitchen" },
  { src: "product%20photography/ovial-pre-packets-kitchen-5_compressed.jpg",           alt: "OVIAL Pre-Packets Kitchen" },
];

const LANDSCAPE_PHOTOS = [
  { src: "landscape%20photography/DJI_0070_compressed.jpg",                                          alt: "Aerial Landscape" },
  { src: "landscape%20photography/DJI_0075_compressed.jpg",                                          alt: "Aerial Landscape" },
  { src: "landscape%20photography/DJI_0201-no%20boards_compressed.jpg",                              alt: "Coastal Aerial" },
  { src: "landscape%20photography/DJI_0217-no%20boards_compressed.jpg",                              alt: "Coastal Aerial" },
  { src: "landscape%20photography/DJI_0229-2_compressed.jpg",                                        alt: "Landscape" },
  { src: "landscape%20photography/DJI_0234_compressed.jpg",                                          alt: "Aerial" },
  { src: "landscape%20photography/Kauai-Wedding-AcePro2-8_compressed.jpg",                           alt: "Kauai" },
  { src: "landscape%20photography/Crater%20Lake_compressed.jpg",                                     alt: "Crater Lake" },
  { src: "landscape%20photography/Firefall%202-Adobe%20RGB_compressed.jpg",                          alt: "Yosemite Firefall" },
  { src: "landscape%20photography/yosemite-fall-2023-22_compressed.jpg",                             alt: "Half Dome" },
  { src: "landscape%20photography/Manor-anamorphic-crop_compressed.jpg",                             alt: "Pacifica Coast" },
  { src: "landscape%20photography/NUDE%20BOWL_compressed.jpg",                                       alt: "Nude Bowl" },
  { src: "landscape%20photography/Sunrise%20in%20the%20Valley-El%20CAP-DARK%20TREES_18x24_compressed.jpg", alt: "El Capitan Sunrise" },
  { src: "landscape%20photography/Windy%20Hill_compressed.jpg",                                      alt: "Windy Hill" },
  { src: "landscape%20photography/Yuca%20Valley%20Stars_compressed.jpg",                             alt: "Yuca Valley Stars" },
  { src: "landscape%20photography/_CAR0617_compressed.jpg",                                          alt: "Landscape" },
  { src: "landscape%20photography/_DSC2991_compressed.jpg",                                          alt: "Landscape" },
  { src: "landscape%20photography/_DSC3841_compressed.jpg",                                          alt: "Landscape" },
  { src: "landscape%20photography/_DSC5537_compressed.jpg",                                          alt: "Landscape" },
  { src: "landscape%20photography/_DSC5617_compressed.jpg",                                          alt: "Landscape" },
  { src: "landscape%20photography/DJI_0002_compressed.jpg",                                          alt: "Fog Bank Over the Beach" },
  { src: "landscape%20photography/DJI_0021_compressed.jpg",                                          alt: "Coastline Aerial" },
  { src: "landscape%20photography/DJI_0071_compressed.jpg",                                          alt: "Sunset Over the Neighborhood" },
  { src: "landscape%20photography/DJI_0109_compressed.jpg",                                          alt: "Rocks and Surf" },
  { src: "landscape%20photography/DJI_0114_compressed.jpg",                                          alt: "Sea Stacks From Above" },
  { src: "landscape%20photography/DJI_0171-v02_FULL%20SIZE_compressed.jpg",                          alt: "Sunset Shoreline" },
  { src: "landscape%20photography/WAVES-ABOVE-desaturated-with%20Logo-HiRes_compressed.jpg",         alt: "Waves From Above" },
];

const FILM_PHOTOS = [
  { src: "film%20photography/000260660006_compressed.jpg", alt: "Crossing to Catalina" },
  { src: "film%20photography/000260660007_compressed.jpg", alt: "Avalon From the Water" },
  { src: "film%20photography/000260660013_compressed.jpg", alt: "Above Avalon" },
  { src: "film%20photography/000260660017_compressed.jpg", alt: "Catalina Hillside" },
  { src: "film%20photography/000260660022_compressed.jpg", alt: "Avalon Street" },
  { src: "film%20photography/000260660030_compressed.jpg", alt: "Catalina Harbor" },
  { src: "film%20photography/000260670004_compressed.jpg", alt: "Harborside" },
  { src: "film%20photography/000260670007_compressed.jpg", alt: "Beach Club" },
  { src: "film%20photography/000289700004_compressed.jpg", alt: "Pavilion Silhouette" },
  { src: "film%20photography/000289700028_compressed.jpg", alt: "Morning Bowls" },
  { src: "film%20photography/000289710028_compressed.jpg", alt: "Coastal Overlook" },
  { src: "film%20photography/000304440004_compressed.jpg", alt: "Cathedral Rocks" },
  { src: "film%20photography/000304440005_compressed.jpg", alt: "El Capitan" },
  { src: "film%20photography/000304440006_compressed.jpg", alt: "Yosemite Meadow" },
  { src: "film%20photography/000304440007_compressed.jpg", alt: "Valley Walls" },
  { src: "film%20photography/000341610002_compressed.jpg", alt: "Campfire in the Redwoods" },
  { src: "film%20photography/000341610003_compressed.jpg", alt: "Beach Picnic" },
  { src: "film%20photography/000386780002_compressed.jpg", alt: "Driftwood" },
  { src: "film%20photography/000386780004_compressed.jpg", alt: "Leaning Palm" },
  { src: "film%20photography/000386780005_compressed.jpg", alt: "Palms and Shoreline" },
  { src: "film%20photography/000386780007_compressed.jpg", alt: "Plantation House" },
  { src: "film%20photography/000386780008_compressed.jpg", alt: "Double Exposure" },
  { src: "film%20photography/000386790008_compressed.jpg", alt: "Under the Palms" },
  { src: "film%20photography/000403910008_compressed.jpg", alt: "Ridgeline at Dusk" },
  { src: "film%20photography/000411990004_compressed.jpg", alt: "Snowed In" },
  { src: "film%20photography/000411990005_compressed.jpg", alt: "Alpenglow" },
  { src: "film%20photography/000411990006_compressed.jpg", alt: "Winter Pines" },
  { src: "film%20photography/000411990014_compressed.jpg", alt: "Snow Day" },
  { src: "film%20photography/000417810001_compressed.jpg", alt: "Cannery Row" },
  { src: "film%20photography/000417810004_compressed.jpg", alt: "Victorians and a Palm" },
  { src: "film%20photography/000417810007_compressed.jpg", alt: "Fog on the Beach" },
  { src: "film%20photography/000417810010_compressed.jpg", alt: "Empty Bowl" },
  { src: "film%20photography/000417820001_compressed.jpg", alt: "Frontside" },
  { src: "film%20photography/000417820005_compressed.jpg", alt: "Palms Through the Fence" },
  { src: "film%20photography/000417830001_compressed.jpg", alt: "Mission Arches" },
  { src: "film%20photography/000417840009_compressed.jpg", alt: "Light Leak" },
  { src: "film%20photography/000417840012_compressed.jpg", alt: "Pines and Reflection" },
  { src: "film%20photography/000447440001_compressed.jpg", alt: "The Shack" },
  { src: "film%20photography/000447440003_compressed.jpg", alt: "Tahoe Shoreline" },
  { src: "film%20photography/000447440019_compressed.jpg", alt: "Cliffside Houses" },
  { src: "film%20photography/000468370002_compressed.jpg", alt: "Bluff Trail" },
  { src: "film%20photography/000468370008_compressed.jpg", alt: "Afternoon on the Lawn" },
  { src: "film%20photography/000476840008_compressed.jpg", alt: "In the Grass" },
  { src: "film%20photography/000476860009_compressed.jpg", alt: "Overpass" },
  { src: "film%20photography/000548160002_compressed.jpg", alt: "Tetons" },
  { src: "film%20photography/000548160003_compressed.jpg", alt: "Tetons, Second Frame" },
  { src: "film%20photography/000548160023_compressed.jpg", alt: "Grandstand" },
  { src: "film%20photography/000548170003_compressed.jpg", alt: "Red Leak" },
  { src: "film%20photography/000548170008_compressed.jpg", alt: "Horseback" },
  { src: "film%20photography/000715100004_compressed.jpg", alt: "Tropical Coast" },
  { src: "film%20photography/000715100016_compressed.jpg", alt: "Hanalei Palms" },
  { src: "film%20photography/TAHOME-Winter%20Storm_compressed.jpg", alt: "Winter Storm" },
  { src: "film%20photography/Watermelon%20Bowl_compressed.jpg", alt: "Watermelon Bowl" },
  { src: "film%20photography/chit-chat-film-selects-1_compressed.jpg", alt: "Pier at Golden Hour" },
  { src: "film%20photography/chit-chat-film-selects-2_compressed.jpg", alt: "Spray on the Jetty" },
  { src: "film%20photography/sling-shot-edited_LR-mobile_compressed.jpg", alt: "Slingshot" },
];

/* Flat array for lightbox navigation across all sections */
const ALL_PHOTOS = [...PRODUCT_PHOTOS, ...LANDSCAPE_PHOTOS, ...FILM_PHOTOS];

function Photography() {
  const [lightbox, setLightbox] = React.useState(null);

  const open  = (i) => { setLightbox(i); document.body.style.overflow = "hidden"; };
  const close  = ()  => { setLightbox(null); document.body.style.overflow = ""; };
  const prev   = ()  => setLightbox((i) => (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
  const next   = ()  => setLightbox((i) => (i + 1) % ALL_PHOTOS.length);

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  React.useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const SectionLabel = ({ title, sub }) => (
    <div style={{
      padding: "clamp(40px, 6vh, 72px) 0 clamp(24px, 3vh, 40px)",
    }}>
      <div className="chrome-divider" style={{ marginBottom: "clamp(32px, 4vh, 52px)" }} />
      <div style={{
        fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--fg-subtle)", marginBottom: 24,
      }}>Photography ⁄ {sub}</div>
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-mono)", fontWeight: 200,
        fontSize: "clamp(32px, 5vw, 72px)",
        lineHeight: 0.95, letterSpacing: "-0.035em",
        textTransform: "uppercase", color: "var(--fg)",
      }}>
        {title.split(" ").map((w, i, arr) => (
          <span key={i}>{w}{i < arr.length - 1 ? <br /> : null}</span>
        ))}
      </h2>
    </div>
  );

  const PhotoGrid = ({ photos, offset }) => (
    <div className="photo-masonry">
      {photos.map((photo, i) => (
        <div
          key={i}
          className="photo-item"
          onClick={() => open(offset + i)}
          role="button"
          aria-label={`View ${photo.alt}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && open(offset + i)}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="page-fade" style={{ background: "var(--hg-black)", minHeight: "100vh" }}>

      {/* Header */}
      <section style={{
        padding: "calc(20px + 80px + 56px) clamp(24px, 6vw, 96px) 0",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--fg-subtle)", marginBottom: 24,
        }}>Photography ⁄ Product</div>

        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-mono)", fontWeight: 200,
          fontSize: "clamp(32px, 5vw, 72px)",
          lineHeight: 0.95, letterSpacing: "-0.035em",
          textTransform: "uppercase", color: "var(--fg)",
        }}>
          Product<br />Photography
        </h1>

        <div className="chrome-divider" style={{ marginTop: "clamp(40px, 5vh, 72px)" }} />
      </section>

      {/* Product grid */}
      <section style={{ padding: "clamp(32px, 4vh, 56px) clamp(24px, 6vw, 96px) 0" }}>
        <PhotoGrid photos={PRODUCT_PHOTOS} offset={0} />
      </section>

      {/* Landscape section */}
      <section style={{ padding: "0 clamp(24px, 6vw, 96px) 0" }}>
        <SectionLabel title="LANDSCAPE PHOTOGRAPHY" sub="Landscape" />
        <PhotoGrid photos={LANDSCAPE_PHOTOS} offset={PRODUCT_PHOTOS.length} />
      </section>

      {/* Film section */}
      <section style={{ padding: "0 clamp(24px, 6vw, 96px) clamp(64px, 10vh, 128px)" }}>
        <SectionLabel title="FILM PHOTOGRAPHY" sub="Film" />
        <PhotoGrid photos={FILM_PHOTOS} offset={PRODUCT_PHOTOS.length + LANDSCAPE_PHOTOS.length} />
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button
            onClick={close}
            aria-label="Close"
            style={{
              all: "unset", cursor: "pointer",
              position: "absolute", top: 24, right: 32,
              fontFamily: "var(--font-mono)", fontSize: 22,
              color: "var(--fg-subtle)", transition: "color 200ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-subtle)"}
          >✕</button>

          <div style={{
            position: "absolute", top: 28, left: 32,
            fontFamily: "var(--font-mono)", fontWeight: 500,
            fontSize: 11, letterSpacing: "0.28em",
            color: "var(--fg-subtle)",
          }}>
            {String(lightbox + 1).padStart(2, "0")} / {String(ALL_PHOTOS.length).padStart(2, "0")}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            style={{
              all: "unset", cursor: "pointer",
              padding: "0 clamp(16px, 3vw, 40px)",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "var(--fg-subtle)", lineHeight: 1,
              userSelect: "none", flexShrink: 0, transition: "color 200ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-subtle)"}
          >‹</button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              maxHeight: "calc(100vh - 80px)", overflow: "hidden",
            }}
          >
            <img
              src={ALL_PHOTOS[lightbox].src}
              alt={ALL_PHOTOS[lightbox].alt}
              style={{
                maxWidth: "100%", maxHeight: "calc(100vh - 80px)",
                objectFit: "contain", display: "block",
              }}
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            style={{
              all: "unset", cursor: "pointer",
              padding: "0 clamp(16px, 3vw, 40px)",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "var(--fg-subtle)", lineHeight: 1,
              userSelect: "none", flexShrink: 0, transition: "color 200ms",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-subtle)"}
          >›</button>
        </div>
      )}
    </div>
  );
}

window.Photography = Photography;
