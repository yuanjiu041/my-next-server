import React from 'react'
import Router from 'next/router'
import fetch from '../../fetch'
import { Form, Icon, Input, Button, notification, message } from 'antd'

const FormItem = Form.Item 
class LoginForm extends React.Component {
  handleForm = () => {
    const { url, form } = this.props
    const { validateFields } = form
    validateFields((err, values) => {
      if (err)
        return notification.error({
          message: 'error',
          description: err
        })

      fetch.post('login', values).then(res => {
        if (res.code) {
          message.error(res.message)
        } else {
          message.success(res.message)
          // 使用window，重新请求页面，使得页面中带入CUSTOMER的信息
          // 无URL则进入首页
          window.location = !url || url === 'undefined' ? '/' : url
        }       
      }).catch(err => {
        message.error('未知错误')
      })
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

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
      <Button style={{width: '100%'}} type='primary' onClick={this.handleForm}>登陆</Button>
    </Form>
  }
}

export default Form.create()(LoginForm)