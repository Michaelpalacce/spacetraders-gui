<template>
	<CardWrapper>
		<Loader :isHidden="isLoaderHidden"></Loader>

		<div class="text-white" :class="{ hidden: !isLoaderHidden }">
			<div class="font-bold text-xl mb-10">Ships:</div>
			<div v-for="ship in ships" class="mb-8">
				<router-link class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" :to="`/ship/${ship.id}`">
					{{ ship.manufacturer }} {{ ship.type }}
					<span class="ml-3 text-blue-200">{{ship.fuel}} FUEL</span>
					<span class="ml-3 text-green-200">@ {{typeof ship.location === 'undefined' ? 'IN TRANSIT' : ship.location }}</span>
				</router-link>
				<button class="float-right text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="purchaseFuelForShip(ship.id, 50)">+50 fuel</button>
				<button class="mr-5 float-right text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="purchaseFuelForShip(ship.id, 20)">+20 fuel</button>
				<button class="mr-5 float-right text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="purchaseFuelForShip(ship.id, 10)">+10 fuel</button>
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
					const ships			= typeof response !== "undefined" ? response.ships : [];
					this.ships			= ships.map(( ship )=>{
						let fuel	= 0;
						for ( const cargo of ship.cargo )
						{
							if ( cargo.good === 'FUEL' )
							{
								fuel	= cargo.quantity;
								break;
							}
						}

						return { ...ship, fuel };
					});
				}
			},

			async purchaseFuelForShip( shipId, amount )
			{
				const purchaseResponse	= await api.purchaseGood( shipId, 'FUEL', amount ).catch(() => {
					return null;
				});

				if ( purchaseResponse === null )
					return;

				this.emitter.emit( 'user.refresh' );
				this.refreshData();
			}
		}
}
</script>