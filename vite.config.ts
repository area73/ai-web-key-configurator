import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KeyConfigurator",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      // Haunted ya no es externo, así que el bundle lo incluirá
      external: [],
      output: {
        globals: {},
      },
    },
    emptyOutDir: true,
    outDir: "dist",
  },
  plugins: [
    dts({
      outDir: "dist/types",
      entryRoot: "src",
    }),
  ],
});
