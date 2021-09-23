1. Check that compiling a svelte file can later be required for SSR (with our constraints)
    'svelte/register' => cmpt.default.render({ props }) => { html, css, head }
1.a. Try to do this but without requiring svelte as an SSR rendering dependency (no `svelte/register`)
2. Same thing, but with a external js function call
3. Same thing, but with a < lang="ts">
4. Same thing, but with an external ts function call
