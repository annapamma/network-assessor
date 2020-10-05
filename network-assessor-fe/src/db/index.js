// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'https://networkassessor.firebaseio.com/' })
  .database()

export const fetchPathwaysByDbName = (dbName) => {
  return db
    .ref('pathways')
    .orderByChild('db_name')
    .equalTo(dbName)
}
