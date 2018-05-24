import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'
import { withRouter } from 'react-router'

class Dashboard extends Component {
	render() {
		const { data } = this.props

		if (data.loading) {
			return (<Loading />)
		}

		if (!data.games) {
			return (<div> Error </div>)
		}

		var games = data.games

		return (
			<div>
				<ActionButton
					iconProps={ { iconName: 'Add' } }
					text='New game'
					onClick={()=>this.props.history.push('/newgame')}
				/>
				{games.map(game => (
					<CompoundButton onClick={ () => this.props.history.push('/game/' + game.appid )} key={game.appid}>
						{game.appid}
					</CompoundButton>
				))}
			</div>
		)
	}
}

const QUERY_GAMES = gql`
    query {
        games {
            appid
        }
    }
`

export default graphql(QUERY_GAMES)(withRouter(Dashboard))