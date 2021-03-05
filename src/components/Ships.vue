<template>
	<CardWrapper>
		<div class="text-white">
			<div class="font-bold text-xl mb-10">Ships:</div>
			<div v-for="ship in playerDataResponse.ships">
				<p class="text-base mb-1 mt-5">Type: {{ ship.type }}</p>
				<p class="text-base mb-1">Max Cargo: {{ ship.maxCargo }}</p>
				<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
				<p class="text-base mb-1">Manufacturer: {{ ship.manufacturer }}</p>
				<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
				<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
				<p class="text-base mb-1">Cargo: {{ ship.cargo }}</p>
				<div class="mb-10"></div>
				<hr>
			</div>
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
		this.emitter.on( 'ship.new', this.refreshData );

		this.refreshData();
	},

	methods:
	{
		async refreshData()
		{
			if ( api.hasCredentials() )
			{
				const response	= await api.getPlayerData().catch(() => {
					return {}
				});
				console.log( response );

				this.playerDataResponse	= response;
			}
		}
	}
}
</script>