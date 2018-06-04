import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {setContext} from 'apollo-link-context'
import {BrowserRouter} from 'react-router-dom'

// const httpLink = new createHttpLink({uri: 'https://unity-cloudsave-development.herokuapp.com/graphql'})
const httpLink = new createHttpLink({uri: 'https://memory-cloud.herokuapp.com/graphql'})
// const httpLink = new createHttpLink({uri: 'http://localhost:3000/graphql'})

const authLink = setContext((_, {headers}) => {
	// get the authentication token from local storage if it exists
	const admintoken = localStorage.getItem('auth-token')
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
	<BrowserRouter basename="/dashboard">
		<ApolloProvider client={client}>
			<App/>
		</ApolloProvider>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker()
