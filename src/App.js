
import React, { useState, useEffect } from 'react'

import PokemonThumnail from './components/PokemonThumnail';

function App() {
   const [allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
   const getAllPokemons = async() => {
     const res = await fetch(loadMore)
     const data = await res.json()

     setLoadMore(data.next)

     function createPokemonObject (results) {
       results.forEach(async (pokemon) => {
         const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
         const data = await res.json()
         setAllPokemons (currentList => [...currentList, data])
       
        })
        
     }
     createPokemonObject (data.results)
   }


   useEffect(() => {
     getAllPokemons()
   }, [])
   return (
    <div className="app-container" id="fondo">
      <img src="//cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"></img>
      <div className="pokemon-container">
        <div className="all-container">
           {allPokemons.map((pokemonStats, index) => (
           <PokemonThumnail
            key={index}
            id={pokemonStats.id}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name}
            type={pokemonStats.types[0].type.name}
            
           />
           ))}
        </div>
       
      </div>
      <button className="load-more" onClick={() => getAllPokemons()}>
          Ver más
        </button>
    </div>

   
  );
}

export default App;
