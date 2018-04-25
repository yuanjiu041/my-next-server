import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group

export default class extends React.Component {
  static propTypes = {
    allChoose: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.array,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    const { defaultValue = [], options } = props
    this.state = {
      checkList: props.defaultValue,
      indeterminate: !!defaultValue.length && defaultValue.length < options.length,
      checkAll: defaultValue.length === options.length
    }
  }

  onChange = (checkList) => {
    const { options } = this.props
    this.setState({
      checkList,
      indeterminate: !!checkList.length && checkList.length < options.length,
      checkAll: checkList.length === options.length
    }, () => {
      this.triggleChange()
    })
  }

  onAllChange = (e) => {
    const { options } = this.props
    const checked = e.target.checked
    this.setState({
      checkAll: checked,
      checkList: checked ? options : [],
      indeterminate: false
    }, () => {
      this.triggleChange()
    })
  }

  triggleChange = (value) => {
    const changeValue = value || this.state.checkList
    const { onChange } = this.props
    if (onChange) {
      onChange(changeValue)
    }
  }

  render () {
    const { options, style, allChoose } = this.props
    const { checkList, checkAll, indeterminate } = this.state

    return (
      <div style={style}>
        {
          allChoose ? <Checkbox
            onChange={this.onAllChange}
            checked={checkAll}
            indeterminate={indeterminate}
          >{allChoose}</Checkbox> : null
        }
        <CheckboxGroup options={options} value={checkList} onChange={this.onChange} />
      </div>
    )
  }
}
