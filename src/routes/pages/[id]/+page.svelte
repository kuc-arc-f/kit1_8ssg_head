<!-- routes/posts/[id]/+page.svelte -->
<svelte:head>
	<title>Posts</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { marked } from 'marked';
import type { PageServerData } from './$types';
import Config from '$lib/LibConfig';	
import LibGraphql from '$lib/LibGraphql';
import LibCommon from '$lib/LibCommon';

export let data:PageServerData, post: any = {};
console.log(data.id);
post = data.item;
let content = post.content;
content = LibGraphql.getTagString(content)
content = marked.parse(content);
const dateStr = LibCommon.converDateString(post.createdAt);
console.log(dateStr);
</script>

<!-- MarkUp -->
<div class="container post_show_wrap">
	<a href={`/`}>
		<button class="btn btn-outline-primary my-2">Back</button>
	</a>
	<hr />	
	<h1>{post.title}</h1>
	Date: {dateStr}<br />
	id: {data.id}
	<hr />
	<div>{@html content}</div>
	<hr />
</div>
