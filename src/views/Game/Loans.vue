<template>
	<div class="flex mb-4 w-full">
		<div class="w-full h-full">
			<CurrentLoans />
		</div>
	</div>
	<div class="flex mb-4 w-full">
		<div class="w-1/2 h-full m-auto">
			<AvailableLoans />
		</div>
	</div>
</template>

<script>
import api				from "../../models/api";
import AvailableLoans	from "./Loans/AvailableLoans.vue";
import CurrentLoans			from "./Loans/CurrentLoans.vue";

export default {
	components:{
		AvailableLoans,
		CurrentLoans
	},
}
</script>