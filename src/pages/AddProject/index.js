import React, { Component } from 'react'
import request from '../../utils/_http'
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder'
import { Grid, Input, Form, Checkbox, Button, Feedback, Loading } from '@icedesign/base'
import './scss/index.scss'
const { Row, Col } = Grid
const { Group } = Checkbox
const FormItem = Form.Item

// code: 200
// status: "success"
class AddProject extends Component {
  state = {
  	value: {
  		projectNameCh: '',
  		projectNameEn: '',
  		projectNeed: '',
  		applyName: '',
  		devItems: [],
  		mainReptile: '',
  		secondaryReptile: ''
  	},
  	visible: false
  }
  addForm = () => {
  	const formData = new FormData()
  	const master_egg = document.getElementById('master_egg').files[0]
  	const slave_egg = document.getElementById('slave_egg').files[0]
  	this.validateAllFormField()
  		.then(e => {
  			console.log(e)
  			formData.append('project_name', e.projectNameCh)
  			formData.append('project_alias', e.projectNameEn)
  			formData.append('for_project', e.projectNeed)
  			formData.append('applicant', e.applyName)
  			formData.append('developers', e.devItems.join(','))
  			formData.append('master_egg', master_egg)
  			formData.append('slave_egg', slave_egg)
  			if (e) {
  				this.setState({
  					visible: true
  				})
  				this.addDataFn(formData)
  			}
  		})
  }
  loadingClose = () => {
  	this.setState({
  		visible: false
  	})
  }
  // 添加的请求函数
  addDataFn = (params) => {
  	request.post(
  		'addproject',
  		params
  	)
  		.then(e => {
  			this.loadingClose()
  		if (e && e.data && e.data.code === 200 && e.data.status === 'success') {
  				Feedback.toast.success('添加成功')
  				const { history } = this.props
  				history.push('/project/all/')
  			} else {
  				Feedback.toast.error('添加失败')
  			}
  	}, error => {
  		this.loadingClose()
  		Feedback.toast.error(error)
  	})
  }
  // 验证触发函数
  validateAllFormField = () => {
  	return new Promise((resolve, reject) => {
  	  this.refs.form.validateFields((errors, values) => {
  			if (!errors) {
  				resolve(values)
  			} else {
  				reject(errors)
  			}
  	  })
  	})
  }
  render () {
  	const list = [
  		{ value: '谢红韬', label: '谢红韬' },
  		{ value: '袁公萍', label: '袁公萍' },
  		{ value: '陈林翠', label: '陈林翠' },
  		{ value: '程培东', label: '程培东' },
  		{ value: '杨泽华', label: '杨泽华' },
  	]
  	return (
  		<Loading visible={this.state.visible} shape="fusion-reactor" color="#333" style={{ width: '100%' }}>
  			<div className='formContainer'>
  				<FormBinderWrapper
  					value={this.state.value}
  					ref="form"
  				>
  					<Form>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="项目名称（英文）" required>
  									<FormBinder name="projectNameEn" triggerType='onBlur' rules={[
  										{ required: true, message: '请输入项目的英文名称' },
  										{ pattern: /^[0-9a-zA_Z]+$/, message: '请输入英文名称' }
  									]}>
  										<Input hasClear size='large' placeholder="请输入项目的英文名称" />
  									</FormBinder>
  									<FormError name='projectNameEn' className='formError' />
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="项目名称（中文）" required>
  									<FormBinder name="projectNameCh" triggerType='onBlur' rules={[
  										{ required: true, message: '请输入项目的中文名称' },
  										{ pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入中文名称' }
  									]}>
  										<Input hasClear size='large' placeholder="请输入项目的中文名称" />
  									</FormBinder>
  									<FormError name='projectNameCh' className='formError' />
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="项目需要" required>
  									<FormBinder name="projectNeed" triggerType='onBlur' rules={[
  										{ required: true, message: '请输入项目需要' }
  									]}>
  										<Input hasClear size='large' placeholder="请输入项目需要" />
  									</FormBinder>
  									<FormError name='projectNeed' className='formError' />
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="申请开发人" required>
  									<FormBinder name="applyName" triggerType='onBlur' rules={[
  										{ required: true, message: '请输入项目申请开发人' }
  									]}>
  										<Input hasClear size='large' placeholder="请输入项目申请开发人" />
  									</FormBinder>
  									<FormError name='applyName' className='formError' />
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="项目开发人员" required>
  									<FormBinder name="devItems" required message="必选">
  										<Group
  											className='checkBox'
  											dataSource={list}
  										/>
  									</FormBinder>
  									<FormError name='devItems' />
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem
  									className='uploadFileBox'
  									labelCol={{ span: 4 }}
  									wrapperCol={{ span: 20 }}
  									label="主爬虫.egg文件"
  									required>
  										<input type='file' id='master_egg'/>
  								</FormItem>
  							</Col>
  						</Row>
  						<Row>
  							<Col span="2" />
  							<Col span="20">
  								<FormItem
  									className='uploadFileBox'
  									labelCol={{ span: 4 }}
  									wrapperCol={{ span: 20 }}
  									label="从爬虫.egg文件"
  									required>
  										<input type='file' id='slave_egg'/>
  								</FormItem>
  							</Col>
  						</Row>
  						<Button
  							onClick={this.addForm}
  							type="primary"
  							size="large"
  							style={{ margin: '10px 0 0 10px', borderRadius: 0, padding: '5px 52px', boxSizing: 'content-box', fontWeight: 700 }}>添加</Button>
  					</Form>
  				</FormBinderWrapper>
  			</div>
  		</Loading>
  	)
  }
}

export default AddProject
