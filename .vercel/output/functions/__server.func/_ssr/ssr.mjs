import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError = null;
if (typeof processModule !== "undefined") {
	processModule.on("uncaughtException", (error) => {
		lastCapturedError = error;
	});
	processModule.on("unhandledRejection", (reason) => {
		if (reason instanceof Error) lastCapturedError = reason;
	});
}
function consumeLastCapturedError() {
	const err = lastCapturedError;
	lastCapturedError = null;
	return err;
}
function renderErrorPage() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Something went wrong</title>
  <style>
    body { margin: 0; background: #160205; color: #fbf8f3; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
    h1 { font-size: 1.5rem; color: #d4af37; }
    p { color: #ded0b6; margin-top: 0.5rem; }
    a { color: #d4af37; }
  </style>
</head>
<body>
  <div>
    <h1>Something went wrong</h1>
    <p>An error occurred while loading the page.</p>
    <p><a href="/">Go home</a></p>
  </div>
</body>
</html>`;
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-BRWaDtjk.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
