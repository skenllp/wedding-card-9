import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 8080,
      host: "0.0.0.0",
    },
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
  },
});