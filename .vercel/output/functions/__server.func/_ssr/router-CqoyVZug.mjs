import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CqoyVZug.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BkkhluEG.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			background: "#160205",
			color: "#d4af37"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { textAlign: "center" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: {
						fontSize: "5rem",
						fontWeight: "bold"
					},
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: { marginTop: "1rem" },
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: "1.5rem" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						style: {
							color: "#d4af37",
							textDecoration: "underline"
						},
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			background: "#160205",
			color: "#d4af37"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { textAlign: "center" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Something went wrong" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						marginTop: "0.5rem",
						color: "#aaa"
					},
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginTop: "1.5rem",
						display: "flex",
						gap: "1rem",
						justifyContent: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						style: {
							background: "#d4af37",
							color: "#160205",
							border: "none",
							padding: "0.5rem 1.5rem",
							borderRadius: "4px",
							cursor: "pointer"
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						style: {
							color: "#d4af37",
							textDecoration: "underline",
							lineHeight: "2.5"
						},
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sabith & Nihana — Wedding Invitation" },
			{
				name: "description",
				content: "You are cordially invited to the wedding of Sabith Ali & Fathima Nihana on 08.08.2026 at Chaliyar Auditorium, Edavannappara."
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter = () => import("./routes-CiAnR-is.mjs");
var DEPLOYED_DOMAIN = "https://sabith-nihana.skenllp.com";
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => {
		const ogImageUrl = `${DEPLOYED_DOMAIN}/sabithali.png`;
		return {
			meta: [
				{ title: "Sabith & Nihana — Wedding Invitation" },
				{
					name: "description",
					content: "You are cordially invited to the wedding of Sabith Ali & Fathima Nihana on 08.08.2026 at Chaliyar Auditorium, Edavannappara."
				},
				{
					property: "og:title",
					content: "Sabith & Nihana — Wedding Invitation"
				},
				{
					property: "og:description",
					content: "08.08.2026 · Chaliyar Auditorium, Edavannappara"
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:image",
					content: ogImageUrl
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:image",
					content: ogImageUrl
				}
			],
			links: [
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Amiri:wght@400;700&display=swap"
				},
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
				}
			],
			scripts: [{
				src: "https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js",
				defer: true
			}, {
				src: "https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js",
				defer: true
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
