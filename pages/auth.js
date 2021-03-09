/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/database'
import '../lib/firebase'
import styles from '../styles/auth.module.sass'
import InputLine from '../components/Input_line/Input_line'
import ButLog from '../components/Button/Button'
import Message from '../components/Message/Message'
import FormLogoContainer from '../components/FormLogoContainer/FormLogoContainer'

const Auth = () => {
  
  const VAPID = 'BKHaWalYchJzD4pX28Mjv8X3gdq7C2Qc9puwBdEQ87n7ZQ2eKuCELMNzFEHK-aYPieWm91OZhY73fcK4IY4xA9c'

  const [authInputsValues] = useState({})
  const [ShowMessage, setShowMessage] = useState(false)
  const [SavedToken, setSavedToken] = useState([])
  const [checkInput, setcheckInput] = useState(false)
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


  const submitLoginHandler = async e => {
    e.preventDefault()
    const response = await fetch(`${window.location.origin}/api/tryLogin`, {
      method: 'POST',
      body: JSON.stringify(authInputsValues),
      headers: {
        'Content-Type': 'application/json',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin'
      }
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











  

  

//   const askMessagePermission = () => {
//     //! Вивод вопроса на доступ
//     Notification.requestPermission(function(status) {
//       console.log('Notification permission status:', status);
//       // if (status === 'granted') {
//       //   const msg = firebase.messaging()
//       //   msg.requestPermission().then(() => {
//       //     return msg.getToken()
//       //   }).then((data) => {
//       //     console.log('token', data)
//       //     SavedToken.push(data)
//       //   })
//       // } else {
//       //   Notification.requestPermission(function(status) {
//       //     console.log('Notification permission status:', status);
//       //   })
//       // }
//     });
    
// }


  






  // const submitSendMes = () => {
  //   setcheckInput(!checkInput)
  // }

  // useEffect(() => {
  //   if (checkInput) {
  //     askMessagePermission()
  //   }
  // }, [checkInput])


const sendTokenToDB = async (currentToken) => {
  const arr = []
  arr.push(currentToken)
  await firebase.database().ref('userTokens').set(arr)
}

const getUserMessageToken = () => {
  const messaging = firebase.messaging()

  messaging.getToken({ vapidKey: VAPID }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      sendTokenToDB(currentToken)
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
}


useEffect(() => {
  getUserMessageToken()
}, [])




  return (
    <div className={styles.container}>
      {/* <button onClick={() => subscribe()}>test</button> */}
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

        <label>
          Надаю згоду отримувати сповіщення
          <input type='checkbox' checked={checkInput} onChange={() => submitSendMes()}/>
        </label>
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
