import React from "react";
import { Container, Provider, Subscribe } from 'unstated'

class FeedbackContainer extends Container {
	constructor() {
		super()
		this.state = {
			error: '',
			info: '',
			success: ''
		}
	}
	setError = (error, seconds = null) => {
		this.setState({ error: error, info: '', success: '' })
		if (seconds) setTimeout(()=> this.setState({ error: '', info: '', success: '' }), seconds * 1000)
	}
	setInfo = (info, seconds = null) => {
		this.setState({ error: '', info: info, success: '' })
		if (seconds) setTimeout(()=> this.setState({ error: '', info: '', success: '' }), seconds * 1000)
	}
	setSuccess= (success, seconds = null) => {
		this.setState({ error: '', info: '', success: success })
		if (seconds) setTimeout(()=> this.setState({ error: '', info: '', success: '' }), seconds * 1000)
	}
	clear = () => {
		this.setState({ error: '', info: '', success: '' })
	}
}

const feed = new FeedbackContainer()

export const FeedProvider = props => {
	return <Provider inject={props.inject || [feed]}>{props.children}</Provider>
}

export const FeedSubscribe = props => {
	return <Subscribe to={props.to || [feed]}>{props.children}</Subscribe>
}

export const FeedStore = props => {
	return (<FeedProvider><FeedSubscribe>{props.children}</FeedSubscribe></FeedProvider>)
}

export default feed