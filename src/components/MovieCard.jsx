import {useState} from 'react'

export default function MovieCard() {

    return (
        <button className="grid max-w-65 group aspect-[16/9] overflow-hidden rounded-xl border-1 place-items-center">
            <div className="relative w-full ">
                <img src="/2AndAHalfMan-ImgRef.jpg" alt="" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-black to-125% translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white">
                    <span className="text-sm">2 And a Half Man</span>
                </div>
            </div>
        </button>
    )
}