// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import remarkCodeTitles from "remark-code-title";

export default defineConfig({
  site: "https://blog.serchinastico.com",
  markdown: { remarkPlugins: [remarkCodeTitles] },
  integrations: [mdx(), sitemap(), tailwind()],
});
