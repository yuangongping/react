import React, { Component } from 'react'
import request from '../../utils/_http'
import { Table, Button, Feedback } from '@icedesign/base'
import AddServer from './components/dialog'
import BalloonConfirm from '@icedesign/balloon-confirm'
const { Column } = Table
const Toast = Feedback.toast
import './scss/index.scss'

class ServerManage extends Component {
  state = {
  	data: [], // 这个data是table中数据
  	dialogData: {}, // 这个是弹窗中form的data
  	defaultDialogData: {}, // 这个是第一次点击编辑的时候的默认弹窗里面的数值（目的让他作为初始值来对比）
  	loading: false,
  	showDialog: false,
  	isEdit: false
  }
  componentDidMount () {
  	// 在项目中，因为redux的学习曲线较高，这里我们没有使用store，所有刷新等操作我们就直接
  	// 放在生命周期中来实现
  	this.getList()
  }
  // 拿到子组件传递回来的添加参数
  okBtn = () => {
  	if (this.state.dialogData.server_ip !== this.state.defaultDialogData.server_ip ||
      this.state.dialogData.is_master !== this.state.defaultDialogData.is_master ||
      this.state.dialogData.server_status !== this.state.defaultDialogData.server_status) {
  		if (this.state.isEdit) {
  			// 执行编辑的请求函数
  			this.editList()
  		} else {
  			if (this.state.dialogData.server_ip &&
          this.state.dialogData.is_master &&
          this.state.dialogData.server_status) return this.addList(this.state.dialogData)
  			Feedback.toast.error('请添加完整参数后提交')
  		}
  	} else {
  		Feedback.toast.error('请编辑后提交')
  	}
  }
  cancelBtn = () => {
  	this.setState({
  		showDialog: false
  	})
  }
  // 获取列表函数
  getList = () => {
  	request.get('listmachine')
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
  // 删除列表函数
  deletList = () => {
  	// 暂无请求地址和请求参数
  	Toast.success('执行了删除函数（暂无删除接口）')
  }
  // 添加列表函数
  addList = (params) => {
  	request.post('addmachine', params)
  		.then(e => {
  			if (e && e.code === 200 && e.data && e.data === 'success') {
  				this.setState({
  					loading: true,
  					showDialog: false
  				}, () => {
  					this.getList()
  				})
  			}
  		}, () => {

  		})
  }
  // 编辑列表函数
  editList = () => {
  	Feedback.toast.error('功能暂未开放')
  }
  // 取消删除
  onCancel = () => {
  	Feedback.toast.error('取消')
  }
  // 操作render中的点击事件
  operationFn = (record, type, e) => {
  	console.log('??????')
  	e.preventDefault()
  	if (type) {
  		// 为编辑
  		this.setState({
  			showDialog: true,
  			dialogData: record,
  			defaultDialogData: this.deepCopy(record),
  			isEdit: true
  		})
  	} else {
  		this.deletList()
  	}
  }
  deepCopy = (o) => {
  	return JSON.parse(JSON.stringify(o))
  }
  // 状态渲染fn
  renderStatus = (val) => {
  	return (
  		<div>
  			{val === '1' ? '可用' : '不可用'}
  		</div>
  	)
  }
  // 类型渲染fn
  renderType = (val) => {
  	return (
  		<div>
  			{val === '1' ? '从服务器' : '主服务器'}
  		</div>
  	)
  }
  renderOperations = (value, index, record) => {
  	return (
  		<div className='buttonBox'>
  			<Button className='btnStyle' onClick={this.operationFn.bind(this, record, 1)} type='primary'>编辑</Button>
  			<BalloonConfirm
  							onConfirm={this.operationFn.bind(this, record, 0)}
  							onCancel={this.onCancel}
  							title="确定要删除此项目吗？"
  						>
  			  <Button className='btnStyle deletBtn' type='primary'>删除</Button>
  			</BalloonConfirm>
  		</div>
  	)
  }
  addServer = () => {
  	this.setState({
  		showDialog: true,
  		isEdit: false,
  		dialogData: {},
  		defaultDialogData: {}
  	})
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
  					width={230}
  					title='服务器ip'
  					dataIndex="server_ip"/>
  				<Column
  					width={130}
  					title='服务器类型'
  					dataIndex="is_master"
  					cell={this.renderType}/>
  				<Column
  					width={80}
  					title='状态'
  					dataIndex="server_status"
  					cell={this.renderStatus}/>
  				<Column
  					lock='right'
  					width={120}
  					title='操作'
  					cell={this.renderOperations}/>
  			</Table>
  			<div className='addBtnBox'>
  				<Button onClick={this.addServer} type='primary' className='addBtn'>添加服务器</Button>
  			</div>
  			{/* <div className='pageBox'>
  				<Pagination />
  			</div> */}
  			<AddServer
  				isShow={this.state.showDialog}
  				cancelBtn={this.cancelBtn}
  				newData={this.state.dialogData}
  				okBtn={this.okBtn}/>
  		</div>
  	)
  }
}
export default ServerManage
