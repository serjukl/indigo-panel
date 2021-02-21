/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const fetch = require('node-fetch')

const getUsersData = async () => {
  return await fetch('https://admin-panel-fce34-default-rtdb.firebaseio.com/users.json')
    .then((resp) => resp.text())
    .then((users) => JSON.parse(users))
}

export default async (req, res) => {
  const ending = await getUsersData(req)
  const users = ending
  res.statusCode = 200
  res.json(users)
}
