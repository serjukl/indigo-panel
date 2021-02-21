/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
const fetch = require('node-fetch')

const getProjects = async () => {
  return await fetch('https://admin-panel-fce34-default-rtdb.firebaseio.com/projects.json')
    .then((resp) => resp.text())
    .then((projects) => JSON.parse(projects))
}

export default async (req, res) => {
  const ending = await getProjects(req)
  const projects = ending
  res.statusCode = 200
  res.json(projects)
}
