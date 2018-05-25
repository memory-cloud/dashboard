import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'
import { withRouter } from 'react-router'
import {withApollo} from 'react-apollo'

class Dashboard extends Component {
	constructor (props) {
		super(props)
		const {client, authStore} = props
		if (authStore.state.user !== '') {
			return
		}
		try {
			client.query({query: QUERY_ME}).then((result)=>{
				authStore.setUser(result.data.me.email)
			})
		} catch (err) {
			console.log(err)
		}
	}

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
						{game.name}
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
	        name
        }
    }
`

const QUERY_ME = gql`
    query {
        me {
            email
        }
    }
`

export default graphql(QUERY_GAMES)(withRouter(withApollo(Dashboard)))