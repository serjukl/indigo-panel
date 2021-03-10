import firebase from 'firebase/app'
import 'firebase/database'
import '../lib/firebase'

export async function setToDB (token) {
    const x = []
    x.push(token)
    await firebase.database().ref('userTokens').set(x)
        .then(() => console.log('works'))
}