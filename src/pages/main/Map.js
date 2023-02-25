/* global kakao */
import { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;
const kakaoApiKey = 'ffa89cfc78225aff2872d03ae1064df0';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
`;

function Map (props) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [geodata, setGeodata] = useState({x: [], y: []});
  const { myAdress, setMyAdress, friendAdress, setFriendAdress } = props;
  
  const ps = new kakao.maps.services.Places();
  const geocoder = new kakao.maps.services.Geocoder();
  const infowindow = new kakao.maps.InfoWindow({zIndex:1});

  const geoX = [], geoY = [];

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
    if ( myAdress && friendAdress ) {
      geocoder.addressSearch(myAdress, geoCB);
      geocoder.addressSearch(friendAdress, geoCB);
    }
    // if ( myAdress && !friendAdress ) {
    //   ps.keywordSearch(myAdress, placesSearchCB, { category_group_code: 'CE7' });
    // }
    // setMyAdress('');
    // setFriendAdress('');
  }, [myAdress, friendAdress]);

  useEffect(() => {
    if (geodata.x.length >= 2 && geodata.y.length >= 2) {
      console.log(geodata);
      const newGeoX = (Number(geodata.x[0]) + Number(geodata.x[1])) / 2;
      const newGeoY = (Number(geodata.y[0]) + Number(geodata.y[1])) / 2;
      console.log(newGeoX, newGeoY);
      geocoder.coord2RegionCode(newGeoX, newGeoY, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          ps.keywordSearch(result[0].address_name, placesSearchCB, { category_group_code: 'CE7' });
        };
      });
    }
  }, [geodata]);
  
  
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

  const geoCB = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      getLatLng(result[0].address_name);
    }
  };

  const getLatLng = async adress => {
    // try {
    //   const response =
    //     await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${adress}`,
    //       { headers: { Authorization: `KakaoAK ${kakaoApiKey}` } }
    //     );
    //   const data = response => response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
    fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${adress}`,
      { headers: { Authorization: `KakaoAK ${kakaoApiKey}` } }
    )
      .then(response => response.json())
      .then(data => {
        geoX.push(data.documents[0].x);
        geoY.push(data.documents[0].y);
        setGeodata(geodata => ({ ...geodata, x: geoX, y: geoY } ));
      });
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