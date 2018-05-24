import { Container } from 'unstated'

class AuthContainer extends Container {
	constructor() {
		super()
		this.state = {
			token: localStorage.getItem('auth-token')
		}
	}
	setToken = (token) => {
		this.setState({ token })
		localStorage.setItem('auth-token', token)
	}
	logout = () => {
		this.setState({ token: '', user: '' })
		localStorage.removeItem('auth-token')
	}
}

export default AuthContainer