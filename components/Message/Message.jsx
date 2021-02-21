import React from 'react'
import styles from './Message.module.sass'

const Message = ({ message, status, activationKey }) => (
  <div
    className={styles.container}
    style={{
      backgroundColor: status ? '#14bd1c' : '#d41717',
      width: activationKey ? '250px' : 0,
      padding: activationKey ? '15px 10px' : '15px 0'
    }}
  >
    <div className="messageHeading">
      <p className={styles.operationStatus}>
        {status ? 'Операція успішна' : 'Помилка'}
      </p>
    </div>
    <p>
      { message }
    </p>
  </div>
)

export default Message
