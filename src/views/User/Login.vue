<template>
	<div class="m-auto w-1/2">
		<p class="text-white mb-4">Paste Credentials (no need to click anything)</p>
		<div class="mb-4">
			<label class="block text-gray-200 text-sm font-bold mb-2" for="username">
				Token:
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="token" type="text" placeholder="Token" v-bind:value="token" v-on:change="setToken( $event.target.value )">
		</div>
		<div class="mb-4">
			<label class="block text-gray-200 text-sm font-bold mb-2" for="username">
				Username:
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" v-bind:value="username" v-on:change="setUsername( $event.target.value )">
		</div>
	</div>
</template>

<script>
import api	from "../../components/models/api";

export default {
	name: "Login",

	data ()
	{
		return {
			token		: localStorage.token,
			username	: localStorage.username,
		}
	},

	created() {
		this.emitter.on( 'user.register', ( { username, token } ) => {
			this.setToken( token );
			this.setUsername( username );
		});
	},

	methods:
		{
			setToken( token )
			{
				this.token			= token;
				localStorage.token	= this.token;
				this.attemptLogin();
			},

			setUsername( username )
			{
				this.username			= username;
				localStorage.username	= this.username;
				this.attemptLogin();
			},

			attemptLogin()
			{
				if ( localStorage.username && localStorage.token )
				{
					const auth	= { token: this.token, username: this.username };
					api.setCredentials( auth );

					this.emitter.emit( 'user.login' );
				}
			}
		}
}
</script>

<style scoped>

</style>