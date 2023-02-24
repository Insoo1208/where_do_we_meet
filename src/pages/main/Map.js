/* global kakao */
import { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
`;

function Map (props) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { myAdress, setMyAdress, friendAdress, setFriendAdress } = props;
  
  const ps = new kakao.maps.services.Places();
  const infowindow = new kakao.maps.InfoWindow({zIndex:1});

  // https://apis.map.kakao.com/web/sample/multipleMarkerControl/

  // 마커유지 => 로컬 스토리지 이용
  // bound 방법 생각

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    setMap(new kakao.maps.Map(container, options));
  }, []);
  
  useEffect(() => {
    if( myAdress && !friendAdress ) {
      ps.keywordSearch(myAdress, placesSearchCB, { category_group_code: 'CE7' });
    }
    setMyAdress('');
    setFriendAdress('');
  }, [myAdress]);
  
  
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      
      for (let i = 0; i < data.length; i++) {
        addMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      };
      
      map.setBounds(bounds);
    }
  };
  
  const addMarker =  place => {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.y, place.x)
    });
  
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });

    marker.setMap(map);

    setMarkers(markers => markers.concat(marker));
  };

  const removeMarkers = () => {
    for (let i = 0; i < markers.length; i++) markers[i].setMap(null);
    setMarkers([]);
  };

  return (
    <>
      <MapWrapper id="map" />
      <button style={{ position: 'absolute', top: 95, right: 15, zIndex: 2 }} onClick={removeMarkers}>마커 지우기</button>
    </>
    );
  }
  
  export default Map;