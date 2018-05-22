import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import Loading from '../../components/Loading'

class Achievement extends Component {
	constructor (props) {
		super(props)
		this.state = {
			achievements: props.data.game? props.data.game.achievements : [{_id: '', title: '', description: ''}],
			mensagem: '',
			error: '',
			info: ''
		}
	}

	onAchievementChanged = achievements => this.setState(() => ({achievements: achievements}))

	componentWillReceiveProps(props) {
		if (!props.data.loading) {
			this.setState({achievements: props.data.game.achievements})
		}
	}

	handleAddAchievement = () => {
		this.setState({achievements: this.state.achievements.concat([{_id: '', title: '', description: ''}])})
	}

	handleAchievementTitleChange = (idx) => (evt) => {
		const newAchievements = this.state.achievements.map((achievement, sidx) => {
			if (idx !== sidx) return achievement;
			return {...achievement, title: evt.target.value}
		});
		this.setState({achievements: newAchievements})
	}

	handleAchievementDescriptionChange = (idx) => (evt) => {
		const newAchievements = this.state.achievements.map((achievement, sidx) => {
			if (idx !== sidx) return achievement;
			return {...achievement, description: evt.target.value}
		})
		this.setState({achievements: newAchievements})
	}

	upsertAchievements  = async () => {
		try {
			this.setState({error: '', mensagem: '', info: 'Saving'})
			const {achievements} = this.state

			const achievementsUpdate = achievements.map(achievement => ({
				_id: achievement._id,
				title: achievement.title,
				description: achievement.description
			}))

			let result = await this.props.client.mutate({
				mutation: MUTATION_UPSERTACHIEVEMENTS,
				variables: {
					appid: this.props.appid,
					achievements: achievementsUpdate
				}
			})

			this.setState({mensagem: 'Achievements updated', error: '', info: ''})
			this.onAchievementChanged(result.data.upsertAchievements)
		} catch (err) {
			console.log(err)
			this.setState({error: 'Something went wrong', mensagem: '', info: ''})
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
				{this.state.achievements.map((achievement, idx) => (
					<div key={idx}>
						<input
							type="text"
							value={achievement._id}
							hidden
						    readOnly
						/>
						<input
							type="text"
							placeholder={`Achievement #${idx + 1} title`}
							value={achievement.title}
							onChange={this.handleAchievementTitleChange(idx)}
						/>
						<input
							type="text"
							placeholder={`Achievement #${idx + 1} description`}
							value={achievement.description}
							onChange={this.handleAchievementDescriptionChange(idx)}
						/>
					</div>
				))}
				<button className="pointer mr2 button" onClick={this.upsertAchievements}>save achievements</button>
				<button type="button" onClick={this.handleAddAchievement} className="small">Add Shareholder</button>
				<br/>
				{this.state.mensagem ? (
						<MessageBar
							messageBarType={ MessageBarType.success }
							isMultiline={ false }
						>
							{this.state.mensagem}
						</MessageBar>
					) : (
						''
					)}

				{this.state.error ? (
						<MessageBar
							messageBarType={ MessageBarType.error }
							isMultiline={ false }
						>
							{this.state.error}
						</MessageBar>
					) : (
						''
					)}

				{this.state.info ? (
						<MessageBar>
							{this.state.info}
						</MessageBar>
					) : (
						''
					)}
			</div>
		)
	}
}

const QUERY_ACHIEVEMENTS = gql`
    query ($appid: String!){
        game (appid: $appid) {
            achievements{
                _id
                title
                description
            }
        }
    }
`

const MUTATION_UPSERTACHIEVEMENTS = gql`
    mutation ($appid: String!, $achievements: [AchievementInput!]!) {
        upsertAchievements(
            appid: $appid
            achievements: $achievements
        ){
            _id
            title
            description
        }
    }
`

export default withApollo(graphql(QUERY_ACHIEVEMENTS, {
	options: (props) => {
		return {
			variables: {appid: props.appid}
		}
	}
})(Achievement))
