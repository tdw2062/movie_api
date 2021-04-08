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
    res.json(movies);
});

//GET data about a single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movies) => { return movies.title === req.params.title }));
});

//GET data about a single genre by name
app.get('/genres/:name', (req, res) => {
    res.json(genres.find((genres) => { return genres.name === req.params.name }));
});

//GET data about a single director by name
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((directors) => { return directors.name === req.params.name }));
});

//POST requests 

//POST request to add a new movie
app.post('/movies', (req, res) => {
    let newMovie = req.body;

    if (!newMovie.title) {
        const message = "missing title in request body";
        res.status(400).send(message);
    } else {
        // newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});

//POST request to allow a new user to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.userName) {
        const message = "missing title in request body";
        res.status(400).send(message);
    } else {
        // newMovie.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
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

//DELETE requests

//Remove a movie
app.delete('/movies/:title', (req, res) => {
    let movie = movies.find((movie) => { return movie.title === req.params.title });

    if (movie) {
        movies = movies.filter((obj) => { return obj.title !== req.params.title });
        res.status(201).send('Movie ' + req.params.title + ' was deleted.');
    }
});

//Remove a user
app.delete('/users/:userName', (req, res) => {
    let user = users.find((user) => { return user.userName === req.params.userName });

    if (user) {
        users = users.filter((obj) => { return obj.userName !== req.params.userName });
        res.status(201).send('User ' + req.params.userName + ' was removed.');
    }
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})