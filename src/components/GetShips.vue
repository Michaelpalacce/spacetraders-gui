<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
		<div class="px-6 py-4 text-white">
			<div class="font-bold text-xl mb-2">Purchase Ship:</div>
			<div v-for="ship in availableShips">
				<p class="text-base mb-1 mt-5">Type: {{ ship.type }}</p>
				<p class="text-base mb-1">Max Cargo: {{ ship.maxCargo }}</p>
				<p class="text-base mb-1">Speed: {{ ship.speed }}</p>
				<p class="text-base mb-1">Manufacturer: {{ ship.manufacturer }}</p>
				<p class="text-base mb-1">Plating: {{ ship.plating }}</p>
				<p class="text-base mb-1">Weapons: {{ ship.weapons }}</p>
				<p class="text-base mb-1">Locations:</p>
				<div class="flex flex-wrap" v-for="location in ship.purchaseLocations">
					<div class="w-full sm:w-1/2 md:w-1/3 mb-3 mt-3 p-2">
						{{location.location}}
					</div>
					<div class="w-full sm:w-1/2 md:w-1/3 mb-3 mt-3 p-2">
						<p class="text-base mb-1">Price: {{ location.price }}</p>
					</div>
					<button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm mt-3 mb-3" v-bind:value="JSON.stringify( { type: ship.type, location: location.location } )" v-on:click="purchaseShip">
						Buy
					</button>
				</div>
				<div class="mb-10"></div>
				<hr>
			</div>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-5 mt-5" v-on:click="refreshShips">
				Refresh Ships
			</button>
		</div>
	</div>
</template>

<script>
import api from './models/api'

export default {
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
			const data					= JSON.parse( event.target.value );
			const purchaseShipResponse	= await api.purchaseShip( data ).catch( ( err ) => {
				return null;
			});

			if ( purchaseShipResponse !== null )
				this.emitter.emit( 'ship.new' );

			this.availableShips	= [];
		}
	}
}
</script>