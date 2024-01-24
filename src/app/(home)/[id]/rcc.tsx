'use client'
import { Cafe } from "@/interface/cafe";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { useScroll } from '@react-hooks-library/core'
import NaverMap from "@/components/NaverMap";

export default function List({ data }: { data: Cafe[] }) {
    const [choice, setChoice] = useState(0)
    const scrollProgress = useRef<HTMLDivElement | null>(null)
    const box = useRef<HTMLDivElement | null>(null)

    useScroll(box, ({ scrollX, scrollY }) => {
        if (!scrollProgress.current) return
        scrollProgress.current.style.top = scrollY > 100 ? '0' : '100px'
    })
    return (
        <div className="md:flex" ref={box}>
            <div ref={scrollProgress} className={`w-full md:w-[42vw] md:fixed right-0`}><NaverMap locations={data} /></div>
            <div className="w-full md:w-[58vw]">
                <CafeList cafes={data} setChoice={setChoice} />
            </div>
        </div>
    )
}

const CafeList = ({ cafes, setChoice }: { cafes: Cafe[], setChoice: Dispatch<SetStateAction<number>> }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100 grid grid-cols-3 gap-4">
            {cafes.map((cafe, index) => (
                <li key={cafe.id} className="" onClick={() => setChoice(index)}>
                    <CafeCard cafe={cafe} />
                </li>
            ))}
        </ul>
    )
}
const CafeCard = ({ cafe }: { cafe: Cafe }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const [isHovered, setHovered] = useState(false);
    const choice = (id: number | null) => {
        const url = `${id}?${params.toString()}`
        router.push(url, { scroll: false })
    }
    return (
        <a onClick={() => choice(cafe.id)}
            className="relative group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                src={`/images/${cafe.name ?? 'anthracite'}.jpeg`} alt="Picture of the author"
                width={'300'}
                height={250}
            />
            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-25">
                    <p className="text-white">{cafe.name}</p>
                </div>
            )}
            {/* <Card
                renderImage={() =>
                    <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                        <Image
                            src={`/images/${cafe.name ?? 'anthracite'}.jpeg`} alt="Picture of the author"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>}
            >
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {cafe.name}
                </h5>
                <p className="text-md font-normal text-gray-700 dark:text-gray-400">
                    {cafe.address}
                </p>
            </Card> */}
        </a >
    );
}

const VideoView = ({ data }: { data: string }) => {
    return (
        <div className="relative flex items-center justify-center h-[94vh] overflow-hidden">
            <div className="relative z-30 p-5 text-2xl text-white bg-purple-300 bg-opacity-50 rounded-xl">
                {data}
            </div>
            <video autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
                <source src={`/video/${data}.mp4`} type="video/mp4" />Your browser does not support the video tag.
            </video>
        </div>
    )
}



