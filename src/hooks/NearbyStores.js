import React, { useState, useEffect } from "react";
import useNearbyStores from "./useNearbyStores";

const NearbyStores = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    useEffect(() => {
        // 브라우저의 Geolocation API를 사용하여 현재 위치를 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation Error:", error);
                }
            );
        }
    }, []);

    const stores = useNearbyStores(lat, lng); // lat, lng를 useNearbyStores 훅에 전달

    return (
        <div>
            <h1>근처 스타벅스 매장</h1>
            {stores.length === 0 ? (
                <p>매장을 찾는 중...</p>
            ) : (
                <ul>
                    {stores.map((store, index) => (
                        <li key={index}>{store.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NearbyStores;
