const express = require('express');
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

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

// GET requests
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/', (req, res) => {
    res.send('What Up G?');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Post request to add a new movie
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

//Return data about a single movie by name
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => { return movies.name === req.params.name }));
});

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})