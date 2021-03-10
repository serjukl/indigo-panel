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


  const main = async () => {
      check()
      console.log('%c Доступний браузеру', 'color:green');

      const swRegistration = await registerServiceWorker();
      console.log(`%c ${swRegistration} реєстрація sw`, 'color:green');

      const permission = await requestNotificationPermission();
      console.log(`%c ${permission} дозвіл від користувача`, 'color:green');

      showLocalNotification('This is title', 'this is the message', swRegistration);
      console.log(`%c Вивести повідомлення`, 'color:green');

  }

//   const askMessagePermission = () => {
//     if (check()) {
//       navigator.serviceWorker.ready.then(reg => {
//         reg.pushManager.getSubscription().then(sub => {
//           if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
//             setSubscription(sub)
//             setIsSubscribed(true)
//           }
//         })
//         setRegistration(reg)
//       })
//     }
// }

  // const submitSendMes = () => {
  //   setcheckInput(!checkInput)
  // }

  // useEffect(() => {
  //   if (checkInput) {
  //     askMessagePermission()
  //   }
  // }, [checkInput])



useEffect(async () => {
  // askMessagePermission()
  async function startProcess(){
    await main()
  }
  startProcess()
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
