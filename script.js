const pokemon_name = document.querySelector(".pokemon-name");
const pokemon_sprite = document.querySelector(".pokemon-sprite");
const pokemon_id = document.querySelector(".pokemon-id");
const pokemon_abilities = document.querySelector(".pokemon-abilities");
const pokemon_stats = document.querySelector(".pokemon-stats");
const pokemon_type = document.querySelector(".pokemon-type");
const pokemon_sprite_container = document.querySelector(
  ".pokemon-sprite-container"
);
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
    // console.log(data);
  });
}

function showPokemonInfo(data) {
  cleanDisplay();

  const { name, sprites, id, abilities, stats, types } = data;
  pokemon_name.textContent = name;
  pokemon_id.textContent = `id: ${id}`;
  data ? (pokemon_sprite.style.display = "block") : "none";
  data ? (pokemon_sprite_container.style.display = "block") : "none";
  pokemon_sprite.src = `${sprites.front_default}`;
  getPokemonStats(stats);
  // getPokemonAbilities(abilities);
  // getPokemonTypes(types);
}

function getPokemonStats(stats) {
  const stats_container = document.querySelector(".pokemon-stats-container");
  const h5 = document.createElement("h5");
  h5.textContent = "Stats";
  stats.forEach((stat) => {
    const li = document.createElement("li");
    const stat_value_paragraph = document.createElement("p");
    const stat_name_paragraph = document.createElement("p");

    stat_value_paragraph.append(`${stat.base_stat}`);
    stat_name_paragraph.append(`${stat.stat.name}`);
    li.append(stat_value_paragraph, stat_name_paragraph);
    pokemon_stats.append(li);

    stats_container.append(h5, pokemon_stats);
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
  pokemon_stats.textContent = "";
  pokemon_abilities.textContent = "";
  pokemon_type.textContent = "";
}
