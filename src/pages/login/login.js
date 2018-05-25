import React, {Component} from 'react'
import gql from 'graphql-tag'
import './style.css'
import {withApollo} from 'react-apollo'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'
import {Label} from 'office-ui-fabric-react/lib/Label'
import { withRouter } from 'react-router'

class Login extends Component {
	state = {
		login: true, // switch between Login and SignUp
		email: '',
		password: '',
		password2: ''
	}

	handleChange = (event) => {
		const { target: { name, value } } = event;
		this.setState(() => ({ [name]: value }))
	}

	validade = () => {
		const {email, password, password2} = this.state

		if (email === '') {
			this.props.feedStore.setError('Email can\'t be empty')
			return false
		}
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if(!re.test(email)){
			this.props.feedStore.setError(email + ' is not a valid email')
			return false
		}

		if(password === '') {
			this.props.feedStore.setError('Password can\'t be empty')
			return false
		}

		if (this.state.login) {
			return true
		}

		if(password !== password2){
			this.props.feedStore.setError('Passwords do not match')
			return false
		}

		return true
	}

	render() {
		return (
			<div className="d-flex justify-content-center align-items-center fill">
				<div className="inputLogin">
					<div className="center">
						<ActionButton
							iconProps={ { iconName: (this.state.login ? 'Up' : 'Door') } }
							onClick={() => this.setState({login: !this.state.login})}>
							{this.state.login
								? 'need to create an account?'
								: 'already have an account?'}
						</ActionButton>
					</div>
					<Label className="title">{this.state.login ? 'Login' : 'Sign Up'}</Label>
						<input
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
							type="text"
							placeholder="Your email address"
						/> <br />
						<input
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
							placeholder="Choose a safe password"
						/> <br />
						{this.state.login ? '' :
							<input
								name="password2"
								value={this.state.password2}
								onChange={this.handleChange}
								type="password"
								placeholder="Confirm password"
							/>}
					<div className="loginButton">
						<CompoundButton
							className="loginButton"
							onClick={() => this.handleButton()}
							primary={ true }
						>
							{this.state.login ? 'login' : 'create account'}
						</CompoundButton>
					</div>

				</div>
			</div>
		)
	}

	handleButton = async () => {
		const {email, password} = this.state
		if (this.validade()) {
			if (this.state.login) {
				this.props.feedStore.setInfo('Checking credentials, please wait.')
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
					this.props.history.push('/games')
					this.props.feedStore.setSuccess('')
				} catch (err) {
					this.props.feedStore.setError(err.graphQLErrors[0].message)
				}
			} else {
				this.props.feedStore.setInfo('Registering, please wait.')
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
					this.props.history.push('/games')
					this.props.feedStore.setSuccess('')
				} catch (err) {
					this.props.feedStore.setError(err.graphQLErrors[0].message)
				}
			}
		}
	}

	_saveUserData = (token) => {
		this.props.authStore.setToken(token)
	}
}


const SIGNUP_MUTATION = gql`
    mutation newuser ($email: String!, $password: String!) {
        createUser(
            email: $email,
            password: $password
        )
    }
`

const LOGIN_MUTATION = gql`
    query log ($email: String!, $password: String!) {
        login (
            email: $email,
            password: $password
        )
    }
`

export default withRouter(withApollo(Login))
