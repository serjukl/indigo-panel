/* eslint-disable arrow-parens */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input_line.module.sass'

const InputLine = ({
  placeholder, inputName,
  labelName, changeHandler,
  inputType, focusHandler, blurHandler, required = false
}) => (
  <div className={styles.container}>
    <label htmlFor={inputName}>
      { labelName || ''}
      <input
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        onChange={e => (changeHandler ? changeHandler(e) : null)}
        onFocus={e => (focusHandler ? focusHandler(e) : null)}
        onBlur={e => (blurHandler ? blurHandler(e) : null)}
        type={inputType}
        minLength={inputType === 'tel' ? 10 : null}
        maxLength={inputType === 'tel' ? 10 : null}
        autoComplete="off"
        required={required}
      />
    </label>
  </div>
)

InputLine.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  focusHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  changeHandler: PropTypes.func,
  inputName: PropTypes.string,
  labelName: PropTypes.string,
  required: PropTypes.bool
}

export default InputLine
