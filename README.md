# ELECTRA
### Collaboration for the modern artist
---
### Current Features:
- __Critiques__ (In development) - Artists can upload their work using the Critique Upload Form. This work is sent to a (secure) AWS S3 bucket, and a link to that work is stored in a (secure) PostgreSQL database. These links are used to render all the art on the Critiques page.
- __Profile__ (In development) - Users can see their information in an organized profile. They can also see the work they've uploaded.

### Table of Contents:

1. [Technology](#technolgy)
2. [Setup](#setup)
3. [UX](#ux)
4. [Future Work](#futurework)

### Technology

- PERN Stack:
  - PostgreSQL Database (Not used in client)
  - Express API Framework (Not used in client)
  - React UI Framework
  - Node JS Environment
- Languages:
  - HTML5
  - CSS3
  - JavaScript
  - SQL (Not used in client)
- Frameworks:
  - React
  - CSS Grid
  - Flexbox
- Developer Tools:
  - VSCode
  - Firefox Developer Edition (Grid debugging)
  
### Setup

To run this project, start by installing it locally via command line:

```
$ git clone https://github.com/electrala/client
$ cd client
$ code .
```

Next open a terminal in your developing environment:

```
> npm init -y 
> npm install
> npm start
```

You may have to install more dependencies to run `npm start`:

```
> npm install name_of_dependency
```

### UX

#### Prototypes:

- [Web](https://xd.adobe.com/view/a09a6bb2-c574-4bb1-7517-6de3f8a265c0-d6ab/?fullscreen)
- [Mobile](https://xd.adobe.com/view/fdba7ccc-9072-4245-7ac6-bc7548bf26ad-8b8b/?fullscreen)

#### Wireframes:

![CSS Grid image](https://github.com/electrala/documentation/blob/master/Images/ElectraCSSGridTemplate.png)

![CSS Grid image - Modal](https://github.com/electrala/documentation/blob/master/Images/ElectraCritiquesModalTemplate.png)

### Future Work
- __Critiques__
  - Comments
  - Filtering and sorting
- __Gallery__  - A page for completed work (No comments)
- __Accessibility__
- __Security__
- __Calendar__
- __Direct & Group Messaging__
- __Mobile App__
---
# React Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

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
