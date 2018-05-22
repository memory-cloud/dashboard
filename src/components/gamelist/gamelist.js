import React from 'react'
import {Link} from 'react-router-dom'

export default ({games}) => {
	let url = '?key=' + leaderboardkey + '&appid=' + appid + '&name=' + name
	return (
		<div>
			<Link to={'game/' + appid}>{key}</Link>
		</div>
	)
}
