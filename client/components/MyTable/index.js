import React from 'react'
import PropTypes from 'prop-types'
import fetch from '../../fetch'
import CheckGroup from '../CheckGroup'
import { Table, Button, Dropdown } from 'antd'

export default class extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    dataApi: PropTypes.string,
    rowKey: PropTypes.func,
    header: PropTypes.element,
    diycolumn: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      dataSource: props.data.data,
      loading: false,
      columnLabels: props.columns.map(item => item.title),
      columns: props.columns,
      pagination: {
        showQuickJumper: true,
        current: 1,
        pageSize: props.pageSize || 10,
        total: props.data.count,
        onChange: (value) => {
          this.getTableData(value)
        },
        showTotal: (total) => `共${total}条数据。`
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

  changeColumn = (value) => {
    const { columns } = this.props
    this.setState({
      columns: columns.filter(item => value.indexOf(item.title) !== -1)
    })
  }

  render () {
    const { header, rowKey, diycolumn } = this.props
    const { columns, dataSource, loading, pagination, columnLabels } = this.state

    return (
      <div>
        <div style={{
          marginBottom: 10
        }}>{header}</div>
        {
          diycolumn ?
            <Dropdown
              overlay={
                <CheckGroup
                  allChoose='全选'
                  onChange={this.changeColumn}
                  options={columnLabels}
                  defaultValue={columnLabels}
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                    border: 'solid 1px #ededed',
                    borderRadius: 4
                  }}
                />
              }
              trigger={['click']}
            >
              <Button style={{marginBottom: 10}}>自定义表头</Button>
            </Dropdown> : null
        }
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
