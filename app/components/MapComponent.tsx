"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Restaurant {
    id: string;
    name: string;
    lat: number;
    lng: number;
    rating: number;
    cuisine: string;
}

interface MapComponentProps {
    restaurants: Restaurant[];
    center?: [number, number];
}

function MapController({ center }: { center?: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13);
        }
    }, [center, map]);
    return null;
}

export default function MapComponent({ restaurants, center = [28.6139, 77.2090] }: MapComponentProps) {
    return (
        <div className="h-full w-full rounded-3xl overflow-hidden glass-panel border-0">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
                minZoom={3}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    noWrap={true}
                />
                <MapController center={center} />
                {restaurants
                    .filter((restaurant) => restaurant.lat != null && restaurant.lng != null)
                    .map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            position={[restaurant.lat, restaurant.lng]}
                            icon={icon}
                        >
                            <Popup className="glass-popup">
                                <div className="p-2 min-w-[150px]">
                                    <h3 className="font-bold text-gray-900 text-base">{restaurant.name}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{restaurant.cuisine}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="text-sm font-bold text-gray-800">{restaurant.rating}</span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
}
