const webpush = require('web-push')

const vapidKeys = {
  publicKey:
    'BDc-xNUb9YTWW862xzFwTghLKeRiZ8wAIjZhvH4MKqnBpJbQccJ9FZw7ue2HFH_X-eC5n-dXiJgfjXmB1dXG-bQ',
  privateKey: '9NU39qqoiR6FjUsPs7cPGYx8F3HHEoldaJ4PzaHwuhM',
}

webpush.setVapidDetails(
  'mailto:serjukl98@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}



export default (req, res) => {
  if (req.method == 'POST') {
    res.status(200)
    sendNotification(req.body, 'Hello serj')
    res.json({ message: 'success' })
  } else {
    res.status(500)
    res.end()
  }
}