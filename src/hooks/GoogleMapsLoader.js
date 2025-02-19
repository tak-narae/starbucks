import { Wrapper } from "@googlemaps/react-wrapper";

const GoogleMapsLoader = ({ children }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <Wrapper apiKey={apiKey} libraries={["places"]}>
      {children}
    </Wrapper>
  );
};

export default GoogleMapsLoader;
