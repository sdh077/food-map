'use client'
import GoogleMap from "@/components/GoogleMap"
import { useScreen } from 'usehooks-ts'
import Link from "next/link"
import { Card } from 'flowbite-react';
import { Cafe } from "@/interface/cafe";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Image from 'next/image';
import { Local } from "@/interface/local";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScroll } from '@react-hooks-library/core'

export default function List({ data }: { data: Cafe[] }) {
    const [choice, setChoice] = useState(0)
    const scrollProgress = useRef<HTMLDivElement | null>(null)
    const box = useRef<HTMLDivElement | null>(null)

    useScroll(box, ({ scrollX, scrollY }) => {
        if (!scrollProgress.current) return
        scrollProgress.current.style.top = scrollY > 100 ? '0' : '100px'
    })
    return (
        <div className="flex" ref={box}>
            <div className="w-[58vw]">
                <CafeList cafes={data} setChoice={setChoice} />
            </div>
            <div ref={scrollProgress} className={`w-[42vw] fixed right-0`}><GoogleMap locations={data} /></div>
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
    const choice = (id: number | null) => {
        const url = `${id}?${params.toString()}`
        router.push(url, { scroll: false })
    }
    return (
        <a onClick={() => choice(cafe.id)} >
            <Card
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
                    {cafe.description}
                </p>
            </Card>
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



