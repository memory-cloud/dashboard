import React, {Component} from 'react'
import './style.css'
import {Link} from 'office-ui-fabric-react/lib/Link'
import {CommandBarButton} from 'office-ui-fabric-react/lib/Button'
import {withRouter} from 'react-router'
import {withApollo} from 'react-apollo'

class NavBar extends Component {
	constructor(props) {
		super(props)
		if (!props.authStore.isLogged()) {
			props.history.push('/login')
		}
	}

	render() {
		const {authStore, history, client} = this.props

		return (
			<div className="NavBar">
				<div className="logo ms-font-xl">
					<Link onClick={() => history.push(authStore.isLogged() ? '/games' : '/login')}>
						<strong>Memory Cloud</strong>
					</Link>
					{authStore.isLogged() ? (
						<Link onClick={() => history.push('/games')}>&nbsp; Games</Link>
					) : ('')}
				</div>
				{authStore.isLogged() ? authStore.state.user : ''}
				{authStore.isLogged() ? (
					<CommandBarButton
						style={ {color: '#ffffff'} }
						iconProps={ {iconName: 'PowerButton'} }
						onClick={() => {
							authStore.logout(client)
							history.push('/login')
						}}
					>
						Logout
					</CommandBarButton>
				) : (
					<CommandBarButton
						style={ {color: '#ffffff'} }
						iconProps={ {iconName: 'Door'} }
						onClick={() => history.push('/login')}
					>
						Login
					</CommandBarButton>
				)}

			</div>
		)
	}
}

export default withRouter(withApollo(NavBar))