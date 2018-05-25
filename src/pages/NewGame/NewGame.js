import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'

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

		if (!this.props.authStore.isLogged()) {
			this.props.history.push('/login')
		}

		return (
			<div>
				<h4>New Game</h4>
				<div>
					<input
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						type="text"
						placeholder="Name"
					/>
					<input
						name="appid"
						value={this.state.appid}
						onChange={this.handleChange}
						type="text"
						placeholder="Facebook app id"
					/>
					<input
						name="key"
						value={this.state.key}
						onChange={this.handleChange}
						type="text"
						placeholder="Facebook app token"
					/>
				</div>
				<div>
					<PrimaryButton onClick={() => this.saveNewGame()}>
						create game
					</PrimaryButton>
				</div>
			</div>
		)
	}

	saveNewGame = async() => {
		if(this.validate()) {
			this.props.feedStore.setInfo('Creating new game')
			const {name, appid, key} = this.state
			try {
				const result = await this.props.client.mutate({
					mutation: NEWGAME_MUTATION,
					variables: {
						name: name,
						appid: appid,
						key: key
					}
				})
				console.log(result)
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

const NEWGAME_MUTATION = gql`
    mutation game ($appid: String!, $key: String!, $name: String!){
        createGame(game:{
		    name: $name
            appid: $appid
            key: $key
        })
    }
`

export default withApollo(withRouter(GamePage))