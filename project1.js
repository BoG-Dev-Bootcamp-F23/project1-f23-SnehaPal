import axios from 'axios';

async function getPokemon() {
  
  for ( let i = 1; i <= 10; i++) {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((poke) => {

        const sprite = (!poke.data.sprites.front_default) ? poke.data.sprites.other['official-artwork'].front_default : poke.data.sprites.front_default
        
        const typesArray = []
        
        for (let type of poke.data.types) {
          const typeObj = {
            "name": type.type.name
          }
          typesArray.push(typeObj)
        }
        
        const pokeData = {
          "name" : poke.data.species.name,
          "height": poke.data.height,
          "weight": poke.data.weight,
          "hp": poke.data.stats[0].base_stat,
          "attack": poke.data.stats[1].base_stat,
          "defense": poke.data.stats[2].base_stat,
          "special-attack": poke.data.stats[3].base_stat,
          "special-defense": poke.data.stats[4].base_stat,
          "speed": poke.data.stats[5].base_stat,
          "types" : typesArray,
          "sprite": sprite,
          "artwork": poke.data.sprites.other['official-artwork'].front_default,
        }

        const poke_image = document.getElementById("poke_image")
        poke_image.src = pokeData.sprite

        const pokemon_name = document.getElementById("pokemon_name")
        pokemon_name.innerHTML = pokeData.name

    })
      .catch((error) => {
        console.log(error)
    })
  }
}


getPokemon()

