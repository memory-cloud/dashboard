import React, { Component } from 'react'
import Loading from '../../components/Loading'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'
import { withRouter } from 'react-router'
import {withApollo} from 'react-apollo'

class Dashboard extends Component {
	constructor (props) {
		super(props)
		const {client, gameStore} = props
		gameStore.getGames(client)
	}

	render() {
		const { loading, games, error } = this.props.gameStore.state

		if (loading) {
			return (<Loading />)
		}

		if (error) {
			return (<div> Error </div>)
		}
		return (
			<div>
				<ActionButton
					iconProps={ { iconName: 'Add' } }
					text='New game'
					onClick={()=>this.props.history.push('/newgame')}
				/>
				{games.map(game => (
					<CompoundButton onClick={ () => this.props.history.push('/game/' + game.appid )} key={game.appid}>
						{game.name}
					</CompoundButton>
				))}
			</div>
		)
	}
}

export default withRouter(withApollo(Dashboard))