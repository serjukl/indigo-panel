/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react'
import styles from '../styles/auth.module.sass'
import InputLine from '../components/Input_line/Input_line'
import ButLog from '../components/Button/Button'
import Message from '../components/Message/Message'
import FormLogoContainer from '../components/FormLogoContainer/FormLogoContainer'

const Auth = () => {
  const [authInputsValues] = useState({})
  const [ShowMessage, setShowMessage] = useState(false)
  const inputsData = [
    {
      placeholder: 'Номер телефону',
      inputName: 'Phone',
      inputType: 'tel'
    },
    {
      placeholder: 'Пароль',
      inputName: 'Password',
      inputType: 'password'
    }
  ]
  const getDataInput = e => {
    authInputsValues[e.target.name] = e.target.value
  }

  useEffect(() => {
    console.log(window.location)
  }, [])

  const submitLoginHandler = async e => {
    e.preventDefault()
    const response = await fetch(`${window.location.origin}/api/tryLogin`, {
      method: 'POST',
      body: JSON.stringify(authInputsValues),
      headers: {
        'Content-Type': 'application/json'
      },
      cors: 'no-cors'
    })
    const logResult = await response.json()
    localStorage.setItem('iea', logResult.iea)

    if (logResult.iea) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
        window.location = '/'
      }, 2000)
    } else {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 2000)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={(e) => submitLoginHandler(e)}>
        <FormLogoContainer />
        {
          inputsData.map((element, key) => (
            <InputLine
              key={key}
              placeholder={element.placeholder}
              inputName={element.inputName}
              changeHandler={(e) => getDataInput(e)}
              inputType={element.inputType}
            />
          ))
        }
        <ButLog
          btnName="Увійти"
          btnType="submit"
        />
        <Message message="message example" status={ShowMessage} activationKey={ShowMessage} />
      </form>
    </div>
  )
}

export default Auth
