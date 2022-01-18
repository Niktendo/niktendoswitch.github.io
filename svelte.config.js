import path from "path";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import prefixer from "postcss-variables-prefixer";

import a11yEmoji from "@fec/remark-a11y-emoji";
import slug from "rehype-slug";
import github from "remark-github";

import sveld from "vite-plugin-sveld";

import { mdsvex } from "mdsvex";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ".md", ".svx"],
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md"],
			remarkPlugins: [github, a11yEmoji],
			rehypePlugins: [slug]
		}),
		preprocess({
			postcss: {
				plugins: [autoprefixer(), cssnano(), prefixer({ prefix: "fds-" })]
			}
		})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		 target: '#svelte',
		 adapter: adapter({
		   pages: 'build',
		   assets: 'build',
		   fallback: null
		 })
		}
};
export default config;
