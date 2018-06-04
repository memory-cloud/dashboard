import React from "react";
import {Provider, Subscribe, Container} from 'unstated'
import gql from 'graphql-tag'

class AchievementContainer extends Container {
	constructor() {
		super()
		this.state = {
			achievements: [],
			error: null,
			loading: false
		}
	}
	setError = (err) => {
		let error = err.graphQLErrors[0] ? err.graphQLErrors[0].message : err.message
		this.setState({error: error})
		throw new Error(error)
	}
 	getAchievements = async(client, appid) => {
		this.setState({loading: true})
		try {
			let result = await client.query({
				query: QUERY_ACHIEVEMENTS,
				variables: {
					appid: appid
				},
				fetchPolicy: 'network-only'
			})
			await this.setState({achievements: result.data.game.achievements, error: null})
		} catch (err) {
			this.setError(err)
		} finally {
			this.setState({loading: false})
		}
	}
	upsertAchievements = async(client, appid, achievements) => {
		this.setState({loading: true})
		try {
			await client.mutate({
				mutation: MUTATION_UPSERTACHIEVEMENTS,
				variables: {
					appid: appid,
					achievements: achievements
				}
			})
			this.setState({error: null})
		} catch (err) {
			this.setError(err)
		} finally {
			this.setState({loading: false})
		}
	}
	handleAddAchievement = () => {
		this.setState({achievements: this.state.achievements.concat([{_id: '', title: '', description: ''}])})
	}
	handleChange = (idx) => (event) => {
		const { target: { name, value } } = event;
		const newAchievements = this.state.achievements.map((achievement, sidx) => {
			if (idx !== sidx) return achievement;
			return {...achievement, [name]: value}
		});
		this.setState({achievements: newAchievements})
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
const achievement = new AchievementContainer()

export const AchievementProvider = props => {
	return <Provider inject={props.inject || [achievement]}>{props.children}</Provider>
}

export const AchievementSubscribe = props => {
	return <Subscribe to={props.to || [achievement]}>{props.children}</Subscribe>
}

export const AchievementStore = props => {
	return (<AchievementProvider><AchievementSubscribe>{props.children}</AchievementSubscribe></AchievementProvider>)
}

export default achievement