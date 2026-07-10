import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#160205", color: "#d4af37" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>404</h1>
        <h2 style={{ marginTop: "1rem" }}>Page not found</h2>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/" style={{ color: "#d4af37", textDecoration: "underline" }}>Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#160205", color: "#d4af37" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p style={{ marginTop: "0.5rem", color: "#aaa" }}>{error.message}</p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            style={{ background: "#d4af37", color: "#160205", border: "none", padding: "0.5rem 1.5rem", borderRadius: "4px", cursor: "pointer" }}
          >
            Try again
          </button>
          <a href="/" style={{ color: "#d4af37", textDecoration: "underline", lineHeight: "2.5" }}>Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sabith & Nihana — Wedding Invitation" },
      { name: "description", content: "You are cordially invited to the wedding of Sabith Ali & Fathima Nihana on 08.08.2026 at Chaliyar Auditorium, Edavannappara." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
