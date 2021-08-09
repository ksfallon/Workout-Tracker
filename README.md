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

Based on the 'seeder/seed.js' I was able to create a Workouts.js model for the database.

The model must require mongoose to go to the MongoDB database. It also needs to require the const Schema because it maps to the MongoDB database so the document can be properly defined in the collection.

WorkoutsSchema is set to a new Schema and this object is made of multiple properties. These objects define the WorkoutsSchema. Its only made of a date and exercise objects, but exercises is an array made up of 1 or more exercises. 

An exercise has 3 required properties: type, name and duration. type and name are both 'type: String', require a trim, and because it is required it has text that is shown if the field is not entered. Duration is the same except it is a number type.

The others are dependent if the type is either "cardio" or "resistance". These other properties are: duration, weight, reps, sets, distance. These are all 'type: Numbers' and require a trim if there are extra spaces.

At the end this WorkoutsSchema object is set to a const Workouts.
`const Workouts = mongoose.model("Workouts", WorkoutsSchema); 
`
and then Workouts is exported.

I also added an index.js to the models folder. I could not get my database to seed properly unless I had the index file. If I had multiple models the Index would be necessary to do one export of all of them.
## 3. Creating API routes
Adding functionality
