import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'

class GamePage extends Component {
	state = {
		appid: '',
		key: ''
	}

	render() {
		return (
			<div>
				<h4 className="mv3">New Game</h4>
				<div className="flex flex-column">
					<input
						value={this.state.appid}
						onChange={e => this.setState({appid: e.target.value})}
						type="text"
						placeholder="Facebook app id"
					/>
					<input
						value={this.state.key}
						onChange={e => this.setState({key: e.target.value})}
						type="text"
						placeholder="Facebook app secret"
					/>
				</div>
				<div className="flex mt3">
					<div className="pointer mr2 button" onClick={() => this.saveNewGame()}>
						create game
					</div>
				</div>
			</div>
		)
	}

	saveNewGame = async() => {
		const {appid, key} = this.state
		const result = await this.props.client.mutate({
			mutation: NEWGAME_MUTATION,
			variables: {
				appid: appid,
				key: key
			}
		})
		if (!result.data.error) {
			this.props.history.push('/dashboard/game/' + appid)
		}
	}
}

const NEWGAME_MUTATION = gql`
    mutation game ($appid: String!, $key: String!){
        createGame(game:{
            appid: $appid
            key: $key
        })
    }
`

export default withApollo(GamePage)