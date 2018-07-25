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

const httpLink = new createHttpLink({uri: 'https://192.168.99.100/graphql'})

const authLink = setContext((_, {headers}) => {
	// get the authentication token from local storage if it exists
	const admintoken = localStorage.getItem('auth-token')
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: admintoken ? `admin ${admintoken}` : ""
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
