Live Demo: http://serverless-react-app-test.s3-website-ap-southeast-1.amazonaws.com/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run deploy`

After i completed the tic-tac-toe app, I wanted to put it up on AWS, Amazon Web Services. This was done through configuring an S3 bucket for static web hosting and creating a deploying script in package.json to make updating the live React application more convenient. Everytime the app is deployed, the files in the S3 bucket gets updated automatically.
