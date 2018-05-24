import { Container } from 'unstated'

class FeedbackContainer extends Container {
	constructor() {
		super();
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
}

export default FeedbackContainer