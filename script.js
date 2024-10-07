function getPokemon() {
  const response = fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  response.then((data) => data.json().then((data) => console.log(data)));
}

getPokemon();
