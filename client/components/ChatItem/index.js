import React from 'react'
import moment from 'moment'
import style from './style.less'

export default (props) => {
  const { time, content, nickname, isme } = props

  return (
    <div className={isme ? `${style['block']} ${style['right']}` : style['block']}>
      {
        isme
          ? <div className={style['desc']}>
            <span className={style['time']}>{moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span className={style['user']}>{nickname}</span>
          </div>
          : <div className={style['desc']}>
            <span className={style['user']}>{nickname}</span>
            <span className={style['time']}>{moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
      }
      <div className={style['content']}>{content}</div>
    </div>
  )
}
