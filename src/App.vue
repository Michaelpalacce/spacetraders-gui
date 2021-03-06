<template>
	<Navbar />
	<router-view/>
</template>

<script>
import Navbar		from "./views/Navbar.vue";

export default {
	name		: 'App',
	components: {
		Navbar,
	}
}
</script>