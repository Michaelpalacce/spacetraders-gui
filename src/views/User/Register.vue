<template>
	<div class="m-auto w-1/2">
		<div class="mb-4">
			<label class="block text-gray-200 text-sm font-bold mb-2" for="username">
				Choose Username:
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="token" type="text" placeholder="Username" v-model="username">
			<button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm mt-3 mb-3" v-on:click="registerUser">
				Register
			</button>
		</div>
	</div>
</template>


<script>
import api	from "../../models/api";

export default {
	name: "Register",

	data ()
	{
		return {
			username	: ''
		}
	},

	methods:
		{
			registerUser( event )
			{
				const element	= event.target;
				element.classList.add( 'pointer-events-none' );

				api.registerUser( this.username ).then(( token ) => {
					if ( token === null )
					{
						this.username	= '';
						return;
					}

					this.emitter.emit( 'user.register', { username: this.username, token } );
					this.username	= '';

					this.$router.push( '/' );
				}).catch(( error ) => {
					console.log( error );
					this.username	= '';
					element.classList.remove( 'pointer-events-none' );
				});
			}
		}
}
</script>

<style scoped>

</style>