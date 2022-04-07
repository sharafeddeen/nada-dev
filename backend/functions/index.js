const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const admin = require('firebase-admin');    // need admin to access Firestore database
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();               // now we can access and modify firestore db

/**Function to automate user creation in Firestore DB.
 * Reason:          to minimize effort in deadling with Firestore DB manually.
 * Job:             creates a user object as a document inside the user collection stored on Firestore DB.
 */
exports.newUser = functions.auth.user().onCreate((user) => {
    return db
            .collection("user")     // access the collection where user object exist
            .doc(user.uid)          // want to create doc for user, passing unique uid attribute
            .create(JSON.parse(JSON.stringify(user)))   // pass user object in JSON format and create user object document
})