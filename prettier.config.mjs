/** @type {import("prettier").Config} */
export default {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: ["^react(.*)$", "<THIRD_PARTY_MODULES>", "^[./]|@/(.*)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
