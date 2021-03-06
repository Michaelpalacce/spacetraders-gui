<template>
	<CardWrapper>
		<Loader :isHidden="isLoaderHidden"></Loader>

		<span class="text-white mb-3" :class="{ hidden: !isLoaderHidden }">
			Loans:
			<br>
			<div v-for="loan in loans">
				<p class="text-base mb-2 mt-2"><span class="text-green-300">CR {{ loan.repaymentAmount }}</span> due: {{ loan.due }}</p>
			</div>
		</span>
	</CardWrapper>
</template>

<script>
import CardWrapper	from "../../Components/CardWrapper.vue";
import Loader		from "../../Components/Loader.vue";
import api			from "../../../models/api";
import moment		from "moment";

export default {
	name: "CurrentLoans",
	components: {
		CardWrapper,
		Loader
	},

	data()
	{
		return {
			loans			: [],
			isLoaderHidden	: false
		}
	},

	created() {
		this.emitter.on( 'loan.new', this.refreshData )

		this.refreshData();
	},

	methods:
	{
		async refreshData()
		{
			this.isLoaderHidden	= false;

			if ( api.hasCredentials() )
			{
				const playerDataResponse	= await api.getPlayerData().catch(() => {
					return {};
				});
				this.isLoaderHidden			= true;

				const loans					= typeof playerDataResponse.loans !== "undefined" ? playerDataResponse.loans : [];
				this.loans					= loans.map(( loan ) => {
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