import { useEffect, useState } from "react";

const useNearbyStores = (userLocation) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userLocation) return;

    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/nearby-stores?lat=${userLocation.lat}&lng=${userLocation.lng}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("매장 검색 오류:", data.error);
          setStores([]);
        } else {
          setStores(data);
        }
      } catch (error) {
        console.error("매장 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [userLocation]);

  return { stores, loading };
};

export default useNearbyStores;

