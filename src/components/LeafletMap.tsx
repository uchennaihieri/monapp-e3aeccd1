import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  lat: number;
  lng: number;
  className?: string;
}

const LeafletMap = ({ lat, lng, className }: LeafletMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.marker([lat, lng], {
      icon: L.divIcon({
        className: "custom-marker",
        html: `<div style="width:20px;height:20px;background:hsl(var(--primary));border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return <div ref={mapRef} className={className} />;
};

export default LeafletMap;
