const awsServerlessExpress = require('aws-serverless-express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use environment variables for sensitive information
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://bhashitha:AZaz09$$@cluster0amc.zcisnub.mongodb.net/test';

mongoose.connect(mongoURI)
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

app.use(bodyParser.json());
app.use(cors());

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Create a server for aws-serverless-express
const server = awsServerlessExpress.createServer(app);

// Export the Lambda handler
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5005;

// // MongoDB Atlas connection string
// const mongoURI = 'mongodb+srv://bhashitha:AZaz09$$@cluster0amc.zcisnub.mongodb.net/test';

// // Connect to MongoDB Atlas
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Create a Movie schema
// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   genre: { type: String, required: true },
//   year: { type: Number, required: true },
//   imageUrl: {type: String, required: true },
//   poster_path: { type: String },  // Assuming TMDB-like API response
//   release_date: { type: String }, // Assuming TMDB-like API response
// });

// // Create a Movie model
// const Movie = mongoose.model('Movie', movieSchema);

// // Middleware for parsing JSON and enabling CORS
// app.use(bodyParser.json());
// app.use(cors());

// // // GET all movies
// // app.get('/movies', async (req, res) => {
// //   try {
// //     const movies = await Movie.find();
// //     res.json(movies);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // Inside the GET endpoint in server.js
// app.get('/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // POST a new movie
// app.post('/movies', async (req, res) => {
//   try {
//     const movie = new Movie(req.body);
//     await movie.save();
//     res.status(201).json(movie);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // PUT (update) a movie
// app.put('/movies/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(movie);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });