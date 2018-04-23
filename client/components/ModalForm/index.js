import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Select, Button, notification } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class ModalForm extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    formConfig: PropTypes.array,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    modalVisible: PropTypes.bool,
    defaultValue: PropTypes.object
  }

  state = {
    btnLoading: false
  }

  cancelHandle = () => {
    const { onCancel } = this.props
    if (onCancel) {
      onCancel()
    }
  }

  submitHandle = (e) => {
    e.preventDefault()
    this.setState({
      btnLoading: true
    })

    const { onSubmit, form } = this.props
    const { validateFields, resetFields } = form
    validateFields(async (err, values) => {
      if (err)
        return notification.error({
          message: 'error!',
          description: err
        })

      if (onSubmit) {
        onSubmit(values, () => {
          this.setState({
            btnLoading: false
          })
          resetFields()
        })
      } else {
        this.setState({
          btnLoading: false
        })
        resetFields()
      }
    })
  }

  renderFormItem = (config, idx) => {
    const { getFieldDecorator } = this.props.form
    const { type, dataIndex, label, rules = [] } = config
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }

    return (
      <FormItem label={label} key={idx} {...formItemLayout}>
        {
          getFieldDecorator(dataIndex, {
            rules: rules
          })(
            this.renderInput(config)
          )
        }
      </FormItem>
    )
  }

  renderInput = (config) => {
    const { type } = config
    switch (type) {
      case 'password':
        return <Input type='password' />
      case 'text':
      default:
        return <Input />
    }
  }

  render () {
    const { title, modalVisible, formConfig } = this.props
    const { btnLoading } = this.state

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={this.cancelHandle}
        footer={
          <Button loading={btnLoading} type='primary' onClick={this.submitHandle}>确认</Button>
        }
      >
        {
          formConfig.map(this.renderFormItem)
        }
      </Modal>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.modalVisible !== nextProps.modalVisible && nextProps.modalVisible) {
      this.props.form.setFieldsValue(nextProps.defaultValue)
    }
  }
}

export default Form.create()(ModalForm)