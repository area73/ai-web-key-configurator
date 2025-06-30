import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KeyConfigurator",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["haunted"],
      output: {
        globals: {
          haunted: "haunted",
        },
      },
    },
    emptyOutDir: true,
    outDir: "dist",
  },
});
