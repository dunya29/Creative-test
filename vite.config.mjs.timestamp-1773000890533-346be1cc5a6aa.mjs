// vite.config.mjs
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/vite/dist/node/index.js";
import vue from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import autoprefixer from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/autoprefixer/lib/autoprefixer.js";
import mqpacker from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/node-css-mqpacker/index.js";
import sortMediaQueries from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/postcss-sort-media-queries/index.js";
import postcssMqLast from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/postcss-mq-last/index.js";
import { ViteImageOptimizer } from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { imagetools } from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/vite-imagetools/dist/index.js";
import VitePluginWebpAndPath from "file:///home/j/jameel2829/creative-test.ru/Creative-test/node_modules/vite-plugin-webp-and-path/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///home/j/jameel2829/creative-test.ru/Creative-test/vite.config.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteImageOptimizer({}),
    //public img optimize
    imagetools(),
    //src img optimize convert to webp
    VitePluginWebpAndPath({
      targetDir: "./src/assets/images/content/webp",
      quality: 100
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "last 2 version",
            "> 1%"
          ]
        }),
        mqpacker(),
        sortMediaQueries({
          sort: "mobile-first"
          // default
        }),
        postcssMqLast()
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvai9qYW1lZWwyODI5L2NyZWF0aXZlLXRlc3QucnUvQ3JlYXRpdmUtdGVzdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvai9qYW1lZWwyODI5L2NyZWF0aXZlLXRlc3QucnUvQ3JlYXRpdmUtdGVzdC92aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvai9qYW1lZWwyODI5L2NyZWF0aXZlLXRlc3QucnUvQ3JlYXRpdmUtdGVzdC92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgbXFwYWNrZXIgZnJvbSAnbm9kZS1jc3MtbXFwYWNrZXInXG5pbXBvcnQgc29ydE1lZGlhUXVlcmllcyBmcm9tICdwb3N0Y3NzLXNvcnQtbWVkaWEtcXVlcmllcydcbmltcG9ydCBwb3N0Y3NzTXFMYXN0IGZyb20gJ3Bvc3Rjc3MtbXEtbGFzdCdcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcidcbmltcG9ydCB7IGltYWdldG9vbHMgfSBmcm9tICd2aXRlLWltYWdldG9vbHMnXG5pbXBvcnQgVml0ZVBsdWdpbldlYnBBbmRQYXRoIGZyb20gJ3ZpdGUtcGx1Z2luLXdlYnAtYW5kLXBhdGgnXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgdnVlSnN4KCksXG4gICAgICAgIFZpdGVJbWFnZU9wdGltaXplcih7fSksLy9wdWJsaWMgaW1nIG9wdGltaXplXG4gICAgICAgIGltYWdldG9vbHMoKSwgLy9zcmMgaW1nIG9wdGltaXplIGNvbnZlcnQgdG8gd2VicFxuICAgICAgICBWaXRlUGx1Z2luV2VicEFuZFBhdGgoe1xuICAgICAgICAgICAgdGFyZ2V0RGlyOiAnLi9zcmMvYXNzZXRzL2ltYWdlcy9jb250ZW50L3dlYnAnLFxuICAgICAgICAgICAgcXVhbGl0eTogMTAwXG4gICAgICAgIH0pLCAgICBcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhc3QgMiB2ZXJzaW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICc+IDElJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbXFwYWNrZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0TWVkaWFRdWVyaWVzKHtcbiAgICAgICAgICAgICAgICAgICAgc29ydDogJ21vYmlsZS1maXJzdCcgLy8gZGVmYXVsdFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHBvc3Rjc3NNcUxhc3QoKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sICBcbiAgICB9IFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVUsU0FBUyxlQUFlLFdBQVc7QUFFMVcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGNBQWM7QUFDckIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTywyQkFBMkI7QUFYeUssSUFBTSwyQ0FBMkM7QUFhNVAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsbUJBQW1CLENBQUMsQ0FBQztBQUFBO0FBQUEsSUFDckIsV0FBVztBQUFBO0FBQUEsSUFDWCxzQkFBc0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLEtBQUs7QUFBQSxNQUNUO0FBQUEsSUFDSjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ0wsYUFBYTtBQUFBLFVBQ1Qsc0JBQXNCO0FBQUEsWUFDbEI7QUFBQSxZQUNBO0FBQUEsVUFDSjtBQUFBLFFBQ0osQ0FBQztBQUFBLFFBQ0QsU0FBUztBQUFBLFFBQ1QsaUJBQWlCO0FBQUEsVUFDYixNQUFNO0FBQUE7QUFBQSxRQUNWLENBQUM7QUFBQSxRQUNELGNBQWM7QUFBQSxNQUNsQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
