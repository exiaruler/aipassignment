### 31242 Advanced Internet Programming Assignment 2

This project presents a Favour Tracking System that allows users to manage debt or owed favours to other users. The user can log into an account and request a public favour which can be seen by others. Users can also record an owed favour to them from another user. The other user can complete the favour that they owe. This system allows users to create and complete informal debts to each other. 

### FEATURES

- Create an account
- Record an owed favour from another user to yourself
- Request a favour for all users to see
- Update account details
- Update an owed favour
- Update a requested favour
- View leaderboard of user with the most owed favour
- View list of all favour requests 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Tech/framework used
- Javascript 
- Bootstrap 
- Postresql 
- Node.js 
- React 

### Dependencies  
### Client 

- Cors 2.8.5
- Express 4.17.1
- pg 8.3.3
- pg-hstore 2.3.3
- React 16.13.1
- React Dom 16.13.1
- React Router 5.2.0
- React Router Dom 5.2.0
- React Script 3.4.3
- React Toastify 6.0.0 

### Server 

- bcrypt 5.0.0
- cors 2.8.5
- dotenv 8.2.0
- express 4.17.1
- jsonwebtoken 8.5.1
- multer 1.4.2
- pg 8.3.3
- request 2.88.2



### Installation 
To run on VS code npm install these dependencies.

### Server 
### `npm install cors` 
### `npm install bcrypt`

### Client 
### `npm install toastify`
### `npm install -g nodemon`

### How to use
When running on VS code run these commands in powershell/terminal 
### Client 
Open up terminal/powershell on client directory 
### `npm start`
### Server
Open up terminal/powershell on server directory 
### `nodemon index.js`

### Contribute 
- Lily-Implement users,sessions/jwt token,server directory structure and notification
- Samuel-Implement owe favour,page routing and start of server side. Also layout the inital design of the system.
- Vivian- Implement favour update
- Reynard- Implement favour request and CSS and boostrap 

### Credits 
- server postresql-https://www.youtube.com/watch?v=ldYcgPKEZC8&t=1739s
- sessions jwt token-https://www.youtube.com/watch?v=7UQBMb8ZpuE
- multer image upload-https://www.npmjs.com/package/multer
- multer image upload storage- https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
- page redirect react router-https://reactrouter.com/

### License 
Advance Internet Programming assignment 2 submission University of Technology Sydney 2020 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify