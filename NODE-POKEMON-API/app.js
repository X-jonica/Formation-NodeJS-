const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {Sequelize, DataTypes} = require("sequelize");
const favicon = require("serve-favicon");
let pokemons = require("./mock-pokemon");
const { success, getUniqueId } = require("./helper");
const PokemonModel = require("./src/models/pokemon");

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

// tester la connexion avec la bd
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion a la base de donnée a bien été etablie")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter a la base de données : ${error}`)
  );

// synchronisation de notre modele sequelise avec notre base de données 
const pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({force: true})
.then(_ => console.log("La base de donnée 'Pokedex' a été bine synchronisé"))


// Middleware existant
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json()); //donc ce ligne va parser tous les données en entré dans notre application en format json

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

// premiere methode post
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const createdPokemons = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(createdPokemons);
  const message = `Le pokemon ${createdPokemons.name} a été créé !`;
  res.json(success(message, pokemons));
});

// methode put
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id == id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a bien ete mis a jour !`;
  res.json(success(message, pokemonUpdated));
});

// tester une methode delete
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDelete = pokemons.find((pokemon) => pokemon.id == id);
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokemon ${pokemonDelete.name} a bien ete supprimé !`;
  res.json(success(message, pokemonDelete));
});

// ecoute du port
app.listen(port, () => {
  console.log(`Notre application est demaréé sur : http://localhost:${port}`);
});
