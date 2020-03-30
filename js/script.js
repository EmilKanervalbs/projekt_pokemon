const P = new Pokedex.Pokedex();

var pokemonElement = document.getElementById("pokemon_list");

var statsElement = document.getElementById("pokemon_stats");
var movesElement = document.getElementById("pokemon_moves");

var pokemon_show_start = 0;

// för att få lista med pokemon
// https://github.com/PokeAPI/pokeapi-js-wrapper#root-endpoints

P.getEvolutionChainById(3)
.then(function(response) {
  console.log(response);
});



document.getElementById("pokemon_sprite").onclick = () => {
  console.log("oi cunt");
}




document.getElementById("pokemon_input").value = "bulbasaur";

LookupPokemon();

UpdatePokemonList(0);

// showPokemon(0, 10);

window.onclick = x => {
  // console.log(x.target);

  if (x.target.parentElement.classList[0] != "move" && x.target.parentElement.classList[0] != "pokepoke" && x.target.classList[0] != "pokepoke") {
    return;
  } //om det inte är en del av move så kommer den inte bry sig



  if (x.target.parentElement.classList[0] == "move") {
    LookupMove(x.target.parentElement.id);
  } 
  else if(x.target.classList[0] == "pokepoke") 
  {
    console.log("AAAAAAAAA");
    document.getElementById("pokemon_input").value = x.target.getElementsByClassName("pokemon_name")[0].innerHTML;
    LookupPokemon();
  } 
  else if(x.target.parentElement.classList[0] = "pokepoke") 
  {
    console.log("BBBBBBBBB");
    document.getElementById("pokemon_input").value = x.target.parentElement.getElementsByClassName("pokemon_name")[0].innerHTML;
    LookupPokemon();

  }
  
}


function LookupPokemon() {
  let pokemon = document.getElementById("pokemon_input").value;

  //clear saken

  statsElement.innerHTML = "";
  movesElement.innerHTML = "";

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
      let y = document.createElement("div");
      y.classList.add("move");
      y.id = m[i].move.name;
      x.innerHTML = m[i].move.name;

      y.appendChild(x);
      movesElement.appendChild(y);

    }

  })
  .catch(err => {
    //om det blir fel körs denna kod:
    console.log(err);
    document.getElementById("pokemon_name").innerHTML =
      "No pokemon by that name";
  });
}


function LookupMove(move) {
  P.getMoveByName(move)
    .then(function(res) {
      console.log(res);

      // let x = document.createElement("div");
      // x.innerHTML = "hello there"

      
      let parent = document.getElementById(move);

      if (parent.childElementCount > 1) {
        for (let i = 1; parent.childElementCount != 1;) {
          if (parent.children[i].classList[0] == "MoveDetail") {
            parent.children[i].outerHTML = "";
          }
        }
        return;
      }

      console.log(move);
      

      // document.getElementById(move).appendChild(x);

      newElement(parent, "power: " + res.power, ["MoveDetail"], "");
      newElement(parent, "accuracy: " + res.accuracy, ["MoveDetail"], "");
      newElement(parent, "pp: " + res.pp, ["MoveDetail"], "");
      newElement(parent, "effect chance: " + res.effect_chance, ["MoveDetail"], "");

    

      

    });
}


function newElement(parent, content, classes, id) {
  let x = document.createElement("div");
  x.innerHTML = content;
  x.classList = classes;
  x.id = id;

  parent.appendChild(x);
}

function showPokemon(a, b) {

  pokemonElement.innerHTML = "";

  let interval = {
    limit: b - a,
    offset: a
  }

  P.getPokemonsList(interval)
    .then(function(res) {
      console.log(res);
      for (let i = 0; i < res.results.length; i++) {
        console.log("hello");
        P.getPokemonByName(res.results[i].name)
          .then(function(pok) {
            let x = document.createElement("div");
            x.classList.add("pokepoke");

            let y = document.createElement("div");
            y.innerHTML = pok.name;
            y.classList.add("pokemon_name");

            let z = document.createElement("img");
            z.src = pok.sprites.front_default;
      
            x.appendChild(y);
            x.appendChild(z);

            pokemonElement.appendChild(x);
          });
      }
    });
}

function UpdatePokemonList(x) {
  showPokemon(pokemon_show_start, pokemon_show_start + 10);

  if (pokemon_show_start + x < 0) {
    return;
  }

  pokemon_show_start += x;

  // if (pokemon_show_start == 0) {
  //   document.getElementById("pokemon_decrease").classList.add("hidden");
  // } else {
  //   document.getElementById("pokemon_decrease").classList.remove("hidden");
  // }

}