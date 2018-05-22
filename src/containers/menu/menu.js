import React from 'react'
import {Nav} from 'office-ui-fabric-react/lib/Nav'

const SidebarMenu = ({groups, expanded, collapsed}) => (
	<div className='SidebarMenu'>
		<Nav groups={groups}
		     expandedStateText={expanded}
		     collapsedStateText={collapsed}
		/>
	</div>
)

SidebarMenu.defaultProps = {
	groups: [{
		links: [{
			name: 'Game List',
			url: '/dashboard'
		},{
			name: 'New Game',
			url: '/newgame'
		}]
		// 	name: 'Documents',
		// 	url: 'http://example.com',
		// 	isExpanded: true,
		// }, {
		// 	name: 'Pages',
		// 	url: 'http://msn.com',
		// }, {
		// 	name: 'Notebook',
		// 	url: 'http://msn.com',
		// }, {
		// 	name: 'Long Name Test for elipsis. Longer than 12em!',
		// 	url: 'http://example.com',
		// }, {
		// 	name: 'Edit Link',
		// 	url: 'http://example.com',
		// 	iconClassName: 'ms-Icon--Edit',
		// }, {
		// 	name: 'Edit',
		// 	url: '#',
		// 	icon: 'Edit',
		// 	onClick: () => {},
		// }]
	}],
	expanded: 'expanded',
	collapsed: 'collapsed',
}

export default SidebarMenu