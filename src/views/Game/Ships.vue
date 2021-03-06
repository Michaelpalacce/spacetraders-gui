<template>
	<div class="flex mb-4 w-full">
		<div class="w-full h-full">
			<AvailableShips />
		</div>
	</div>
	<div class="flex mb-4 w-full">
		<div class="w-1/2 h-full justify-center m-auto">
			<PurchaseShips />
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