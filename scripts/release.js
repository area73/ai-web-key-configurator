#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

(async () => {
  let version = process.argv[2];
  if (!version) {
    version = await prompt("Nueva versión (ej: 1.1.0): ");
  }
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    console.error("Versión inválida. Usa formato X.Y.Z");
    process.exit(1);
  }
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  execSync("git add package.json", { stdio: "inherit" });
  execSync(`git commit -m "release: v${version}"`, { stdio: "inherit" });
  execSync(`git tag v${version}`, { stdio: "inherit" });
  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();
  execSync(`git push origin ${currentBranch} --follow-tags`, {
    stdio: "inherit",
  });
  execSync(`git push origin v${version}`, { stdio: "inherit" });
  console.log(`\n¡Release v${version} creado y subido!`);
})();
