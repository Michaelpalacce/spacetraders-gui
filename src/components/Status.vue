<template>
	<CardWrapper>
		<div class="text-white">
			<div class="font-bold text-xl mb-10">Server status</div>
			<p class="text-base">
				{{ status }}
			</p>
		</div>
	</CardWrapper>
</template>

<script>
import api			from './models/api'
import CardWrapper	from "./general/CardWrapper.vue";

export default {
	components: {
		CardWrapper
	},
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