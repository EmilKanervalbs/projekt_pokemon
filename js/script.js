const P = new Pokedex.Pokedex();

var statsElement = document.getElementById("pokemon_stats");
var movesElement = document.getElementById("pokemon_moves");


document.getElementById("pokemon_sprite").onclick = () => {
  console.log("oi cunt");
}



document.getElementById("pokemon_input").value = "bulbasaur";

LookupPokemon();



// P.getPokemonByName("bulbasaur")
//   .then(res => {
//     //om det blir rätt körs denna kod:
//     console.log(res);
//     document.getElementById("pokemon_name").innerHTML = res.name;
//     document.getElementById(
//       "pokemon_sprite"
//     ).innerHTML = `<img src="${res.sprites.front_default}"/>`;
//   })
//   .catch(err => {
//     //om det blir fel körs denna kod:
//     console.log(err);
//     document.getElementById("pokemon_name").innerHTML =
//       "No pokemon by that name";
// });


function LookupPokemon() {
  let pokemon = document.getElementById("pokemon_input").value;

  //clear saken

  statsElement.innerHTML = "";


  P.getPokemonByName(pokemon)
  .then(res => {
    //om det blir rätt körs denna kod:
    console.log(res);
    document.getElementById("pokemon_name").innerHTML = res.name;
    document.getElementById(
      "pokemon_sprite"
    ).innerHTML = `<img src="${res.sprites.front_default}"/>`;

    let stats = res.stats;
    let m = res.moves;
    
    for (let i = 0; i < stats.length; i++) {
      let x = document.createElement("div");
      x.classList.add("stat");
      x.innerHTML = stats[i].stat.name + ": " + stats[i].base_stat;
      statsElement.appendChild(x);
    }

    for (let i = 0; i < m.length; i++) {
      let x = document.createElement("div");
      x.classList.add("move");
      x.innerHTML = m[i].move.name;

      console.log(m[i].move.name);

      movesElement.appendChild(x);

    }


  })
  .catch(err => {
    //om det blir fel körs denna kod:
    console.log(err);
    document.getElementById("pokemon_name").innerHTML =
      "No pokemon by that name";
  });
}


function ShowMoves() {
  console.log("cuntface");
}