import React from 'react'
import './style.css'
import { AUTH_TOKEN } from '../../constants'
import {Link} from 'office-ui-fabric-react/lib/Link'
import {ActionButton} from 'office-ui-fabric-react/lib/Button'

const authToken = localStorage.getItem(AUTH_TOKEN)

const NavBar = ({onChange, onSearch}) => (
	<div className="NavBar">
		<div className="logo ms-font-xl">
			<Link href={authToken ? '/dashboard/dashboard' : '/dashboard'}><strong>Memory Cloud</strong></Link>
			{authToken ? (
				<Link href="/dashboard/dashboard"> | Games</Link>
				) : ('')}
		</div>
		{authToken ? (
			<ActionButton style={ { color: '#ffffff'} }
				iconProps={ { iconName: 'PowerButton' } }
				onClick={() => {
					localStorage.removeItem(AUTH_TOKEN)
				}}
			    href="/dashboard"
			>
				Logout
			</ActionButton>
			) : (
			<Link href="/dashboard/login">Login</Link>
			)
		}

	</div>
)

export default NavBar