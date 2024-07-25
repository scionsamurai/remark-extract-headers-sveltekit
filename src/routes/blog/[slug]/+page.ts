import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // Load the post
        const post = await import(`../../../posts/${params.slug}.md`);

        return {
            content: post.default,
            meta: {
                ...post.metadata,
                slug: params.slug
            },
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Could not find ${params.slug}`);
    }
}