import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Modal from "./Modal";

export default function Movies(props) {
  const { searchedMovie } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [genreList, setGenreList] = useState(null);

  useEffect(() => {
    if (loading || !localStorage) return; // close guard..
    //If there is any movie database
    let cache = {};
    if (localStorage.getItem("movie-database")) {
      cache = JSON.parse(localStorage.getItem("movie-database"));
    }
    //If the searched movie is in the cche, otherwise fetch form API
    if (searchedMovie in cache) {
      setData(cache[searchedMovie]);
      console.log("Found movie in cache: ", cache);
      return;
    }

    async function fetchMovieData(searchedMovie) {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
          },
        };
        const res = await fetch(url, options);
        const movieData = await res.json();

        setData(movieData);
        console.log("Fetched movie data from API:", movieData);
        cache[searchedMovie] = movieData;
        localStorage.setItem("movie-database", JSON.stringify(cache));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    //   async function fetchMovieTrailer() {
    //     const url =
    //       "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US";
    //     const options = {
    //       method: "GET",
    //       headers: {
    //         accept: "application/json",
    //         Authorization:
    //           "Bearer .eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
    //       },
    //     };

    //     fetch(url, options)
    //       .then((res) => res.json())
    //       .then((json) => console.log(json))
    //       .catch((err) => console.error(err));
    //   }

    fetchMovieData(searchedMovie);
  }, [searchedMovie]);

  // --- Get Actual Genre List From API --- //
  useEffect(() => {
    function fetchGenreList() {
      const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((genreList) => {
          setGenreList(genreList);
          console.log("Fetched movie genre list from API:", genreList);
        })
        .catch((err) => console.error(err));
    }

    // Execute functions:
    fetchGenreList();
  }, []);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
      {/* Do Modal only if detail is true */}
      {detail && (
        <Modal
          handleCloseModal={() => {
            setDetail(null);
          }}
        >
          <div className="text-white">
            <div>
              <h5>{detail.genres}</h5>
              <h6 className="text-xl">{detail.original_title}</h6>
              <h2></h2>
            </div>
            <div>
              <h6>Description</h6>
              <p>{detail.overview}</p>
            </div>
          </div>
        </Modal>
      )}
      {data.results.map((movieData, movieDataIndex) => {
        return (
          <MovieCard
            key={movieDataIndex}
            movieData={movieData}
            setDetail={setDetail}
            detail={detail}
            genreList={genreList}
          />
        );
      })}
    </main>
  );
}
