export default function SearchBar() {

    return (
        <header className="flex p-10 pb-18 gap-5 items-center justify-center">
            <div className="flex items-center bg-emerald-400 justify-center h-15 w-20 rounded-2xl">
                <i className="fa-solid fa-film text-xl"></i>
            </div>
            <div className="flex items-center h-15 w-full max-w-[640px] bg-gray-100 rounded-md focus:border-0 drop-shadow-[0_5px_5px_rgba(185,185,185,0.5)] hover:drop-shadow-[0_5px_5px_rgba(185,185,185,1)] duration-200">
                <input className="px-6 outline-none w-full" placeholder="Search your thoughts" type="text" name="" id="" />
            </div>
            <button className="flex items-center bg-lime-300 justify-center h-15 w-21 rounded-full">
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </button>
        </header >
    )
}