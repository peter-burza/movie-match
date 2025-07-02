import { useState } from 'react'

export default function SearchBar(props) {
    const { setSearchedMovie } = props
    const [searchValue, setSearchValue] = useState('')
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 0;
        document.body.setAttribute('data-scrolled', scrolled);
    });

    return (
        <header id="site-header" className="fixed top-0 left-0 w-full z-10">
            <div className="flex px-10 pb-15 pt-10 gap-5 items-center justify-center max-w-5xl mx-auto interactive-container">
                <a href="/" className="flex items-center bg-emerald-400 justify-center h-15 w-20 rounded-2xl">
                    <i className="fa-solid fa-film text-xl"></i>
                </a>
                <div className="flex items-center h-15 w-full max-w-[640px] bg-gray-100 rounded-md focus:border-0 drop-shadow-[0_5px_5px_rgba(185,185,185,0.5)] hover:drop-shadow-[0_5px_5px_rgba(185,185,185,1)] duration-200">
                    <input value={searchValue} onChange={((e) => { setSearchValue(e.target.value) })} className="px-6 outline-none w-full" placeholder="Search your thoughts" type="text" name="" id="" />
                </div>
                <button onClick={() => {
                    setSearchedMovie(searchValue)
                }} className="text-center justify-center h-15 w-21 rounded-full cursor-pointer bg-gradient-to-t from-[#0f172a] to-[#1e3464] text-white">
                    <i className="fa-solid fa-magnifying-glass text-xl"></i>
                </button>
            </div>
        </header>
    )
}