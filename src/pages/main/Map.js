import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
`;

function Map () {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);
  
  return (
    <MapWrapper id="map" />
  );
}

export default Map;