<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
		<div class="px-6 py-4 text-white">
			<div class="font-bold text-xl mb-2">Player</div>
			<p class="text-base">
				Name: {{ playerDataResponse.username }}
			</p>
		</div>
		<div class="px-6 py-4 text-white">
			<div class="font-bold text-xl mb-2">Credits:</div>
			<p class="text-base">
				{{ playerDataResponse.credits }}
			</p>
		</div>
		<div class="px-6 py-4 text-white">
			<div class="font-bold text-xl mb-2">Loans:</div>
			<div v-for="loan in playerDataResponse.loans">
				<p class="text-base mb-1 mt-5">Type: {{ loan.type }}</p>
				<p class="text-base mb-1">Status: {{ loan.status }}</p>
				<p class="text-base mb-1">Due Date: {{ loan.due }}</p>
				<p class="text-base mb-1">Amount Left: {{ loan.repaymentAmount }}</p>
				<div class="mb-10"></div>
				<hr>
			</div>
		</div>
	</div>
</template>

<script>
import api from './models/api'

export default {
	data ()
	{
		return {
			playerDataResponse	: {},
		}
	},

	created()
	{
		this.emitter.on( 'login.all-set', this.refreshData );
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