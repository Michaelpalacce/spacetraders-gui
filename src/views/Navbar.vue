<template>
	<nav class="bg-gray-800">
		<div class="max-w-7xl mx-auto relative flex items-center justify-between sm:items-stretch sm:justify-start p-3">
			<div class="hidden sm:block sm:ml-6">
				<div class="flex space-x-4">
					<router-link class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" to="/">Login</router-link>
					<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/register">Register</router-link>
					<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/loans">Loans</router-link>
					<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/ships">Ships</router-link>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="sm:hidden" id="mobile-menu">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<router-link class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" to="/">Login</router-link>
				<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/register">Register</router-link>
				<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/loans">Loans</router-link>
				<router-link class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/ships">Ships</router-link>
			</div>
		</div>
	</nav>

	<div class="w-full float-right mr-5">
		<div class="text-white float-right mb-10">
			<span class="text-blue-300 mr-2">{{playerDataResponse.username}}</span>
			| <span class="text-green-300 ml-2 mr-2">CR {{ playerDataResponse.credits }}</span>
			| <span class="ml-2" :class="serverStatusColor">{{ serverStatus }}</span>
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