<h1 align ="center"> Workout Tracker </h1>

Link to [Heruko page](https://workout-tracker200.herokuapp.com/).

Link to [GitHub page](https://github.com/ksfallon/Workout-Tracker).

### **TABLE OF CONTENTS:**
1. [Creating Server and HTML Routes](#1-creating-server-and-html-routes)
2. [Creating Models](#1-creating-models)
3. [Creating API Routes](#1-creating-api-routes)

## 1. Creating Server and HTML Routes
In order to get the website to function I needed to create the backend. I created the server.js and view.js first. 

The server.js needed to require express and mongoose. Express to create our routes and mongoose to be able to connect to Atlas MongoDB.

Express is used to setup the PORT, the app.use(express: urlcoded, json and static), the routes for api.js and view.js, and finally the app.listen to get the PORT running.

For mongoose, I must do the connect:
`mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);`
The process.env.MONGODB_URI is so mongoose can either run on the local server or the Heroku server on the mongoDB database "workout_db"

The HTML routes:
Again I needed to require express to call the function Router()

path is also required to create connections to move objects along routes

routes and path are used to create the GET routes for '/exercise/' and '/stats'. and finally the routes must be exported.
## 2. Creating Models
## 3. Creating API routes
Adding functionality
