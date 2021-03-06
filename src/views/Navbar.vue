<template>
	<div class="flex mb-4 p-5">
		<div class="w-1/2 h-12">
			<div class="w-full block flex-grow lg:items-center lg:w-auto text-white">
				<router-link class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" to="/">Login</router-link>
				<router-link class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" to="/register">Register</router-link>
				<router-link class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" to="/loans">Loans</router-link>
				<router-link class="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" to="/ships">Ships</router-link>
			</div>
		</div>
		<div class="w-1/2 h-12">
			<div class=" text-white float-right mb-10">
				<span class="text-blue-300 mr-2">{{playerDataResponse.username}}</span>
				| <span class="text-green-300 ml-2 mr-2">CR {{ playerDataResponse.credits }}</span>
				| <span class="ml-2" :class="serverStatusColor">{{ serverStatus }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import api			from "../models/api";
import CardWrapper	from "./Components/CardWrapper.vue";

export default {
	name: 'Navbar',
	components: {
		CardWrapper
	},

	data ()
	{
		return {
			playerDataResponse	: {},
			serverStatus		: 'DOWN',
			serverStatusColor	: 'text-red-500',
		}
	},

	created()
	{
		this.emitter.on( 'user.login', this.refreshData );
		this.emitter.on( 'user.refresh', this.refreshData );
		this.refreshData();
		this.pollStatus( 60 );
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
			},

			/**
			 * @brief	Polls the server status every x amount of seconds
			 *
			 * @param	{Number} interval
			 *
			 * @return	void
			 */
			pollStatus( interval )
			{
				this.setStatus();

				setInterval( () => {
					this.setStatus();
				}, interval * 1000 );
			},

			/**
			 * @brief	Sets the status to either OK or DOWN
			 *
			 * @return	{Promise<void>}
			 */
			async setStatus()
			{
				const isServerUp	= await api.isServerUp().catch( () => {
					return false;
				});

				if ( isServerUp )
				{
					this.serverStatus		= 'OK';
					this.serverStatusColor	= 'text-green-500';
				}
				else
				{
					this.serverStatus		= 'DOWN';
					this.serverStatusColor	= 'text-red-500';
				}
			},
		}
}
</script>

<style scoped>

</style>