import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation/Navigation'
import InputLine from '../components/Input_line/Input_line'
import '../lib/firebase'
import 'firebase/database'
import firebase from 'firebase/app'
import uniqid from 'uniqid'
import ButLog from '../components/Button/Button'
import styles from '../styles/auth.module.sass'
import UserItem from '../components/UserItem/UserItem'

const createUser = () => {
    const [authInputsValues] = useState({})
    const [getNewData, getNewDataHandler] = useState(false)
    const [userData, userDataHandler] = useState([])
    const [openUser, openUserHandler] = useState(null)

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
            placeholder: 'Місто роботи',
            inputName: 'workCity',
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
    
    const getDataInput = e => {
        authInputsValues[e.target.name] = e.target.value
        authInputsValues.id = uniqid()
    }

    const getUsers = async () => {
        const response = await fetch(`${window.location.origin}/api/getUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
          }
        })
        const logResult = await response.json()
        return logResult
    }

    const submitUserAddHandler = async e => {
        e.preventDefault()
        await fetch(`${window.location.origin}/api/getUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
          }
        })
        userData.push(authInputsValues)
        await firebase.database().ref('users').set(userData)
        getNewDataHandler(!getNewData)
        e.target.reset()
    }

    const deleteUserHandler = async id => {
        const response = await fetch(`${window.location.origin}/api/deleteUser`, {
          method: 'POST',
          body: JSON.stringify(id),
          headers: {
            'Content-Type': 'application/json',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
          }
        })
        const deleteResult = await response.json()
        await firebase.database().ref('users').set(deleteResult)
        userDataHandler(deleteResult)
      }


    useEffect(() => {
        async function fetchData() {
          userDataHandler(await getUsers())
        }
        fetchData()
      }, [getNewData])
    
    return (
        <div>
            <Navigation />
            <form className={styles.formContainer} onSubmit={(e) => submitUserAddHandler(e)}>
                <legend>ДОДАТИ КОРИСТУВАЧА</legend>
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
        </div>
    )
}

export default createUser
