const pokeArray = []

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
        
        const processedName = poke.data.species.name.split(/-/).map((name) => {
          return name[0].toUpperCase() + name.substring(1);
        }).join(" ")
          .replace(/^Mr M/,"Mr. M")
          .replace(/^Mime Jr/,"Mime Jr.")
          .replace(/^Mr R/,"Mr. R")
          .replace(/mo O/,"mo-o")
          .replace(/Porygon Z/,"Porygon-Z")
          .replace(/Type Null/, "Type: Null")
          .replace(/Ho Oh/,"Ho-Oh")
          .replace(/Nidoran F/,"Nidoran♀")
          .replace(/Nidoran M/,"Nidoran♂")
          .replace(/Flabebe/,"Flabébé")
        
        const bulbURL = `https://bulbapedia.bulbagarden.net/wiki/${processedName.replace(" ","_")}_(Pokémon)`
        
        const pokeData = {
          "name" : processedName,
          "number": poke.data.id,
          "types" : typesArray,
          "hp": poke.data.stats[0].base_stat,
          "height": poke.data.height,
          "weight": poke.data.weight,
          "attack": poke.data.stats[1].base_stat,
          "defense": poke.data.stats[2].base_stat,
          "special-attack": poke.data.stats[3].base_stat,
          "special-defense": poke.data.stats[4].base_stat,
          "speed": poke.data.stats[5].base_stat,
          "sprite": sprite,
          "artwork": poke.data.sprites.other['official-artwork'].front_default,
          "bulbURL": bulbURL
        }

        pokeArray.push(pokeData)
        console.log(`Fetching ${pokeData.name} from PokeAPI.`)
    })
      .catch((error) => {
        console.log(error)
    })
  }
  
  createNotionPage()
}

getPokemon()