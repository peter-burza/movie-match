export function tryGetCacheData(dataType, loading, localStorageName, movie, setData) {
  const searchedMovie = typeof movie === "string" ? movie.toLowerCase() : movie;
  if (loading || !localStorage) return; // close guard..
  //If there is any movie database
  let cache = {};
  if (localStorage.getItem(localStorageName)) {
    cache = JSON.parse(localStorage.getItem(localStorageName));
  }
  //If the searched movie is in the cache, otherwise fetch form API
  if (searchedMovie in cache) {
    setData(cache[searchedMovie]);
    console.log(`Found movie ${dataType} in cache: `, cache);
    return true;
  }
  return false
}

export async function fetchData(dataType, baseUrl, setLoading, setFetchedData, movie, localStorageName) {
  // setLoading(true);
  const searchedMovie = typeof movie === "string" ? movie.toLowerCase() : movie;
  const cache = JSON.parse(localStorage.getItem(localStorageName)) || {}
  try {
    const url = baseUrl;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
      },
    };
    const res = await fetch(url, options);
    const fetchedData = await res.json();
    console.log(`Fetched movie ${dataType} from API:`, fetchedData);
    setFetchedData(fetchedData);
    // save fetched data to cache
    cache[searchedMovie] = fetchedData;
    localStorage.setItem(localStorageName, JSON.stringify(cache));
  } catch (err) {
    console.log(err);
  } finally {
    // setLoading(false);
  }
}



// --- Old Fetch Functions --- //
// async function fetchGenreList() {
//   setLoading(true);
//   try {
//     const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
//       },
//     };
//     const res = await fetch(url, options);
//     const fetchedGenreList = await res.json();
//     setGenreList(fetchedGenreList);
//     console.log("Fetched movie genre list from API:", fetchedGenreList);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// }
// // Execute functions:
// fetchGenreList();

// async function fetchMovieData(searchedMovie) {
//     setLoading(true);
//     try {
//       const url = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&include_video=true&language=en-US&page=1`;
//       const options = {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRiZTMyZGYzZmZmNGFhNDk5MWIyNTI5MzY1YTE4ZSIsIm5iZiI6MTc1MDQwMDcxMi44NjA5OTk4LCJzdWIiOiI2ODU0ZmVjODRlMWJlZDUwNWUwY2Y2MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2YIFbjc7_BFrYz_skVjFzF-IGoeQ7Ku4RmjwUtXsLdE",
//         },
//       };
//       const res = await fetch(url, options);
//       const movieData = await res.json();

//       setPreviewData(movieData);
//       console.log("Fetched movie data from API:", movieData);
//       cache[searchedMovie] = movieData;
//       localStorage.setItem("movie-database", JSON.stringify(cache));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }
//   fetchMovieData(searchedMovie);

// --- NEEDED Fetch Functions --- //
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
