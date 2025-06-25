import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import { fetchData } from "../utils/index.js";

export default function Movies(props) {
  const { searchedMovie } = props;
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [detail, setDetail] = useState(null);
  const [genreList, setGenreList] = useState(null);

  // ---------  After searched a movie  --------- //
  useEffect(() => {
    if (loading || !localStorage) return; // close guard..
    //If there is any movie database
    let cache = {};
    if (localStorage.getItem("movie-database")) {
      cache = JSON.parse(localStorage.getItem("movie-database"));
    }
    //If the searched movie is in the cche, otherwise fetch form API
    if (searchedMovie in cache) {
      setPreviewData(cache[searchedMovie]);
      console.log("Found movie in cache: ", cache);
      return;
    }

    fetchData(
      "movie data",
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`,
      setLoading,
      setPreviewData
    );
  }, [searchedMovie]);

useEffect(() => {
  fetchData(
      "genres",
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      setLoading,
      setGenreList
    );
}, [])

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
            // setDetail={setDetail}
            // setLoading={setLoading}
            loading={loading}
            // detail={detail}
            genreList={genreList}
          />
        );
      })}
    </main>
  );
}
