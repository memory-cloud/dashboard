import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {withApollo} from 'react-apollo'
import Loading from '../../components/Loading'
import {CompoundButton, ActionButton} from 'office-ui-fabric-react/lib/Button'

class Achievement extends Component {
	constructor(props){
		super(props)
		this.state = {
			achievements: props.data.game ? props.data.game.achievements : [{_id: '', title: '', description: ''}],
			saving: false
		}
	}

	componentWillReceiveProps(props) {
		if (!props.data.loading && !this.state.saving) {
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
		this.setState({saving: true})
		try {
			this.props.feedStore.setInfo('Saving')

			const {achievements} = this.state

			const update = achievements.map((achievement)=>({
				_id: achievement._id,
				title: achievement.title,
				description: achievement.description
			}))

			await this.props.client.mutate({
				mutation: MUTATION_UPSERTACHIEVEMENTS,
				variables: {
					appid: this.props.appid,
					achievements: update
				}
			})

			this.props.feedStore.setSuccess('Achievements updated')
			this.props.data.refetch()
		} catch (err) {
			this.props.feedStore.setError(err.graphQLErrors[0].message, 10)
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
				<ActionButton
					iconProps={ { iconName: 'Add' } }
					text='new'
					onClick={this.handleAddAchievement}
				/>
				{this.state.achievements.map((achievement, idx) => (
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
							onChange={this.handleAchievementTitleChange(idx)}
						/>
						<input
							name="description"
							type="text"
							placeholder={`Achievement #${idx + 1} description`}
							value={achievement.description}
							onChange={this.handleAchievementDescriptionChange(idx)}
						/>
					</div>
				))}
				<CompoundButton onClick={this.upsertAchievements} primary={ true }>save achievements</CompoundButton>
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
