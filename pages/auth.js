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




  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
    return true
  }


  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('/worker/index.js'); //notice the file name
    return swRegistration;
  }

  
  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
    return permission
  }


  const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
        // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
  }

  const removeService = () => {
    navigator.serviceWorker.getRegistrations()
      .then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
      });
  }

  const main = async () => {
      check()

      console.log('%c Доступний браузеру', 'color:green');

      const swRegistration = await registerServiceWorker();
      console.log(`%c ${swRegistration} реєстрація sw`, 'color:green');
      console.log(swRegistration);

      const permission = await requestNotificationPermission();
      console.log(`%c ${permission} дозвіл від користувача`, 'color:green');

      showLocalNotification('This is title', 'this is the message', swRegistration);
      console.log(`%c Вивести повідомлення`, 'color:green');

  }


const test = async () => {
  const response = await fetch('https://admin-panel-fce34-default-rtdb.firebaseio.com/userTokens.json')
    .then((resp) => resp.text())
    .then((users) => JSON.parse(users))
    sendMessage(response[0])
}

const sendMessage = async (userSubscription) => {
  const response = await fetch('/api/notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userSubscription),
  })
  return response.json()
}


  return (
    <div className={styles.container}>
      <button onClick={() => main()}>
        start
      </button>
      <button onClick={() => test()} disabled={isSubscribed}>
        Subscribe
      </button>
      <button onClick={() => removeService()}>
        remove SW
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
