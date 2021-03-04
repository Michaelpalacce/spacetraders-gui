<template>
		<div class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 flex flex-col max-w-sm">
			<div class="mb-4">
				<label class="block text-gray-200 text-sm font-bold mb-2" for="username">
					Paste Token:
				</label>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="token" type="text" placeholder="Token" v-bind:value="token" v-on:change="setToken">
			</div>
			<div class="mb-4">
				<label class="block text-gray-200 text-sm font-bold mb-2" for="username">
					Username:
				</label>
				<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" v-bind:value="username" v-on:change="setUsername">
			</div>
		</div>
</template>

<script>
import api from './models/api'

export default {
	name: "Login",
	data ()
	{
		return {
			token		: localStorage.token,
			username	: localStorage.username,
		}
	},

	methods:
	{
		setToken( event )
		{
			this.token			= event.target.value;
			localStorage.token	= this.token;
			this.attemptLogin();
		},

		setUsername( event )
		{
			this.username			= event.target.value;
			localStorage.username	= this.username;
			this.attemptLogin();
		},

		attemptLogin()
		{
			if ( localStorage.username && localStorage.token )
			{
				const auth	= { token: this.token, username: this.username };
				api.setCredentials( auth );

				this.emitter.emit( 'login.all-set' );
			}
		}
	}
}
</script>