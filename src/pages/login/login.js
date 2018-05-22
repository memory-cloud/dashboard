import React, {Component} from 'react'
import {AUTH_TOKEN} from '../../constants'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
import {CompoundButton} from 'office-ui-fabric-react/lib/Button'
import {Label} from 'office-ui-fabric-react/lib/Label'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

class Login extends Component {
	state = {
		login: true, // switch between Login and SignUp
		email: '',
		password: '',
		error: ''
	}

	render() {
		return (
			<div>
				<Label>{this.state.login ? 'Login' : 'Sign Up'}</Label>
				<div className="flex flex-column">
					<input
						value={this.state.email}
						onChange={e => this.setState({email: e.target.value})}
						type="text"
						placeholder="Your email address"
					/>
					<input
						value={this.state.password}
						onChange={e => this.setState({password: e.target.value})}
						type="password"
						placeholder="Choose a safe password"
					/>
				</div>
				<div className="flex mt3">
					<CompoundButton
						onClick={() => this.handleButton()}
						primary={ true }
					>
						{this.state.login ? 'login' : 'create account'}
					</CompoundButton>
					<CompoundButton
						onClick={() => this.setState({login: !this.state.login})}
					>
						{this.state.login
							? 'need to create an account?'
							: 'already have an account?'}
					</CompoundButton>
				</div>
				{this.state.error ? (
						<MessageBar
							messageBarType={ MessageBarType.error }
							isMultiline={ false }
						>
							{this.state.error}
						</MessageBar>
					) : (
						''
					)}

			</div>
		)
	}

	handleButton = async() => {
		const {email, password} = this.state
		if (this.state.login) {
			try {
				const result = await this.props.client.query({
					query: LOGIN_MUTATION,
					variables: {
						email: email,
						password: password
					}
				})
				const token = result.data.login
				this._saveUserData(token)
			} catch (err) {
				this.setState({error: 'Credentials wrong'})
			}
		} else {
			try {
				const result = await this.props.client.mutate({
					mutation: SIGNUP_MUTATION,
					variables: {
						email: email,
						password: password
					}
				})
				const token = result.data.createUser
				this._saveUserData(token)
			} catch (err) {
				this.setState({error: 'Email already in use'})
			}
		}
		if (localStorage.getItem(AUTH_TOKEN)) {
			this.props.history.push('/dashboard/dashboard')
		}
	}

	_saveUserData = (token) => {
		localStorage.setItem(AUTH_TOKEN, token)
	}
}


const SIGNUP_MUTATION = gql`
    mutation newuser ($email: String!, $password: String!) {
        createUser(credentials: {
            email: $email,
            password: $password
        })
    }
`

const LOGIN_MUTATION = gql`
    query log ($email: String!, $password: String!) {
        login (credentials:{
            email: $email,
            password: $password
        })
    }
`

export default withApollo(Login)
