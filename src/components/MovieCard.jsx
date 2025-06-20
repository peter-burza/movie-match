import {useState} from 'react'

export default function MovieCard() {
    const [loading, setLoading] = useState(false)

    async function fetchMovieData(query) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
            }
        };

        return fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err));
    }

    async function fetchPokemonData() {
        setLoading(true)
        try {
            const baseUrl = 'https://pokeapi.co/api/v2/'
            const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
            const finalUrl = baseUrl + suffix
            const response = await fetch(finalUrl) // Uses fetch() for an HTTP request. await ensures the function pauses until the response is received.
            // The returned response object contains: 
            // Status Code (e.g., 200 for success, 404 for not found). 
            // Headers (metadata about the response).
            // Body (JSON data, accessible via .json()).
            const pokemonData = await response.json() // Converts raw response into JavaScript-readable JSON.
            // Example JSON for "pikachu":
            // {
            //   "name": "pikachu",
            //   "id": 25,
            //   "height": 4,
            //   "weight": 60,
            //   "types": [
            //     { "type": { "name": "electric" } }
            //   ]
            // }
            setData(pokemonData)
            console.log('Fetched pokemon data from API:', pokemonData)
            // Also save the fetched data to cache in the localStorage
            cache[selectedPokemon] = pokemonData
            localStorage.setItem('pokedex', JSON.stringify(cache))
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={() => fetchMovieData("2 and a half man")} className="grid max-w-65 group aspect-[16/9] overflow-hidden rounded-xl border-1 place-items-center">
            <div className="relative w-full ">
                <img src="/2AndAHalfMan-ImgRef.jpg" alt="" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-black to-125% translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
                    <span className="text-sm">2 And a Half Man</span>
                </div>
            </div>
        </button>
    )
}