import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import { withRouter } from 'react-router'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import {Label} from 'office-ui-fabric-react/lib/Label'

class GamePage extends Component {
	state = {
		name: '',
		appid: '',
		key: ''
	}

	handleChange = (event) => {
		const { target: { name, value } } = event;
		this.setState(() => ({ [name]: value }))
	}

	render() {
		return (
			<div className="d-flex justify-content-center align-items-center fill">
				<div className="inputLogin">
					<Label className="title">New Game</Label>
					<div>
						<input
							name="name"
							onChange={this.handleChange}
							type="text"
							placeholder="Name"
						/>
						<input
							name="appid"
							onChange={this.handleChange}
							type="text"
							placeholder="Facebook app id"
						/>
						<input
							name="key"
							onChange={this.handleChange}
							type="text"
							placeholder="Facebook app token"
						/>
					</div>
					<div>
						<PrimaryButton className="loginButton" onClick={() => this.saveNewGame()}>
							create game
						</PrimaryButton>
					</div>
				</div>
			</div>
		)
	}

	saveNewGame = async() => {
		if(this.validate()) {
			this.props.feedStore.setInfo('Creating new game')


			const {name, appid, key} = this.state
			const {client, gameStore} = this.props
			try {
				await gameStore.newGame(client, name, appid, key)
				this.props.feedStore.setSuccess('')
				this.props.history.push('/game/' + appid)
			} catch (err) {
				this.props.feedStore.setError(err.graphQLErrors[0].message, 10)
			}
		}
	}

	validate = () => {
		const {appid, key} = this.state

		if (appid === '') {
			this.props.feedStore.setError('App ID can\'t be empty', 7)
			return false
		}

		var re = /^[1-9][0-9]*$/
		if (!re.test(appid)) {
			this.props.feedStore.setError(appid + ' is not a valid Facebook App ID', 7)
			return false
		}

		if (key === '') {
			this.props.feedStore.setError('App token can\' be empty', 7)
			return false
		}

		return true
	}
}


export default withApollo(withRouter(GamePage))