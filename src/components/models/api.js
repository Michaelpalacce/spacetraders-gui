import axios	from 'axios';

export default {
	endpoint	: 'https://api.spacetraders.io',
	urls		: {
		gameStatus	: '/game/status',
		playerData	: '/users/:username:?token=:token:',
		loans		: '/game/loans?token=:token:',
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

		return `${this.endpoint}${formattedUrl}`
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
	 * @brief	Gets player data
	 *
	 * @return	{Promise<Object>}
	 */
	async getPlayerData()
	{
		const playerDataResponse	= await axios.get( this.getUrl( 'playerData', this.auth ) );

		return playerDataResponse.data.user;
	},

	async getAvailableLoans()
	{
		const loansResponse	= await axios.get( this.getUrl( 'loans', this.auth ) );

		return loansResponse.data.loans;

	}
}