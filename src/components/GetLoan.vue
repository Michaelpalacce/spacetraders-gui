<template>
	<CardWrapper>
		<div class="text-white">
			<div class="font-bold text-xl mb-10">Take a Loan:</div>
			<div v-for="loan in availableLoans">
				<p class="text-base mb-1 mt-5">Type: {{ loan.type.toLowerCase() }}</p>
				<p class="text-base mb-1">Collateral Required: {{ loan.collateralRequired }}</p>
				<p class="text-base mb-1">Rate: {{ loan.rate }}</p>
				<p class="text-base mb-1">Term (Days): {{ loan.termInDays }}</p>
				<button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm mt-3" v-bind:value="loan.type" v-on:click="takeLoan">
					Take Loan
				</button>
				<div class="mb-10"></div>
				<hr>
			</div>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right" v-on:click="refreshLoans">
				Refresh Loans
			</button>
		</div>
	</CardWrapper>
</template>

<script>
import api			from './models/api'
import CardWrapper	from "./general/CardWrapper.vue";

export default {
	data ()
	{
		return {
			availableLoans	: [],
		}
	},
	components:{
		CardWrapper
	},

	methods: {
		refreshLoans()
		{
			if ( api.hasCredentials() )
			{
				api.getAvailableLoans().then(( response ) => {
					this.availableLoans	= response;
				}).catch(()=>{
					this.availableLoans	= [];
				});
			}
		},

		async takeLoan( event )
		{
			const type			= event.target.value;
			const loanResponse	= await api.takeOutLoan( type ).catch( ( err ) => {
				return null;
			});

			if ( loanResponse !== null )
				this.emitter.emit( 'loan.new' );

			this.availableLoans	= [];
		}
	}
}
</script>