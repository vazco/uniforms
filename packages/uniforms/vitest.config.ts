import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["test/**"],
    exclude: ["test/suites/**"],
    environment: "jsdom",
    setupFiles: ["../../scripts/setupVitest"],
  },
});
