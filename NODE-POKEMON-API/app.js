const express = require("express");
const { success } = require("./helper.js");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello , Express ! 😒"));

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien été trouver";
  res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res) => {
  const message = "Nous avons bien recuperé les 12 pokemons dans le pokedex."
  res.json(success(message, pokemons))
})

app.listen(port, () => {
  console.log(`Notre application est demaréé sur : http://localhost:${port}`);
});
