import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  nodeResolve: true,
  files: ["src/**/*.test.ts"],
  plugins: [esbuildPlugin({ ts: true })],
  browsers: [playwrightLauncher({ product: "chromium" })],
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: "coverage",
    threshold: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
    reporters: ["lcov", "text", "html"],
  },
  testFramework: {
    config: {
      timeout: 5000,
    },
  },
};
