import React from 'react'
import PropTypes from 'prop-types'
import styles from './TabItem.module.sass'

const TabItem = ({ text, clickHandler, active }) => (
  <div
    className={active ? `${styles.TabItemContainer} ${styles.actveClass}` : styles.TabItemContainer}
    onClick={() => (clickHandler ? clickHandler(text) : null)}
  >
    <p>{text}</p>
  </div>
)

TabItem.propTypes = {
  text: PropTypes.string,
  clickHandler: PropTypes.func,
  active: PropTypes.bool
}

export default TabItem
