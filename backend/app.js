const express = require('express');
const firebase=require('firebase')
require('firebase/firestore')

const firebaseConfig={
   apiKey: "AIzaSyABxjqUnOPKKPCz-EMgkfF0ESYsHjGFl1E",
    authDomain: "devian-f33b2.firebaseapp.com",
    projectId: "devian-f33b2",
    storageBucket: "devian-f33b2.appspot.com",
    messagingSenderId: "143462962223",
    appId: "1:143462962223:web:2a6d74a252c2559c4922da",
    measurementId: "G-X7HTMZY5XD"
}

const app = express();
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore()

db.collection("sample").add({
   name: "Ada"
}).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
   }).catch((error) => {
      console.error("Error adding document: ", error);
   });

db.collection("sample").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data()}`);
   });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

module.exports = app;
