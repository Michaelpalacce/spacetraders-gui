<template>
	<NavBar />

	<div class="flex flex-wrap">
		<div class="w-full sm:w-1/2 md:w-1/3 mb-4">
			<Status />
		</div>
		<div class="w-full sm:w-1/2 md:w-1/3 mb-4">
			<Login />
		</div>
		<div class="w-full sm:w-1/2 md:w-1/3 mb-4">
			<PlayerInfo />
		</div>
	</div>

	<div class="flex flex-wrap">
		<div class="w-full sm:w-1/2 md:w-1/3 mb-4">
			<GetLoan />
		</div>
	</div>

</template>

<script>
import Status		from './components/Status.vue'
import NavBar		from './components/Navbar.vue'
import Login		from './components/Login.vue'
import PlayerInfo	from './components/PlayerInfo.vue'
import GetLoan		from './components/GetLoan.vue'

export default {
	name		: 'App',
	components	: {
		NavBar,
		PlayerInfo,
		Status,
		GetLoan,
		Login
	},

	data ()
	{
		return {}
	}
}
</script>