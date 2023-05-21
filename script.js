async function getPokemon() {

    //api to get the pokemon base details 
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=100&limit=50"
    );
    const data = await response.json();

    const pokemons = data.results;

    let htmlData = "";


    //for is used -- if there is "pokemon" contains multiple elements
    for (const pokemon of pokemons) {

        //pokemon contains "name" and "url" , pokemonresponse = fetched data from the returned url 
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();


        //the url contails abilities , moves , weight -- map is used to filter them
        const abilities = pokemonData.abilities.map(
            (ability) => ability.ability.name
        );
        const moves = pokemonData.moves.map((move) => move.move.name);
        const weight = pokemonData.weight;

        htmlData += `
        <div id="dtapoke">
          <h1>${pokemon.name}</h1>
          <p><span>Abilities:</span> ${abilities.join(", ")}</p>
          <p><span>Moves:</span> ${moves.join(", ")}</p>
          <p><span>Weight</span>: ${weight}</p>
        </div>
      `;
    }


    const result = document.getElementById("result");
    result.innerHTML = htmlData;
}
getPokemon();