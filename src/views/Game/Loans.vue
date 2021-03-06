<template>
	<div class="flex mb-4">
		<div class="w-1/2 h-12">
			<CurrentLoans />
		</div>
		<div class="w-1/2 h-12">
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