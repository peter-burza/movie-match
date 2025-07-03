export default function Footer() {

    return (
        <footer className="flex justify-center w-full p-4 bg-gradient-to-t from-[#0f172a] to-[#1e3464] text-white">
                    <div className="flex flex-col xxs:flex-row justify-between items-center w-[900px] xs:px-15">
                        <h6 className="text-xl md:text-2xl lg:text-4xl font-semibold p-2">Movie Match</h6>
                        <a href="#root"><i className="fa-solid fa-video text-1xl md:text-3xl lg:text-4xl p-2"></i></a>
                        <div className="text-sm md:text-base p-2 text-center xxs:text-start">
                            <p className="text-gray-300">Copiright © 2025</p>
                            <p className="text-gray-300">Created by <a href="https://peterburzaportfolio.netlify.app/" target="_blank" className="text-[#b7ff30]">Peter Burza</a></p>
                        </div>
                    </div>
        </footer>
    )
}