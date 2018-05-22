import React from 'react'
import {
	Spinner,
	SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
export default () => {
	return (
		<div>
			<Spinner size={ SpinnerSize.large } label='Loading...' ariaLive='assertive' />
		</div>
	)
}
