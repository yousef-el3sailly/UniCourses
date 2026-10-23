// @lovable.dev/vite-tanstack-config already includes the required plugins.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Use our custom server entry.
    server: {
      entry: "server",
    },

    // Generate static HTML during build for GitHub Pages.
    
  },

  vite: {
    // GitHub Pages project site:
    // https://yousef-el3sailly.github.io/UniCourses/
    base: "/UniCourses/",
  },
});