const pokemon_name = document.querySelector(".pokemon-name");
const pokemon_id = document.querySelector(".pokemon-id");
const pokemon_abilities = document.querySelector(".pokemon-abilities");
const pokemon_stats = document.querySelector(".pokemon-stats");
const pokemon_type = document.querySelector(".pokemon-type");
/* ######################################## */
const inputSearch = document.getElementById("poke-name");
const form = document.querySelector("form");
/* ######################################## */
let pokemon = undefined;
/* ######################################## */
inputSearch.addEventListener("input", (e) => {
  const value = e.target.value;
  pokemon = value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getPokemon();
});
/* ######################################## */
async function getPokemon() {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLocaleLowerCase()}`;
  const response = await fetch(URL);
  response.json().then((data) => {
    showPokemonInfo(data);
  });
}

function showPokemonInfo(data) {
  cleanDisplay();
  const { name, id, abilities, stats, types } = data;
  pokemon_name.textContent = name;
  pokemon_id.textContent = id;
  getPokemonStats(stats);
  getPokemonAbilities(abilities);
  getPokemonTypes(types);
}

function getPokemonStats(stats) {
  stats.forEach((stat) => {
    const li = document.createElement("li");
    li.textContent = `${stat.base_stat} ${stat.stat.name}`;
    pokemon_stats.append(li);
  });
}

function getPokemonAbilities(abilities) {
  abilities.forEach((ability) => {
    const li = document.createElement("li");
    li.textContent = `${ability.ability.name} `;
    pokemon_stats.append(li);
  });
}

function getPokemonTypes(types) {
  types.forEach((type) => {
    const li = document.createElement("li");
    li.textContent = `${type.type.name} `;
    pokemon_type.append(li);
  });
}

function cleanDisplay() {
  pokemon_name.textContent = "";
  pokemon_id.textContent = "";
  pokemon_abilities.textContent = "";
  pokemon_stats.textContent = "";
  pokemon_type.textContent = "";
}
