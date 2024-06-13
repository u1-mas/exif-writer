import { viteSingleFile } from "npm:vite-plugin-singlefile@latest";
import viteDeno from "https://deno.land/x/vite_deno_plugin@v0.9.4/mod.ts";
import { defineConfig } from "npm:vite@latest";
import preact from "npm:@preact/preset-vite@latest";
import svgr from "npm:vite-plugin-svgr";

import "preact";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), viteSingleFile(), viteDeno(), svgr()],
  build: {
    outDir: "dist",
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
});
