import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const out = path.resolve("dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const zip = new AdmZip(path.resolve("site.zip"));
zip.extractAllTo(out, true);

console.log("Built masudayuichi.jp static site to dist/");
