import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { remarkExtractHeaders } from './remark-extract-headers.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md'],
		remarkPlugins: [remarkExtractHeaders],
	})],
	kit: {
		adapter: adapter()
	}
};

export default config;
