import React, { Component } from 'react'
import request from '../../utils/_http'
import { Table, Button, Tag, Loading, Feedback, Dialog } from '@icedesign/base'
const Toast = Feedback.toast
const { Column } = Table
import './scss/index.scss'

class RunStatus extends Component {
  state = {
  	data: [],
  	loading: true,
  	visible: false,
  	dialogShow: false,
  	logContext: '',
  	dialogTitle: ''
  }
  componentDidMount () {
  	this.getInfo()
  }
  getInfo = () => {
  	request.get('allspider')
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
  colseRunLoading = () => {
  	this.setState({
  		visible: false
  	})
  }
  // 关闭dialog
  onClose = () => {
  	this.setState({
  		dialogShow: false
  	})
  }
  runList = (params) => {
  	request.post('http://172.10.10.183:5000/runonce', params)
  		.then(e => {
  			if (e && e.code === 200 && e.status === 'success') {
  				Feedback.toast.success('成功')
  				this.setState({
  					visible: false
  				}, () => {
  					this.getInfo()
  				})
  			} else {
  				Feedback.toast.error(e.msg)
  				this.colseRunLoading()
  			}
  		}, err => {
  			this.colseRunLoading()
  			Feedback.toast.error(err)
  		})
  }
  runLogFn = (type, params) => {
  	const master = 'http://172.10.10.183:5000/masterlog'
  	const slave = 'http://172.10.10.183:5000/slavelog'
  	request.get(type ? master : slave, params)
  		.then((e) => {
  			if (e && e.code === 200 && e.log) {
  				this.setState({
  					dialogShow: true,
  					logContext: e.log,
  					dialogTitle: type ? '主log' : '从log'
  				})
  			} else {
  				Feedback.toast.error(e.msg)
  			}
  		}, error => {
  			Feedback.toast.error(error)
  		})
  }
  operationFn = (record, type, e) => {
  	e.preventDefault()
  	if (type === 1) {
  		// 为运行
  		const params = {
  			'project_id': record.project_id,
  			'spider_name': record.spider_name,
  			'spider_arguments': null,
  			'daemon': 'auto',
  			'priority': 0
  		}
  		this.setState({
  			visible: true
  		})
  		this.runList(params)
  	} else if (type === 2) {
  		// 为主log
  		this.runLogFn(1, {
  			project_id: record.project_id,
  			job_exec_id: record.job_exec_id
  		})
  	} else {
  		// 为从log
  		this.runLogFn(0, {
  			project_id: record.project_id,
  			job_exec_id: record.job_exec_id
  		})
  	}
  }
  renderOperations = (index, value, record) => {
  	return (
  		<div className='buttonBox'>
  			<Button onClick={this.operationFn.bind(this, record, 1)} type='primary'>运行</Button>
  			<Button onClick={this.operationFn.bind(this, record, 2)} type='primary'>主log</Button>
  			<Button onClick={this.operationFn.bind(this, record, 3)} type='primary'>从log</Button>
  		</div>
  	)
  }
  renderStatus = (val) => {
  	return (
  		<div className='tagBox'>
  			<Tag className='tag' shape='readonly' type="primary">
  				{val}
  			</Tag>
  		</div>
  	)
  }
  render () {
  	return (
  		<Loading visible={this.state.visible} shape="fusion-reactor" color="#333">
  			<div className='container' id='containerBox'>
  				<Table
  					className='tableCol'
  					dataSource={this.state.data}
  					isLoading={this.state.loading}
  					hasBorder={true}>
  					<Column
  						lock='left'
  						width={80}
  						title='项目ID'
  						dataIndex="project_id"/>
  					<Column
  						width={160}
  						title='项目名称'
  						dataIndex="project_name"/>
  					<Column
  						width={80}
  						title='蜘蛛ID'
  						dataIndex="spider_id"/>
  					<Column
  						width={160}
  						title='蜘蛛名称'
  						dataIndex="spider_name"/>
  					<Column
  						width={180}
  						title='最近运行时间'
  						dataIndex="last_run_time"/>
  					<Column
  						width={130}
  						title='最近运行状态'
  						dataIndex="last_run_status"
  						cell={this.renderStatus}/>
  					<Column
  						lock='right'
  						width={260}
  						title='操作'
  						cell={this.renderOperations}/>
  				</Table>
  				<Dialog
  					visible={this.state.dialogShow}
  					onClose={this.onClose}
  					style={{ width: '400px' }}
  					footer={false}
  					title={this.state.dialogTitle}
  				>
  					<p className='logContext'>{this.state.logContext}</p>
  				</Dialog>
  				{/* <div className='pageBox'>
  					<Pagination />
  				</div> */}
  			</div>
  		</Loading>
  	)
  }
}
export default RunStatus
