import { Container } from 'unstated'

class AuthContainer extends Container {
	constructor() {
		super()
		this.state = {
			token: localStorage.getItem('auth-token') || '',
			user: localStorage.getItem('user') || ''
		}
	}
	setToken = (token) => {
		this.setState({ token })
		localStorage.setItem('auth-token', token)
	}
	logout = () => {
		localStorage.setItem('auth-token', '')
		localStorage.setItem('user', '')
		this.setState({ token: '', user: '' })
	}
	setUser = (user) => {
		this.setState({ user: user})
		localStorage.setItem('user', user)
	}
	isLogged = () => {
		return this.state.token !== '' && this.state.user !== ''
	}
}

export default AuthContainer