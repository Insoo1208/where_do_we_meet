/* global kakao */
import axios from "axios";
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
  const { myAdress, friendAdress, setSearchData } = props;
  
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
      center: new kakao.maps.LatLng(37.452337443959, 126.69960367814),
      level: 3,
    };
    setMap(new kakao.maps.Map(container, options));
  }, []);
  
  useEffect(() => {
    if ( myAdress && friendAdress ) {
      const getAdress = async () => {
        try {
          const firstAddress = await geocoder.addressSearch(myAdress, geoCB);
          const secondAddress = await geocoder.addressSearch(friendAdress, geoCB);
        } catch (error) {
          console.error(error);
        }
      }
      getAdress();
    }
    // if ( myAdress && !friendAdress ) {
    //   ps.keywordSearch(myAdress, placesSearchCB, { category_group_code: 'CE7' });
    // }
    // setMyAdress('');
    // setFriendAdress('');
  }, [myAdress, friendAdress]);

  useEffect(() => {
    if (geodata.x.length >= 2 && geodata.y.length >= 2) {
      const newGeoX = (Number(geodata.x[0]) + Number(geodata.x[1])) / 2;
      const newGeoY = (Number(geodata.y[0]) + Number(geodata.y[1])) / 2;
      geocoder.coord2RegionCode(newGeoX, newGeoY, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          ps.keywordSearch(result[0].address_name, placesSearchCB, { category_group_code: 'CE7' });
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          return alert('검색 결과가 없습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
          return alert('검색 중 오류가 발생했습니다.');
        }
      });
    }
  }, [geodata]);
  
  
  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      console.log(data);
      setSearchData(data);
      
      for (let i = 0; i < data.length; i++) {
        addMarker(data[i], i);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      };
      map.setBounds(bounds);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return alert('검색 결과가 없습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      return alert('검색 중 오류가 발생했습니다.');
    }
  };

  const geoCB = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      getLatLng(result[0].address_name);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return alert('검색 결과가 없습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      return alert('검색 중 오류가 발생했습니다.');
    }
  };

  const getLatLng = async adress => {
    try {
      const response =
        await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${adress}`,
          { headers: { Authorization: `KakaoAK ${kakaoApiKey}` } }
        );
      geoX.push(response.data.documents[0].x);
      geoY.push(response.data.documents[0].y);
      setGeodata(geodata => ({ ...geodata, x: geoX, y: geoY } ));
    } catch (error) {
      console.error(error);
    }
  };
  
  // const addMarker =  place => {
  //   // 마커를 생성하고 지도에 표시합니다
  //   const marker = new kakao.maps.Marker({
  //     position: new kakao.maps.LatLng(place.y, place.x)
  //   });

  //   // 마커에 클릭이벤트를 등록합니다
  //   kakao.maps.event.addListener(marker, 'click', function() {
  //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
  //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
  //     infowindow.open(map, marker);
  //   });

  //   marker.setMap(map);

  //   setMarkers(markers => markers.concat(marker));
  // };

  const addMarker = (position, index) => {
    const imgSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
          imgSize = new kakao.maps.Size(36, 37),
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10),
            offset: new kakao.maps.Point(13, 37)
          },
          markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(position.y, position.x),
            image: markerImage
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