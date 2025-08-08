'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapBox.module.css';
import { createRoot, Root } from 'react-dom/client';
import MarkerContent, { MarkerContentHandle } from './MarkerContent/MarkerContent';
import React from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const markerRefs: {
    el: HTMLElement;
    ref: React.RefObject<MarkerContentHandle | null>;
}[] = [];

function MapBox(){
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerThreshold = 180;

    useEffect(() => {
        if(mapRef.current || !mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: 'map',
            style: {
                version: 8,
                name: 'Flavor758 MapStyle',
                sources: {
                    'composite': {
                        type: 'vector',
                        url: 'mapbox://mapbox.mapbox-streets-v8'
                    }
                },
                layers: [
                    {
                    id: 'background',
                    type: 'background',
                    paint: {
                        'background-color': '#292929'
                    }
                    },
                    {
                        id: 'road',
                        type: 'line',
                        source: 'composite',
                        'source-layer': 'road',
                        paint: {
                            'line-color': '#5C5C5C',
                            'line-width': 5
                        }
                    },
                    {
                        id: 'building-fill',
                        type: 'fill',
                        source: 'composite',
                        'source-layer': 'building',
                        paint: {
                            'fill-color': '#5C5C5C',
                            'fill-opacity': 1
                        }
                    }
                ]
            },
            center: [136.8815, 35.1709],
            zoom: 17,
            minZoom: 16,
            maxZoom: 19,
            maxBounds: [
                [136.8650, 35.1574],
                [136.8980, 35.1844]
            ],
            pitch: 70,
            antialias: true,
        });
        map.touchZoomRotate.disableRotation();

        mapRef.current = map;

        map.on('load', () => {
            map.addLayer({
                id: 'sky',
                type: 'sky',
                paint: {
                    'sky-type': 'gradient',
                    'sky-gradient-center': [0, 0],
                    'sky-gradient-radius': 90,
                    'sky-gradient': [
                        'interpolate',
                        ['linear'],
                        ['sky-radial-progress'],
                        0, '#292929',
                        1, '#292929'
                    ]
                }
            });
            map.addLayer({
                id: '3d-buildings',
                source: 'composite',
                'source-layer': 'building',
                filter: ['==', 'extrude', 'true'],
                type: 'fill-extrusion',
                paint: {
                    'fill-extrusion-color': '#292929',
                    'fill-extrusion-height': ['get', 'height'],
                    'fill-extrusion-base': ['get', 'min_height'],
                    'fill-extrusion-opacity': 1
                }
            });

            // const locationData = [
            //     { lng: 136.8842, lat: 35.1743, id: 1 },
            //     { lng: 136.8775, lat: 35.1679, id: 2 },
            //     { lng: 136.8897, lat: 35.1702, id: 3 },
            //     { lng: 136.8829, lat: 35.1765, id: 4 },
            //     { lng: 136.8913, lat: 35.1671, id: 5 },
            //     { lng: 136.8801, lat: 35.1686, id: 6 },
            //     { lng: 136.8865, lat: 35.1724, id: 7 },
            //     { lng: 136.8798, lat: 35.1758, id: 8 },
            //     { lng: 136.8882, lat: 35.1695, id: 9 },
            //     { lng: 136.8821, lat: 35.1707, id: 10 },
            // ];
            type ShopLocation = {
                id: number;
                lng: number;
                lat: number;
                shopName: string;
                category: string;
                description: string;
                coverImage: string;
            };

            fetch('http://localhost:8000/api/shops/')
            .then((res) => res.json())
            .then((json : ShopLocation[]) => {
                const sorted = [...json].sort((a, b) => a.lat - b.lat);

                sorted.forEach(({lng, lat, id, shopName, category, description, coverImage}, index) => {
                    const marker = document.createElement('div');

                    const zIndex = sorted.length - index;

                    marker.style.position = 'absolute'; // 必須：z-indexを有効にするため
                    marker.style.zIndex = zIndex.toString();

                    const renderRoot = createRoot(marker);
                    const ref = React.createRef<MarkerContentHandle>();
                    renderRoot.render(<MarkerContent zIndex={zIndex} ref={ref} name={shopName} description={description} imgSrc={coverImage}/>);
                    
                    markerRefs.push({el: marker, ref:ref});

                    new mapboxgl.Marker(marker).setLngLat([lng, lat]).addTo(map);
                });
            }).catch(error => {
                console.error('Failed to fetch shop data:', error);
            });
        });

        map.on('move', () => {
            adjustMarker();
        })

        function adjustMarker(threshold = markerThreshold){
            const positions: {x:number; y:number; refObj: typeof markerRefs[number]}[] = [];

            markerRefs.forEach((refObj) => {
                const rect = refObj.el.getBoundingClientRect();

                positions.push({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    refObj,
                });

                if(refObj.ref.current?.shrink){
                    refObj.ref.current?.setShrink(false);
                }
            });

            for(let beforeIndex = 0; beforeIndex < positions.length; beforeIndex++){
                for(let afterIndex = beforeIndex + 1; afterIndex < positions.length; afterIndex++){
                    const dx = positions[beforeIndex].x - positions[afterIndex].x;
                    const dy = positions[beforeIndex].y - positions[afterIndex].y;

                    const distance = Math.sqrt(dx ** 2 + dy **2);

                    if(distance < threshold){
                        const beforeEl = positions[beforeIndex].refObj;
                        const afterEl = positions[afterIndex].refObj;

                        beforeEl.ref.current?.setShrink(true);
                        afterEl.ref.current?.setShrink(true);
                    }
                }
            }
        }

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);


    return(
        <div ref={mapContainerRef} className={styles.mapboxContainer} id='map'></div>
    );
}

export default MapBox;