import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  if (status === Status.LOADING) return <p>지도 로딩 중...</p>;
  if (status === Status.FAILURE) return <p>지도를 불러오는 데 실패했습니다.</p>;
  return null;
};

const GoogleMapsLoader = ({ children }) => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
      {children}
    </Wrapper>
  );
};

export default GoogleMapsLoader;
