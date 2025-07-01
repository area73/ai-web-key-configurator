#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const readline = require("readline");

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
  execSync(`git push origin main --follow-tags`, { stdio: "inherit" });
  execSync(`git push origin v${version}`, { stdio: "inherit" });
  console.log(`\n¡Release v${version} creado y subido!`);
})();
