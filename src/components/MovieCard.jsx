// import { useState } from "react";
// import { fetchData } from "../utils/index.js";
// import Modal from "./Modal";

// export default function MovieCard(props) {
//   const { movieData, /*setDetail,*/ genreList, setLoading } = props;
//   const { original_title, overview, poster_path, video, genre_ids, id } =
//     movieData || {};
//   const [movieImages, setMovieImages] = useState(null);
//   const [detail, setDetail] = useState(null);

//   // Handle genre list
//   const genreMap = {};
//   // genreList.genres.forEach((genre) => {
//   //   genreMap[genre.id] = genre.name;
//   // });
//   if (genreList && genreList.genres) {
//     genreList.genres.forEach((genre) => {
//       genreMap[genre.id] = genre.name;
//     });
//   }

//   const genres = genre_ids.map((id) => genreMap[id]);

//   // async () => {
//   //   const fetchedImages = await fetchData(
//   //     "images",
//   //     `https://api.themoviedb.org/3/movie/${id}/images`,
//   //     setLoading
//   //   );

//   async function fetchData() {
//     setLoading(true);
//     try {
//       const url = `https://api.themoviedb.org/3/movie/${id}/images`;
//       const options = {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
//         },
//       };
//       const res = await fetch(url, options);
//       const fetchedMovieImages = await res.json();
//       console.log(`Fetched movie images from API:`, fetchedMovieImages);
//       // setMovieImages(fetchedMovieImages);
//       setDetail(...(detail + fetchedMovieImages));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       {detail && (
//         <Modal
//           handleCloseModal={() => {
//             setDetail(null);
//           }}
//         >
//           <div className="text-white">
//             <div>
//               <h5>{detail.genres}</h5>
//               <h6 className="text-xl">{detail.original_title}</h6>
//               <h2></h2>
//             </div>
//             <div>{console.log(detail.movieImages)}</div>
//             <div>
//               <h6>Description</h6>
//               <p>{detail.overview}</p>
//             </div>
//             <div>
//               {detail.movieImages.posters.map((poster) => {
//                 return <img src={poster.file_path} alt="" />;
//               })}
//             </div>
//           </div>
//         </Modal>
//       )}
//       <button
//         onClick={() => {
//           setDetail({
//             original_title,
//             overview,
//             genres,
//           });
//           fetchData();
//         }}
//         className="relative max-w-55 group aspect-[12/15] overflow-hidden rounded-xl place-items-center appearance-none"
//       >
//         <img
//           src={`https://image.tmdb.org/t/p/original${poster_path}`}
//           alt={original_title || "Movie poster"}
//           className="object-cover "
//         />
//         <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
//           <span className="text-sm p-2">{original_title}</span>
//         </div>
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { fetchData } from "../utils/index.js";
import Modal from "./Modal";

export default function MovieCard(props) {
  const { movieData, genreList, setLoading } = props;
  const { original_title, overview, poster_path, genre_ids, id } = movieData;

  const [detail, setDetail] = useState(null);

  // Build genre names
  const genreMap = {};
  if (genreList?.genres) {
    genreList.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });
  }
  const genres = genre_ids.map((id) => genreMap[id]);

  const handleClick = async () => {
    const images = await fetchData(
      "images",
      `https://api.themoviedb.org/3/movie/${id}/images`,
      setLoading
    );

    if (!images) return;

    setDetail({
      original_title,
      overview,
      genres,
      movieImages: images,
    });
  };

  return (
    <div>
      {detail && (
        <Modal handleCloseModal={() => setDetail(null)}>
          <div className="text-white space-y-4">
            <h5>{detail.genres.join(", ")}</h5>
            <h6 className="text-xl font-bold">{detail.original_title}</h6>
            <p>{detail.overview}</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(detail.movieImages?.posters) &&
                detail.movieImages.posters.map((poster) => (
                  <img
                    key={poster.file_path}
                    src={`https://image.tmdb.org/t/p/w300${poster.file_path}`}
                    alt="Poster"
                    className="rounded w-32"
                  />
                ))}
            </div>
          </div>
        </Modal>
      )}

      <button
        onClick={handleClick}
        className="relative max-w-55 group aspect-[12/15] overflow-hidden rounded-xl place-items-center"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={original_title || "Movie poster"}
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
          <span className="text-sm p-2">{original_title}</span>
        </div>
      </button>
    </div>
  );
}
