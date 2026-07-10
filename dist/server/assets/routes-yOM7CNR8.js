import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=component
var WEDDING_DATE = (/* @__PURE__ */ new Date("2026-08-08T16:30:00+05:30")).getTime();
var MAPS_URL = "https://maps.app.goo.gl/hjH4mCRPDiDNN9JW8?g_st=ic";
var COUPLE_PORTRAIT = "/sabithali.png";
var COUPLE_LANDSCAPE = "/sabithali_landscape.png";
function useCountdown() {
	const [t, setT] = useState({
		d: 0,
		h: 0,
		m: 0,
		s: 0
	});
	useEffect(() => {
		const tick = () => {
			const diff = Math.max(0, WEDDING_DATE - Date.now());
			const d = Math.floor(diff / 864e5);
			const h = Math.floor(diff / 36e5 % 24);
			const m = Math.floor(diff / 6e4 % 60);
			const s = Math.floor(diff / 1e3 % 60);
			setT({
				d,
				h,
				m,
				s
			});
		};
		tick();
		const id = setInterval(tick, 1e3);
		return () => clearInterval(id);
	}, []);
	return t;
}
function Invitation() {
	const { d, h, m, s } = useCountdown();
	const [playing, setPlaying] = useState(false);
	const [opened, setOpened] = useState(false);
	const audioRef = useRef(null);
	useEffect(() => {
		let cancelled = false;
		const wait = () => new Promise((resolve) => {
			const check = () => {
				if (window.gsap && window.ScrollTrigger) return resolve();
				setTimeout(check, 50);
			};
			check();
		});
		wait().then(() => {
			if (cancelled) return;
			const gsap = window.gsap;
			const ScrollTrigger = window.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger);
			gsap.timeline().from(".bismillah-ar span", {
				opacity: 0,
				y: 24,
				filter: "blur(12px)",
				duration: 1.3,
				stagger: .3,
				ease: "power3.out"
			}).from(".bismillah-en", {
				opacity: 0,
				y: 14,
				duration: 1,
				ease: "power2.out"
			}, "-=0.5").from(".intro-mark", {
				opacity: 0,
				letterSpacing: "0.3em",
				duration: 1,
				ease: "power2.out"
			}, "-=0.4").from(".intro-btn", {
				opacity: 0,
				y: 16,
				scale: .95,
				duration: .9,
				ease: "back.out(1.5)"
			}, "-=0.2");
			gsap.utils.toArray("[data-reveal]").forEach((el) => {
				gsap.from(el, {
					opacity: 0,
					y: 50,
					duration: 1.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: el,
						start: "top 88%"
					}
				});
			});
			gsap.utils.toArray("[data-stagger]").forEach((group) => {
				const items = group.querySelectorAll("[data-stagger-item]");
				gsap.from(items, {
					opacity: 0,
					y: 50,
					duration: .9,
					stagger: .2,
					ease: "power3.out",
					scrollTrigger: {
						trigger: group,
						start: "top 82%"
					}
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
		const gsap = window.gsap;
		if (audio.paused) {
			audio.volume = 0;
			audio.play().then(() => {
				setPlaying(true);
				if (gsap) gsap.to(audio, {
					volume: .55,
					duration: 1.5
				});
				else audio.volume = .55;
			}).catch(() => {});
		} else if (gsap) gsap.to(audio, {
			volume: 0,
			duration: .9,
			onComplete: () => {
				audio.pause();
				setPlaying(false);
			}
		});
		else {
			audio.pause();
			setPlaying(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `wed-root ${opened ? "is-opened" : "is-closed"}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: `intro-overlay ${opened ? "intro-hidden" : ""}`,
				"aria-hidden": opened,
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "intro-bg",
						style: { backgroundImage: `url(${COUPLE_LANDSCAPE})` }
					}),
					/* @__PURE__ */ jsx("div", { className: "intro-veil" }),
					/* @__PURE__ */ jsxs("div", {
						className: "intro-content",
						children: [
							/* @__PURE__ */ jsxs("h1", {
								className: "bismillah-ar",
								lang: "ar",
								dir: "rtl",
								children: [
									/* @__PURE__ */ jsx("span", { children: "بِسْمِ" }),
									" ",
									/* @__PURE__ */ jsx("span", { children: "ٱللَّهِ" }),
									" ",
									/* @__PURE__ */ jsx("span", { children: "ٱلرَّحْمَٰنِ" }),
									" ",
									/* @__PURE__ */ jsx("span", { children: "ٱلرَّحِيمِ" })
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "bismillah-en",
								children: "In the name of Allah, the Most Gracious, the Most Merciful"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "intro-mark",
								children: "Wedding Invitation"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "intro-btn",
								onClick: () => setOpened(true),
								children: "Open Invitation"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "floating-shapes",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "shape s1",
						children: "✦"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shape s2",
						children: "✦"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shape s3",
						children: "✦"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shape s4",
						children: "✦"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shape s5",
						children: "✦"
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "hero",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "hero-bg",
						style: { backgroundImage: `url(${COUPLE_LANDSCAPE})` }
					}),
					/* @__PURE__ */ jsx("div", { className: "hero-veil" }),
					/* @__PURE__ */ jsxs("div", {
						className: "hero-inner",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "hero-bismillah",
								lang: "ar",
								dir: "rtl",
								children: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "hero-divider",
								children: /* @__PURE__ */ jsx("span", { children: "✦" })
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "hero-names",
								"data-reveal": true,
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "name-word",
										children: "Sabith Ali"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "name-amp",
										children: "&"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "name-word",
										children: "Fathima Nihana"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hero-meta",
								"data-reveal": true,
								children: [/* @__PURE__ */ jsx("p", {
									className: "hero-tag",
									children: "Together with their families invite you to celebrate their wedding"
								}), /* @__PURE__ */ jsxs("p", {
									className: "hero-date",
									children: [
										/* @__PURE__ */ jsx("span", { children: "Saturday" }),
										/* @__PURE__ */ jsx("span", {
											className: "dot",
											children: "·"
										}),
										/* @__PURE__ */ jsx("span", { children: "08 · 08 · 2026" })
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#verse",
						className: "scroll-indicator",
						"aria-label": "Scroll down",
						children: /* @__PURE__ */ jsx("span", { className: "chev" })
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				id: "verse",
				className: "section verse",
				children: /* @__PURE__ */ jsxs("div", {
					className: "verse-card",
					"data-reveal": true,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "line-divider",
							children: /* @__PURE__ */ jsx("span", { children: "✦" })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "verse-text",
							children: "\"And We created you in pairs.\""
						}),
						/* @__PURE__ */ jsx("p", {
							className: "verse-ref",
							children: "— Surah An-Naba (78:8)"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "line-divider",
							children: /* @__PURE__ */ jsx("span", { children: "✦" })
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "section families",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						"data-reveal": true,
						children: "The Families"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "section-sub",
						"data-reveal": true,
						children: "With love and blessings"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "family-grid",
						"data-stagger": true,
						children: [/* @__PURE__ */ jsxs("article", {
							className: "family-card",
							"data-stagger-item": true,
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "family-role",
									children: "The Groom"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "family-name",
									children: "Sabith Ali"
								}),
								/* @__PURE__ */ jsx("div", { className: "mini-divider" }),
								/* @__PURE__ */ jsx("p", {
									className: "family-parents",
									children: "Beloved son of"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "family-parents-names",
									children: "Abdul Jabbar & Laila"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "family-house",
									children: "Edavannappara"
								})
							]
						}), /* @__PURE__ */ jsxs("article", {
							className: "family-card",
							"data-stagger-item": true,
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "family-role",
									children: "The Bride"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "family-name",
									children: "Fathima Nihana"
								}),
								/* @__PURE__ */ jsx("div", { className: "mini-divider" }),
								/* @__PURE__ */ jsx("p", {
									className: "family-parents",
									children: "Beloved daughter of"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "family-parents-names",
									children: "Naseer & Mumthaz"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "family-house",
									children: "Edavannappara"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "section couple-photo-section",
				children: /* @__PURE__ */ jsxs("div", {
					className: "couple-photo-frame",
					"data-reveal": true,
					children: [/* @__PURE__ */ jsx("img", {
						src: COUPLE_PORTRAIT,
						alt: "Sabith Ali and Fathima Nihana"
					}), /* @__PURE__ */ jsxs("div", {
						className: "photo-overlay-text",
						children: [/* @__PURE__ */ jsx("span", { children: "Sabith & Nihana" }), /* @__PURE__ */ jsx("span", {
							className: "photo-date",
							children: "08 · 08 · 2026"
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "section countdown",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						"data-reveal": true,
						children: "Counting Down"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "section-sub",
						"data-reveal": true,
						children: "Until we say forever"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "countdown-grid",
						"data-stagger": true,
						children: [
							{
								label: "Days",
								value: d
							},
							{
								label: "Hours",
								value: h
							},
							{
								label: "Mins",
								value: m
							},
							{
								label: "Secs",
								value: s
							}
						].map((c) => /* @__PURE__ */ jsxs("div", {
							className: "cd-box",
							"data-stagger-item": true,
							children: [/* @__PURE__ */ jsx("span", {
								className: "cd-num",
								children: String(c.value).padStart(2, "0")
							}), /* @__PURE__ */ jsx("span", {
								className: "cd-lbl",
								children: c.label
							})]
						}, c.label))
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "section event",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						"data-reveal": true,
						children: "The Celebration"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "section-sub",
						"data-reveal": true,
						children: "Join us on our special day"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "event-card",
						"data-reveal": true,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "event-badge",
								children: "Reception"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "event-title",
								children: "Ceremony & Dinner"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "line-divider small",
								children: /* @__PURE__ */ jsx("span", { children: "✦" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "event-rows",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "event-row",
										children: [/* @__PURE__ */ jsx("i", { className: "fa-regular fa-calendar" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", { children: "Date" }), /* @__PURE__ */ jsx("strong", { children: "Saturday, 08 August 2026" })] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "event-row",
										children: [/* @__PURE__ */ jsx("i", { className: "fa-regular fa-clock" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", { children: "Time" }), /* @__PURE__ */ jsx("strong", { children: "4:30 PM onwards" })] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "event-row",
										children: [/* @__PURE__ */ jsx("i", { className: "fa-solid fa-location-dot" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", { children: "Venue" }), /* @__PURE__ */ jsx("strong", { children: "Chaliyar Auditorium, Edavannappara" })] })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "event-actions",
								children: [/* @__PURE__ */ jsxs("a", {
									className: "btn btn-gold",
									href: MAPS_URL,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ jsx("i", { className: "fa-solid fa-location-dot" }), " Open Google Maps"]
								}), /* @__PURE__ */ jsxs("a", {
									className: "btn btn-outline",
									href: MAPS_URL,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ jsx("i", { className: "fa-solid fa-compass" }), " Get Directions"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "section gallery",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						"data-reveal": true,
						children: "Moments"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "section-sub",
						"data-reveal": true,
						children: "A glimpse of our story"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "gallery-grid",
						"data-stagger": true,
						children: [
							/* @__PURE__ */ jsxs("figure", {
								className: "gal-frame tall",
								"data-stagger-item": true,
								children: [/* @__PURE__ */ jsx("img", {
									src: COUPLE_PORTRAIT,
									alt: "Couple portrait"
								}), /* @__PURE__ */ jsx("div", { className: "gal-hover-overlay" })]
							}),
							/* @__PURE__ */ jsxs("figure", {
								className: "gal-frame",
								"data-stagger-item": true,
								children: [/* @__PURE__ */ jsx("img", {
									src: COUPLE_LANDSCAPE,
									alt: "Couple portrait"
								}), /* @__PURE__ */ jsx("div", { className: "gal-hover-overlay" })]
							}),
							/* @__PURE__ */ jsxs("figure", {
								className: "gal-frame",
								"data-stagger-item": true,
								children: [/* @__PURE__ */ jsx("img", {
									src: COUPLE_PORTRAIT,
									alt: "Couple portrait"
								}), /* @__PURE__ */ jsx("div", { className: "gal-hover-overlay" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "wed-footer",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "line-divider",
						children: /* @__PURE__ */ jsx("span", { children: "✦" })
					}),
					/* @__PURE__ */ jsx("p", {
						className: "footer-thanks",
						children: "Thank You"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "footer-msg",
						children: "Your presence and prayers on our special day are the greatest gift we could ask for."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "footer-couple",
						children: "Sabith & Nihana"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "footer-bottom",
						children: [
							/* @__PURE__ */ jsx("span", { children: "08 · 08 · 2026" }),
							/* @__PURE__ */ jsx("span", {
								className: "dot",
								children: "·"
							}),
							/* @__PURE__ */ jsx("span", { children: "Chaliyar Auditorium, Edavannappara" })
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				id: "audio-fab",
				className: `audio-fab ${playing ? "playing" : ""}`,
				onClick: toggleAudio,
				"aria-label": "Toggle music",
				children: /* @__PURE__ */ jsx("i", { className: `fa-solid ${playing ? "fa-pause" : "fa-music"}` })
			}),
			/* @__PURE__ */ jsx("audio", {
				ref: audioRef,
				id: "bg-audio",
				src: "/music.mp3",
				loop: true,
				preload: "none"
			})
		]
	});
}
//#endregion
export { Invitation as component };
