let i = 1
async function getPokemon() {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(response => response.json())
      .then((poke) => {

        console.log(poke)

        const sprite = (!poke.sprites.front_default) ? poke.sprites.other['official-artwork'].front_default : poke.sprites.front_default
        
        const typesArray = []
        
        for (let type of poke.types) {
          const typeObj = {
            "name": type.type.name
          }
          typesArray.push(typeObj)
        }
        
        const pokeData = {
          "name" : poke.species.name,
          "height": poke.height,
          "weight": poke.weight,
          "hp": poke.stats[0].base_stat,
          "attack": poke.stats[1].base_stat,
          "defense": poke.stats[2].base_stat,
          "special-attack": poke.stats[3].base_stat,
          "special-defense": poke.stats[4].base_stat,
          "speed": poke.stats[5].base_stat,
          "types" : typesArray,
          "sprite": sprite,
          "artwork": poke.sprites.other['official-artwork'].front_default,
          "moves": poke.moves,
        }

        const currentImageElement = document.getElementById(`poke_image`);
        const currentNameElement = document.getElementById(`pokemon_name`);
        const currentStats = document.getElementById('stats_panel');

        currentImageElement.src = pokeData.artwork;
        currentNameElement.innerHTML = pokeData.name;

        const statsPanel = document.getElementById('stats_panel');
        const statsList = document.createElement('ul');
        
        const heightItem = document.createElement('li');
        heightItem.textContent = `height: ${pokeData.height}`;
        statsList.appendChild(heightItem);

        const weightItem = document.createElement('li');
        weightItem.textContent = `weight: ${pokeData.weight}`;
        statsList.appendChild(weightItem);

        const hpItem = document.createElement('li');
        hpItem.textContent = `hp: ${pokeData.hp}`;
        statsList.appendChild(hpItem);

        const attack = document.createElement('li');
        attack.textContent = `attack: ${pokeData.attack}`;
        statsList.appendChild(attack);

        const defense = document.createElement('li');
        defense.textContent = `defense: ${pokeData.defense}`;
        statsList.appendChild(defense);

        const specialAttack = document.createElement('li');
        specialAttack.textContent = `special-attack: ${pokeData['special-attack']}`;
        statsList.appendChild(specialAttack);

        const specialDefense = document.createElement('li');
        specialDefense.textContent = `special-defense: ${pokeData['special-defense']}`;
        statsList.appendChild(specialDefense);

        const speed = document.createElement('li');
        speed.textContent = `speed: ${pokeData.speed}`;
        statsList.appendChild(speed);

        statsPanel.innerHTML = '';

        statsPanel.appendChild(statsList);

        updateMovesList(pokeData.moves);
            

    const typesContainer = document.getElementById('types');

    typesContainer.innerHTML = '';
    pokeData.types.forEach((typeData) => {
        const typeName = typeData.name;
        const typeElement = document.createElement('div');
        typeElement.classList.add('type');
        typeElement.textContent = typeName;
        typeElement.style.padding = '5px';
        typeElement.style.borderRadius = '10px';
        typeElement.style.paddingInline = '15px';
        typeElement.style.display = 'flex';
        typeElement.style.justifyContent = 'center';
        switch (typeName) {
            case 'normal':
                typeElement.style.backgroundColor = '#A8A77A';
                break;
            case 'fire':
                typeElement.style.backgroundColor = '#EE8130';
                break;
            case 'water':
                typeElement.style.backgroundColor = '#6390F0';
                break;
            case 'electric':
                typeElement.style.backgroundColor = '#F7D02C';
                break;
            case 'grass':
                typeElement.style.backgroundColor = '#7AC74C';
                break;
            case 'ice':
                typeElement.style.backgroundColor = '#96D9D6';
                break;
            case 'fighting':
                typeElement.style.backgroundColor = '#C22E28';
                break;
            case 'poison':
                typeElement.style.backgroundColor = '#A33EA1';
                break;
            case 'ground':
                typeElement.style.backgroundColor = '#E2BF65';
                break;
            case 'flying':
                typeElement.style.backgroundColor = '#A98FF3';
                break;
            case 'psychic':
                typeElement.style.backgroundColor = '#F95587';
                break;
            case 'bug':
                typeElement.style.backgroundColor = '#A6B91A';
                break;
            case 'rock':
                typeElement.style.backgroundColor = '#B6A136';
                break;
            case 'ghost':
                typeElement.style.backgroundColor = '#735797';
                break;
            case 'dragon':
                typeElement.style.backgroundColor = '#6F35FC';
                break;
            case 'dark':
                typeElement.style.backgroundColor = '#705746';
                break;
            case 'steel':
                typeElement.style.backgroundColor = '#B7B7CE';
                break;
            case 'fairy':
                typeElement.style.backgroundColor = '#D685AD';
                break;
        }
        
        
        typesContainer.appendChild(typeElement);
      });
        
    })
      .catch((error) => {
        console.log(error)
    })
  }

  const next_button = document.getElementById('next_button');
next_button.addEventListener('click', () => {
  i++;
  getPokemon();
});

const back_button = document.getElementById('back_button');
back_button.addEventListener('click', () => {
    i--;
    getPokemon();
});

const infoButton = document.getElementById('info_button');
const movesButton = document.getElementById('move_button');
const infoPanel = document.getElementById('info_div');
const movesPanel = document.getElementById('moves_div');

infoButton.addEventListener('click', () => {
    infoButton.style.backgroundColor = '#7CFF79'; 
    movesButton.style.backgroundColor = ''; 
    infoPanel.style.display = 'flex';
    movesPanel.style.display = 'none';
});

movesButton.addEventListener('click', () => {
    movesButton.style.backgroundColor = '#7CFF79'; 
    infoButton.style.backgroundColor = ''; 
    infoPanel.style.display = 'none';
    movesPanel.style.display = 'flex';
});

function updateMovesList(moves) {
  const movesPanel = document.getElementById('moves_panel');
  const movesList = document.createElement('ul');

  moves.forEach((move) => {
      const moveName = document.createElement('li');
      moveName.textContent = move.move.name;
      movesList.appendChild(moveName);
  });

  movesPanel.innerHTML = '';
  movesPanel.appendChild(movesList);

  movesPanel.scrollTop = 0;
}


getPokemon()

