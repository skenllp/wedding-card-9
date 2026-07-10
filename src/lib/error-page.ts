export function renderErrorPage(): string {
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
