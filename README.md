# nada-dev
## This is a new repo
Because the one at https://github.com/JosiahDadulo/Nada wouldn't run locally on backend dev's laptop. Most likely it was a package-version issue.
The frontend was halfway complete, and debugging issues arising at backend setup was too time-consuming.
So, we decided to begin anew with the backend implemented alongside each component of the frontend, as opposed to backend being implemented after frontend is ready.

## Current stage
* Progress check: behind timeline by ~2 weeks. 
  * Reasons: 1)   backend focus on phone authentication, which eventually proved to be too time-consuming, and caused delay when later switching to email-based authentication.
             2)   backend focus on depth vs breadth -- attempting to perfect few backend features, which led to frontend delay.
* New frontend includes email-based signup and login, along with skeleton codes for home page and profile page.
* Backend is setup (firebase@10.6.0).
* User registration: (automated) creating user object in Firebase Authentication.
* Problem: SignupScreen calls Firebase's createUserWithEmailAndPassword(params) whenever onChangeText in <TextInput> component is called, which creates a user every time.
* Reason: every time state variables (email, password) update, createUserWithEmailAndPassword() is called with the updated params, even if the update is just one character change in any box.

## Next
  1.  Moving forward, backend will follow broad development of features, then focus later on perfecting each one. 
  2.  Solve problem with registration.
  3.  Automate user object creation in Firestore DB.
  4.  Focus on user login.
  5.  Move the code from the frontend built hosted at https://github.com/JosiahDadulo/Nada (home page, profile page, likes page).
