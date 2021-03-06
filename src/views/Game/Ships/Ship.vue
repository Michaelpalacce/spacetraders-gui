<template>
	<CardWrapper class="mb-10">
		<Loader :isHidden="isLoaderHidden"></Loader>

		<div class="text-white" :class="{ hidden: !isLoaderHidden }">
			<div class="font-bold text-xl mb-10">{{ ship.manufacturer }} {{ ship.type }}</div>
			<p class="text-base mb-1">Max Cargo: {{ ship.maxCargo }}</p>
			<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
			<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
			<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
		</div>
	</CardWrapper>

	<CardWrapper>
		<div class="text-white">
			{{ ship.cargo }}
		</div>
	</CardWrapper>

	<Asteroids class="w-1/2 mt-5" :shipId="ship.id"/>
</template>

<script>
import api			from "../../../models/api";
import Loader		from "../../Components/Loader.vue";
import CardWrapper	from "../../Components/CardWrapper.vue";
import Asteroids	from "../Asteroids.vue";

export default {
	inheritAttrs: false,
	components: {
		Loader,
		CardWrapper,
		Asteroids
	},

	data ()
	{
		return {
			ship			: [],
			shipId			: null,
			isLoaderHidden	: true
		}
	},

	created()
	{
		this.shipId	= this.$route.params.id;
		this.getShipData();
	},

	methods:
		{
			async getShipData()
			{
				this.isLoaderHidden	= false;

				if ( api.hasCredentials() )
				{
					const response		= await api.getPlayerData().catch(() => {
						return null
					});

					if ( response === null )
						return;

					let ships			= typeof response !== "undefined" ? response.ships : [];
					ships				= ships.filter(( ship ) => {
						return this.shipId	=== ship.id;
					});
					this.ship			= ships[0];
					this.isLoaderHidden	= true;
				}
			}
		}
}
</script>