import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchData, tryGetCacheData } from "../utils/index.js";

export default function Movies(props) {
  const { searchedMovie, topRated } = props;
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topRated) setPreviewData(topRated)
  }, [topRated])

  // ---------  After searched a movie  --------- //
  useEffect(() => {
    if (!searchedMovie) return
    console.log("searchedMovie changed:", searchedMovie);
    if (
      tryGetCacheData(
        "preview data",
        loading,
        "movie-preview-database",
        searchedMovie,
        setPreviewData
      )
    )
      return;
    fetchData(
      "preview data",
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`,
      setLoading,
      setPreviewData,
      searchedMovie,
      "movie-preview-database",
      JSON.parse(localStorage.getItem("movie-preview-database")) || {}
    );
  }, [searchedMovie]);

  if (loading || !previewData) {
    return (
      <div>
        <h4 className="text-3xl text-center text-gray-700">Loading...</h4>
      </div>
    );
  }

  return (
    <main className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10 pb-10 pt-36 justify-center max-w-7xl px-3 lg:px-[32px] mx-auto">
      {console.log(topRated.results)}
      {previewData?.results.map((moviePreviewData, movieDataIndex) => {
        if (!moviePreviewData.poster_path) return;
        return (
          <MovieCard key={movieDataIndex} moviePreviewData={moviePreviewData} />
        );
      })}
    </main>
  );
}
