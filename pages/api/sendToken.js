/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const fetch = require('node-fetch')

// const getUsersData = async (req) => {
//   return await fetch('https://admin-panel-fce34-default-rtdb.firebaseio.com/users.json')
//     .then((resp) => resp.text())
//     .then((users) => JSON.parse(users)
//       .filter((user) => `${user.Phone}${user.Password}` === `${req.body.Phone}${req.body.Password}`))
// }
export default async (req, res) => {
//   const ending = await getUsersData(req)
  console.log(req.body);
  res.statusCode = 200
  ending.length
    ? res.json({ iea: `success` })
    : res.json({ iea: false })
}
