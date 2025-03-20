const express = require("express");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello , Express ! 😒");
});

// on utilise la liste de pokemons dans notre point de termnaison  :
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // pourquoi e parseInt ? => c'est pour convertir le id dans notre point de terminaison en int pour qu'elle correspond au condition si dessous

  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.send(`Vous avez demandé le pokemon ${pokemon.name}.`);
});

app.listen(port, () => {
  console.log(`Notre application est demaréé sur : http://localhost:${port}`);
});
