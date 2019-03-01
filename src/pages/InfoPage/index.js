import React, { Component } from 'react'
import request from '../../utils/_http'
import { Table, Button, Tag, Feedback, Dialog } from '@icedesign/base'
import BalloonConfirm from '@icedesign/balloon-confirm'
import DialogComponent from './components/dialog'
const { Column } = Table
import './scss/index.scss'
// code: 200
// status: "success"

//都重新请求了
class InfoPage extends Component {
  state = {
  	isShowChange: false,
  	data: {},
  	addChangeList: {},
  	loading: true,
  	dialogShow: false,
  	logContext: '',
  	dialogTitle: ''
  }
  // 添加调度的按钮fn
  addChange = (val) => {
  	this.setState({
  		isShowChange: true,
  		addChangeList: val
  	})
  }
  componentDidMount () {
  	this.getData()
  }
  // 添加调度的请求参数
  addChangeListFn = (params) => {
  	this.setState({
  		loading: true
  	})
  	request.post('addscheduler', params)
  		.then((e) => {
  			if (e && e.code === 200 && e.status === 'success') {
  				Feedback.toast.success('添加调度成功')
  				this.setState({
  					loading: false
  				}, () => {
  					this.getData()
  				})
  			} else {
  				Feedback.toast.error('添加调度失败')
  			}
  		}, error => {
  			Feedback.toast.error(error)
  		})
  }
  // 子组件传递回来的弹窗参数
  getChangeList = (val) => {
  	this.addChangeListFn(val)
  }
  // 获取页面数据的fn
  getData = () => {
  	request.get('projectinfo', {
  		'project_name': this.props.history.location.search.slice(1).split('=')[1]
  	})
  		.then(e => {
  			if (e && e.code === 200 && e.data) {
  				this.setState({
  					data: e.data,
  					loading: false,
  					isShowChange: false
  				})
  			}
  		}, error => {
  			Feedback.toast.error(error)
  		})
  }
  // 删除此项目的fn
  deletProject = () => {
  	request.post('delproject', {
  		'project_name': this.state.data.project_name
  	})
  		.then(e => {
  			if (e && e.code === 200 && e.status === 'success') {
  				Feedback.toast.success('成功删除')
  				const { history } = this.props
  				setTimeout(() => {
  					history.push('/project/all')
  				}, 600)
  			} else {
  				Feedback.toast.error('删除失败')
  			}
  		}, err => {
  			Feedback.toast.error(err)
  		})
  }
  // 删除确认fn
  onConfirm = () => {
  	this.deletProject()
  }
  // 删除取消fn
  onCancel = () => {
  	Feedback.toast.error('取消')
  }
  // 关闭loading函数
  colseRunLoading = () => {
  	this.setState({
  		loading: false
  	})
  }
  // 关闭dialog
  onClose = () => {
  	this.setState({
  		dialogShow: false
  	})
  }
  // run执行函数
  runList = (params) => {
  	request.post('runonce', params)
  		.then(e => {
  			if (e && e.code === 200 && e.status === 'success') {
  				Feedback.toast.success('成功')
  				this.setState({
  					loading: false
  				}, () => {
  					// 刷新页面
  					this.getData()
  				})
  			} else {
  				this.colseRunLoading()
  				Feedback.toast.error(e.msg)
  			}
  		}, err => {
  			this.colseRunLoading()
  			Feedback.toast.error(err)
  		})
  }
  // run 主log 从log的请求函数
  runLogFn = (type, params) => {
  	const master = 'masterlog'
  	const slave = 'slavelog'
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
  // 渲染操作的按钮触发的函数
  operationFn = (record, type, e) => {
  	e.preventDefault()
  	if (type === 1) {
  		// 为运行
  		const params = {
  			'project_id': record.spider_id,
  			'spider_name': record.spider_name,
  			'spider_arguments': null,
  			'daemon': 'auto',
  			'priority': 0
  		}
  		this.setState({
  			loading: true
  		})
  		this.runList(params)
  	} else if (type === 2) {
  		// 为主log
  		this.runLogFn(1, {
  			project_id: record.spider_id,
  			job_exec_id: record.job_exec_id
  		})
  	} else {
  		// 为从log
  		this.runLogFn(0, {
  			project_id: record.spider_id,
  			job_exec_id: record.job_exec_id
  		})
  	}
  }
  // 渲染类型的fn
  renderType = (value, index, record) => {
  	return (
  		<div>
  			{
  				value === 'periodic' ?
  					(<span>periodic</span>) :
  					(
  						<div>
  							<span>onetime</span>
  							<Button type='primary' onClick={this.addChange.bind(this, record)}>添加调度</Button>
  						</div>
  					)
  			}
  		</div>
  	)
  }
  // 渲染操作
  renderOperations = (value, index, record) => {
  	return (
  		<div className='buttonBox'>
  			<Button onClick={this.operationFn.bind(this, record, 1)} type='primary'>运行</Button>
  			<Button onClick={this.operationFn.bind(this, record, 2)} type='primary'>主log</Button>
  			<Button onClick={this.operationFn.bind(this, record, 3)} type='primary'>从log</Button>
  		</div>
  	)
  }
  render () {
  	return (
  		<div className="container">
  			<div className="container_top">
  				<div className="container_top_title">
  					<span>{`${this.state.data.project_name} ${this.state.data.project_alias}`}</span>
  					<span className='title_right'>编辑项目信息</span>
  				</div>
  				<div className="container_top_context">
  					<div className='row_style'>
  						<div>
  							<span>创建时间:</span>
  							<b>{this.state.data.create_time}</b>
  						</div>
  						<div>
  							<span>开发人员:</span>
  							<b className={[this.state.data.developers].length > 4 ? 'tag_box manyTag' : 'tag_box'}>
  								{
  									[this.state.data.developers].map((val, index) => (
  										<Tag
  											key={index}
  											className='tagStyle'
  											animation={false}
  											shape='readonly'>{val}</Tag>
  									))
  								}
  							</b>
  						</div>
  					</div>
  					<div className='row_style'>
  						<div>
  							<span>需求项目:</span>
  							<b>{this.state.data.for_project}</b>
  						</div>
  						<div>
  							<span>申请开发人:</span>
  							<b>{this.state.data.applicant}</b>
  						</div>
  					</div>
  					<div className='row_btn'>
  						<BalloonConfirm
  							onConfirm={this.onConfirm}
  							onCancel={this.onCancel}
  							title="确定要删除此项目吗？"
  						>
  							<Button
  								className='btn_Style'
  								size='large'>
                  删除项目
  							</Button>
  						</BalloonConfirm>
  					</div>
  				</div>
  			</div>
  			<div className="container_bottom">
  				<div className="container_bottom_title">
  					<span>爬虫运行情况</span>
  					<span className='title_right'>编辑项目信息</span>
  				</div>
  				<div className="container_bottom_context">
  					<Table
  						className='tableCol'
  						dataSource={this.state.data.spiders}
  						isLoading={this.state.loading}
  						hasBorder={true}>
  						<Column
  							lock='left'
  							width={80}
  							title='蜘蛛ID'
  							dataIndex="spider_id"/>
  						<Column
  							width={150}
  							title='蜘蛛名称（英文）'
  							dataIndex="spider_name"/>
  						<Column
  							width={150}
  							title='蜘蛛名称（中文）'
  							dataIndex="spider_alias"/>
  						<Column
  							width={150}
  							title='调度类型'
  							dataIndex="circle_type"
  							cell={this.renderType}/>
  						<Column
  							width={180}
  							title='最近运行时间'
  							dataIndex="last_run_time"/>
  						<Column
  							width={120}
  							title='最近运行状态'
  							dataIndex="last_run_status"
  							cell={this.renderStatus}/>
  						<Column
  							lock='right'
  							width={250}
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
  				</div>
  			</div>
  			<DialogComponent isShowChange={this.state.isShowChange} addChangeList={this.state.addChangeList} getChangeList={this.getChangeList}/>
  		</div>
  	)
  }
}

export default InfoPage
