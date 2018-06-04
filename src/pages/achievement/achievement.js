import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import Loading from '../../components/Loading'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'

class Achievement extends Component {
	constructor(props) {
		super(props)
		const {client, achievementStore, appid} = props

		achievementStore.getAchievements(client, appid)
	}

	isValid = () => {
		const {achievementStore} = this.props
		achievementStore.state.achievements.forEach((achievement, idx) => {
			if ( !achievement.title.match( /^[A-Za-z0-9_]{1,15}$/ ) ) {
				throw new Error('Invalid title ' + idx + 1)
			}

			if ( !achievement.description.match( /^[A-Za-z0-9_]{1,15}$/ ) ) {
				throw new Error('Invalid description ' + idx + 1)
			}
		})
		return true
	}

	upsertAchievements = async() => {
		const {client, achievementStore, feedStore, appid} = this.props
		try {
			this.isValid()

			feedStore.setInfo('Saving')

			const {achievements} = achievementStore.state

			const update = achievements.map((achievement) => ({
				_id: achievement._id,
				title: achievement.title,
				description: achievement.description
			}))

			await achievementStore.upsertAchievements(client, appid, update)
			feedStore.setSuccess('Achievements updated', 6)
		} catch (err) {
			feedStore.setError(err.message, 10)
		}
	}

	render() {
		const {loading, achievements, error} = this.props.achievementStore.state

		if (loading) {
			return (<Loading/>)
		}

		if (error) {
			return (<div> {error} </div>)
		}

		return (
			<div>
				<ActionButton
					iconProps={ {iconName: 'Add'} }
					text='new'
					onClick={this.props.achievementStore.handleAddAchievement}
				/>
				{achievements.map((achievement, idx) => (
					<div key={idx}>
						<input
							type="text"
							value={achievement._id}
							hidden
							readOnly
						/>
						<input
							name="title"
							type="text"
							placeholder={`Achievement #${idx + 1} title`}
							value={achievement.title}
							onChange={this.props.achievementStore.handleChange(idx)}
						/>
						<input
							name="description"
							type="text"
							placeholder={`Achievement #${idx + 1} description`}
							value={achievement.description}
							onChange={this.props.achievementStore.handleChange(idx)}
						/>
					</div>
				))}
				<CompoundButton onClick={this.upsertAchievements} primary={ true }>save achievements</CompoundButton>
			</div>
		)
	}
}

export default withApollo(Achievement)
