import { useEffect, useRef } from "react";

const GoogleMap = ({ center, zoom }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    new window.google.maps.Marker({
      position: center,
      map,
    });
  }, [center, zoom]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
  );
};

export default GoogleMap;
