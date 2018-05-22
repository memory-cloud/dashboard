import React from 'react'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
export default () => {
	return (
		<MessageBar
			messageBarType={ MessageBarType.error }
			isMultiline={ false }
		>
			Error 404: Page not found
		</MessageBar>
	)
}
