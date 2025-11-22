// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt(
  // 1) Nuxt’s own configs go first (handled internally by withNuxt)
  // 2) Then we append our configs, with eslint-config-prettier LAST

  eslintConfigPrettier,
  {
    // Optional: your own overrides that you KNOW don’t conflict with Prettier
    // (or just omit this object entirely for now)
    rules: {
      // example:
      // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
);
