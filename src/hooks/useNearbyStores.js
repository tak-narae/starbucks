// // useNearbyStores.js (클라이언트 코드)
// import { useState, useEffect } from "react";

// const useNearbyStores = (location) => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!location) return;

//     // const fetchStores = async () => {
//     //   setLoading(true);
//     //   try {
//     //     const response = await fetch(
//     //       `http://localhost:8080/api/nearby-stores?lat=${location.lat}&lng=${location.lng}`
//     //     );
//     //     const data = await response.json();
//     //     setStores(data.results.slice(0, 5)); // 주변 매장 5개 가져오기
//     //   } catch (error) {
//     //     console.error("Error fetching stores:", error);
//     //   }
//     //   setLoading(false);
//     // };

//     const fetchStores = async () => {
//       try {
//           const response = await fetch(`/api/nearby-stores?lat=${lat}&lng=${lng}`);
//           const data = await response.json();
          
//           if (data && data.results) {
//               setStores(data.results.slice(0, 5)); // 매장 정보가 있는 경우에만 처리
//           } else {
//               console.error("매장 정보를 가져오는 데 실패했습니다.");
//               setStores([]); // 응답이 없거나 오류인 경우 빈 배열로 초기화
//           }
//       } catch (error) {
//           console.error("Error fetching stores:", error);
//           setStores([]); // 오류가 발생한 경우 빈 배열로 초기화
//       }
//   };
  
//     fetchStores();
//   }, [location]);

//   return { stores, loading };
// };

// export default useNearbyStores;

// 예시: useNearbyStores.js
import { useState, useEffect } from "react";

const useNearbyStores = (lat, lng) => { // lat, lng를 매개변수로 받음
    const [stores, setStores] = useState([]);
    
    const fetchStores = async () => {
        try {
            const response = await fetch(`/api/nearby-stores?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            
            if (data && data.results) {
                setStores(data.results.slice(0, 5)); // 매장 정보가 있는 경우에만 처리
            } else {
                console.error("매장 정보를 가져오는 데 실패했습니다.");
                setStores([]); // 응답이 없거나 오류인 경우 빈 배열로 초기화
            }
        } catch (error) {
            console.error("Error fetching stores:", error);
            setStores([]); // 오류가 발생한 경우 빈 배열로 초기화
        }
    };

    useEffect(() => {
        if (lat && lng) {
            fetchStores();
        }
    }, [lat, lng]); // lat, lng 값이 바뀔 때마다 fetchStores 함수 호출

    return stores;
};

export default useNearbyStores;
