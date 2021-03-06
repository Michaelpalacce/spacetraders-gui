<template>
	<CardWrapper class="w-1/2" :width="'w-1/2'">
		<Loader :isHidden="isLoaderHidden"></Loader>

		<div class="text-white text-center" :class="{ hidden: !isLoaderHidden }">
			Asteroid
			<div class="mt-5" v-if="asteroid !== null">
				<span>{{ asteroid.name }}: {{ asteroid.symbol }}</span> <span class="ml-5">X{{asteroid.x}} Y{{asteroid.y}}</span>
				<button v-if="inTransit" class="ml-5 text-blue-200 hover:text-blue-500 cursor-pointer" aria-hidden="true" v-on:click="planRoute( shipId, asteroid.symbol )">ROUTE</button>
				<button v-else class="ml-5 text-blue-200 pointer-events-none" aria-hidden="true">IN TRANSIT</button>
			</div>
		</div>
	</CardWrapper>
</template>

<script>
import CardWrapper	from "../Components/CardWrapper.vue";
import Loader		from "../Components/Loader.vue";
import api			from "../../models/api";

export default {
	name: "Asteroids",
	components: {
		CardWrapper,
		Loader
	},

	props: {
		shipId: String
	},

	data()
	{
		return {
			isLoaderHidden	: true,
			asteroid		: null,
			inTransit		: true
		}
	},

	created() {
		this.getAsteroid();
	},

	methods: {
		/**
		 * @brief	Gets a new asteroid
		 *
		 * @return	void
		 */
		async getAsteroid()
		{
			this.isLoaderHidden		= false;

			const locationResponse	= await api.getLocation( 'ASTEROID' ).catch(( error ) => {
				return null;
			});

			if ( locationResponse === null )
				return;

			this.asteroid		= locationResponse.data.locations[0];
			this.isLoaderHidden	= true;
		},

		/**
		 * @todo	FINISH
		 */
		async planRoute( shipId, destination )
		{
			const createFlightPlan	= await api.createFlightPlan( shipId, destination ).catch(( error ) => {
				return null;
			});

			if ( createFlightPlan === null )
				return;

			this.inTransit	= true;
		}
	}
}
</script>

<style scoped>

</style>