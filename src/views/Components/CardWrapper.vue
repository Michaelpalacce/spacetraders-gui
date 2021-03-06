<template>
	<div class="p-6 rounded overflow-hidden shadow-lg bg-gray-800 m-auto" :class="width">
		<slot />
	</div>
</template>

<script>
export default {
	name: "CardWrapper",
	props: {
		width: {
			type: String,
			default: 'w-5/6 '
		}
	}
}
</script>

<style scoped>

</style>