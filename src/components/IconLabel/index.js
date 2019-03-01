import React from 'react'
const iconLabel = ({ icon, className }) => {
	return (
		<svg className={`icon ${className}`} aria-hidden="true">
			<use xlinkHref={icon}></use>
		</svg>
	)
}

export default iconLabel
