import 'firebase/firestore'

import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCJDz4zfG-wlQyP9m0J0hrAj54F5wZx1ho',
  authDomain: 'socket-learn.firebaseapp.com',
  projectId: 'socket-learn',
  storageBucket: 'socket-learn.appspot.com',
  messagingSenderId: '81555443561',
  appId: '1:81555443561:web:b6c1bae2b7ead8f76c37f8',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
