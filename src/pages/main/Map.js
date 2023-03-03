/* global kakao */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const { kakao } = window;
const kakaoApiKey = 'ffa89cfc78225aff2872d03ae1064df0';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
`;

function Map (props) {
  // 지도 객체 담는 state
  const [map, setMap] = useState(null);
  // 마커담는 배열
  const [markers, setMarkers] = useState([]);
  // 위도, 경도 담을 객체
  const [geodata, setGeodata] = useState({x: [], y: []});
  
  // 지도를 나타낼 div
  const mapRef = useRef();
  
  // 내 주소, 친구 주소, 컨텐츠 검색,  검색 결과
  const { myAdress, friendAdress, contentsSearch, setSearchData } = props;
  
  const ps = new kakao.maps.services.Places();
  const geocoder = new kakao.maps.services.Geocoder();
  const infowindow = new kakao.maps.InfoWindow({zIndex:1});

  const geoX = [],
        geoY = [];

  // 페이지가 렌더링 되었을 때 지도 생성 함수
  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.452337443959, 126.69960367814),
      level: 3,
    };
    setMap(new kakao.maps.Map(mapRef.current, options));
  }, []);
  
  // 나의 주소, 친구 주소 모두 들어왔을 때 주소 검색해주는 함수
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
  }, [myAdress, friendAdress]);

  // 컨텐츠 검색 함수
  useEffect(() => {
    if (contentsSearch) ps.keywordSearch(contentsSearch, placesSearchCB, { category_group_code: 'CE7' });
  }, [contentsSearch]);

  // 위도,경도 값이 2개 이상(정상적으로) 들어왔을 때 키워드 검색 해주는 함수
  useEffect(() => {
    if (geodata.x.length >= 2 && geodata.y.length >= 2) {
      const newGeoX = (Number(geodata.x[0]) + Number(geodata.x[1])) / 2,
            newGeoY = (Number(geodata.y[0]) + Number(geodata.y[1])) / 2;
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
  
  // 키워드 검색 API의 콜백함수
  const placesSearchCB = (data, status) => {
    removeMarkers();
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();
      setSearchData(data);
      
      for (let i = 0; i < data.length; i++) {
        addMarker(data[i], i, data[i].place_name);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      };
      map.setBounds(bounds);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return alert('검색 결과가 없습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      return alert('검색 중 오류가 발생했습니다.');
    }
  };

  // 주소 키워드로 정확한 주소명 검색하는 API의 콜백함수
  const geoCB = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      return result[0].address_name;
      getLatLng(result[0].address_name);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      return alert('검색 결과가 없습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      return alert('검색 중 오류가 발생했습니다.');
    }
  };

  // 카카오 REST API 이용
  // 입력받은 주소로 위도, 경도값 반환
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

  // 마커 생성 함수
  const addMarker = (position, index, title) => {
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

    addMarkerListener(marker, title);

    marker.setMap(map);

    setMarkers(markers => markers.concat(marker));
  };

  // 마커에 마우스 오버/아웃 이벤트 등록 함수
  const addMarkerListener = (marker, title) => {
    kakao.maps.event.addListener(marker, 'mouseover', function() {
      displayInfowindow(marker, title);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close();
    });
  };

  // 인포 윈도우 생성 함수
  const displayInfowindow = (marker, title) => {
    var content = '<div class ="text-ellipsis" style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  // 마커 제거 함수
  const removeMarkers = () => {
    for (let i = 0; i < markers.length; i++) markers[i].setMap(null);
    setMarkers([]);
  };

  return (
      <MapWrapper ref={mapRef} />
    );
  }
  
  export default Map;