'use client'
import { Cafe } from '@/interface/cafe';
import { NEXT_PUBLIC_NAVER_KEY } from '@/lib/constants';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script'
import { MutableRefObject, useRef } from 'react';

export type NaverMap = naver.maps.Map;
const initValue = { lat: 37.5375905, lng: 127.0867430 }
export default function NaverMap({ locations, mapRef }: { locations: Cafe[], mapRef: MutableRefObject<naver.maps.Map | null> }) {
    const pathname = usePathname()
    const id = pathname.replace('/', '')
    const location = locations.find(l => l.id === Number(id)) ?? locations[0]
    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(location?.position ?? initValue),
            zoom: 15,
            minZoom: 15,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        mapRef.current = new window.naver.maps.Map('map', mapOptions);
        for (const loca of locations) {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(loca.position),
                map: mapRef.current,
            })
            const contentString = [
                '<div class="iw_inner">',
                `   <h3>${loca.name}</h3>`,
                `   <p>${loca.address}<br />`,
                '   </p>',
                '</div>'
            ].join('');

            const infowindow = new naver.maps.InfoWindow({
                content: contentString
            });
            naver.maps.Event.addListener(marker, "click", function (e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else if (mapRef.current) {
                    infowindow.open(mapRef.current, marker);
                }
            });
            if (loca.id === location.id)
                infowindow.open(mapRef.current, marker);
        }
    }
    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NEXT_PUBLIC_NAVER_KEY}`}
                onReady={initializeMap}
            />
            <div id='map' style={{ width: '-webkit-fill-available', height: '90vh' }} />
        </>
    )
}