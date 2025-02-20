import { useEffect, useRef, useState } from "react";
import useNearbyStores from "hooks/useNearbyStores";
import GoogleMapsLoader from "./GoogleMapsLoader";
import PlaceSearch from "./PlaceSearch";

const StoreDrive = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const { stores, loading } = useNearbyStores(userLocation);
  const [map, setMap] = useState(null);

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
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 15, // 기본 줌 레벨
    });
    setMap(newMap);

    const starbucksMarker = {
      url: "/db/images/pin_general_DT.png",
      scaledSize: new window.google.maps.Size(30, 48),
    };

    // DT 매장이 있을 경우 줌 아웃 (기본 줌 레벨보다 낮게 설정)
    const hasDTStore = stores.some((store) => store.name.includes("DT"));
    if (hasDTStore) {
      newMap.setZoom(12); // DT 매장이 있으면 줌 아웃
    }

    // stores가 배열이면 매장 필터링 후 마커 추가
    if (Array.isArray(stores) && stores.length > 0) {
      stores
        .filter((store) => store.name.includes("DT"))  // "DT"가 포함된 매장만 필터링
        .forEach((store) => {
          new window.google.maps.Marker({
            position: store.geometry.location,
            map: newMap,
            title: store.name,
            icon: starbucksMarker,
          });
        });
    }
  }, [userLocation, stores]);

  return (
    <div>
      <GoogleMapsLoader>
        <h1>드라이브 스루</h1>
        <div className="store_search">
          <PlaceSearch onPlaceSelect={setUserLocation} />
        </div>
        <div style={{ width: "100%", height: "500px" }}>
          {loading ? (
            <p>드라이브 스루 매장을 찾는 중...</p>
          ) : (
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </GoogleMapsLoader>
    </div>
  );
};

export default StoreDrive;
