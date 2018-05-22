import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'
import { List } from 'office-ui-fabric-react/lib/List'
import { Link } from 'office-ui-fabric-react/lib/Link'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'

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
			<div style={ { height: '70px' } }>
				<List
					items={ games }
					onRenderCell={ this._onRenderCell }
				/>
				<ActionButton
					iconProps={ { iconName: 'Add' } }
					text='New game'
				    href='/dashboard/newgame'
				>
				</ActionButton>
			</div>
		)
	}

	_onRenderCell(item, index) {
		return (
				<Link href={'/dashboard/game/'+item.appid}>
					<CompoundButton>
						{item.appid}
					</CompoundButton>
				</Link>
		);
	}
}

const QUERY_GAMES = gql`
    query {
        games {
            appid
        }
    }
`

export default graphql(QUERY_GAMES)(Dashboard)