const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
let pokemons = require("./mock-pokemon");
const { success, getUniqueId } = require("./helper");

const app = express();
const port = 3000;

// Middleware existant
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json()); //donc ce ligne va parser tous les donner en entré dans notre application en format json

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
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokemons a été bien recueré !";
  res.json(success(message, pokemons));
});

// premere methode post
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const createdPokemons = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(createdPokemons);
  const message = `Le pokemon ${createdPokemons.name} a été créé !`;
  res.json(success(message, pokemons));
});

// ecoute du port
app.listen(port, () => {
  console.log(`Notre application est demaréé sur : http://localhost:${port}`);
});
