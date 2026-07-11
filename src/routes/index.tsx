  import { createFileRoute } from "@tanstack/react-router";
  import { useEffect, useRef, useState } from "react";

  const DEPLOYED_DOMAIN = "https://sabith-nihana.skenllp.com";

  export const Route = createFileRoute("/")({
    head: () => {
      // Crawlers (like WhatsApp) require a fully qualified absolute URL.
      // Automatically detect Vercel deployment URLs, or fall back to the DEPLOYED_DOMAIN if configured.
      const domain = DEPLOYED_DOMAIN || (typeof process !== "undefined" && process.env?.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
      const ogImageUrl = domain ? `${domain}/sabithali.png` : "/sabithali.png";

      return {
        meta: [
          { title: "Sabith & Nihana — Wedding Invitation" },
          {
            name: "description",
            content:
              "You are cordially invited to the wedding of Sabith Ali & Fathima Nihana on 08.08.2026 at Chaliyar Convention Centre, Edavannappara.",
          },
          { property: "og:title", content: "Sabith & Nihana — Wedding Invitation" },
          {
            property: "og:description",
            content: "08.08.2026 · Chaliyar Convention Centre, Edavannappara",
          },
          { property: "og:type", content: "website" },
          { property: "og:image", content: ogImageUrl },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: ogImageUrl },
        ],
        links: [
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Amiri:wght@400;700&display=swap",
          },
          {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          },
        ],
        scripts: [
          {
            src: "https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js",
            defer: true,
          },
          {
            src: "https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js",
            defer: true,
          },
        ],
      };
    },
    component: Invitation,
  });

  const WEDDING_DATE = new Date("2026-08-08T16:30:00+05:30").getTime();
  const MAPS_URL = "https://maps.app.goo.gl/hjH4mCRPDiDNN9JW8?g_st=ic";
  const COUPLE_PORTRAIT = "/sabithali 1.jpeg";
  const COUPLE_LANDSCAPE = "/sabithali-bg.png";
  const HERO_BG = "/sabithali-bg.png";
  const GALLERY_IMG_1 = "/sabithali-23.jpeg";
  const GALLERY_IMG_2 = "/sabi45.jpeg";

  /* ─── Countdown hook ─── */
  function useCountdown() {
    const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
    useEffect(() => {
      const tick = () => {
        const diff = Math.max(0, WEDDING_DATE - Date.now());
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff / 3600000) % 24);
        const m = Math.floor((diff / 60000) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setT({ d, h, m, s });
      };
      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, []);
    return t;
  }

  /* ─── Main Component ─── */
  function Invitation() {
    const { d, h, m, s } = useCountdown();
    const [playing, setPlaying] = useState(false);
    const [opened, setOpened] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    /* GSAP animations */
    useEffect(() => {
      let cancelled = false;
      const wait = () =>
        new Promise<void>((resolve) => {
          const check = () => {
            // @ts-expect-error gsap global
            if (window.gsap && window.ScrollTrigger) return resolve();
            setTimeout(check, 50);
          };
          check();
        });

      wait().then(() => {
        if (cancelled) return;
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        /* Intro Bismillah reveal */
        const tl = gsap.timeline();
        tl.from(".bismillah-ar span", {
          opacity: 0,
          y: 24,
          filter: "blur(12px)",
          duration: 1.3,
          stagger: 0.3,
          ease: "power3.out",
        })
          .from(
            ".bismillah-en, .intro-mark, .intro-names, .intro-btn",
            {
              opacity: 0,
              y: 16,
              duration: 0.8,
              ease: "power2.out",
            }
          );

        /* ScrollTrigger reveals */
        gsap.utils.toArray("[data-reveal]").forEach((el: any) => {
          gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray("[data-stagger]").forEach((group: any) => {
          const items = group.querySelectorAll("[data-stagger-item]");
          gsap.from(items, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%" },
          });
        });
      });

      return () => {
        cancelled = true;
      };
    }, []);

    const toggleAudio = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.volume = 0.6;
        audio.play().then(() => setPlaying(true)).catch(() => {});
      } else {
        audio.pause();
        setPlaying(false);
      }
    };

    return (
      <div className={`wed-root ${opened ? "is-opened" : "is-closed"}`}>
        {/* ── INTRO OVERLAY ── */}
        <div
          className={`intro-overlay ${opened ? "intro-hidden" : ""}`}
          aria-hidden={opened}
        >
          <div
            className="intro-bg"
            style={{ backgroundImage: `url(${COUPLE_LANDSCAPE})` }}
          />
          <div className="intro-veil" />
          <div className="intro-content">
            <h1 className="bismillah-ar" lang="ar" dir="rtl">
              <span>بِسْمِ</span> <span>ٱللَّهِ</span>{" "}
              <span>ٱلرَّحْمَٰنِ</span> <span>ٱلرَّحِيمِ</span>
            </h1>
            <p className="bismillah-en">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <div className="intro-mark">Wedding Invitation</div>
            <h2 className="hero-names intro-names">
              <span className="name-word">Sabith Ali</span>
              <span className="name-amp">&amp;</span>
              <span className="name-word">Fathima <br /> Nihana</span>
            </h2>
            <button
              className="intro-btn"
              onClick={() => {
                setOpened(true);
                const audio = audioRef.current;
                if (audio && audio.paused) {
                  audio.volume = 0.6;
                  audio.play().then(() => setPlaying(true)).catch(() => {});
                }
              }}
            >
              Open Invitation
            </button>
          </div>
        </div>

        {/* Floating decorative sparkles */}
        <div className="floating-shapes" aria-hidden>
          <span className="shape s1">✦</span>
          <span className="shape s2">✦</span>
          <span className="shape s3">✦</span>
          <span className="shape s4">✦</span>
          <span className="shape s5">✦</span>
        </div>

        {/* ── HERO ── */}
        <section className="hero">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="hero-veil" />
          <div className="hero-inner">
            <h1 className="hero-bismillah" lang="ar" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </h1>
            <div className="hero-divider">
              <span>✦</span>
            </div>
            <h2 className="hero-names" data-reveal>
              <span className="name-word">Sabith Ali</span>
              <span className="name-amp">&amp;</span>
              <span className="name-word">Fathima <br /> Nihana</span>
            </h2>
            <div className="hero-meta" data-reveal>
              <p className="hero-tag">
                Together with their families invite you to celebrate their wedding
              </p>
              <p className="hero-date">
                <span>Saturday</span>
                <span className="dot">·</span>
                <span>08 · 08 · 2026</span>
              </p>
            </div>
          </div>
          <a href="#verse" className="scroll-indicator" aria-label="Scroll down">
            <span className="chev" />
          </a>
        </section> 

        {/* ── FAMILIES ── */}
        <section className="section families">
          <h2 className="section-title" data-reveal>
            The Families
          </h2>
          <div className="section-sub" data-reveal>
            With love and blessings
          </div>
          <div className="family-grid" data-stagger>
            <article className="family-card" data-stagger-item>
              <span className="family-role">The Groom</span>
              <h3 className="family-name">Sabith Ali</h3>
              <div className="mini-divider" />
              <p className="family-parents">Beloved son of</p>
              <p className="family-parents-names">Abdul Jabbar &amp; Laila</p>
              <p className="family-house">Puthukkudi (H), Thathoorpoyil, Mavoor</p>
            </article>
            <article className="family-card" data-stagger-item>
              <span className="family-role">The Bride</span>
              <h3 className="family-name">Fathima <br /> Nihana</h3>
              <div className="mini-divider" />
              <p className="family-parents">Beloved daughter of</p>
              <p className="family-parents-names">Naseer &amp; Mumthaz</p>
              <p className="family-house">Poolakkathodi (H), Karakutty, Kodiyathur</p>
            </article>
          </div>
        </section>

        {/* ── COUPLE PHOTO ── */}
        <section className="section couple-photo-section">
          <div className="couple-photo-frame" data-reveal>
            <img src={COUPLE_PORTRAIT} alt="Sabith Ali and Fathima Nihana" />
            <div className="photo-overlay-text">
              <span>Sabith &amp; Nihana</span>
              <span className="photo-date">08 · 08 · 2026</span>
            </div>
          </div>
        </section>

        {/* ── COUNTDOWN ── */}
        <section className="section countdown">
          <h2 className="section-title" data-reveal>
            Counting Down
          </h2>
          <div className="section-sub" data-reveal>
            Until we say forever
          </div>
          <div className="countdown-grid" data-stagger>
            {[
              { label: "Days", value: d },
              { label: "Hours", value: h },
              { label: "Mins", value: m },
              { label: "Secs", value: s },
            ].map((c) => (
              <div key={c.label} className="cd-box" data-stagger-item>
                <span className="cd-num">{String(c.value).padStart(2, "0")}</span>
                <span className="cd-lbl">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── EVENT ── */}
        <section className="section event">
          <h2 className="section-title" data-reveal>
            The Celebration
          </h2>
          <div className="section-sub" data-reveal>
            Join us on our special day
          </div>
          <div className="event-card" data-reveal>
            <span className="event-badge">Reception</span>
            <h3 className="event-title">Ceremony &amp; Dinner</h3>
            <div className="line-divider small">
              <span>✦</span>
            </div>
            <div className="event-rows">
              <div className="event-row">
                <i className="fa-regular fa-calendar" />
                <div>
                  <span>Date</span>
                  <strong>Saturday, 08 August 2026</strong>
                </div>
              </div>
              <div className="event-row">
                <i className="fa-regular fa-clock" />
                <div>
                  <span>Time</span>
                  <strong>4:30 PM onwards</strong>
                </div>
              </div>
              <div className="event-row">
                <i className="fa-solid fa-location-dot" />
                <div>
                  <span>Venue</span>
                  <strong>Chaliyar Convention Centre, Edavannappara</strong>
                </div>
              </div>
            </div>
            <div className="event-actions">
              <a
                className="btn btn-gold"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-location-dot" /> Open Google Maps
              </a>
              <a
                className="btn btn-wa"
                href="https://wa.me/918086769152?text=Assalamu%20Alaykum%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20at%20the%20wedding%20of%20Sabith%20Ali%20%26%20Fathima%20Nihana%20on%2008%20August%202026.%20%F0%9F%8C%BF"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-whatsapp" /> RSVP on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── WHATSAPP RSVP ── */}
        <section className="section rsvp-section" id="rsvp">
          <h2 className="section-title" data-reveal>RSVP</h2>
          <div className="section-sub" data-reveal>
            Let us know you're coming
          </div>
          <div className="rsvp-card" data-reveal>
            <div className="rsvp-icon-wrap">
              <i className="fa-brands fa-whatsapp rsvp-wa-icon" />
            </div>
            <p className="rsvp-msg">
              We'd be honoured to have you celebrate with us. Please click below
              to confirm your attendance via WhatsApp.
            </p>
            <a
              className="btn rsvp-btn"
              href="https://wa.me/918086769152?text=Assalamu%20Alaykum%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20at%20the%20wedding%20of%20Sabith%20Ali%20%26%20Fathima%20Nihana%20on%2008%20August%202026.%20%F0%9F%8C%BF"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-whatsapp" /> Confirm Attendance
            </a>
            <p className="rsvp-note">Tap to open WhatsApp · +91 80867 69152</p>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="section gallery">
          <h2 className="section-title" data-reveal>
            Moments
          </h2>
          <div className="section-sub" data-reveal>
            A glimpse of our story
          </div>
          <div className="gallery-grid" data-stagger>
            <figure className="gal-frame tall" data-stagger-item>
              <img src={COUPLE_PORTRAIT} alt="Couple portrait" />
              <div className="gal-hover-overlay" />
            </figure>
            <figure className="gal-frame" data-stagger-item>
              <img src={GALLERY_IMG_1} alt="Couple portrait 2" />
              <div className="gal-hover-overlay" />
            </figure>
            <figure className="gal-frame" data-stagger-item>
              <img src={GALLERY_IMG_2} alt="Couple portrait 3" />
              <div className="gal-hover-overlay" />
            </figure>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="wed-footer">
          <div className="line-divider">
            <span>✦</span>
          </div>
          <p className="footer-thanks">Thank You</p>
          <p className="footer-msg">
            Your presence and prayers on our special day are the greatest gift we
            could ask for.
          </p>
          <p className="footer-couple">Sabith &amp; Nihana</p>
          <div className="footer-bottom">
            <span>08 · 08 · 2026</span>
            <span className="dot">·</span>
            <span>Chaliyar Convention Centre, Edavannappara</span>
          </div>
        </footer>

        {/* ── Floating music button ── */}
        <button
          id="audio-fab"
          className={`audio-fab ${playing ? "playing" : ""}`}
          onClick={toggleAudio}
          aria-label="Toggle music"
        >
          <i className={`fa-solid ${playing ? "fa-pause" : "fa-music"}`} />
        </button>
        <audio ref={audioRef} id="bg-audio" src="/music.mp3" loop preload="auto" />
      </div>
    );
  }
