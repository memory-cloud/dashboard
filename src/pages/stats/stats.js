import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'

class Achievement extends Component {
	constructor (props) {
		super(props)
		this.state = {
			stats: props.data.game? props.data.game : {}
		}
	}

	componentWillReceiveProps(props) {
		if (!props.data.loading) {
			this.setState({stats: props.data.game})
		}
	}

	render() {
		const {data} = this.props

		if (data.loading) {
			return (<Loading/>)
		}

		if (data.error) {
			return (<div> Error </div>)
		}

		return (
			<div>
				players: {this.state.stats.players}
			</div>
		)
	}
}

const QUERY_ACHIEVEMENTS = gql`
    query ($appid: String!) {
        game (appid: $appid) {
            players
        }
    }
`

export default graphql(QUERY_ACHIEVEMENTS, {
	options: (props) => {
		return {
			variables: {appid: props.appid}
		}
	}
})(Achievement)
