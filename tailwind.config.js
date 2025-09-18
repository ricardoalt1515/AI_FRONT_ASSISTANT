@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 20 % 98 %;
    --foreground: 215 25 % 27 %;
    --card: 0 0 % 100 %;
    --card - foreground: 215 25 % 27 %;
    --popover: 0 0 % 100 %;
    --popover - foreground: 215 25 % 27 %;
    --primary: 199 89 % 48 %;
    --primary - foreground: 0 0 % 100 %;
    --secondary: 210 40 % 96.1 %;
    --secondary - foreground: 215 25 % 27 %;
    --muted: 210 40 % 96.1 %;
    --muted - foreground: 215 20 % 65 %;
    --accent: 199 89 % 48 %;
    --accent - foreground: 0 0 % 100 %;
    --destructive: 0 84.2 % 60.2 %;
    --destructive - foreground: 0 0 % 100 %;
    --border: 214.3 31.8 % 91.4 %;
    --input: 214.3 31.8 % 91.4 %;
    --ring: 199 89 % 48 %;
    --radius: 0.5rem;
  }

  .dark {
    --background: 217 33 % 17 %;
    --foreground: 210 20 % 98 %;
    --card: 217 33 % 17 %;
    --card - foreground: 210 20 % 98 %;
    --popover: 217 33 % 17 %;
    --popover - foreground: 210 20 % 98 %;
    --primary: 199 89 % 48 %;
    --primary - foreground: 0 0 % 100 %;
    --secondary: 217 19 % 27 %;
    --secondary - foreground: 210 20 % 98 %;
    --muted: 217 19 % 27 %;
    --muted - foreground: 215 20 % 65 %;
    --accent: 199 89 % 48 %;
    --accent - foreground: 0 0 % 100 %;
    --destructive: 0 62.8 % 30.6 %;
    --destructive - foreground: 210 20 % 98 %;
    --border: 217 19 % 27 %;
    --input: 217 19 % 27 %;
    --ring: 199 89 % 48 %;
  }
}

@layer base {
  * {
    @apply border - border;
}
  body {
  @apply bg - background text - foreground font - sans;
  font - feature - settings: "rlig" 1, "calt" 1;
}

  /* Establecer la fuente Inter como fuente principal */
  :root {
  --font - sans: Inter, -apple - system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans - serif;
  --font - mono: ui - monospace, SFMono - Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
  
  .font - sans {
  font - family: var(--font - sans);
}
  
  .font - mono {
  font - family: var(--font - mono);
}
}

/* Estilos para Markdown */
.markdown - content {
  @apply text - gray - 700 dark: text - gray - 300 text - sm sm: text - base leading - relaxed;
}

.markdown - content h1 {
  @apply text - xl font - semibold text - gray - 800 dark: text - gray - 100 mt - 6 mb - 4;
}

.markdown - content h2 {
  @apply text - lg font - semibold text - gray - 700 dark: text - gray - 200 mt - 5 mb - 3;
}

.markdown - content h3 {
  @apply text - base font - semibold text - gray - 600 dark: text - gray - 300 mt - 4 mb - 2;
}

.markdown - content p {
  @apply mb - 4 text - gray - 700 dark: text - gray - 300;
}

.markdown - content ul, .markdown - content ol {
  @apply pl - 7 my - 3;
}

.markdown - content ul {
  @apply list - disc;
}

.markdown - content ol {
  @apply list - decimal;
}

.markdown - content li {
  @apply mb - 1.5 relative;
}

.markdown - content a {
  @apply text - blue - 600 dark: text - blue - 400 no - underline hover: underline;
}

.markdown - content blockquote {
  @apply border - l - 4 border - blue - 300 dark: border - blue - 700 pl - 4 py - 2 my - 4 text - gray - 600 dark: text - gray - 400 italic bg - blue - 50 dark: bg - blue - 950 / 50 rounded - r - md;
}

/* Tablas técnicas */
.markdown - content table {
  @apply w - full my - 6 border - collapse overflow - hidden rounded - md;
}

.markdown - content table thead {
  @apply bg - gradient - to - r from - blue - 50 to - blue - 100 / 50 dark: from - blue - 900 / 50 dark: to - blue - 800 / 30;
}

.markdown - content table th {
  @apply text - left p - 3 font - medium text - blue - 800 dark: text - blue - 300 border - b border - blue - 200 dark: border - blue - 800 sticky top - 0 z - 10;
}

.markdown - content table td {
  @apply p - 3 border - b border - blue - 200 / 30 dark: border - blue - 800 / 30 align - middle;
}

/* Código */
.markdown - content pre {
  @apply bg - gray - 50 dark: bg - gray - 900 border border - gray - 100 dark: border - gray - 800 p - 4 rounded - md overflow - x - auto text - sm my - 6 shadow - inner font - mono relative;
}

.markdown - content code {
  @apply font - mono text - [0.9em] px - 1.5 py - 0.5 bg - gray - 100 / 70 dark: bg - gray - 800 / 70 rounded text - blue - 700 dark: text - blue - 400;
}

/* Scrollbar */
.scrollbar - thin:: -webkit - scrollbar {
  @apply w - 1.5;
}

.scrollbar - thin:: -webkit - scrollbar - track {
  @apply bg - transparent;
}

.scrollbar - thin:: -webkit - scrollbar - thumb {
  @apply bg - blue - 200 dark: bg - blue - 800 rounded - full;
}

.scrollbar - thin:: -webkit - scrollbar - thumb:hover {
  @apply bg - blue - 300 dark: bg - blue - 700;
}

/* Estilos para burbujas de chat */
.message - assistant {
  position: relative;
  border - top - left - radius: 4px!important;
}

.message - assistant::before {
  content: '';
  position: absolute;
  top: 0;
  left: -6px;
  width: 12px;
  height: 12px;
  background: inherit;
  border - left: 1px solid var(--tw - border - color);
  border - bottom: 1px solid var(--tw - border - color);
  border - bottom - left - radius: 12px;
  clip - path: polygon(0 0, 100 % 100 %, 0 100 %);
  transform: rotate(45deg);
  transform - origin: 0 100 %;
}

.message - user {
  position: relative;
  border - top - right - radius: 4px!important;
}

.message - user::before {
  content: '';
  position: absolute;
  top: 0;
  right: -6px;
  width: 12px;
  height: 12px;
  background: inherit;
  border - right: 1px solid var(--tw - border - color);
  border - top: 1px solid var(--tw - border - color);
  border - top - right - radius: 12px;
  clip - path: polygon(0 0, 100 % 0, 100 % 100 %);
  transform: rotate(45deg);
  transform - origin: 100 % 0;
}

/* Ajustes responsivos */
@media(max - width: 640px) {
  .markdown - content pre {
    font - size: 0.75rem;
  }
  
  .markdown - content table {
    display: block;
    overflow - x: auto;
    white - space: nowrap;
  }
  
  .markdown - content table th,
  .markdown - content table td {
    padding: 0.5rem 0.75rem;
  }
}

/* Estilos de efecto de agua */
.water - flow - line {
  position: relative;
}

.water - flow - line::after {
  content: '';
  position: absolute;
  height: 1px;
  width: 100 %;
  bottom: -4px;
  left: 0;
  @apply bg - gradient - to - r from - blue - 300 via - blue - 400 to - blue - 300 dark: from - blue - 700 dark: via - blue - 600 dark: to - blue - 700;
  transform: scaleX(0);
  transform - origin: left;
  transition: transform 0.4s ease;
}

.water - flow - line: hover::after {
  transform: scaleX(1);
}
