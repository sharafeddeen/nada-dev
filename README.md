# nada-dev

## This is a new repo
Because the one at https://github.com/JosiahDadulo/Nada wouldn't run locally on backend dev's laptop. Most likely it was a package-version issue.
The frontend was halfway complete, and debugging issues arising at backend setup was too time-consuming.
So, we decided to begin anew with the backend implemented alongside each component of the frontend, as opposed to backend being implemented after frontend is ready.

## How is it going?
* We're now connected to the database (firebase@10.6.0).
* Frontend now has:
  - Signup and login
  - Feed page
  - Profile page
  - Likes page & Fans page
  - Chat page
* Backend:
  - Setup and automated.
  - Mainly relying on FirestoreDB

The app is now functional.


## To run this code
Make sure you have an Expo client installed `npm install expo-cli` because this app was designed on Expo, with NodeJS version above 14.
In your terminal, run `expo start` and it will start the server.
The app has all the dependencies on this repo, but make sure to check Expo and NodeJS versions -- crucial!
