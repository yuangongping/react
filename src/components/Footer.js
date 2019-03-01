import React, { PureComponent } from 'react'
import Layout from '@icedesign/layout'
import cx from 'classnames'

export default class Footer extends PureComponent {
	render () {
		const { className, style } = this.props
		return (
			<Layout.Footer
				className={cx('ice-design-layout-footer', className)}
				style={{
					...style,
					lineHeight: '32px',
					backgroundColor: '#f0f3f5',
					borderTop: '1px solid #c8ced3'
				}}
			>
				<div className="ice-design-layout-footer-body">
					<div className="copyleft">
            © 2018-2019 大数据管理平台 by {' '}
						<a
							href="https://github.com/alibaba/ice"
							target="_blank"
							className="copyright-link"
							rel="noopener noreferrer"
						>
              共性技术部
						</a>
					</div>
					<div className="copyright">
            © 2018-2019 大数据管理平台 by {' '}
						<a
							href="https://github.com/alibaba/ice"
							target="_blank"
							className="copyright-link"
							rel="noopener noreferrer"
						>
              共性技术部
						</a>
					</div>
				</div>
			</Layout.Footer>
		)
	}
}
