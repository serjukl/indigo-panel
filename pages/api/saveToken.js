import {setToDB} from '../../middleware/setToDB'

export default (req, res) => {
  if (req.method == 'POST') {
    console.log(req.body);
    setToDB(req.body)
    res.status(200)
    res.json({ message: 'success' })
  } else {
    res.status(500)
    res.end()
  }
}