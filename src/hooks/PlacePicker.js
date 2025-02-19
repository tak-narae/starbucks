import { useEffect, useRef, useState } from "react";

const PlacePicker = () => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.978 }, // 서울 기본 위치
      zoom: 13,
    });
    setMap(mapInstance);

    const marker = new window.google.maps.Marker({
      map: mapInstance,
    });
    markerRef.current = marker;

    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );
    setAutocomplete(autocompleteInstance);

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();

      if (!place.geometry) {
        console.error("장소 정보를 찾을 수 없습니다.");
        return;
      }

      mapInstance.setCenter(place.geometry.location);
      mapInstance.setZoom(17);
      marker.setPosition(place.geometry.location);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="장소를 검색하세요"
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <div
        ref={mapRef}
        style={{ height: "90%", width: "100%" }}
      ></div>
    </div>
  );
};

export default PlacePicker;
