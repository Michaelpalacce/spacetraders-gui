<template>
	<CardWrapper>
		<span class="text-white mb-3">
			Loans:
			<br>
			<div v-for="loan in loans">
				<p class="text-base mb-2 mt-2"><span class="text-green-300">CR {{ loan.repaymentAmount }}</span> due: {{ loan.due }}</p>
			</div>
		</span>
	</CardWrapper>
</template>

<script>
import CardWrapper	from "../../../components/general/CardWrapper.vue";
import api			from "../../../components/models/api";
import moment		from "moment";

export default {
	name: "CurrentLoans",
	components: {
		CardWrapper
	},

	data()
	{
		return {
			loans	: []
		}
	},

	created() {
		this.refreshData();
	},

	methods:
	{
		async refreshData()
		{
			if ( api.hasCredentials() )
			{
				const playerDataResponse	= await api.getPlayerData().catch(() => {
					return {};
				});

				const loans	= typeof playerDataResponse.loans !== "undefined" ? playerDataResponse.loans : [];

				this.loans	= loans.map(( loan ) => {
					loan.due	= moment( loan.due ).format( 'MMMM Do, h:mm:ss a' );

					return loan;
				});
			}
		}
	}
}
</script>

<style scoped>

</style>