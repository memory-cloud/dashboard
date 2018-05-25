import React from 'react'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

const Feedback = ({feedStore}) => (
	<div>
		{feedStore.state.error ? (
			<MessageBar
				messageBarType={ MessageBarType.error }
			>
				{feedStore.state.error}
			</MessageBar>
		) : (
			''
		)}
		{feedStore.state.info ? (
			<MessageBar>
				{feedStore.state.info}
			</MessageBar>
		) : (
			''
		)}
		{feedStore.state.success ? (
			<MessageBar
				messageBarType={ MessageBarType.success }
			>
				{feedStore.state.success}
			</MessageBar>
		) : (
			''
		)}
	</div>
)

export default Feedback