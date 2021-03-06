<template>
	<CardWrapper>
		<Loader :isHidden="isLoaderHidden"></Loader>

		<div class="text-white" :class="{ hidden: !isLoaderHidden }">
			<div class="font-bold text-xl mb-10">Ships:</div>
			<div v-for="ship in ships">
				<p class="text-base mb-1 mt-5">Type: {{ ship.manufacturer }} {{ ship.type }}</p>
				<p class="text-base mb-1">Max Cargo: {{ ship.maxCargo }}</p>
				<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
				<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
				<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
				<p class="text-base mb-1">Cargo(needs work): {{ ship.cargo }}</p>
				<div class="mb-10"></div>
				<hr>
			</div>
		</div>
	</CardWrapper>
</template>

<script>
import api			from "../../../models/api";
import CardWrapper	from "../../Components/CardWrapper.vue";
import Loader		from "../../Components/Loader.vue";

export default {
	components: {
		CardWrapper,
		Loader
	},

	data ()
	{
		return {
			ships			: [],
			isLoaderHidden	: true
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
				this.isLoaderHidden	= false;

				if ( api.hasCredentials() )
				{
					const response		= await api.getPlayerData().catch(() => {
						return null
					});

					this.isLoaderHidden	= true;
					this.ships			= typeof response !== "undefined" ? response.ships : [];
				}
			}
		}
}
</script>