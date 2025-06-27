import SearchBar from "./components/SearchBar"
import Movies from "./components/Movies"
import Footer from "./components/Footer"
import { useState } from "react"

function App() {
  const [searchedMovie, setSearchedMovie] = useState('green book')

  return (
    <>
      <SearchBar searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      <Movies searchedMovie={searchedMovie} />
      <Footer />
    </>
  )
}

export default App
