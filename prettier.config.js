/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: ["^react(.*)$", "<THIRD_PARTY_MODULES>", "^[./]|@/(.*)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
