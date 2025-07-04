import SearchBar from "./components/SearchBar";
import Movies from "./components/Movies";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [initialized, setInitialized] = useState(false)
  const [searchedMovie, setSearchedMovie] = useState('');
  const [topRated, setTopRated] = useState(null);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const url =
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
          },
        };
        const res = await fetch(url, options);
        const fetchedData = await res.json();
        console.log("Fetched top movie list from API:", fetchedData);
        setTopRated(fetchedData);
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
        setInitialized(true)
      }
    }

    fetchTopRatedMovies();
  }, []);

  return (
    <div id="parent" className="min-h-screen flex flex-col duration-200">
      <SearchBar
        searchedMovie={searchedMovie}
        setSearchedMovie={setSearchedMovie}
      />
      {initialized &&
        <Movies
          searchedMovie={searchedMovie}
          topRated={topRated}
        />}
      <Footer />
    </div>
  );
}

export default App;
