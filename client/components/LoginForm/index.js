import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import fetch from '../../fetch'
import { Form, Icon, Input, Button, notification, message } from 'antd'

const FormItem = Form.Item 
class LoginForm extends React.Component {
  static propTypes = {
    url: PropTypes.string
  }

  state = {
    loading: false
  }

  handleForm = () => {
    const { loading } = this.state
    // 禁止重复提交请求
    if (loading)
      return

    this.setState({ loading: true })

    const { url, form } = this.props
    const { validateFields } = form
    validateFields((err, values) => {
      if (err)
        return notification.error({
          message: 'error',
          description: err
        })

      fetch.post('login', values).then(res => {
        this.setState({ loading: false })
        if (res.code) {
          message.error(res.message)
        } else {
          message.success(res.message)
          // 使用window，重新请求页面，使得页面中带入CUSTOMER的信息
          // 无URL则进入首页
          window.location = !url || url === 'undefined' ? '/' : url
        }       
      }).catch(err => {
        this.setState({ loading: false })
        message.error('未知错误')
      })
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state

    return <Form className="login-form" style={{
      width: 300,
      border: 'solid 1px #eee',
      padding: '24px 32px',
      borderRadius: 12,
      boxShadow: '2px 2px 2px #eee'
    }}>
      <FormItem>
        {
          getFieldDecorator('username', {
            rules: [{required: true, message: 'username is required'}]
          })(
            <Input prefix={<Icon type='user' styles={{color: 'rgba(0, 0, 0, .5)'}} />} placeholder='username' />
          )
        }
      </FormItem>
      <FormItem>
        {
          getFieldDecorator('password', {
            rules: [{required: true, message: 'password is required'}]
          })(
            <Input type='password' prefix={<Icon type='lock' styles={{color: 'rgba(0, 0, 0, .5)'}} />} placeholder='password' />
          )
        }
      </FormItem>
      <Button loading={loading} style={{width: '100%'}} type='primary' onClick={this.handleForm}>{loading ? '' : '登陆'}</Button>
    </Form>
  }
}

export default Form.create()(LoginForm)