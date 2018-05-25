import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../components/Loading'
import {Pivot, PivotItem} from 'office-ui-fabric-react/lib/Pivot';
import Achievement from '../achievement'
import Stats from '../stats'
import './style.css'
import {withRouter} from 'react-router'
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {TeachingBubble} from 'office-ui-fabric-react/lib/TeachingBubble';

class GamePage extends Component {
	constructor(props) {
		super(props)
		this._onDismiss = this._onDismiss.bind(this)

		this.state = {
			isTeachingBubbleVisible: false,
		}
	}

	_onDismiss() {
		this.setState({
			isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
		})
	}


	render() {

		if (!this.props.authStore.isLogged()) {
			this.props.history.push('/login')
		}

		const {isTeachingBubbleVisible} = this.state
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
						headerText={game.name}
						headerButtonProps={ {
							'data-order': 1,
							'data-title': 'My Files Title'
						} }
					>
						<div>
							appid: {game.appid}
							<div>
						        <span>
						          <DefaultButton
							          onClick={ this._onDismiss }
							          text={ isTeachingBubbleVisible ? 'Hide Key' : 'Show Key' }
						          />
						        </span>
								{ isTeachingBubbleVisible ? (
										<div>
											<TeachingBubble
												onDismiss={ this._onDismiss }
												hasCloseIcon={ true }
											>
												{game.key}
											</TeachingBubble>
										</div>
									) : (null) }
							</div>
						</div>
					</PivotItem>
					<PivotItem linkText='Achievements'>
						<Achievement appid={game.appid} feedStore={this.props.feedStore}/>
					</PivotItem>
					<PivotItem linkText='Stats'>
						<Stats appid={game.appid}/>
					</PivotItem>
				</Pivot>
			</div>
		)
	}
}

const QUERY_GAME = gql`
    query ($appid: String!){
        game (appid: $appid) {
            name
            appid
            key
        }
    }
`

export default graphql(QUERY_GAME, {
	options: ({appid}) => {
		return {variables: {appid: appid}}
	}
})(withRouter(GamePage))