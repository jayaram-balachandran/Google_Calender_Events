# MERN-boilerplate

This is a boilerplate project using the following technologies:

- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation

## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```

## Running

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start-dev
```

# Google_Calender

Open the browser and give the **URL** -

```shell
http://localhost:8080/
```

Click on the URL and login with Google account.

It will take you to the page, where upcoming 10 events will be listed.

# Files for code review

```shell
Client --> App --> Components --> Google --> googleAuth.js & login.js
Server --> routes --> api --> getInfo.js & getToken.js
```
