const express = require("express");
const morgan = require("morgan")
let pokemons = require("./mock-pokemon");
const { success } = require("./helper");

const app = express();
const port = 3000;

// Middleware existant 
app.use(morgan("dev"));

// hello Express 
app.get("/", (req, res) => res.send("Hello , Express ! 😒"));

// get les pokemon par id 
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien été trouver";
  res.json(success(message, pokemon));
});

// get tous les pokemons 
app.get('/api/pokemons', (req, res) => {
  const message = "La liste des pokemons a été bien recueré !"
  res.json(success(message, pokemons))
})

app.listen(port, () => {
  console.log(`Notre application est demaréé sur : http://localhost:${port}`);
});
