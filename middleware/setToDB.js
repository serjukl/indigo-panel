import firebase from 'firebase/app'
import 'firebase/database'
import '../lib/firebase'

export async function setToDB (token) {
    console.log(token, 'from SETTODB')
    const x = []
    x.push(token)
    await firebase.database().ref('userTokens').set(x)
        .then(() => console.log('works'))
}