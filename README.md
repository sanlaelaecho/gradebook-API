# GRADEBOOK API

## Prerequisites
- **Node.js** <br>
In Terminal run:
`node -v`
If a version number is displayed, Node.js is already installed.
Or install Node.js through their official [website](https://nodejs.org/en).

- **Nodemon** <br>
Install Nodemon globally:
`npm install -g nodemon`


## Getting Started
### Install and Run!
1. Using Terminal, go to the folder you want to clone the API to.
2. Clone the [repository](https://github.com/sanlaelaecho/gradebook-API) using SSH:
`git clone git@github.com:sanlaelaecho/gradebook-API.git`
3. Once you're in the gradebook-API folder, open the file.
4. Install the required packages:
`npm i`
5. Create a new file in gradebook-API folder:
`touch .env`
6. In the .env file:
```
MONGO_URI=mongodb+srv://your-mongodb-uri
SECRET=your-SHA256-secret-key
```
Copy the `mongodb+srv://` link from your MongoDB account and replace it in the .env file. You can change your database name as desired. 
Create a secret on SHA256 website and replace `your-SHA256-secret-key` with the hash. Remember your actual secret. <br>

7. Run the seed.js file to prepopulate some subjects and cohorts into the database:
`node ./config/seed.js`

## Start the App
Run the app by typing in VS code terminal:
`npm run dev`

## Start the App without dev mode
You can also run the app by typing in VS code terminal:
`npm start` or `node server.js`

## Run the Tests
Run the tests through jest and supertest by typing in VS code terminal:
`npm run test`

## Make an API request in Postman
In Postman, to make API request, use the url and port: **http://localhost:3000/**
