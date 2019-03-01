import React, { PureComponent } from 'react'

export default class Logo extends PureComponent {
	render () {
		return (
			<div className="logo" style={this.props.style}>
				{/* <img
					src={require('../assets/images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
					alt=""
					style={{ width: '40px' }}
				/> */}
				<div className="logo-title">
          大数据采集平台
				</div>
			</div>
		)
	}
}
