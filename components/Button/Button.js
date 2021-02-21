/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.sass'

const Button = ({ btnName, btnType, btnHandler }) => (
  <div className={styles.box}>
    <button
      type={btnType || 'button'}
      onClick={btnHandler ? () => btnHandler() : null}
    >
      { btnName }
    </button>
  </div>
)

Button.propTypes = {
  btnName: PropTypes.string,
  btnType: PropTypes.string,
  btnHandler: PropTypes.func
}

export default Button
