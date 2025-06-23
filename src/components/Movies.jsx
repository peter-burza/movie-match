import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Movies(props) {
    const { searchedMovie } = props
    const { data, setData } = useState(null)
    const [loading, setLoading] = useState(false)

    const { original_title, poster_path, video } = data || {}

    function renderFetchedData(fetchedData) {

    }

    useEffect(() => {
        if (loading || !localStorage) return // close guard..
        //If there is any movie database
        let cache = {}
        if (localStorage.getItem('movie-databese')) {
            cache = JSON.parse(localStorage.getItem('movie-databese'))
        }
        //If the searched movie is in the cche, otherwise fetch form API
        if (searchedMovie in cache) {
            setData(cache[searchedMovie])
            console.log('Found movie in cache: ', searchedMovie)
            return
        }

        async function fetchMovieData(searchedMovie) {
            setLoading(true)

            try {
                const url = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&language=en-US&page=1`
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer .eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE'
                    }
                }
                const fetchedData = fetch(url, options)
                    .then(res => res.json())
                    .then(json => console.log(json))
                    .catch(err => console.error(err))
                setData(fetchedData)
                console.log('Fetched movie data from API:', fetchedData)
                localStorage.setItem('movie-database', JSON.stringify())
            } catch {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovieData(searchedMovie)
    }, [searchedMovie])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </main>
    )
}