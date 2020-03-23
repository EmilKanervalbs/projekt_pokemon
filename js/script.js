const P = new Pokedex.Pokedex();

var statsElement = document.getElementById("pokemon_stats");
var movesElement = document.getElementById("pokemon_moves");

// för att få lista med pokemon
// https://github.com/PokeAPI/pokeapi-js-wrapper#root-endpoints



document.getElementById("pokemon_sprite").onclick = () => {
  console.log("oi cunt");
}



document.getElementById("pokemon_input").value = "bulbasaur";

// LookupPokemon();



window.onclick = x => {
  if (x.target.parentElement.classList[0] != "move") {
    return;
  } //om det inte är en del av move så kommer den inte bry sig

  LookupMove(x.target.parentElement.id);
  
  console.log(x.target.innerHTML);
}


// LookupMove("pound");


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



function ShowMoves() {
  console.log("cuntface");
}