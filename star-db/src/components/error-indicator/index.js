import React from 'react'

import './error-indicator.css'

import icon from './Death-Star-icon.png'

export default function ErrorIndicator() {
	return (
		<div className="error-indicator">
		<img src={icon} alt="error-icon"/>
			<span className="boom">BOOM!</span>
			<span>Something has gone terribly wrong</span>
			<span>(but we already sent droids to fix it)</span>
		</div>
	)
}
