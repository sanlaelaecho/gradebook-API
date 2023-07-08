# GRADEBOOK API
Welcome to Gradebook API! This API intends to allow admins, teachers and students to look up subjects, create and edit cohorts for the subjects, create and edit assignments for the cohorts. Admins have access to backend functions such as delete users or subjects or editing their information. Teachers can create their own cohorts and assignments while also being able to grade students' submissions. Students can create and edit submissions for these assignments while also view their own grades. Everyone can view all subjects and cohorts. Generally, this gradebook API functions as a simple version of a blackboard and in the future, hopes to be further developed into a blackboard. For more detailed functions on the API, see the Github project planner [here](https://github.com/users/sanlaelaecho/projects/1/views/1).

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
`cd <folder name>`
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

## Load some automated Tests
Run the load tests through artillery by typing in VS code terminal:
`npm run load`

## Make an API request in Postman
In Postman, to make API request, use the url and port: **http://localhost:3000/** <br>
There are 5 main routes:
`/users`, `/subjects`, `/cohorts`, `/assignments` and `/submissions` <br>
For further routes and types of requests in each, view their individual routes files.

## GradeBoard
In the future, the gradebook API hopes to function like a blackboard. Some of the functions it runs now are detailed in [Github Project](https://github.com/users/sanlaelaecho/projects/1/views/1).

### ERD Diagram
![ERD Diagram](https://i.imgur.com/XzgNHAN.jpg)

### Wireframe - Login Page
![Login Page](https://i.imgur.com/7dHRoso.png)

### Wireframe - Search Page
![Search Page](https://i.imgur.com/p8H4O4A.png)

### Wireframe - Indexes Page
![Indexes Page](https://i.imgur.com/EfqsdMj.png)

### Wireframe - Single Search Result Page
![Single Search Result Page](https://i.imgur.com/Tn0qKO4.png)

### Wireframe - Teacher's Grading Page
![Teacher's Grading Page](https://i.imgur.com/CjbLpIF.png)

### Wireframe - Student's Page
![Student's Page](https://i.imgur.com/68piawC.png)