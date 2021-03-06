<template>
	<CardWrapper>
		<div class="text-white">
			<div class="font-bold text-xl mb-10 p-2">
				Purchase Ship:
				<i class="fa fa-refresh float-right text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="refreshShips"></i>
			</div>

			<div v-for="ship in availableShips">
				<p class="text-base mb-1 mt-5">Type: {{ ship.manufacturer }} {{ ship.type }}</p>
				<p class="text-base mb-1">Cargo Capacity: {{ ship.maxCargo }}</p>
				<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
				<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
				<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
<!--				<p class="text-base mb-1">Docking Efficiency: {{ ship.dockingEfficiency }}</p>-->
<!--				<p class="text-base mb-1">Fuel Efficiency: {{ ship.fuelEfficiency }}</p>-->
				<p class="text-base mb-1">Purchase From:</p>
				<div class="flex flex-wrap p-5" v-for="location in ship.purchaseLocations">
					<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4">
						{{location.location}}
					</div>
					<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 text-green-300">
						CR {{ location.price }}
					</div>
					<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4">
						<button class="fa fa-shopping-cart lg:text-2xl text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="purchaseShip" v-bind:value="JSON.stringify( { type: ship.type, location: location.location } )"></button>
					</div>
				</div>
				<div class="mb-10"></div>
				<hr>
			</div>
		</div>
	</CardWrapper>
</template>

<script>
import api			from "../../../models/api";
import CardWrapper	from "../../Components/CardWrapper.vue";

export default {
	components:{
		CardWrapper
	},

	data ()
	{
		return {
			availableShips	: [],
		}
	},

	methods: {
		refreshShips()
		{
			if ( api.hasCredentials() )
			{
				api.getShips().then(( response ) => {
					this.availableShips	= response;
				}).catch(()=>{
					this.availableShips	= [];
				});
			}
		},

		/**
		 * @brief	Purchases a ship
		 *
		 * @param	Event event
		 *
		 * @return	{Promise<void>}
		 */
		async purchaseShip( event )
		{
			this.availableShips			= [];

			const data					= JSON.parse( event.target.value );
			const purchaseShipResponse	= await api.purchaseShip( data ).catch( ( err ) => {
				return null;
			});

			if ( purchaseShipResponse !== null )
			{
				this.emitter.emit( 'user.refresh' );
				this.emitter.emit( 'ship.new' );
			}

			this.availableShips	= [];
		}
	}
}
</script>

<style scoped>

</style>