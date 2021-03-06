<template>
	<div class="flex mb-4">
		<div class="w-1/2 h-12">
			<PurchaseShips />
		</div>
		<div class="w-1/2 h-12">
			<AvailableShips />
		</div>
	</div>


</template>

<script>
import PurchaseShips	from "./Ships/PurchaseShips.vue";
import AvailableShips	from "./Ships/AvailableShips.vue";

export default {
	components: {
		PurchaseShips,
		AvailableShips
	}
}
</script>