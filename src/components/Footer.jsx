export default function Footer() {

    return (
        <footer className="flex justify-center w-full p-8 bg-gradient-to-t from-[#0f172a] to-[#1e3464] text-white">
                {/* <div> */}
                    <div className="flex justify-between items-center w-[900px] px-15">
                        <h6 className="text-xl md:text-2xl lg:text-4xl font-semibold">Movie Match</h6>
                        <i className="fa-solid fa-video text-1xl md:text-3xl lg:text-4xl"></i>
                        <div className="text-sm md:text-base">
                            <p className="text-gray-300">Copiright © 2025</p>
                            <p className="text-gray-300">Created by <a href="https://peterburzaportfolio.netlify.app/" target="_blank" className="text-[#b7ff30]">Peter Burza</a></p>
                        </div>
                    </div>
        </footer>
    )
}