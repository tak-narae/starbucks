import React, { useState } from "react";
import GoogleMapsLoader from "./GoogleMapsLoader";
import Map from "./Map";
import PlaceSearch from "./PlaceSearch";
import useNearbyStores from "hooks/useNearbyStores";

const StoreMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { stores, loading } = useNearbyStores(selectedLocation);

  return (
    <div>
      <GoogleMapsLoader>
        <h1>스타벅스 매장 찾기</h1>
        <div className="store_search">
          <PlaceSearch onPlaceSelect={setSelectedLocation} />
        </div>
        <div className="store_map">
          <Map/>
        </div>
      </GoogleMapsLoader>
    </div>
  );
};

export default StoreMap;


