const pokemon_name = document.querySelector(".pokemon-name");
const pokemon_id = document.querySelector(".pokemon-id");
const pokemon_abilities = document.querySelector(".pokemon-abilities");
const pokemon_stats = document.querySelector(".pokemon-stats");

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
    console.log(data);
  });
}

function showPokemonInfo(data) {
  const { name, id, abilities, stats } = data;
  getPokemonStats(stats);
  getPokemonAbilities(abilities);
  pokemon_name.textContent = name;
  pokemon_id.textContent = id;
}

function getPokemonStats(stats) {
  stats.forEach((stat, i) => {
    const li = document.createElement("li");
    li.textContent = `${stat.base_stat} ${stat.stat.name}`;
    pokemon_stats.append(li);
  });
}

function getPokemonAbilities(abilities) {
  abilities.forEach((ability, i) => {
    const li = document.createElement("li");
    li.textContent = `${ability.ability} `;
    pokemon_stats.append(li);
  });
  console.log(abilities);
}
