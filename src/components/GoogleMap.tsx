'use client'
import { Cafe } from "@/interface/cafe";
import Script from "next/script";
import { useParams } from 'next/navigation'

export default function GoogleMap({ locations }: { locations: Cafe[] }) {
    const params = useParams<{ id: string }>()
    const init = () => {
        const choice = Number(params.id)
        const location = locations.find(location => location.id === choice)
        // if (location?.position || true) {
        const { lat, lng } = location?.position ?? {}
        const map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
                zoom: 14,
                center: { lat: lat ?? 37.5554102, lng: lng ?? 126.9116595 },
            }
        );
        locations.map((location) => new google.maps.Marker({
            map,
            label: location.name,
            position: new google.maps.LatLng(location.position?.lat ?? 37.5554102, location.position?.lng ?? 126.9116595),
        }))
        // }
    }
    return (
        <div>
            <div id="map" style={{ height: '92vh', width: '100%' }} />

            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`}
                async
                onReady={init}
            />
        </div>
    )
}