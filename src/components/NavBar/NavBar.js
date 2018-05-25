import React, {Component} from 'react'
import './style.css'
import {Link} from 'office-ui-fabric-react/lib/Link'
import {CommandBarButton} from 'office-ui-fabric-react/lib/Button'
import { withRouter } from 'react-router'

class NavBar extends Component {
	render() {
		const {authStore, history} = this.props

		return (
			<div className="NavBar">
				<div className="logo ms-font-xl">
					<Link onClick={() => history.push(authStore.state.token ? '/games' : '/')}><strong>Memory
						Cloud</strong></Link>
					{authStore.state.token ? (
							<Link onClick={() => history.push('/games')}>&nbsp; Games</Link>
						) : ('')}
				</div>
				{authStore.state.user}
				{authStore.state.token ? (
						<CommandBarButton style={ {color: '#ffffff'} }
						                  iconProps={ {iconName: 'PowerButton'} }
						                  onClick={() => {
							                  authStore.logout()
							                  history.push('/login')
						                  }}
						>
							Logout
						</CommandBarButton>
					) : (
						<CommandBarButton style={ {color: '#ffffff'} }
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

export default withRouter(NavBar)