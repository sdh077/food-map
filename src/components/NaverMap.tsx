'use client'
import { Cafe } from '@/interface/cafe';
import { NEXT_PUBLIC_NAVER_KEY } from '@/lib/constants';
import Script from 'next/script'
import { useRef } from 'react';

export type NaverMap = naver.maps.Map;

export default function NaverMap({ locations }: { locations: Cafe[] }) {
    const mapRef = useRef<NaverMap | null>(null);
    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(locations[0].position),
            zoom: 13,
            minZoom: 13,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        mapRef.current = new window.naver.maps.Map('map', mapOptions);
        for (const location of locations) {
            new naver.maps.Marker({
                position: new naver.maps.LatLng(location.position),
                map: mapRef.current
            })
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