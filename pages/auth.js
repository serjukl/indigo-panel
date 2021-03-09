/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import '../lib/firebase'
import styles from '../styles/auth.module.sass'
import InputLine from '../components/Input_line/Input_line'
import ButLog from '../components/Button/Button'
import Message from '../components/Message/Message'
import FormLogoContainer from '../components/FormLogoContainer/FormLogoContainer'


const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}


const Auth = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  const [authInputsValues] = useState({})
  const [ShowMessage, setShowMessage] = useState(false)
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











  

  

  const askMessagePermission = () => {
    //! Вивод вопроса на доступ

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        console.log(reg, 'reg');
        reg.pushManager.getSubscription().then(sub => {
          console.log(sub, 'sub');
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
}

  // const submitSendMes = () => {
  //   setcheckInput(!checkInput)
  // }

  // useEffect(() => {
  //   if (checkInput) {
  //     askMessagePermission()
  //   }
  // }, [checkInput])



useEffect(() => {
  askMessagePermission()
}, [])


const subscribeButtonOnClick = async event => {
  event.preventDefault()
  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
  })
  // TODO: you should call your API to save subscription data on server in order to send web push notification from server
  setSubscription(sub)
  setIsSubscribed(true)
  console.log('web push subscribed!')
  console.log(sub)
}


const unsubscribeButtonOnClick = async event => {
  event.preventDefault()
  await subscription.unsubscribe()
  // TODO: you should call your API to delete or invalidate subscription data on server
  setSubscription(null)
  setIsSubscribed(false)
  console.log('web push unsubscribed!')
}


const sendNotificationButtonOnClick = async event => {
  event.preventDefault()
  if (subscription == null) {
    console.error('web push not subscribed')
    return
  }

  const response = await fetch('/api/notification', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      mode: 'no-cors'
    },
    body: JSON.stringify({
      subscription
    })
  })
  console.log(response);
}


  return (
    <div className={styles.container}>
      <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
        Subscribe
      </button>
      <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
        Unsubscribe
      </button>
      <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
        Send Notification
      </button>
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
