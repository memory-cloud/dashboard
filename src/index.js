import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Home from './pages/home'
import registerServiceWorker from './registerServiceWorker'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {setContext} from 'apollo-link-context'
import {AUTH_TOKEN} from './constants'
import {
	BrowserRouter
} from 'react-router-dom'

const httpLink = new createHttpLink({uri: 'http://localhost:3000/graphql'}) // https://unity-cloudsave-development.herokuapp.com/graphql

const authLink = setContext((_, {headers}) => {
	// get the authentication token from local storage if it exists
	const admintoken = localStorage.getItem(AUTH_TOKEN)
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			admintoken: admintoken ? `${admintoken}` : ""
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<Home/>
		</ApolloProvider>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker()
