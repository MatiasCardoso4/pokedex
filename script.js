//ELEMENTOS DE LA POKEDEX DONDE SE VA A MOSTRAR LA INFORMACIÓN DEL POKEMON
const pokemon_name = document.querySelector(".pokemon-name");
const pokemon_sprite = document.querySelector(".pokemon-sprite");
const pokemon_id = document.querySelector(".pokemon-id");
const pokemon_abilities = document.querySelector(".pokemon-abilities");
const pokemon_stats = document.querySelector(".pokemon-stats");
const pokemon_type = document.querySelector(".pokemon-type");
const pokemon_sprite_container = document.querySelector(
  ".pokemon-sprite-container"
);

//ERROR MESSAGE
const error_message = document.querySelector(".error-message");

// INPUT Y FORMULARIO
const inputSearch = document.getElementById("poke-name");
const form = document.querySelector("form");

//VARIABLE PARA GUARDAR EL NOMBRE DEL POKEMON
let pokemon = undefined;

//H5 ENCABEZADO PARA LOS STATS
const h3 = document.createElement("h3");
h3.textContent = "Stats";
h3.classList.add("stats-title");
//INPUT PARA BUSCAR EL POKEMON
inputSearch.addEventListener("input", (e) => {
  const value = e.target.value;
  pokemon = value;
});

//FORMULARIO QUE LLAMA A LAS FUNCIONES DE MUESTRA DE ERROR Y PARA OBTENER AL POKEMON
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showError();
  getPokemon();
});

//FUNCIÓN PARA OBTENER LOS POKEMON
async function getPokemon() {
  try {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLocaleLowerCase()}`;
    const response = await fetch(URL);
    response.json().then((data) => {
      showPokemonInfo(data);
      // console.log(data);
    });
  } catch (e) {
    throw new Error("Pokemon not found!");
  }
}

//FUNCIÓN PARA MOSTRAR LOS POKEMON EN PANTALLA
function showPokemonInfo(data) {
  const { name, sprites, id, abilities, stats, types } = data;
  cleanDisplay();
  checkIfDataExists(data);
  pokemon_name.textContent = `${name
    .slice(0, 1)
    .toLocaleUpperCase()}${name.slice(1)}`;
  pokemon_sprite.src = `${sprites.front_default}`;

  getPokemonStats(stats);
  getPokemonAbilities(abilities);
  // getPokemonTypes(types);
}

//FUNCIÓN CON UN BUCLE PARA IR MOSTRANDO CADA STAT
function getPokemonStats(stats) {
  const stats_container = document.querySelector(".pokemon-stats-container");

  stats.forEach((stat) => {
    const stats_list = document.createElement("li");
    const stat_value = (document.createElement(
      "p"
    ).textContent = `${stat.base_stat}`);
    const stat_name = (document.createElement(
      "p"
    ).textContent = `${stat.stat.name
      .slice(0, 1)
      .toLocaleUpperCase()}${stat.stat.name.slice(1)}`);

    stats_list.append(stat_value, stat_name);
    pokemon_stats.appendChild(stats_list);
    stats_container.append(h3, pokemon_stats);
  });
}

//FUNCIÓN CON UN BUCLE PARA IR MOSTRANDO CADA HABILIDAD
function getPokemonAbilities(abilities) {
  abilities.forEach((ability) => {
    const li = document.createElement("li");
    const ability_name_paragraph = document.createElement("p");
    ability_name_paragraph.append(`${ability.ability.name} `);

    pokemon_abilities.append(ability_name_paragraph);
  });
}

//FUNCIÓN CON UN BUCLE PARA IR MOSTRANDO CADA TIPO DE POKEMON
function getPokemonTypes(types) {
  types.forEach((type) => {
    const li = document.createElement("li");
    li.textContent = `${type.type.name} `;
    pokemon_type.append(li);
  });
}

//FUNCIÓN QUE SIRVE PARA LIMPIAR LA PANTALLA AL BUSCAR UN POKEMON NUEVO
function cleanDisplay() {
  pokemon_name.textContent = "";
  pokemon_id.textContent = "";
  pokemon_stats.textContent = "";
  pokemon_abilities.textContent = "";
  pokemon_type.textContent = "";
}

//FUNCIÓN QUE MUESTRA UN MENSAJE DE ERROR EN PANTALLA AL NO INGRESAR UN NOMBRE
function showError() {
  if (inputSearch.validity.valueMissing) {
    error_message.textContent = "Please type a pokemon name";
  }
}

function checkIfDataExists(data) {
  data && (error_message.textContent = "");
  data ? (pokemon_sprite.style.display = "block") : "none";
  data ? (pokemon_sprite_container.style.display = "block") : "none";
}
