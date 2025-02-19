import { useEffect, useRef, useState } from "react";
import useNearbyStores from "hooks/useNearbyStores";

const Map = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const { stores, loading } = useNearbyStores(userLocation);

  useEffect(() => {
    // 사용자 위치를 가져오는 코드
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    // Google Maps 초기화
    const map = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 15,
    });

    // 사용자 위치에 마커 표시
    new window.google.maps.Marker({
      position: userLocation,
      map,
      title: "현재 위치",
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    // stores가 배열이면 마커 추가
    if (Array.isArray(stores) && stores.length > 0) {
      stores.forEach((store) => {
        new window.google.maps.Marker({
          position: store.geometry.location,
          map,
          title: store.name,
        });
      });
    }
  }, [userLocation, stores]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      {loading ? (
        <p>주변 매장을 찾는 중...</p>
      ) : (
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
};

export default Map;
