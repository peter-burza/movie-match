import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchData, tryGetCacheData } from "../utils/index.js";

export default function Movies(props) {
  const { searchedMovie, topRated, setTopRated } = props;
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------  After searched a movie  --------- //
  useEffect(() => {
    setTopRated(null)
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
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
      {console.log(topRated)}
      {previewData.results.map((moviePreviewData, movieDataIndex) => {
        if (!moviePreviewData.poster_path) return;
        return (
          <MovieCard key={movieDataIndex} moviePreviewData={moviePreviewData} />
        );
      })}
    </main>
  );
}
