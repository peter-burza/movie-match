import { useEffect, useState } from "react";
import { fetchData } from "../utils/index.js";
import Modal from "./Modal";

export default function MovieCard(props) {
  const { movieData, genreList } = props;
  const {
    original_title,
    overview,
    poster_path,
    video,
    genre_ids,
    id,
    release_date,
  } = movieData || {};
  const [movieImages, setMovieImages] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);

  // Handle genre list
  const genreMap = {};
  if (genreList && genreList.genres) {
    genreList.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });
  }

  const genres = genre_ids.map((id) => genreMap[id]);
  console.log(genres);

  useEffect(() => {
    if (!modalVisible) return;
    fetchData(
      "Images",
      `https://api.themoviedb.org/3/movie/${id}/images`,
      setMovieDetailLoading,
      setMovieImages
    );
    fetchData(
      "Images",
      `https://api.themoviedb.org/3/movie/${id}/images`,
      setMovieDetailLoading,
      setMovieImages
    );
    console.log("detail changed:", modalVisible);
  }, [modalVisible]);

  return (
    <div>
      {modalVisible &&
        (!movieImages && !movieDetailLoading ? (
          <Modal
            handleCloseModal={() => {
              setModalVisible(false);
            }}
          >
            <div>
              <h4>Loading...</h4>
            </div>
          </Modal>
        ) : (
          <Modal
            handleCloseModal={() => {
              setModalVisible(false);
            }}
          >
            <div>
              <img
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt="image failed to load"
                className="max-w-100"
              />
            </div>
            <div>
              <div className="flex flex-col gap-5">
                <div className="">
                  <h6 className="text-4xl font-medium tracking-wider">
                    {original_title}
                  </h6>
                  <h5 className="flex flex-row items-center text-3xl gap-1">
                    <span>9.0</span>
                    <i className="fa-solid fa-star text-lg text-yellow-400"></i>
                  </h5>
                </div>
                <p>
                  {Number(release_date.substring(0, 4)) <
                  new Date().getFullYear()
                    ? release_date.substring(0, 4)
                    : `Not released (${release_date.substring(0, 4)})`}{" "}
                  |
                </p>
              </div>

              <p>{overview}</p>
              <h5>{genres?.join(", ")}</h5>
            </div>
          </Modal>
        ))}

      <button
        onClick={() => {
          setModalVisible(true);
        }}
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
