import { useState } from "react";

export default function MovieCard(props) {
  const { movieData, setDetail, genreList } = props;
  const { original_title, overview, poster_path, video, genre_ids } =
    movieData || {};

  const genres = Object.values(genreList).filter((genre) =>
    genre_ids?.includes(genre.id)
  );
  return (
    <div>
      <button
        onClick={() => {
          setDetail({ original_title, overview, genres });
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
