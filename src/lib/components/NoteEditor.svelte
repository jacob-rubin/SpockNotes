<script lang="ts">
	interface Props {
		title: string;
		content: string;
	}

	let { title, content }: Props = $props();
</script>

<div class="card card-sm card-border w-96 shadow-md">
	<div class="card-body">
		<input
			type="text"
			class="input input-bordered card-title w-full"
			bind:value={title}
			placeholder="Title"
		/>
		<textarea class="textarea w-full" placeholder="Note" bind:value={content}></textarea>
	</div>
</div>
