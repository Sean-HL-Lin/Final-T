## Google Cloud Platfrom setup
1. Navigate to Google Cloud Platfrom

2. Navigate to the same project created during server setup.

3. Under API & Services, Click Credentials to create a GoogleApiKey for your project

4. Click Library under API & Services

5. In the library, enable "Maps JavaScript API", "Directions API"

6. Follow instruction of the following client Setup section



## Client Setup 

1. Run `npm install` from command line of final-client directory to install dependencies.

2. Create .env file under final-client directory

3. Add 
  `REACT_APP_GoogleAPIKey=[enter you key here]`
  `REACT_APP_BACKEND_SERVER_URL=[enter back end server URL]`
  into .env file 

4. Run `npm start` to start server
