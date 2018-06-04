import React, {Component} from 'react'
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

	isValid = () => {
		const {email, password, password2} = this.state
		const {feedStore} = this.props

		if (email === '') {
			feedStore.setError('Email is required')
			return false
		}
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if(!re.test(email)){
			feedStore.setError('Email is not valid')
			return false
		}

		if(password === '') {
			feedStore.setError('Password required')
			return false
		}

		if (this.state.login) {
			return true
		}

		if(password !== password2){
			feedStore.setError('Passwords do not match')
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
		if (!this.isValid()) {
			return
		}

		const {client, authStore, feedStore} = this.props
		if (this.state.login) {
			feedStore.setInfo('Checking credentials, please wait.')
			try {
				await authStore.login(client, email, password)
				await authStore.fetchMe(client)
				this.props.history.push('/games')
				feedStore.clear()
			} catch (err) {
				feedStore.setError(err.message)
			}
		} else {
			feedStore.setInfo('Registering, please wait.')
			try {
				await authStore.register(client, email, password)
				await authStore.fetchMe(client)
				this.props.history.push('/games')
				feedStore.clear()
			} catch (err) {
				feedStore.setError(err.message)
			}
		}
	}
}

export default withRouter(withApollo(Login))
