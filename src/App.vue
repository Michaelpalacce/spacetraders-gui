<template>
	<div class="bg-white flex-col">
		Server status: {{ status }}
	</div>

	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
		<div class="mb-4">
			<label class="block text-grey-darker text-sm font-bold mb-2" for="username">
				Username
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
		</div>
		<div class="mb-6">
			<label class="block text-grey-darker text-sm font-bold mb-2" for="password">
				Password
			</label>
			<input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************">
		</div>
		<div class="flex items-center justify-between">
			<button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
				Sign In
			</button>
		</div>
	</div>
</template>

<script>
	import axios	from 'axios';

	export default {
		data ()
		{
			return {
				status			: null,
				endpoint		: 'https://api.spacetraders.io',
				allGoodStatus	: 'spacetraders is currently online and available to play'
			}
		},

		async created()
		{
			const statusResponse	= await this.getStatus();

			if ( statusResponse.status === 200 && statusResponse.data.status === this.allGoodStatus )
				this.status	= 'OK';
			else
				this.status	= 'DOWN';
		},

		methods:
		{
			getStatus()
			{
				return axios.get( `${this.endpoint}/game/status` ).catch( e => console.log( e ) );
			}
		}
	}
</script>