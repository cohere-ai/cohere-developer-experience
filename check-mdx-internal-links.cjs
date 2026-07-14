#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const posix = path.posix;

const ROOT = process.cwd();
const FERN = path.join(ROOT, "fern");
const warnOnly = process.argv.includes("--warn-only");

if (!fs.existsSync(FERN)) {
  console.error(`No fern/ directory found under current working directory: ${ROOT}`);
  console.error("Run this script from the repository root.");
  process.exit(2);
}

const pageFiles = [];
const allFiles = new Set();
const routeToFile = new Map();
const fileToRoutes = new Map();
const redirects = new Set();
const generatedRoutes = new Set();
const docVersions = []; // [{ prefix: "v2", navPaths: Set<string> }, ...]

function loadDocVersions() {
  const docsYml = path.join(ROOT, "fern/docs.yml");
  if (!fs.existsSync(docsYml)) return;
  const lines = fs.readFileSync(docsYml, "utf8").split("\n");
  const startIdx = lines.findIndex((l) => /^versions:\s*$/.test(l));
  if (startIdx === -1) return;
  const blockLines = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === "") continue;
    if (!/^\s/.test(l)) break;
    blockLines.push(l);
  }
  const entryRe = /-\s*display-name:[^\n]*\n\s*path:\s*["']?([^"'\n]+?)["']?\s*\n\s*slug:\s*["']?([^"'\n]+?)["']?\s*(?=\n|$)/g;
  for (const m of blockLines.join("\n").matchAll(entryRe)) {
    const ymlPath = path.join(FERN, m[1].trim().replace(/^\.\//, ""));
    const prefix = m[2].trim();
    const navPaths = new Set();
    if (fs.existsSync(ymlPath)) {
      const ymlText = fs.readFileSync(ymlPath, "utf8");
      for (const pm of ymlText.matchAll(/^\s*path:\s*["']?([^"'\n]+?)["']?\s*$/gm)) {
        navPaths.add(`fern/${pm[1].trim()}`);
      }
    }
    docVersions.push({ prefix, navPaths });
  }
}

function toPosix(p) {
  return p.split(path.sep).join("/");
}

// In the walk() function or before scanning files, skip -ARCHIVE-
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === '-ARCHIVE-') continue; // add this
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function relPath(abs) {
  return toPosix(path.relative(ROOT, abs));
}

function stripHashQuery(s) {
  return s.split("#")[0].split("?")[0];
}

function stripMdxSuffix(s) {
  return s.replace(/\.(md|mdx)$/i, "");
}

function normalizeRoute(s) {
  s = stripHashQuery(s).trim();
  s = stripMdxSuffix(s);
  if (!s.startsWith("/")) s = "/" + s;
  s = s.replace(/\/+$/, "");
  return s || "/";
}

function frontmatter(text) {
  if (!text.startsWith("---")) return "";
  const parts = text.split("---");
  return parts.length >= 3 ? parts[1] : "";
}

function frontmatterValue(fm, key) {
  const re = new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?\\s*$`, "m");
  return fm.match(re)?.[1]?.trim();
}

function addRoute(file, route) {
  route = normalizeRoute(route);
  routeToFile.set(route, file);
  if (!fileToRoutes.has(file)) fileToRoutes.set(file, []);
  fileToRoutes.get(file).push(route);
}

function addGeneratedRoute(route) {
  generatedRoutes.add(normalizeRoute(route));
}

function dateRouteFromChangelog(file) {
  const name = posix.basename(file);
  const match = name.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (!match) return null;
  const [, y, mm, dd] = match;
  return `/changelog/${Number(y)}/${Number(mm)}/${Number(dd)}`;
}

function loadFiles() {
  for (const abs of walk(FERN)) {
    const rel = relPath(abs);
    allFiles.add(rel);

    if (!/\.(md|mdx)$/.test(rel)) continue;
    if (rel.startsWith("fern/archived/")) continue;
    if (rel.startsWith("fern/snippets/")) continue;

    pageFiles.push(rel);

    const text = fs.readFileSync(abs, "utf8");
    const fm = frontmatter(text);
    let slug = frontmatterValue(fm, "slug");
    if (slug) slug = slug.replace(/^\/+/, ""); // some pages write "slug: /docs/x" with a leading slash

    if (slug) {
      addRoute(rel, `/${slug}`);
      docVersions.forEach(({ prefix, navPaths }, i) => {
        if (!navPaths.has(rel)) return;
        const bareSlug = slug.startsWith(`${prefix}/`) ? slug.slice(prefix.length + 1) : slug;
        addRoute(rel, `/${prefix}/${bareSlug}`);
        if (i === 0) addRoute(rel, `/${bareSlug}`); // first-listed version is the default
      });
    }

    if (rel.includes("/changelog/")) {
      const dateRoute = dateRouteFromChangelog(rel);
      if (dateRoute) {
        addRoute(rel, dateRoute);
      }
    }
  }
}

function loadRedirects() {
  const docsYml = path.join(ROOT, "fern/docs.yml");
  if (!fs.existsSync(docsYml)) return;
  const text = fs.readFileSync(docsYml, "utf8");
  // Redirect sources are gone pages — callers shouldn't reach them, but they're still "known".
  for (const match of text.matchAll(/^\s*-\s*source:\s*["']?([^"'\n]+?)["']?\s*$/gm)) {
     redirects.add(normalizeRoute(match[1]));
  }
  // Redirect destinations are *valid* pages that currently exist.
  for (const match of text.matchAll(/^\s*destination:\s*["']?([^"'\n]+?)["']?\s*$/gm)) {
    generatedRoutes.add(normalizeRoute(match[1]));
  }
}

function loadKnownRoots() {
  [
    "/",
    "/docs",
    "/reference",
    "/changelog",
    "/page",
    "/v1",
    "/v1/docs",
    "/v1/reference",
    "/v1/changelog",
    "/v2",
    "/v2/docs",
    "/v2/reference",
    "/v2/changelog",
  ].forEach(addGeneratedRoute);
}

function isExternal(url) {
  return /^(https?:|mailto:|emailto:|tel:|#|javascript:|data:|url:)/i.test(url);
}

// Targets that look like link syntax accidents, not real URLs.
// - "**something" : Python dict-unpacking operator or Markdown bold inside link
// - text wrapped in " or ' : quoted filename literal, not a URL
// - "<>" or "< >" : empty angle-bracket placeholder
function isNonsenseTarget(url) {
  if (url.startsWith("**")) return true;
  if ((url.startsWith('"') && url.endsWith('"')) ||
      (url.startsWith("'") && url.endsWith("'"))) return true;
  if (/^[<>\s]*$/.test(url)) return true;
  return false;
}

// Route prefixes whose pages are generated outside this repo
// (API spec, marketing site, blog) — we cannot verify them here.
const EXTERNAL_ROUTE_PREFIXES = [
  "/reference/",    // Fern-generated API reference pages (v1)
  "/v2/reference/", // Fern-generated API reference pages (v2)
  "/page/",         // Cohere marketing / cookbook pages
  "/blog/",         // Cohere blog posts
];

function isRelativeInternalLink(url) {
  return !url.startsWith("/") && !isExternal(url);
}

function isLikelyAsset(url) {
  return /\.(png|jpe?g|gif|svg|webp|ico|pdf|zip)$/i.test(stripHashQuery(url));
}

function lineNumberForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function resolveFileTarget(file, target) {
  const clean = stripHashQuery(target);
  const base = posix.dirname(file);
  const resolved = posix.normalize(posix.join(base, clean));
  const candidates = [];

  if (/\.(md|mdx|png|jpe?g|gif|svg|webp|ico|pdf|zip)$/i.test(resolved)) {
    candidates.push(resolved);
  } else {
    candidates.push(`${resolved}.mdx`, `${resolved}.md`, `${resolved}/index.mdx`);
  }

  return candidates.find((c) => allFiles.has(c));
}

// Fern resolves image/asset references more leniently than page routing:
// relative image paths that "overshoot" the correct number of "../" segments
// still render live, apparently via a basename search across the assets tree
// rather than a strict relative-path match. Build a basename index so the
// checker matches this real-world behavior instead of flagging false positives.
const assetBasenames = new Map();

function indexAssetBasenames() {
  for (const f of allFiles) {
    if (!/\/assets\//.test(f)) continue;
    if (!/\.(png|jpe?g|gif|svg|webp|ico|pdf|zip)$/i.test(f)) continue;
    const base = posix.basename(f);
    if (!assetBasenames.has(base)) assetBasenames.set(base, []);
    assetBasenames.get(base).push(f);
  }
}

function resolveAssetByBasename(target) {
  const base = posix.basename(stripHashQuery(target));
  return assetBasenames.has(base);
}

function renderedRouteTargets(file, target) {
  const routes = fileToRoutes.get(file) || [];
  const out = [];
  for (const route of routes) {
    const resolved = new URL(target, `https://docs.local${route}`).pathname;
    out.push(normalizeRoute(resolved));
  }
  return out;
}

function routeExists(route) {
  route = normalizeRoute(route);
  if (routeToFile.has(route) || redirects.has(route) || generatedRoutes.has(route)) return true;
  // Pages generated outside this repo (API spec, blog, marketing site)
  if (EXTERNAL_ROUTE_PREFIXES.some(p => route.startsWith(p))) return true;
  return false;
}

function extractMarkdownLinks(text) {
  const links = [];
  const re = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  for (const m of text.matchAll(re)) {
    links.push({
      kind: m[1] ? "image" : "link",
      target: m[3],
      index: m.index,
    });
  }
  return links;
}

function extractJsxLinks(text) {
  const links = [];

  for (const m of text.matchAll(/<Markdown\b[^>]*\bsrc=["']([^"']+)["'][^>]*\/?>/g)) {
    links.push({ kind: "markdown-src", target: m[1], index: m.index });
  }

  for (const m of text.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*\/?>/g)) {
    links.push({ kind: "image", target: m[1], index: m.index });
  }

  for (const m of text.matchAll(/\bhref=["']([^"']+)["']/g)) {
    // Strip stray trailing ) that leaked from surrounding Markdown parentheticals
    // (Markdown link regex stops at ) but JSX href regex does not)
    const target = m[1].replace(/\)+$/, "");
    links.push({ kind: "link", target, index: m.index });
  }

  return links;
}

loadDocVersions();
loadFiles();
loadRedirects();
loadKnownRoots();
indexAssetBasenames();

const errors = [];
const warnings = [];
const seenReports = new Set();

function report(kind, message) {
  const key = `${kind}:${message}`;
  if (seenReports.has(key)) return;
  seenReports.add(key);

  if (kind === "error") {
    errors.push(message);
  } else {
    warnings.push(message);
  }
}

for (const file of pageFiles) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  const links = [...extractMarkdownLinks(text), ...extractJsxLinks(text)];

  for (const { kind, target, index } of links) {
    if (!target || isExternal(target)) continue;
    if (isNonsenseTarget(target)) continue;   // skip accidents: **x, "file.png", <>, etc.

    const line = lineNumberForIndex(text, index);

    if (kind === "markdown-src") {
      const found = resolveFileTarget(file, target);
      if (!found) report("error", `${file}:${line}: unresolved <Markdown src="${target}">`);
      continue;
    }

    if (kind === "image" || isLikelyAsset(target)) {
      const found = target.startsWith("/")
        ? allFiles.has(`fern${stripHashQuery(target)}`)
        : resolveFileTarget(file, target);
      if (!found && !resolveAssetByBasename(target)) {
        report("error", `${file}:${line}: unresolved asset "${target}"`);
      }
      continue;
    }

    if (file.includes("/changelog/") && target.startsWith(".")) {
      report("warning", `${file}:${line}: changelog uses relative rendered link "${target}"`);
      // Still validate it below in case it is truly broken.
    }

    if (target.startsWith("/")) {
      const route = normalizeRoute(target);
      if (/\.(md|mdx)([#?].*)?$/i.test(target)) {
        report("error", `${file}:${line}: rendered link includes markdown extension "${target}"`);
        continue;
      }
      if (!routeExists(route)) report("error", `${file}:${line}: unknown root route "${target}"`);
      continue;
    }

    if (isRelativeInternalLink(target)) {
      if (/\.(md|mdx)([#?].*)?$/i.test(target)) {
        report("error", `${file}:${line}: rendered link includes markdown extension "${target}"`);
        continue;
      }

      const sourceFile = resolveFileTarget(file, target);
      const renderedRoutes = renderedRouteTargets(file, target);
      const renderedOk = renderedRoutes.some(routeExists);

      if (!sourceFile && !renderedOk) {
        const why = renderedRoutes.length
          ? "source file not found and rendered route not registered"
          : "source file not found (no route candidates)";
        report(
          "error",
          `${file}:${line}: unresolved relative link "${target}" (${why})` +
          (renderedRoutes.length ? `; rendered candidates: ${renderedRoutes.join(", ")}` : "")
        );
      }
    }
  }
}

console.log(`Scanned ${pageFiles.length} MD/MDX page files`);
console.log(`Known MDX/changelog routes: ${routeToFile.size}`);
console.log(`Redirect sources: ${redirects.size}`);
console.log(`Generated/API/root routes: ${generatedRoutes.size}`);
console.log(`Mode: ${warnOnly ? "warn-only" : "strict"}`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  WARN ${w}`);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  if (warnOnly) {
    console.log("\nWarn-only mode enabled; not failing CI.");
  } else {
    process.exitCode = 1;
  }
} else {
  console.log("\nNo unresolved internal links found.");
}
