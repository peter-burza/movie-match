import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchData, tryGetCacheData } from "../utils/index.js";

export default function Movies(props) {
  const { searchedMovie } = props;
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------  After searched a movie  --------- //
  useEffect(() => {
    // if (loading || !localStorage) return; // close guard..
    // //If there is any movie database
    // let cache = {};
    // if (localStorage.getItem("movie-preview-database")) {
    //   cache = JSON.parse(localStorage.getItem("movie-preview-database"));
    // }
    // //If the searched movie is in the cache, otherwise fetch form API
    // if (searchedMovie in cache) {
    //   setPreviewData(cache[searchedMovie]);
    //   console.log("Found movie preview in cache: ", cache);
    //   return;
    // }

    
    if (tryGetCacheData(loading, "movie-preview-database", searchedMovie, setPreviewData)) return
    fetchData(
      "data",
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`,
      setLoading,
      setPreviewData,
      searchedMovie,
      'movie-preview-database',
      JSON.parse(localStorage.getItem('movie-preview-database')) || {}
    );
  }, [searchedMovie]);

  if (loading || !previewData) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
      {previewData.results.map((movieData, movieDataIndex) => {
        return (
          <MovieCard
            key={movieDataIndex}
            movieData={movieData}
          />
        );
      })}
    </main>
  );
}
