import React from 'react'
import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder'
import { Dialog, Form, Input, Grid, Select } from '@icedesign/base'
const { Col, Row } = Grid
const { Item } = Form
class AddServerDialog extends React.Component {
  state = {
  	isShow: null,
  	newData: {}
  }
  static getDerivedStateFromProps (nextProps) {
  	return {
  		newData: nextProps.newData,
  		isShow: nextProps.isShow
  	}
  }
  render () {
  	return (
  		<Dialog
  			visible={this.state.isShow}
  			closable={false}
  			onCancel={this.props.cancelBtn}
  			onOk={this.props.okBtn}
  			style={{ width: '400px' }}
  			title='添加服务器'
  		>
  			<FormBinderWrapper
  				value={this.state.newData}
  			>
  				<Form labelTextAlign='left'>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="项目名称" required>
  								<FormBinder triggerType='onClick' name="server_ip" required message="必填">
  								  <Input hasClear size='large' placeholder="请输入项目的英文名称" />
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="服务器状态" required>
  								<FormBinder name="server_status" required message="必填">
  									<Select
  										placeholder="服务器状态"
  									>
  										<option value="1">可用</option>
  										<option value="0">不可用</option>
  									</Select>
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  					<Row>
  						<Col>
  							<Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="是否为主服务器" required>
  								<FormBinder name="is_master" required message="必填">
  									<Select
  										defaultValue={'否'}
  										value='否'
  									>
  										<option value="1">否</option>
  										<option value="0">是</option>
  									</Select>
  								</FormBinder>
  							</Item>
  						</Col>
  					</Row>
  				</Form>
  			</FormBinderWrapper>
  		</Dialog>
  	)
  }
}

export default AddServerDialog
