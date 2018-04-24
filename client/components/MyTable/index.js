import React from 'react'
import PropTypes from 'prop-types'
import fetch from '../../fetch'
import { Table } from 'antd'

export default class extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    dataApi: PropTypes.string,
    rowKey: PropTypes.func,
    header: PropTypes.element
  }

  constructor (props) {
    super()
    this.state = {
      dataSource: props.data.data,
      loading: false,
      pagination: {
        showQuickJumper: true,
        current: 1,
        pageSize: props.pageSize || 10,
        total: props.data.count,
        onChange: (value) => {
          this.getTableData(value)
        }
      }
    }
  }

  getTableData = (skip = 1) => {
    this.setState({
      loading: true
    })

    const { dataApi } = this.props
    const { pagination } = this.state
    const { pageSize } = pagination
    fetch.post(dataApi, {
      skip: (skip - 1) * pageSize,
      limit: pageSize
    }).then(rlt => {
      this.setState({
        pagination: {
          ...pagination,
          current: skip,
          total: rlt.count
        },
        dataSource: rlt.data,
        loading: false
      })
    })
  }

  render () {
    const { columns, header, rowKey } = this.props
    const { dataSource, loading, pagination } = this.state
    
    return (
      <div>
        <div style={{
          marginBottom: 20
        }}>{header}</div>
        <Table
          rowKey={rowKey}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          bordered
        />
      </div>
    )
  }
}
