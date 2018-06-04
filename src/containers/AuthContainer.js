import React from 'react'
import { Container, Provider, Subscribe } from 'unstated'
import gql from 'graphql-tag'

class AuthContainer extends Container {
	constructor() {
		super()
		this.state = {
			user: localStorage.getItem('user') || '',
			loading: false,
			error: null
		}
	}
	setToken = (token) => {
		localStorage.setItem('auth-token', token)
	}
	logout = (client) => {
		localStorage.setItem('auth-token', '')
		localStorage.setItem('user', '')
		client.cache.reset()
		this.setState({user: '' })
	}
	setUser = (user) => {
		this.setState({ user: user})
		localStorage.setItem('user', user)
	}
	isLogged = () => {
		return localStorage.getItem('auth-token')&& this.state.user !== ''
	}
	login = async (client, email, password) => {
		this.setState({loading: true})
		try {
			let result = await client.query({
				query: LOGIN_QUERY,
				variables: {
					email: email,
					password: password
				}
			})
			await this.setToken(result.data.login)
		} catch (err) {
			this.setState({error: err})
			throw new Error(err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message)
		} finally {
			this.setState({loading: false})
		}
	}
	register = async (client, email, password) => {
		this.setState({loading: true})
		try {
			let result = await client.mutate({
				mutation: SIGNUP_MUTATION,
				variables: {
					email: email,
					password: password
				}
			})
			await this.setToken(result.data.createUser)
		} catch (err) {
			this.setState({error: err})
			throw new Error(err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message)
		} finally {
			this.setState({loading: false})

		}
	}
	fetchMe = async (client) => {
		this.setState({loading: true})
		try {
			let result = await client.query({
				query: QUERY_ME
			})
			await this.setUser(result.data.me.email)
		} catch (err) {
			console.log(err)
			let error = err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message
			this.setState({error: error})
			throw new Error(error)
		} finally {
			this.setState({loading: false})
		}
	}
}


const SIGNUP_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
        createUser(
            email: $email,
            password: $password
        )
    }
`

const LOGIN_QUERY = gql`
    query ($email: String!, $password: String!) {
        login (
            email: $email,
            password: $password
        )
    }
`

const QUERY_ME = gql`
    query {
        me {
            email
        }
    }
`

const auth = new AuthContainer()

export const AuthProvider = props => {
	return <Provider inject={props.inject || [auth]}>{props.children}</Provider>
}

export const AuthSubscribe = props => {
	return <Subscribe to={props.to || [auth]}>{props.children}</Subscribe>
}

export const AuthStore = props => {
	return (<AuthProvider><AuthSubscribe>{props.children}</AuthSubscribe></AuthProvider>)
}

export default auth