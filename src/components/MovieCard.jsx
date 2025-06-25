import { useEffect, useState } from "react";
import { fetchData } from "../utils/index.js";
import Modal from "./Modal";

export default function MovieCard(props) {
  const { movieData, /*detail, setDetail,*/ genreList } =
    props;
  const { original_title, overview, poster_path, video, genre_ids, id } =
    movieData || {};
  const [movieImages, setMovieImages] = useState(null);
  const [detail, setDetail] = useState(null);
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);

  // Handle genre list
  const genreMap = {};
  if (genreList && genreList.genres) {
    genreList.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });
  }

  const genres = genre_ids.map((id) => genreMap[id]);
  console.log(genres)

  useEffect(() => {
    if (!detail) return;
    fetchData(
      "Images",
      `https://api.themoviedb.org/3/movie/${id}/images`,
      setMovieDetailLoading,
      setMovieImages
    );
    // console.log(original_title);
    console.log("detail changed:", detail);
  }, [detail]);

  // if (movieDetailLoading) {
  //   return (
  //     <div>
  //       <h4>Loading...</h4>
  //     </div>
  //   );
  // }

  return (
    <div>
      {detail && (
        !movieImages ? (
          <Modal
            handleCloseModal={() => {
              setDetail(null);
            }}
          >
            <div>
              <h4>Loading...</h4>
            </div>
          </Modal>
        ) : (
          <Modal
            handleCloseModal={() => {
              setDetail(null);
            }}
          >
            <div className="text-white">
              <div>
                <h5>{genres}</h5>
                <h6 className="text-xl">{original_title}</h6>
              </div>
              <div>
                <h6>Description</h6>
                <p>{overview}</p>
              </div>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/original${movieImages?.backdrops[0]?.file_path}`}
                  alt="image failed to load"
                />
              </div>
            </div>
          </Modal>
        )
      )}

      <button
        onClick={() => {
          setDetail({
            original_title,
            overview,
            genres,
          });
        }}
        /*
const url = 'https://api.themoviedb.org/3/movie/movie_id/images';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
*/

        className="relative max-w-55 group aspect-[12/15] overflow-hidden rounded-xl place-items-center appearance-none"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title || "Movie poster"}
          className="object-cover "
        />
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
          <span className="text-sm p-2">{original_title}</span>
        </div>
      </button>
    </div>
  );
}
