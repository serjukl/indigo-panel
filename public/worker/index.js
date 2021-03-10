const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }  
  
  
  // saveSubscription saves the subscription to the backend
  const saveSubscription = async subscription => {
    const response = await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    })
    return response.json()
  }


  
  
  self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    console.log('service worker activate')
    const applicationServerKey = urlB64ToUint8Array(
      'BDc-xNUb9YTWW862xzFwTghLKeRiZ8wAIjZhvH4MKqnBpJbQccJ9FZw7ue2HFH_X-eC5n-dXiJgfjXmB1dXG-bQ'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(subscription)
    const response = await saveSubscription(subscription)
    console.log(response)
  })


  


  self.addEventListener('push', function(event) {
    if (event.data) {
      console.log('Push event!! ', event.data.text())
      showLocalNotification("Yolo", event.data.text(),  self.registration);
    } else {
      console.log('Push event but no data')
    }
  })
  
  const showLocalNotification = (title, body, swRegistration) => {
    const options = {
      body
      // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
  };

  // self.addEventListener('push', function (event) {
  //   const data = JSON.parse(event.data.text())
  //   event.waitUntil(
  //     registration.showNotification(data.title, {
  //       body: data.message,
  //       icon: '/icons/android-chrome-192x192.png'
  //     })
  //   )
  // })
  
  
  // self.addEventListener('notificationclick', function (event) {
  //   event.notification.close()
  //   event.waitUntil(
  //     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
  //       if (clientList.length > 0) {
  //         let client = clientList[0]
  //         for (let i = 0; i < clientList.length; i++) {
  //           if (clientList[i].focused) {
  //             client = clientList[i]
  //           }
  //         }
  //         return client.focus()
  //       }
  //       return clients.openWindow('/')
  //     })
  //   )
  // })
  
  // self.addEventListener('pushsubscriptionchange', function(event) {
  //   event.waitUntil(
  //       Promise.all([
  //           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
  //           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
  //               .then(function(sub) { return saveSubscription(sub) })
  //       ])
  //   )
  // })