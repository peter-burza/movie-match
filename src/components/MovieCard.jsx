import { useEffect, useState } from "react";
import { fetchData } from "../utils/index.js";
import Modal from "./Modal";

export default function MovieCard(props) {
  const { movieData } = props;
  const { original_title, overview, poster_path, video, id, release_date } =
    movieData || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [movieContentLoading, setMovieContentLoading] = useState(false);
  const [movieImages, setMovieImages] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieReleaseDates, setMovieReleaseDates] = useState(null);
  const [credits, setCredits] = useState(null);

  function formatMinutes(totalMinutes) {
    if (totalMinutes == 0) return "";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours ? `${hours}h ` : ""}${minutes}min`;
  }

  function getYear(release_date) {
    const year = Number(release_date.substring(0, 4));
    return year < new Date().getFullYear()
      ? `${year}`
      : `Not released (${year})`;
  }

  function getAge(releaseDates) {
    const priorityCountries = [
      "CZ",
      "US",
      "GB",
      "DE",
      "FR",
      "IN",
      "JP",
      "KR",
      "CA",
      "AU",
    ];

    const filteredResults = releaseDates?.results.find((result) => {
      const code = result.iso_3166_1?.toUpperCase();
      return code && priorityCountries.includes(code); // exclude empty codes
    });

    const cert = filteredResults?.release_dates?.[0]?.certification?.trim();
    if (!cert) return null;

    const normalized = cert.toUpperCase();

    if (normalized.match(/^\d+$/)) return normalized + "+";
    if (normalized.match(/^\+?\d+$/)) return normalized.replace("+", "") + "+";
    if (normalized === "PG") return "10+";
    if (normalized === "PG-13") return "13+";
    if (["G", "U", "AL", "T", "A"].includes(normalized)) return "0+";
    if (normalized === "12A") return "12+";
    if (normalized === "15") return "15+";
    if (normalized === "16") return "16+";
    if (["18", "R", "C", "NC-17"].includes(normalized)) return "18+";
    if (["MA15+", "M"].includes(normalized)) return "15+";
    if (normalized === "B") return "12+";
    if (normalized === "K-12") return "12+";

    return cert;
  }

  useEffect(() => {
    if (!modalVisible) return;
    fetchData(
      "Images",
      `https://api.themoviedb.org/3/movie/${id}/images`,
      setMovieContentLoading,
      setMovieImages
    );
    fetchData(
      "Details",
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      setMovieContentLoading,
      setMovieDetails
    );
    fetchData(
      "Release Dates",
      `https://api.themoviedb.org/3/movie/${id}/release_dates`,
      setMovieContentLoading,
      setMovieReleaseDates
    );
    fetchData(
      "Credits",
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      setMovieContentLoading,
      setCredits
    );

    console.log("detail changed:", modalVisible);
  }, [modalVisible]);

  return (
    <div>
      {modalVisible &&
        (!movieImages && !movieContentLoading ? (
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
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt="image failed to load"
              className="max-h-full"
            />
            <div className="flex flex-col gap-13 overflow-y-auto max-h-[calc(90vh-9rem)] pr-4">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <h6 className="text-4xl font-medium tracking-wider">
                    {original_title}
                  </h6>
                  <h5 className="flex flex-row items-end text-3xl gap-1">
                    <span>{movieDetails?.vote_average.toFixed(1)}</span>
                    <i className="fa-solid fa-star text-lg text-yellow-400 pb-2"></i>
                  </h5>
                </div>
                <p>
                  {getYear(release_date)}
                  {formatMinutes(movieDetails?.runtime) &&
                    " | " + formatMinutes(movieDetails?.runtime)}
                  {getAge(movieReleaseDates) &&
                    " | " + getAge(movieReleaseDates)}
                </p>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <p>{overview}</p>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col gap-4 text-gray-500">
                    <p>Starring</p>
                    <p>Directed</p>
                    <p>Genre</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>
                      {credits?.cast
                        .slice(0, 3)
                        .map((actor) => {
                          return actor.original_name;
                        })
                        .join(", ")}
                    </p>
                    <p>
                      {credits?.crew.find(
                        (crewMember) => crewMember.job === "Director"
                      )?.original_name || "Unknow Director"}
                    </p>
                    <p>
                      {movieDetails?.genres
                        .map((genre) => {
                          return genre.name;
                        })
                        ?.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
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
