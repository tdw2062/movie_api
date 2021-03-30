const express = require('express');
const app = express();

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

//listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})