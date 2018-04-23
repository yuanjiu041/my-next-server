import React from 'react'
import fetch from '../../fetch'
import Layout from '../../components/Layout'
import MyTable from '../../components/MyTable'
import ModalForm from '../../components/ModalForm'
import { Popover, Button, notification, Popconfirm } from 'antd'
import moment from 'moment'

export default class extends React.Component {
  static async getInitialProps (ctx) {
    const customer = ctx.req ? ctx.req.customer : __CUSTOMER__
    const users = await fetch.post(ctx, 'users/query', {})
    return {
      customer,
      users
    }
  }

  state = {
    modalVisible: false
  }

  onModalSubmit = async (values, cb) => {
    fetch.post('user', values)
      .then((value) => {
        this.setState({
          modalVisible: false
        })

        cb()
        this.table.getTableData()
      })
      .catch(err => {
        cb()
        notification.error({
          message: 'error!',
          description: err.response.data.message || '未知错误'
        })
      })
  }

  render () {
    const { customer, url, users } = this.props
    const { modalVisible } = this.state

    const formConfig = [
      {
        label: '姓名',
        dataIndex: 'nickname',
        rules: [{
          required: true,
          message: '姓名不能为空'
        }]
      },
      {
        label: '用户名',
        dataIndex: 'username',
        type: 'text',
        rules: [{
          required: true,
          message: '用户名不能为空'
        }]
      },
      {
        label: '密码',
        dataIndex: 'password',
        type: 'password',
        rules: [{
          required: true,
          message: '密码不能为空'
        }]
      }
    ]

    const columns = [
      {
        dataIndex: '_id',
        title: 'id'
      },
      {
        dataIndex: 'nickname',
        title: '姓名'
      },
      {
        dataIndex: 'username',
        title: '用户名'
      },
      {
        dataIndex: 'password',
        title: '密码',
        render: (value) => value ? <Popover content={value}>******</Popover> : ''
      },
      {
        dataIndex: 'createdTime',
        title: '创建时间',
        render: (value) => value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
      },
      {
        title: '操作',
        render: (value, record) =>
          <div>
            <Popconfirm 
              title='你确定要删除这条记录么，记录一旦被删除则无法恢复'
              okText='删除'
              cancelText='取消'
              onConfirm={() => {
                fetch.delete(`user/${record._id}`).then(value => {
                  this.table.getTableData()
                }).catch(err => {
                  notification.error({
                    message: 'error!',
                    description: err.response.data.message || '未知错误'
                  })
                })
              }}
            ><Button>删除</Button></Popconfirm>
          </div>
      }
    ]

    return (
      <Layout url={url} customer={customer}>
        <MyTable
          data={users}
          columns={columns}
          dataApi={'users/query'}
          ref={(el) => this.table = el}
          rowKey={(record) => record._id}
          header={ 
            <Button type='primary' onClick={() => {
              this.setState({
                modalVisible: true
              })
            }}>添加</Button>
          }
        />
        <ModalForm
          title='添加用户'
          modalVisible={modalVisible}
          formConfig={formConfig}
          onSubmit={this.onModalSubmit}
          onCancel={() => {
            this.setState({
              modalVisible: false
            })
          }}
        />
      </Layout>
    )
  }
}
