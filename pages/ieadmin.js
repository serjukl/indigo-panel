/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react'
import 'firebase/database'
import firebase from 'firebase/app'
import uniqid from 'uniqid'
import styles from '../styles/auth.module.sass'
import InputLine from '../components/Input_line/Input_line'
import ButLog from '../components/Button/Button'
import Message from '../components/Message/Message'
import UserItem from '../components/UserItem/UserItem'
import '../lib/firebase'
import NavBar from '../components/NavBar/NavBar'

const ieadmin = () => {
  const [authInputsValues] = useState({})
  const [ShowMessage, setShowMessage] = useState(false)
  const [userData, userDataHandler] = useState([])
  const [openUser, openUserHandler] = useState(null)
  const [getNewData, getNewDataHandler] = useState(false)
  const linkIcon = (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.7295 14.7949L15.6621 2.7363C15.5752 2.64925 15.472 2.58018 15.3584 2.53305C15.2448 2.48593 15.123 2.46167 15 2.46167C14.877 2.46167 14.7552 2.48593 14.6416 2.53305C14.528 2.58018 14.4248 2.64925 14.3379 2.7363L2.27051 14.7949C1.91895 15.1465 1.71973 15.624 1.71973 16.122C1.71973 17.1562 2.56055 17.997 3.59473 17.997H4.86621V26.6015C4.86621 27.1201 5.28516 27.539 5.80371 27.539H13.125V20.9765H16.4062V27.539H24.1963C24.7148 27.539 25.1338 27.1201 25.1338 26.6015V17.997H26.4053C26.9033 17.997 27.3809 17.8008 27.7324 17.4463C28.4619 16.7138 28.4619 15.5273 27.7295 14.7949V14.7949Z" fill="black" />
    </svg>
  )

  const inputsData = [
    {
      placeholder: 'Ім\'я',
      inputName: 'Name',
      inputType: 'text',
      required: true
    },
    {
      placeholder: 'Прізвище',
      inputName: 'SecondName',
      inputType: 'text',
      required: true
    },
    {
      placeholder: 'Номер телефону',
      inputName: 'Phone',
      inputType: 'tel',
      required: true
    },
    {
      placeholder: 'Номер телефону',
      inputName: 'Phone2',
      inputType: 'tel',
      required: false
    },
    {
      placeholder: 'Пароль',
      inputName: 'Password',
      inputType: 'text',
      required: true
    }
  ]
  const getUsers = async () => {
    const response = await fetch(`${window.location.origin}/api/getUsers`, {
      method: 'GET'
    })
    const logResult = await response.json()
    return logResult
  }

  useEffect(() => {
    async function fetchData() {
      userDataHandler(await getUsers())
    }
    fetchData()
  }, [getNewData])

  const submitUserAddHandler = async e => {
    e.preventDefault()
    await fetch(`${window.location.origin}/api/getUsers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cors: 'no-cors'
    })
    userData.push(authInputsValues)
    await firebase.database().ref('users').set(userData)
    getNewDataHandler(!getNewData)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
    e.target.reset()
  }

  const getDataInput = e => {
    authInputsValues[e.target.name] = e.target.value
    authInputsValues.id = uniqid()
  }

  const deleteUserHandler = async id => {
    const response = await fetch(`${window.location.origin}/api/deleteUser`, {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      },
      cors: 'no-cors'
    })
    const deleteResult = await response.json()
    await firebase.database().ref('users').set(deleteResult)
    userDataHandler(deleteResult)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={(e) => submitUserAddHandler(e)}>
        <svg width="75" height="75" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="1.89655" r="1.89655" fill="#f05c5c" />
          <circle cx="24.9426" cy="27.5862" r="19.8851" stroke="#f05c5c" strokeWidth="3.21839" />
          <path d="M23.4483 5.05746H26.4369V11.5627V14.22V50H23.4483V14.22V11.5627V5.05746Z" fill="#F57170" />
          <path d="M24.9426 43.6782C33.8299 43.6782 41.0346 36.4735 41.0346 27.5862C41.0346 23.8334 39.7499 20.3806 37.5964 17.6437L35.4985 19.2529C37.3097 21.544 38.3909 24.4388 38.3909 27.5862C38.3909 35.0135 32.3699 41.0345 24.9426 41.0345C17.5153 41.0345 11.4943 35.0135 11.4943 27.5862C11.4943 24.4388 12.5755 21.544 14.3867 19.2529L12.2888 17.6437C10.1353 20.3806 8.85065 23.8334 8.85065 27.5862C8.85065 36.4735 16.0553 43.6782 24.9426 43.6782Z" fill="#f05c5c" />
          <path d="M24.9426 11.4942C24.4388 11.4942 23.9404 11.5174 23.4483 11.5627C20.2241 11.8596 17.2753 13.1076 14.8851 15.0237L16.5518 17.076C18.4859 15.5299 20.8561 14.5066 23.4483 14.22C23.939 14.1658 24.4375 14.1379 24.9426 14.1379C25.4477 14.1379 25.9462 14.1658 26.4369 14.22C29.0291 14.5066 31.3993 15.5299 33.3334 17.076L35.0001 15.0237C32.6099 13.1076 29.6611 11.8596 26.4369 11.5627C25.9448 11.5174 25.4464 11.4942 24.9426 11.4942Z" fill="#f05c5c" />
          <path d="M24.983 18.046C21.9912 18.046 19.2881 19.2353 17.3564 21.1494L18.9138 23.046C20.3901 21.4587 22.5355 20.4598 24.9233 20.4598C27.3111 20.4598 29.4564 21.4587 30.9327 23.046L32.6096 21.1494C30.6778 19.2353 27.9747 18.046 24.983 18.046Z" fill="#f05c5c" />
          <path d="M28.6207 26.092L26.3793 27.386L26.3793 24.7979L28.6207 26.092Z" fill="#f05c5c" />
          <path d="M21.2644 26.092L23.5058 27.386L23.5058 24.7979L21.2644 26.092Z" fill="#f05c5c" />
        </svg>
        <legend>INDIGO EXPERT</legend>
        {
          inputsData.map((element, key) => (
            <InputLine
              key={key}
              placeholder={element.placeholder}
              inputName={element.inputName}
              changeHandler={(e) => getDataInput(e)}
              inputType={element.inputType}
              required={element.required}
            />
          ))
        }
        <ButLog
          btnName="Додати користувача"
          btnType="submit"
        />
        <Message message="message example" status={ShowMessage} activationKey={ShowMessage} />
      </form>
      <div>
        {
          userData.length
            ? userData.map((user, key) => (
              <UserItem
                openUserHandler={(value) => openUserHandler(value)}
                openUser={openUser}
                key={key}
                user={user}
                deleteUserHandler={(id) => deleteUserHandler(id)}
              />
            ))
            : null
        }
      </div>
      <NavBar
        title="На головну"
        icon={linkIcon}
        link=""
      />
    </div>
  )
}

export default ieadmin
