// import React from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import GoogleMap from "hooks/GoogleMap";

// const render = (status) => {
//   if (status === Status.LOADING) return <p>로딩 중...</p>;
//   if (status === Status.FAILURE) return <p>지도를 불러올 수 없습니다.</p>;
//   return null;
// };

// const StoreMap = () => {
//   const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // .env 파일에서 API 키 불러오기
//   const mapCenter = { lat: 37.5665, lng: 126.978 }; // 서울 시청 좌표 예시

//   return (
//     <Wrapper apiKey={apiKey} render={render}>
//       <GoogleMap center={mapCenter} zoom={14} />
//     </Wrapper>
//   );
// };

// export default StoreMap;

import React from "react";
import PlacePicker from "hooks/PlacePicker";
import GoogleMapsLoader from "hooks/GoogleMapsLoader";

const StoreMap = () => {
  return (
    <GoogleMapsLoader>
      <PlacePicker />
    </GoogleMapsLoader>
  );
};

export default StoreMap;

