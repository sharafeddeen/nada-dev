/* ================================================================================================
 *            -------------------------------------------------------------
 *            | General Notes About Admin NodeJS SDK @version10 and Above |                          
 *            -------------------------------------------------------------
 *                Apr 12, 2022 @2:27PM CDT    [author: Ahmed Sharaf]
 *      
 * 
 * 1)   NodeJS version:     -> Firebase needs NodeJS@v12 or higher to use Admin NodeJS SDK@v10.
 *                          -> More info? https://firebase.google.com/docs/admin/migrate-node-v10#update-node-js-to-v12-or-higher
 * 
 * 2)   API Access:         -> Admin NodeJS SDK@v10 uses modules now, NOT namespaces! (crucial detail!)
 *                          -> How to access APIs:
 *                                              - (YES) Modular entry points.       [require -- only what you need]
 *                                                  >> example --     const {initializeApp} = require('firebase-admin/app');
 *                                                  >>                const {getAuth} = require('firebase-admin/auth');
 *                                                  >>                const app = initializeApp();
 *                                                  >>                const user = getAuth().getUser('user-attr');
 *                                              - (NO!) One namespace heirarchy.    [require -- everything in admin]
 *                                                  >> example --     import * as admin from 'firebase-admin';
 *                                                  >>                const app = admin.initializeApp();
 *                                                  >>                const user = await admin.auth().getUser('user-attr);
 *                          -> Now what? Pay ATTENTION! to how you code.
 *                          -> More info? https://firebase.google.com/docs/admin/migrate-node-v10#use-modules-instead-of-namespaces 
 * 
 * 3)   ES Modules:         -> Background:  Beginning NodeJS@v12, there is support for ES modules.
 *                             >> Meaning   --  you can use (import/export) without TypeScript.
 *                             >> So        --  Admin SDK@v10 now can be imported using (import).
 *                          -> Implementation:
 *                             >> Note      --  make sure you enable ES Module support for NodeJS runtime,
 *                                                  (usually done) by adding ("type": "module") to (package.json).
 * ================================================================================================ */

//const { initializeApp } = require('firebase-admin/app');
//const { getFunctions } = require('firebase/functions');
//const { getAuth } = require('firebase-admin/auth');
//const { getFirestore } = require('firebase-admin/firestore');

//const app = initializeApp();
//const functions = getFunctions();
//const firestoreDB = getFirestore();

/**Function to automate user creation in Firestore DB.
 * Reason:          to minimize effort in deadling with Firestore DB manually.
 * Job:             creates a user object as a document inside the user collection stored on Firestore DB.
 * */
//exports.createNewUserFirestore = functions.auth.user().onCreate(() => {});

