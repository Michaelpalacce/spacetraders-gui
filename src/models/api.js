import axios	from 'axios';

export default {
	endpoint	: 'https://api.spacetraders.io',
	urls		: {
		gameStatus			: '/game/status',
		registerUser		: '/users/:username:/token',
		playerData			: '/users/:username:?token=:token:',
		loans				: '/game/loans?token=:token:',
		takeLoan			: '/users/:username:/loans?token=:token:',
		getShips			: '/game/ships?token=:token:&class=:class:',
		purchaseShip		: '/users/:username:/ships?token=:token:',
		purchaseGood		: '/users/:username:/purchase-orders?token=:token:',
		sellGood			: '/users/:username:/sell-orders?token=:token:',
		getLocation			: '/game/systems/OE/locations?token=:token:&type=:type:',
		createFlightPlan	: '/users/:username:/flight-plans?token=:token:',
	},

	auth		: {
		token		: localStorage.token,
		username	: localStorage.username
	},

	/**
	 * @brief	Gets and formats the url with the given params
	 *
	 * @details	Accepts an object as params where the keys will be modified like: :${key}:, they will be searched in the
	 * 			desired url and replaced with their value
	 *
	 * @param	{String} url
	 * @param	{Object} params
	 *
	 * @return	{String}
	 */
	getUrl( url, params = {} )
	{
		let formattedUrl	= this.urls[url];

		for ( const param in params )
		{
			const value	= params[param];
			formattedUrl	= formattedUrl.replace( `:${param}:`, value );
		}

		return `${this.endpoint}${formattedUrl}`;
	},

	/**
	 * @brief	Sets new api credentials
	 *
	 * @param	{String} token
	 * @param	{String} username
	 *
	 * @return	void
	 */
	setCredentials( { token, username } )
	{
		this.auth.token		= token;
		this.auth.username	= username;
	},

	/**
	 * @return	{Boolean}
	 */
	hasCredentials()
	{
		return this.auth.token !== null && this.auth.username !== null ;
	},

	/**
	 * @brief	Returns bool if the server is up or not
	 *
	 * @return	{Promise<Boolean>}
	 */
	async isServerUp()
	{
		const allGoodStatusBody	= 'spacetraders is currently online and available to play';
		const statusResponse	= await axios.get( this.getUrl( 'gameStatus' ) );

		return statusResponse.status = 200 && statusResponse.data.status === allGoodStatusBody;
	},

	/**
	 * @brief	Registers a new user and returns the token
	 *
	 * @param	{String} username
	 *
	 * @returns	{Promise<void>}
	 */
	async registerUser( username )
	{
		const registerUserResponse	= await axios.post( this.getUrl( 'registerUser', { username } ) ).catch(() => { return null });

		return registerUserResponse === null ? registerUserResponse : registerUserResponse.data.token;
	},

	/**
	 * @brief	Gets player data
	 *
	 * @return	{Promise<Object>}
	 */
	async getPlayerData()
	{
		const playerDataResponse	= await axios.get( this.getUrl( 'playerData', this.auth ) );

		return playerDataResponse.data.user;
	},

	/**
	 * @brief	Gets a list of all available loans
	 *
	 * @return	{Promise<string>}
	 */
	async getAvailableLoans()
	{
		const loansResponse	= await axios.get( this.getUrl( 'loans', this.auth ) );

		return loansResponse.data.loans;
	},

	/**
	 * @brief	Gets a list of all available loans
	 *
	 * @param	{String} type
	 *
	 * @return	{Promise<string>}
	 */
	async takeOutLoan( type )
	{
		return await axios.post( this.getUrl( 'takeLoan', this.auth ), { type } );
	},

	/**
	 * @brief	Gets a list of all available ships to purchase
	 *
	 * @return	{Promise<string>}
	 */
	async getShips( shipClass = 'MK-I' )
	{
		const shipsResponse	= await axios.get( this.getUrl( 'getShips', { ...this.auth, ...{ class: shipClass } } ) );

		return shipsResponse.data.ships;
	},

	/**
	 * @brief	Purchases the given ship
	 *
	 * @param	{Object} data
	 *
	 * @return	{Promise<string>}
	 */
	async purchaseShip( data )
	{
		return await axios.post( this.getUrl( 'purchaseShip', this.auth ), data );
	},

	/**
	 * @brief	Purchases the given good type
	 *
	 * @param	{String} shipId
	 * @param	{String} good
	 * @param	{Number} quantity
	 *
	 * @return	{Promise<Object>}
	 */
	async purchaseGood( shipId, good, quantity )
	{
		return await axios.post( this.getUrl( 'purchaseGood', this.auth ), { shipId, good, quantity } );
	},

	/**
	 * @brief	Sells the given good type
	 *
	 * @param	{String} shipId
	 * @param	{String} good
	 * @param	{Number} quantity
	 *
	 * @return	{Promise<Object>}
	 */
	async sellGood( shipId, good, quantity )
	{
		return await axios.post( this.getUrl( 'purchaseGood', this.auth ), { shipId, good, quantity } );
	},

	/**
	 * @brief	Finds a location
	 *
	 * @details	Avaialble locations:
	 * 			- ASTEROID
	 *
	 * @param	{String} type
	 *
	 * @return	{Promise<Object>}
	 */
	async getLocation( type )
	{
		return await axios.get( this.getUrl( 'getLocation', { ...this.auth, type } ) );
	},

	/**
	 * @brief	Creates a new flight plan
	 *
	 * @param	{String} shipId
	 * @param	{String} destination
	 *
	 * @return	{Promise<Object>}
	 */
	async createFlightPlan( shipId, destination )
	{
		return await axios.post( this.getUrl( 'createFlightPlan', this.auth ), { shipId, destination } );
	},
}