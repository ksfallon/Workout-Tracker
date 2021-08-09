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
The API routes are need to add functionality to the website. Right now the user can access all of the html routes but no workouts can be added and no graphs are visible.

Just like the HTML routes, this api.js file needs to require Router(). But this one also requires Workouts, bc it needs the model to GET PUT and POST the data from the database.

1.GET '/api/workouts'. 
- This route is to get the most recent workout, so the HTML route can display it on the homepage.

- But a new property has to be created 'totalDuration' that will have the duration of all of the exercises combined. To do this the 'aggregate' method is needed. This method can use the '$addFields'(mongoose language) which will create the new field called 'totalDuration' and then '$sum' which is the combined durations of all exercises in the array.

2. POST '/api/workouts'
- This is the route to create the users new workout.
- The create method is used to create the new workout from the user input.
- **There is a bug with this route on the front end** when the complete button is hit, an additional exercise is added that also has the same type as the exercise added through the PUT route, but nothing else, even though all of those fields should be required. Its on the front end, so I will look into it.

3. PUT '/api/workouts/:id'
- This is needed to add new exercises to the workout with the same date.
- The findByIdAndUpdate method is used here. based on the requested params, the $push property will literally 'push' the new exercise the user inputed into the new exercise into the current day object.

4. GET '/api/workouts/range'
- This will grab the mose recent day and disply its total duration and weight in graphs.
- aggregate method is used again. And again addFields to create total duration from the sum of all exercise durations.
- but it also includes a sort: -1 so the exercise array is sorted in descending order - the end of the array first.
- Because I want to display the last seven days limit is also used, and the limit is set to 7.

Here is a screen shot of the homepage displaying the current day's workouts data:
https://github.com/ksfallon/Workout-Tracker/blob/main/assets/homescreen.PNG

Here is a screen shot of the range page with the charts:
https://github.com/ksfallon/Workout-Tracker/blob/main/assets/Dashboard.PNG
