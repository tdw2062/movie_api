//Integrate Mongoose into REST API
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//Allow Mongoose to connect to db so it can perform CRUD operations
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//Include Express and Morgan
const express = require('express');
morgan = require('morgan');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', }));

app.use(morgan('common'));

//Create array of movie objects
let movies = [
    {
        title: 'Braveheart'
    },
    {
        title: 'The Shawshank Redemption'
    },
    {
        title: 'Rocky'
    },
    {
        title: 'Rocky IV'
    },
    {
        title: 'The Notebook'
    },
    {
        title: 'Searching for Bobby Fischer'
    },
    {
        title: 'Forrest Gump'
    },
    {
        title: 'I Can Only Imagine'
    },
    {
        title: 'The Matrix'
    },
    {
        title: 'The Godfather'
    }
];

//Create array of genre objects 
let genres = [
    {
        name: 'Thriller'
    },
    {
        name: 'Comedy'
    }
];

//Create array of director objects
let directors = [
    {
        name: 'Steven Spielberg'
    },
    {
        name: 'Spike Lee'
    }
];

//Create array of user objects 
let users = [
    {
        userName: 'AceKid',
        password: 'HoneyBee1'
    },
    {
        userName: 'BigDawg',
        password: 'TrixYum'
    }
];

// GET requests

//GET all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//GET data about a single movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET data about a single genre by name
app.get('/genres/:Name', (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
        .then((genre) => {
            res.json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET data about a single director by name
app.get('/directors/:Name', (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET data about a single director by name
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((directors) => { return directors.name === req.params.name }));
});

//Get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//POST requests 

//POST request to add a new movie
app.post('/movies', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//POST request to allow a new user to register
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
        { new: true }, //This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//PUT requests

//Update the password of a user
app.put('/users/:userName/:password', (req, res) => {
    let user = users.find((user) => { return user.userName === req.params.userName });
    res.status(201).send('Your password has been updated.');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Update a user's info, by username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }, //this line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//DELETE requests

//Remove a movie
app.delete('/movies/:title', (req, res) => {
    let movie = movies.find((movie) => { return movie.title === req.params.title });

    if (movie) {
        movies = movies.filter((obj) => { return obj.title !== req.params.title });
        res.status(201).send('Movie ' + req.params.title + ' was deleted.');
    }
});

//Delete a user by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Delete a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})

