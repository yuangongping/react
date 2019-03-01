import { Breadcrumb } from '@icedesign/base'
import React from 'react'
import breadKeyWord from '../../breadcrumbConfig'

const BreadComponent = ({ route, fristTitle, hasFristTitle }) => {
	let pathRoute
	return (
		<Breadcrumb className='breadcrumbBox' separator={<div style={{ color: '#666' }}>/</div>}>
			{hasFristTitle ? (<Breadcrumb.Item key={1}>{ fristTitle }</Breadcrumb.Item>) : (<div />)}
			{route.pathname.split('/').slice(1).map((val, index) => {
				pathRoute === undefined ? pathRoute = val : pathRoute += `/${val}`
				return route.pathname.split('/').slice(1).length > 2 ?
					index === route.pathname.split('/').slice(1).length - 1 || index === 0 ? (
						<Breadcrumb.Item key={index + 2}>{breadKeyWord(val)}</Breadcrumb.Item>
					): (<Breadcrumb.Item
						key={index + 2}
						link={`http://localhost:4444/#/${pathRoute}`}>{breadKeyWord(val)}</Breadcrumb.Item>
					) :
					(
						<Breadcrumb.Item key={index + 2}>{breadKeyWord(val)}</Breadcrumb.Item>
					)
			})}
		</Breadcrumb>
	)
}

export default BreadComponent
