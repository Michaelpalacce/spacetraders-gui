<template>
	<CardWrapper class="mb-10">
		<Loader :isHidden="isLoaderHidden"></Loader>

		<div class="text-white" :class="{ hidden: !isLoaderHidden }">
			<div class="font-bold text-xl mb-10">
				{{ ship.manufacturer }} {{ ship.type }}
				<span class="ml-3 text-blue-200">{{ship.fuel}} FUEL</span>
				<span class="ml-3 text-green-200">@ {{typeof ship.location === 'undefined' ? 'IN TRANSIT' : ship.location }}</span>
			</div>
			<p class="text-base mb-1">Cargo: {{ship.spaceAvailable}}/{{ ship.maxCargo }}</p>
			<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
			<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
			<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
		</div>
	</CardWrapper>

	<CardWrapper>
		<div class="text-white">
			<ul v-for="cargo in ship.cargo">
				<li class="text-indigo-300">{{cargo.good}} : {{cargo.quantity}}</li>
			</ul>
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
		this.emitter.on( `${this.shipId}.refresh`, this.getShipData );
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

					let ships	= typeof response !== "undefined" ? response.ships : [];
					let found	= false;

					ships.filter(( ship ) => {
						if ( this.shipId !== ship.id )
							return false;

						let fuel	= 0;
						for ( const cargo of ship.cargo )
						{
							if ( cargo.good === 'FUEL' )
							{
								fuel	= cargo.quantity;
								break;
							}
						}

						this.ship		= { ...ship, fuel };
						return found	= true;
					});

					if ( ! found )
						this.$router.push( '/ships' );

					this.isLoaderHidden	= true;
				}
			}
		}
}
</script>