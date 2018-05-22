import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import Achievement from '../achievement'
import Stats from '../stats'

class GamePage extends Component {
	render() {
		const {data} = this.props

		if (data.loading) {
			return (<Loading />)
		}

		if (!data.game) {
			return (<div> Error </div>)
		}

		var game = data.game

		return (
			<div>
				<Pivot>
					<PivotItem
						headerText='Game Settings'
						linkText='I am deprecated. "headerText" overwrites me'
						headerButtonProps={ {
							'data-order': 1,
							'data-title': 'My Files Title'
						} }
					>
						<div>
							appid: {game.appid} <br/>
							key: {game.key}
						</div>
					</PivotItem>
					<PivotItem linkText='Achievements'>
						<Achievement appid={game.appid} />
					</PivotItem>
					<PivotItem linkText='Stats'>
						<Stats appid={game.appid} />
					</PivotItem>
				</Pivot>
			</div>
		)
	}
}

const QUERY_GAME = gql`
    query ($appid: String!){
        game (appid: $appid) {
            appid
            key
        }
    }
`

export default graphql(QUERY_GAME, {
	options: (props) => {
		return {variables: {appid: props.match.params.id}}
	}
})(GamePage)