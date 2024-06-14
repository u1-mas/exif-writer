import { defineConfig } from "npm:vite@latest";
import { viteSingleFile } from "npm:vite-plugin-singlefile@latest";
import { preact } from "npm:@preact/preset-vite@latest";
import svgr from "npm:vite-plugin-svgr";

import "npm:preact";

// Workaround Preact babel plugin issue in Deno: https://github.com/bluwy/create-vite-extra/issues/34
import "npm:@babel/plugin-transform-react-jsx-development@^7.22.5";
import "npm:@babel/plugin-transform-react-jsx@^7.22.5";
import "npm:babel-plugin-transform-hook-names@^1.0.2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), viteSingleFile(), svgr()],
  build: {
    outDir: "dist",
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
});
