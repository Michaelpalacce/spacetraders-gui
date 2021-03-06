<template>
	<div :class="{ hidden: isHidden }" class="lds-ring"><div></div><div></div><div></div><div></div></div>
</template>

<script>
export default {
	name: "Loader",
	props: {
		isHidden: Boolean
	}
}
</script>

<style scoped>

</style>