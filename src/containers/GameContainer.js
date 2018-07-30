import React from "react";
import {Provider, Subscribe, Container} from 'unstated'
import gql from 'graphql-tag'

class GameContainer extends Container {
	constructor() {
		super()
		this.state = {
			games: [],
			game: {},
			error: null,
			loading: false
		}
	}
	setError = async(err) => {
		let error = err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message
		await this.setState({error: error})
		throw new Error(error)
	}
	getGames = async(client) => {
		this.setState({loading: true})
		try {
			let result = await client.query({
				query: QUERY_GAMES
			})
			await this.setState({games: result.data.games, error: null})
		}
		catch (err) {
			this.setState({error: err})
			throw new Error(err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message)
		} finally {
			this.setState({loading: false})
		}
	}
	getGame = async(client, appid) => {
		this.setState({loading: true})
		try {
			let result = await client.query({
				query: QUERY_GAME,
				variables: {
					appid: appid
				}
			})
			await this.setState({game: result.data.game, error: null})
		} catch (err) {
			await this.setError(err)
		} finally {
			this.setState({loading: false})
		}
	}
	newGame = async(client, name, appid, key) => {
		this.setState({loading: true})
		try {
			await client.mutate({
				mutation: NEWGAME_MUTATION,
				variables: {
					name: name,
					appid: appid,
					key: key
				}
			})
			this.setState({error: null})
		} catch (err) {
			this.setState({error: err})
			throw new Error(err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message)
		} finally {
			this.setState({loading: false})
		}
	}
}

const QUERY_GAMES = gql`
    query {
        games {
            appid
            name
        }
    }
`

const QUERY_GAME = gql`
    query ($appid: String!){
        game (appid: $appid) {
            name
            appid
            key
        }
    }
`

const NEWGAME_MUTATION = gql`
    mutation ($appid: String!, $key: String!, $name: String!){
        createGame(game:{
            name: $name
            appid: $appid
            key: $key
        }) {
			_id
		}
    }
`

const game = new GameContainer()

export const GameProvider = props => {
	return <Provider inject={props.inject || [game]}>{props.children}</Provider>
}

export const GameSubscribe = props => {
	return <Subscribe to={props.to || [game]}>{props.children}</Subscribe>
}

export const GameStore = props => {
	return (<GameProvider><GameSubscribe>{props.children}</GameSubscribe></GameProvider>)
}

export default game