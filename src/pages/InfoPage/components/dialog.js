import React, { Component } from 'react'
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder'
import { Dialog, Grid, Form, Input, Select } from '@icedesign/base'
const { Col, Row } = Grid
const { Item } = Form
import '../scss/index.scss'

class AddChangeDialog extends Component {
  state = {
  	isShow: false,
  	val: {
  		project_id: '',
  		spider_name: '',
  		spider_arguments: '', //输入的
  		priority: '', //优先 low-1 normal0 height1 hightest2
  		daemon: 'auto',
  		cron_month: '*',
  		cron_day_of_month: '*', // every 传*
  		cron_day_of_week: '*',
  		cron_hour: '*',
  		cron_minutes: '*'
  	}
  }
  componentWillReceiveProps (val) {
  	this.setState({
  		isShow: val.isShowChange,
  		val: {
  			project_id: val.addChangeList.spider_id,
  			spider_name: val.addChangeList.spider_name,
  			daemon: 'auto',
  		}
  	})
  }
  // 通过props回调的方式传给父组件
  confirm = () => {
  	this.validateAllFormField()
  		.then(e => {
  			this.closeDialog()
  			if (e === 'success') {
  				this.props.getChangeList(this.state.val)
  			}
  		})
  }
  cancelBtn = () => {
  	this.closeDialog()
  }
  // 关闭弹窗
  closeDialog = () => {
  	this.setState({
  		isShow: false
  	})
  }
  // 验证触发函数
  validateAllFormField = () => {
  	return new Promise((resolve, reject) => {
  	  this.refs.form.validateFields((errors) => {
  			if (!errors) {
  				resolve('success')
  			} else {
  				reject(errors)
  			}
  	  })
  	})
  }
  render () {
  	const priority = [
  		{ label: 'low', value: '-1' },
  		{ label: 'normal', value: '0' },
  		{ label: 'height', value: '1' },
  		{ label: 'hightest', value: '2' },
  	]
  	const month = [
  		{ label: 'Every Month', value: '*' },
  		{ label: '1', value: '1' },
  		{ label: '2', value: '2' },
  		{ label: '3', value: '3' },
  		{ label: '4', value: '4' },
  		{ label: '5', value: '5' },
  		{ label: '6', value: '6' },
  		{ label: '7', value: '7' },
  		{ label: '8', value: '8' },
  		{ label: '9', value: '9' },
  		{ label: '10', value: '10' },
  		{ label: '11', value: '11' },
  		{ label: '12', value: '12' }
  	]
  	const week = [
  		{ label: 'Every Day', value: '*' },
  		{ label: 'Monday', value: 'Monday' },
  		{ label: 'Tuesday', value: 'Tuesday' },
  		{ label: 'Wednesday', value: 'Wednesday' },
  		{ label: 'Thursday', value: 'Thursday' },
  		{ label: 'Friday', value: 'Friday' },
  		{ label: 'Saturday', value: 'Saturday' },
  		{ label: 'Sunday', value: 'Sunday' },
  	]
  	const day = [
  		{ label: 'Every Day', value: '*' },
  		{ label: '1', value: '1' },
  		{ label: '2', value: '2' },
  		{ label: '3', value: '3' },
  		{ label: '4', value: '4' },
  		{ label: '5', value: '5' },
  		{ label: '6', value: '6' },
  		{ label: '7', value: '7' },
  		{ label: '8', value: '8' },
  		{ label: '9', value: '9' },
  		{ label: '10', value: '10' },
  		{ label: '11', value: '11' },
  		{ label: '12', value: '12' },
  		{ label: '13', value: '13' },
  		{ label: '14', value: '14' },
  		{ label: '15', value: '15' },
  		{ label: '16', value: '16' },
  		{ label: '17', value: '17' },
  		{ label: '18', value: '18' },
  		{ label: '19', value: '19' },
  		{ label: '20', value: '20' },
  		{ label: '21', value: '21' },
  		{ label: '22', value: '22' },
  		{ label: '23', value: '23' },
  		{ label: '24', value: '24' },
  		{ label: '25', value: '25' },
  		{ label: '26', value: '26' },
  		{ label: '27', value: '27' },
  		{ label: '28', value: '28' },
  	]
  	const hour = [
  		{ label: 'Every Hour', value: '*' },
  		{ label: '0', value: '0' },
  		{ label: '1', value: '1' },
  		{ label: '2', value: '2' },
  		{ label: '3', value: '3' },
  		{ label: '4', value: '4' },
  		{ label: '5', value: '5' },
  		{ label: '6', value: '6' },
  		{ label: '7', value: '7' },
  		{ label: '8', value: '8' },
  		{ label: '9', value: '9' },
  		{ label: '10', value: '10' },
  		{ label: '11', value: '11' },
  		{ label: '12', value: '12' },
  		{ label: '13', value: '13' },
  		{ label: '14', value: '14' },
  		{ label: '15', value: '15' },
  		{ label: '16', value: '16' },
  		{ label: '17', value: '17' },
  		{ label: '18', value: '18' },
  		{ label: '19', value: '19' },
  		{ label: '20', value: '20' },
  		{ label: '21', value: '21' },
  		{ label: '22', value: '22' },
  		{ label: '23', value: '23' },
  	]
  	const minSelect = [
  		{ label: 'Every Min', value: '*' },
  		{ label: '0', value: '0' },
  		{ label: '5', value: '5' },
  		{ label: '10', value: '10' },
  		{ label: '15', value: '15' },
  		{ label: '20', value: '20' },
  		{ label: '25', value: '25' },
  		{ label: '30', value: '30' },
  		{ label: '35', value: '35' },
  		{ label: '40', value: '40' },
  		{ label: '45', value: '45' },
  		{ label: '50', value: '50' },
  		{ label: '55', value: '55' },
  		{ label: '60', value: '60' }
  	]
  	return (
  		<Dialog
  			visible={this.state.isShow}
  			closable={false}
  			onCancel={this.cancelBtn}
  			onOk={this.confirm}
  			style={{ width: '400px' }}
  			title='添加调度'
  		>
  			<FormBinderWrapper
  				value={this.state.val}
  				ref="form"
  			>
  				<Form labelTextAlign='right'>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="工程id">
  								<FormBinder name="project_id">
  								  <Input disabled size='large' />
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="蜘蛛英文名">
  								<FormBinder name="spider_name">
  								  <Input disabled size='large' />
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="运行服务">
  								<FormBinder name="daemon">
  								  <Input disabled size='large' />
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="启动参数" required>
  								<FormBinder name="spider_arguments" required message="请输入启动参数">
  								  <Input hasClear size='large' placeholder='请输入启动参数'/>
  								</FormBinder>
  								<FormError name='spider_arguments' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="优先级" required>
  								<FormBinder name="priority" required message="必选">
  									<Select
  										placeholder="服务器状态"
  										style={{ width: '60%' }}
  										dataSource={priority}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='priority' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="选择月份" required>
  								<FormBinder name="cron_month" required message="必选">
  									<Select
  										style={{ width: '60%' }}
  										dataSource={month}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='cron_month' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="选择周几运行" required>
  								<FormBinder name="cron_day_of_week" required message="必选">
  									<Select
  										style={{ width: '60%' }}
  										dataSource={week}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='cron_day_of_week' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="选择每月几号运行" required>
  								<FormBinder name="cron_day_of_month" required message="必选">
  									<Select
  										style={{ width: '60%' }}
  										dataSource={day}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='cron_day_of_month' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="选择小时" required>
  								<FormBinder name="cron_hour" required message="必选">
  									<Select
  										style={{ width: '60%' }}
  										dataSource={hour}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='cron_hour' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="选择分钟" required>
  								<FormBinder name="cron_minutes" required message="必选">
  									<Select
  										style={{ width: '60%' }}
  										dataSource={minSelect}
  									>
  									</Select>
  								</FormBinder>
  								<FormError name='cron_minutes' className='formError' />
  							</Item>
  						</Col>
  					</Row>
  				</Form>
  			</FormBinderWrapper>
  		</Dialog>
  	)
  }
}
export default AddChangeDialog
