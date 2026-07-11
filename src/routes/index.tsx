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

  /* ─── Full-page fixed petal rain (one seamless canvas for entire page) ─── */
  function usePetalRain() {
    useEffect(() => {
      // Create canvas fixed to the viewport so petals fall seamlessly over every section
      const canvas = document.createElement("canvas");
      canvas.id = "petal-rain-canvas";
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "1000",      // above intro overlay (999); content sits at 1001+
        opacity: "1",
      });
      document.body.appendChild(canvas);

      const ctx = canvas.getContext("2d")!;
      let raf: number;
      const PETAL_COUNT = 55;

      // Wedding palette: gold, champagne, crimson blush, ivory, bronze
      const BASE_COLORS: [number, number, number][] = [
        [226, 168,  51],   // warm gold
        [245, 212, 122],   // champagne
        [196,  40,  64],   // crimson blush
        [245, 238, 223],   // ivory
        [184, 131,  26],   // bronze gold
        [255, 200, 180],   // soft rose
      ];

      interface Petal {
        x: number; y: number;
        w: number; h: number;
        r: number; g: number; b: number;
        opacity: number;
        speed: number;
        drift: number;
        angle: number;
        spin: number;
        phase: number;
        wobble: number;
      }

      const resize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const rand = (min: number, max: number) => Math.random() * (max - min) + min;

      const makePetal = (spreadY = false): Petal => {
        const w = rand(5, 16);
        const [r, g, b] = BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)];
        return {
          x: rand(0, window.innerWidth),
          y: spreadY ? rand(-window.innerHeight, window.innerHeight) : rand(-40, -5),
          w,
          h: w * rand(0.38, 0.62),
          r, g, b,
          opacity: rand(0.12, 0.52),
          speed:   rand(0.18, 0.55),
          drift:   rand(-0.2, 0.2),
          angle:   rand(0, Math.PI * 2),
          spin:    rand(-0.012, 0.012),
          phase:   rand(0, Math.PI * 2),
          wobble:  rand(0.1, 0.4),
        };
      };

      resize();
      window.addEventListener("resize", resize);

      const petals: Petal[] = Array.from({ length: PETAL_COUNT }, () => makePetal(true));
      let tick = 0;

      const draw = () => {
        tick++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of petals) {
          p.x    += p.drift + Math.sin(tick * 0.012 + p.phase) * p.wobble;
          p.y    += p.speed;
          p.angle += p.spin;

          // wrap horizontally
          if (p.x < -30)  p.x = canvas.width  + 20;
          if (p.x > canvas.width + 30) p.x = -20;

          if (p.y > canvas.height + 30) {
            Object.assign(p, makePetal(false));
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.opacity;

          // main petal body
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.w * 0.6);
          grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.opacity})`);
          grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();

          // specular highlight
          ctx.globalAlpha = p.opacity * 0.35;
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.beginPath();
          ctx.ellipse(-p.w * 0.11, -p.h * 0.14, p.w * 0.2, p.h * 0.15, -0.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        raf = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        canvas.remove();
      };
    }, []);
  }

  /* ─── Main Component ─── */
  function Invitation() {
    const { d, h, m, s } = useCountdown();
    const [playing, setPlaying] = useState(false);
    const [opened, setOpened] = useState(false);
    const [rsvpAnswer, setRsvpAnswer] = useState<null | "yes" | "no">(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    /* single full-page petal rain */
    usePetalRain();


    /* ── Confetti popper ── */
    const launchConfetti = () => {
      const colors = ["#e2a833", "#f5d47a", "#b8831a", "#f5eedf", "#9e1e30", "#c42840"];
      const container = document.getElementById("rsvp-confetti-root");
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < 90; i++) {
        const dot = document.createElement("span");
        dot.className = "confetti-dot";
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 6;
        const angleRad = (Math.random() * 360) * (Math.PI / 180);
        const dist = Math.random() * 220 + 80;
        const tx = Math.cos(angleRad) * dist;
        const ty = Math.sin(angleRad) * dist;
        const dur = Math.random() * 0.8 + 0.7;
        const delay = Math.random() * 0.35;
        dot.style.cssText = `
          background:${color};
          width:${size}px;height:${size}px;
          border-radius:${Math.random() > 0.4 ? "50%" : "2px"};
          --tx:${tx}px;--ty:${ty}px;
          animation: confetti-burst ${dur}s ease-out ${delay}s forwards;
        `;
        container.appendChild(dot);
      }
    };

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
            </div>
          </div>
        </section>

        {/* ── WILL YOU ATTEND ── */}
        <section className="section attend-section" id="attend">
          <div className="attend-label" data-reveal>Join Us</div>
          <h2 className="attend-title" data-reveal>Will You Attend?</h2> 
          <p className="attend-subtitle" data-reveal>
            <em>Your presence will be much appreciated </em>
          </p>
          <div className="attend-divider" data-reveal>
            <span>✦</span>
          </div>

          <div className="attend-options" data-reveal>
            <button
              id="attend-yes-btn"
              className={`attend-opt attend-yes ${rsvpAnswer === "yes" ? "is-selected" : ""}`}
              onClick={() => {
                setRsvpAnswer("yes");
                launchConfetti();
              }}
              disabled={rsvpAnswer !== null}
            >
              <span className="attend-opt-icon">
                {rsvpAnswer === "yes" ? "✓" : ""}
              </span>
              <span>Yes, In Sha Allah! 😍</span>
            </button>

            <button
              id="attend-no-btn"
              className={`attend-opt attend-no ${rsvpAnswer === "no" ? "is-selected" : ""}`}
              onClick={() => setRsvpAnswer("no")}
              disabled={rsvpAnswer !== null}
            >
              <span className="attend-opt-icon">
                {rsvpAnswer === "no" ? "✕" : ""}
              </span>
              <span>Unfortunately, I can't make it</span>
            </button>
          </div>

          {/* Confetti anchor */}
          <div id="rsvp-confetti-root" className="confetti-root" aria-hidden />

          {rsvpAnswer === "yes" && (
            <div className="attend-thanks" id="attend-thanks">
              <span className="thanks-emoji">🎉</span>
              <p className="thanks-text">
                Jazakallah Khair! We look forward to celebrating with you!
              </p>
            </div>
          )}

          {rsvpAnswer === "no" && (
            <div className="attend-regret" id="attend-regret">
              <span className="regret-emoji">🤍</span>
              <p className="regret-text">
                We understand, and we appreciate your warm wishes. May Allah bless you always.
              </p>
            </div>
          )}
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
