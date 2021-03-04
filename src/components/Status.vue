<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
		<div class="px-6 py-4 text-white">
			<div class="font-bold text-xl mb-2">Server status</div>
			<p class="text-base">
				{{ status }}
			</p>
		</div>
	</div>
</template>

<script>
import api from './models/api'

export default {
	data ()
	{
		return {
			status	: null
		}
	},

	created()
	{
		this.pollStatus( 60 );
	},

	methods:
	{
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
				this.status	= 'OK';
			else
				this.status	= 'DOWN';
		},
	}
}
</script>