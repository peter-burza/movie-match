// import { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";
// // import Modal from "./Modal";
// import { fetchData } from "../utils/index.js";

// export default function Movies(props) {
//   const { searchedMovie } = props;
//   const [previewData, setPreviewData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // const [detail, setDetail] = useState(null);
//   const [genreList, setGenreList] = useState(null);

//   // ---------  After searched a movie  --------- //
//   useEffect(() => {
//     if (loading || !localStorage) return; // close guard..
//     //If there is any movie database
//     let cache = {};
//     if (localStorage.getItem("movie-database")) {
//       cache = JSON.parse(localStorage.getItem("movie-database"));
//     }
//     //If the searched movie is in the cche, otherwise fetch form API
//     if (searchedMovie in cache) {
//       setPreviewData(cache[searchedMovie]);
//       console.log("Found movie in cache: ", cache);
//       return;
//     }

//     fetchData(
//       "movie data",
//       `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`,
//       setLoading,
//       setPreviewData
//     );
//   }, [searchedMovie]);

//   // ---------  After page load  --------- //
//   // --- Get Actual Genre List From API --- //
//   useEffect(() => {
//     fetchData(
//       "genre list",
//       "https://api.themoviedb.org/3/genre/movie/list?language=en",
//       setLoading,
//       setGenreList
//     );
//   }, []);

//   if (loading || !previewData) {
//     return (
//       <div>
//         <h4>Loading...</h4>
//       </div>
//     );
//   }

//   return (
//     <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
//       {/* Do Modal only if detail is true */}
//       {/* {detail && (
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
//       )} */}
//       {previewData.results.map((movieData, movieDataIndex) => {
//         return (
//           <MovieCard
//             key={movieDataIndex}
//             movieData={movieData}
//             // setDetail={setDetail}
//             setLoading={setLoading}
//             // detail={detail}
//             genreList={genreList}
//           />
//         );
//       })}
//     </main>
//   );
// }

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchData } from "../utils/index.js";

export default function Movies({ searchedMovie }) {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genreList, setGenreList] = useState(null);

  // Fetch movie data from TMDB or localStorage
  useEffect(() => {
    if (loading || !searchedMovie) return;

    const cache = JSON.parse(localStorage.getItem("movie-database") || "{}");

    if (cache[searchedMovie]) {
      console.log("Found movie in cache:", cache);
      setPreviewData(cache[searchedMovie]);
      return;
    }

    fetchData(
      "movie data",
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`,
      setLoading,
      (fetched) => {
        setPreviewData(fetched);
        localStorage.setItem(
          "movie-database",
          JSON.stringify({ ...cache, [searchedMovie]: fetched })
        );
      }
    );
  }, [searchedMovie]);

  // Fetch genre list on initial load
  useEffect(() => {
    fetchData(
      "genre list",
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      setLoading,
      setGenreList
    );
  }, []);

  if (loading || !previewData) {
    return <h4 className="text-center">Loading...</h4>;
  }

  return (
    <main className="flex flex-wrap justify-center max-w-[1368px] gap-10">
      {previewData.results.map((movie, i) => (
        <MovieCard
          key={i}
          movieData={movie}
          genreList={genreList}
          setLoading={setLoading}
        />
      ))}
    </main>
  );
}
