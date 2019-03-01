import React, { PureComponent } from 'react'
import { Balloon, Icon } from '@icedesign/base'
import IceImg from '@icedesign/img'
import Layout from '@icedesign/layout'
import Menu from '@icedesign/menu'
import FoundationSymbol from 'foundation-symbol'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { headerMenuConfig } from '../menuConfig'
import Breadcurmb from './Breadcrumb/index'
// import { withRouter } from 'react-router-dom'
// @withRouter
class Header extends PureComponent {
	render () {
		const { width, theme, className, style, routePath } = this.props

		return (
			<Layout.Header
				theme={theme}
				className={cx('ice-design-layout-header', className)}
				style={{ ...style, width }}
			>
				{/* 面包屑 */ }
				<Breadcurmb route={routePath} fristTitle='中电科大数据采集平台' hasFristTitle/>
				<div
					className="ice-design-layout-header-menu"
					style={{ display: 'flex' }}
				>
					{/* Header 菜单项 begin */}
					{headerMenuConfig && headerMenuConfig.length > 0 ? (
						<Menu mode="horizontal" selectedKeys={[]}>
							{headerMenuConfig.map((nav, idx) => {
								const linkProps = {}
								if (nav.newWindow) {
									linkProps.href = nav.to
									linkProps.target = '_blank'
								} else if (nav.external) {
									linkProps.href = nav.to
								} else {
									linkProps.to = nav.to
								}
								return (
									<Menu.Item key={idx}>
										{linkProps.to ? (
											<Link {...linkProps}>
												{nav.icon ? (
													<FoundationSymbol type={nav.icon} size="small" />
												) : null}
												{nav.name}
											</Link>
										) : (
											<a {...linkProps}>
												{nav.icon ? (
													<FoundationSymbol type={nav.icon} size="small" />
												) : null}
												{nav.name}
											</a>
										)}
									</Menu.Item>
								)
							})}
						</Menu>
					) : null}
					{/* Header 菜单项 end */}

					{/* Header 右侧内容块 */}

					<Balloon
						trigger={
							<div
								className="ice-design-header-userpannel"
								style={{
									display: 'flex',
									alignItems: 'center',
									fontSize: 12,
								}}
							>
								<IceImg
									height={40}
									width={40}
									src={require('../assets/images/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png')}
									className="user-avatar"
								/>
								<div className="user-profile">
									<span className="user-name" style={{ fontSize: '15px' }}>
                    小明
									</span>
									<span
										className="user-department"
										style={{ fontSize: '10px', color: '#999' }}
									>
                    共性技术部
									</span>
								</div>
								<Icon
									type="arrow-down-filling"
									size="xxs"
									className="icon-down"
								/>
							</div>
						}
						closable={false}
						className="user-profile-menu"
					>
						<ul>
							<li className="user-profile-menu-item">
								<Link to="/user">
									<FoundationSymbol type="repair" size="small" />设置
								</Link>
							</li>
							<li className="user-profile-menu-item">
								<Link to="/">
									<FoundationSymbol type="compass" size="small" />安全退出
								</Link>
							</li>
						</ul>
					</Balloon>
				</div>
			</Layout.Header>
		)
	}
}
export default Header
