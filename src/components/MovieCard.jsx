import { useEffect, useState, useRef } from "react";
import { fetchData, tryGetCacheData } from "../utils/index.js";
import Modal from "./Modal";

export default function MovieCard(props) {
  const { moviePreviewData } = props;
  const { original_title, overview, poster_path, video, id, release_date } =
    moviePreviewData || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [movieContentLoading, setMovieContentLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieReleaseDates, setMovieReleaseDates] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [trailerList, settrailerList] = useState(null);

  const modalData = [
    {
      dataType: "Details",
      localStorageName: "movie-details-database",
      setData: setMovieDetails,
      baseUrl: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    },
    {
      dataType: "Release Dates",
      localStorageName: "movie-release_dates-database",
      setData: setMovieReleaseDates,
      baseUrl: `https://api.themoviedb.org/3/movie/${id}/release_dates`,
    },
    {
      dataType: "Credits",
      localStorageName: "movie-credits-database",
      setData: setMovieCredits,
      baseUrl: `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    },
    {
      dataType: "Videos",
      localStorageName: "movie-videos-database",
      setData: setMovieVideos,
      baseUrl: `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    },
  ];

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
    const priorityCountries = ["CZ", "US", "GB", "DE", "FR", "IN", "JP", "KR", "CA", "AU"];

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


  // --- Render Functions --- //

  function renderMovieTrailers() {
    if (!trailerList) return null;

    return trailerList.map((trailer, idx) => (
      <div className="py-2 pb-5" key={trailer.id || idx}>
        <iframe
          className="shadow-[0_0_10px_#8a8a8a] rounded-2xl"
          width="280"
          height="181"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
    ));
  }

  function renderGenres(details) {
    if (!details?.genres) return null

    const genres = details?.genres.map((genre) => {
      return genre.name;
    })?.join(", ") || "Unknow Genre"

    return genres
  }

  function renderGenres(details) {
    if (!details?.genres) return null

    const genres = details?.genres.map((genre) => {
      return genre.name;
    })?.join(", ") || "Unknow Genre"

    return genres
  }

  useEffect(() => {
    if (!modalVisible) return;
    modalData.map((d) => {
      if (
        !tryGetCacheData(
          d.dataType,
          movieContentLoading,
          d.localStorageName,
          id,
          d.setData
        )
      ) {
        fetchData(
          d.dataType,
          d.baseUrl,
          setMovieContentLoading,
          d.setData,
          id,
          d.localStorageName
        );
      }
    });

  }, [modalVisible]);

  useEffect(() => {
    if (!movieVideos?.results) return;

    const trailers = movieVideos.results.filter((video) =>
      ["trailer", "teaser"].some((keyword) =>
        video.name.toLowerCase().includes(keyword)
      )
    );
    settrailerList(trailers)
  }, [movieVideos]);

  return (
    <div>
      {modalVisible &&
        (!movieDetails && !movieCredits && !movieReleaseDates && !movieContentLoading ? (
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
              className="lg:h-146 xs:aspect-[1/1] xs:object-contain s:aspect-[6/4] lg:aspect-[2/3] xl:h-176 2xl:h-full"
            />
            <div className="flex flex-col gap-10 max-h-[calc(90vh-9rem)] lg:overflow-y-hidden"> {/*flex flex-col gap-13 pr-5 overflow-y-auto max-h-[calc(90vh-9rem)]*/}
              <div className="flex flex-col gap-2">
                {/* flex flex-col gap-5 */}
                <div className="flex flex-wrap justify-between">
                  {/* flex justify-between */}
                  <h6 className="text-xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-medium tracking-wider"> {/* text-4xl font-medium tracking-wider*/}
                    {original_title}
                  </h6>
                  <h5 className="flex flex-row items-end text-lg sm:text-2xl gap-1">
                    {/* flex flex-row items-end text-3xl gap-1 */}
                    <span>{movieDetails?.vote_average.toFixed(1)}</span>
                    <i className="fa-solid fa-star text-sm sm:text-lg text-yellow-400 pb-2"></i>
                    {/* fa-solid fa-star text-lg text-yellow-400 pb-2 */}
                  </h5>
                </div>
                <p className="text-gray-500">
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
                  <div className="flex flex-col gap-4">
                    <div className="flex">
                      <p className="min-w-24 text-gray-500">Starring</p>
                      <p className="flex flex-col">
                        {movieCredits?.cast
                          .slice(0, 3)
                          .map((actor) => {
                            return actor.original_name;
                          })
                          .join(", ") || "Unknow Starring"}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="min-w-24 text-gray-500">Directed</p>
                      <p>
                        {movieCredits?.crew.find(
                          (crewMember) => crewMember.job === "Director"
                        )?.original_name || "Unknow Director"}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="min-w-24 text-gray-500">Genre</p>
                      <p>
                        {renderGenres(movieDetails)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                  </div>
                </div>
              </div>
              <div className={trailerList?.length < 1 ? 'hidden' : ''}>
                <p className="text-lg">Related Videos</p>
                <div id="trailer-container" className={`flex ${trailerList?.length < 2 ? 'justify-center' : ''} gap-5 m-3 scroll-container`}>
                  {renderMovieTrailers(movieVideos)}
                </div>
              </div>
            </div>
          </Modal>
        ))}

      {/* <button
        onClick={() => {
          setModalVisible(true);
        }}
        className="relative xl:max-w-55 md:max-w-45 sm:max-w-40 max-w-20 group aspect-[12/15] overflow-hidden rounded-xl place-items-center appearance-none cursor-pointer shadow-[0_2px_15px_3px_gray]"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title || "Movie poster"}
          className="object-cover "
        />
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
          <span className="text-sm p-2">{original_title}</span>
        </div>
      </button> */}
      <button onClick={() => { setModalVisible(true); }} class="relative xl:max-w-55 md:max-w-45 sm:max-w-40 max-w-35 group aspect-[12/15] group overflow-hidden rounded-xl place-items-center appearance-none cursor-pointer shadow-[0_2px_15px_3px_gray]">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title || "Movie poster"}
          class="relative object-cover transition duration-300 group-hover:blur-sm group-active:blur-sm"
        />

        <div class="absolute inset-0 flex items-start lg:items-center pt-8 lg:pt-0 justify-center bg-black/50 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition duration-300">
          <h2 class="text-white text-base sm:text-lg lg:text-xl font-semibold px-2">{original_title}</h2>
        </div>
      </button>
    </div>
  );
}
