import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const out = path.resolve("dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const parts = ["site.part1.txt","site.part2.txt","site.part3.txt","site.part4.txt","site.part5.txt","site.part6.txt"];
const b64 = parts.map((p)=>fs.readFileSync(path.resolve(p),"utf8").trim()).join("");
const zip = new AdmZip(Buffer.from(b64, "base64"));
zip.extractAllTo(out, true);

console.log("Built masudayuichi.jp static site to dist/");
