import React, {Component} from 'react'
import Loading from '../../components/Loading'
import {Pivot, PivotItem} from 'office-ui-fabric-react/lib/Pivot';
import Achievement from '../achievement'
import Stats from '../stats'
import './style.css'
import {withRouter} from 'react-router'
import {DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {TeachingBubble} from 'office-ui-fabric-react/lib/TeachingBubble';
import {withApollo} from 'react-apollo'
import {AchievementStore} from '../../containers/AchievementContainer'

class GamePage extends Component {
	constructor(props) {
		super(props)
		this._onDismiss = this._onDismiss.bind(this)
		this.state = {
			isTeachingBubbleVisible: false,
		}
		props.gameStore.getGame(props.client, props.appid)
	}

	_onDismiss() {
		this.setState({
			isTeachingBubbleVisible: !this.state.isTeachingBubbleVisible
		})
	}


	render() {

		const {isTeachingBubbleVisible} = this.state
		const {loading, game} = this.props.gameStore.state

		if (loading) {
			return (<Loading />)
		}

		if (!game) {
			return ('Error')
		}

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
						<AchievementStore>
							{achievementStore => (
								<Achievement achievementStore={achievementStore} appid={game.appid} feedStore={this.props.feedStore}/>
							)}
						</AchievementStore>
					</PivotItem>
					<PivotItem linkText='Stats'>
						<Stats appid={game.appid}/>
					</PivotItem>
				</Pivot>
			</div>
		)
	}
}

export default withRouter(withApollo(GamePage))