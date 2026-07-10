import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/assets/styles-CeMvr9lI.css";
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			background: "#160205",
			color: "#d4af37"
		},
		children: /* @__PURE__ */ jsxs("div", {
			style: { textAlign: "center" },
			children: [
				/* @__PURE__ */ jsx("h1", {
					style: {
						fontSize: "5rem",
						fontWeight: "bold"
					},
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					style: { marginTop: "1rem" },
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("div", {
					style: { marginTop: "1.5rem" },
					children: /* @__PURE__ */ jsx(Link, {
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
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "flex",
			minHeight: "100vh",
			alignItems: "center",
			justifyContent: "center",
			background: "#160205",
			color: "#d4af37"
		},
		children: /* @__PURE__ */ jsxs("div", {
			style: { textAlign: "center" },
			children: [
				/* @__PURE__ */ jsx("h1", { children: "Something went wrong" }),
				/* @__PURE__ */ jsx("p", {
					style: {
						marginTop: "0.5rem",
						color: "#aaa"
					},
					children: error.message
				}),
				/* @__PURE__ */ jsxs("div", {
					style: {
						marginTop: "1.5rem",
						display: "flex",
						gap: "1rem",
						justifyContent: "center"
					},
					children: [/* @__PURE__ */ jsx("button", {
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
					}), /* @__PURE__ */ jsx("a", {
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
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-yOM7CNR8.js");
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({
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
				name: "twitter:card",
				content: "summary_large_image"
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
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
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
