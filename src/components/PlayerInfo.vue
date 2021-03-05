<template>
	<CardWrapper>
		<div class="text-white">
			<div class="font-bold text-xl mb-10">Player</div>
			<p class="text-base mb-3">
				Name: {{ playerDataResponse.username }}
			</p>
			<p class="text-base mb-3">
				Credits: {{ playerDataResponse.credits }}
			</p>
			<p class="text-base mb-3">
				Loans:
				<br>
				<div v-for="loan in playerDataResponse.loans">
					<p class="text-base mb-1 mt-5">Type: {{ loan.type }}</p>
					<p class="text-base mb-1">Status: {{ loan.status }}</p>
					<p class="text-base mb-1">Due Date: {{ loan.due }}</p>
					<p class="text-base mb-1">Amount Left: {{ loan.repaymentAmount }}</p>
					<div class="mb-10"></div>
					<hr>
				</div>
			</p>
		</div>
	</CardWrapper>
</template>

<script>
import api			from './models/api'
import CardWrapper	from "./general/CardWrapper.vue";

export default {
	components: {
		CardWrapper
	},

	data ()
	{
		return {
			playerDataResponse	: {},
		}
	},

	created()
	{
		this.emitter.on( 'user.login', this.refreshData );
		this.emitter.on( 'loan.new', this.refreshData );
		this.emitter.on( 'ship.new', this.refreshData );

		this.refreshData();
	},

	methods:
	{
		async refreshData()
		{
			if ( api.hasCredentials() )
			{
				this.playerDataResponse	= await api.getPlayerData().catch(() => {
					return {}
				});
			}
		}
	}
}
</script>