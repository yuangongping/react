import React, { Component } from 'react'
import request from '../../utils/_http'
import { Table, Tag, Feedback } from '@icedesign/base'
const { Column } = Table
const Toast = Feedback.toast
import './scss/index.scss'

class AllProject extends Component {
  state = {
  	loading: true,
  	data: []
  }
  componentDidMount () {
  	request.get('allproject')
  		.then(e => {
  			if (e && e.code === 200 && e.data) {
  				this.setState({
  					data: e.data,
  					loading: false
  				})
  			}
  		}, error => {
  			this.setState({
  				loading: false
  			})
  			Toast.error(error)
  		})
  }
  checkInfo = (val, e) => {
  	e.preventDefault()
  	const { history } = this.props
  	history.push(`/project/all/info?projectname=${val}`)
  }
  renderTag = (val) => {
  	// 因为不知道具体返回格式
  	// 因为开发人员必定为一个数组，后期根据格式情况在这里做格式修改
  	let items = []
  	items.push(val)
  	return (
  		<div className='tagBox'>
  			{items.map((val, index) => (
  				<Tag
  					key={index}
  				className='tagStyle'
  				animation={false}
  				shape='readonly'>{val}</Tag>
  			))}
  		</div>
  	)
  }
  renderInfo = (val) => {
  	return (
  		<div className='linkBox'>
  			<a onClick={this.checkInfo.bind(this, val)}>查看详情</a>
  		</div>
  	)
  }
  render () {
  	return (
  		<div className='container'>
  			<Table
  				className='tableCol'
  				dataSource={this.state.data}
  				isLoading={this.state.loading}
  				hasBorder={true}>
  				<Column
  					lock='left'
  					width={60}
  					title='项目ID'
  					dataIndex="project_id"/>
  				<Column
  					width={160}
  					title='项目名称'
  					dataIndex="project_name"/>
  				<Column
  					width={150}
  					title='创建时间'
  					dataIndex="create_time"/>
  				<Column
  					width={160}
  					title='开发人员'
  					dataIndex="developers"
  					cell={this.renderTag}/>
  				<Column
  					width={160}
  					title='项目需求'
  					dataIndex="for_project"/>
  				<Column
  					width={85}
  					title='申请开发人'
  					dataIndex="applicant"
  					cell={this.renderStatus}/>
  				<Column
  					width={100}
  					title='运行服务器'/>
  				<Column
  					lock='right'
  					width={80}
  					title='操作'
  					dataIndex='project_name'
  					cell={this.renderInfo}/>
  			</Table>
  			{/* <div className='pageBox'>
  				<Pagination />
  			</div> */}
  		</div>
  	)
  }
}

export default AllProject
