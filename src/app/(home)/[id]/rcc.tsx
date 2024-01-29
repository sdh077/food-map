'use client'
import { Cafe } from "@/interface/cafe";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { useScroll } from '@react-hooks-library/core'
import NaverMapComponent, { NaverMap } from "@/components/NaverMap";
import { useGetCafeQuery } from "@/redux/services/cafeApi";

export default function List({ localId, subId }: { localId: string, subId: string }) {
    const { isLoading, isFetching, data, error } = useGetCafeQuery({ localId, subId });
    const [scroll, setScroll] = useState('')
    const mapRef = useRef<NaverMap | null>(null);
    useEffect(() => {
        //add eventlistener to window
        window.addEventListener('scroll', onScroll, { passive: true })
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])
    const onScroll = useCallback(() => {
        const { scrollY } = window
        if (scrollY >= 48) {
            setScroll('top-0')
        } else setScroll('')
    }, [])

    const scrollProgress = useRef<HTMLDivElement | null>(null)
    if (error) return <></>
    if (data)
        return (
            <div className="md:flex relative" ref={scrollProgress}>
                <div className="md:sticky">
                    <div ref={scrollProgress} className={`w-full md:w-[42vw] md:fixed right-0 ${scroll}`}><NaverMapComponent locations={data.data} mapRef={mapRef} /></div>
                </div>
                <div className="w-full md:w-[58vw]">
                    <CafeList cafes={data.data} />
                </div>
            </div>
        )
}

const CafeList = ({ cafes }: { cafes: Cafe[] }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100 grid grid-cols-3 gap-4">
            {cafes.map((cafe, index) => (
                <li key={cafe.id} className="">
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



