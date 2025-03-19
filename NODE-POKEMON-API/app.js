const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello , Express ! 😒");
});

app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Vous avez demandé le pokemon n°${id}`);
});

// esseyer plusieurs parametres
app.get('/api/pokemons/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.send(`Vous avez demandé le pokemon n°${id} qui est ${name}`)
})

app.listen(port, () => {
    console.log(`Notre servveur express est demaréé sous : http://localhost:${port}`);
});