import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  latlongDeclarationAtom,
  isDeclarationAtom,
  isActiveDeclarationBtnAtom,
} from '../../store/declaration/Declarationstore';

import pointAtom from '../../store/home/point/Pointsotre';
import childrenLocationAtom from '../../store/children/ChildrenLocation';
import getAlarms from '../../api/main/getEmergencyAlarmInfo';
import getSafezones from '../../api/main/getSafezone';
import getAccidentSites from '../../api/main/getAccidentSite';
import { AlarmAtom, SafezoneAtom, AccidentSiteAtom } from '../../store/home/Togglestore';
import alarmImg from '../../assets/images/home/bell.svg';
import safezoneImg from '../../assets/images/home/safezone.svg';
import accidentSiteImg from '../../assets/images/home/accident.svg';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox = () => {
  const [, setLatLon] = useAtom(latlongDeclarationAtom);
  const [, setIsDeclaration] = useAtom(isDeclarationAtom);
  const [isActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [point] = useAtom(pointAtom);
  const [childrenLocation] = useAtom(childrenLocationAtom);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const ChildrenLocationMarkerRef = useRef<any>(null);
  const clickListenerRef = useRef<any>(null);

  // 토글
  const [isAlarmSelected] = useAtom(AlarmAtom);
  const [isSafezoneSelected] = useAtom(SafezoneAtom);
  const [isAccidentSiteSelected] = useAtom(AccidentSiteAtom);
  // 알람 마커들을 저장할 배열
  const alarmMarkersRef = useRef<any[]>([]);
  const safezoneMarkerRef = useRef<any[]>([]);
  const accidentSiteMarkerRef = useRef<any[]>([]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    const alarmApi = async () => {
      if (isAlarmSelected) {
        // 기존 마커 제거
        alarmMarkersRef.current.forEach((alarmMarker) => {
          alarmMarker.setMap(null);
        });
        alarmMarkersRef.current = [];

        var userLat = point.latitude;
        var userLon = point.longitude;

        const resp = await getAlarms({ lat: userLat, lng: userLon });
        const data = resp.data;
        console.log('여기 :', resp);
        if (data.length > 0) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(40, 45);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(alarmImg, imageSize);
          data.forEach((alarm: any) => {
            const alarmMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(alarm.latitude, alarm.longitude),
              map: map,
              image: markerImage,
            });

            // 인포윈도우에 표시할 내용
            const iwContent = `
            <div style="padding: 10px; width: 300px;">
              <div style="font-weight: bold;">비상벨</div>
              <div>위치: ${alarm.address}</div>
              <div>방향: ${alarm.connection}</div>
            </div>
            `;

            var infowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
            });

            (function (marker, infowindow) {
              // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
              window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
              });

              // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
              window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
              });
            })(alarmMarker, infowindow);

            // alarmMarkers 배열에 마커 추가
            alarmMarkersRef.current.push(alarmMarker);
          });

          for (var i = 0; i < alarmMarkersRef.current.length; i++) {
            alarmMarkersRef.current[i].setMap(map);
          }

          // var locPosition = new window.kakao.maps.LatLng(data[0].latitude, data[0].longitude);
          // map.setCenter(locPosition);
        }
      }
    };
    alarmApi();
  }, [isAlarmSelected]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    const safezoneApi = async () => {
      if (isSafezoneSelected) {
        // 기존 마커 제거
        safezoneMarkerRef.current.forEach((safezoneMarker) => {
          safezoneMarker.setMap(null);
        });
        safezoneMarkerRef.current = [];

        var userLat = point.latitude;
        var userLon = point.longitude;

        const resp = await getSafezones({ lat: userLat, lng: userLon });
        const data = resp.data;
        console.log('safezone :', resp);
        if (data.length > 0) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(40, 45);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(safezoneImg, imageSize);
          data.forEach((safezone: any) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(safezone.latitude, safezone.longitude),
              map: map,
              image: markerImage,
            });

            // 인포윈도우에 표시할 내용
            const iwContent = `
            <div style="padding: 10px; width: 300px;">
              <div style="font-weight: bold;">어린이 보호구역</div>
              <div>이름: ${safezone.name}</div>
              <div>주소: ${safezone.address}</div>
              <div>CCTV 개수: ${safezone.cctvNum}</div>
            </div>
            `;

            var infowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
            });

            (function (marker, infowindow) {
              // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
              window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
              });

              // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
              window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
              });
            })(marker, infowindow);

            // alarmMarkers 배열에 마커 추가
            safezoneMarkerRef.current.push(marker);
          });

          for (var i = 0; i < safezoneMarkerRef.current.length; i++) {
            safezoneMarkerRef.current[i].setMap(map);
          }
        }
      }
    };
    safezoneApi();
  }, [isSafezoneSelected]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    const accidentSiteApi = async () => {
      if (isAccidentSiteSelected) {
        // 기존 마커 제거
        accidentSiteMarkerRef.current.forEach((marker) => {
          marker.setMap(null);
        });
        accidentSiteMarkerRef.current = [];

        var userLat = point.latitude;
        var userLon = point.longitude;

        const resp = await getAccidentSites({ lat: userLat, lng: userLon });
        const data = resp.data;
        console.log('accidentSite 결과 :', resp);
        if (data.length > 0) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(40, 45);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(accidentSiteImg, imageSize);
          data.forEach((accidentSite: any) => {
            const accidentSiteMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(accidentSite.latitude, accidentSite.longitude),
              map: map,
              image: markerImage,
            });

            // 인포윈도우에 표시할 내용
            const iwContent = `
            <div style="padding: 10px; width: 300px;">
              <div style="font-weight: bold;">사고우발지역</div>
              <div>연도: ${accidentSite.year}</div>
              <div>사고분류: ${accidentSite.type}</div>
              <div>횟수: ${accidentSite.count}</div>
            </div>
            `;

            var infowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
            });

            (function (marker, infowindow) {
              // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
              window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
              });

              // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
              window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
              });
            })(accidentSiteMarker, infowindow);

            // alarmMarkers 배열에 마커 추가
            accidentSiteMarkerRef.current.push(accidentSiteMarker);
          });

          for (var i = 0; i < accidentSiteMarkerRef.current.length; i++) {
            accidentSiteMarkerRef.current[i].setMap(map);
          }
        }
      }
    };
    accidentSiteApi();
  }, [isAccidentSiteSelected]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        console.log(lat);
        var locPosition = new window.kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }

    const imageSrc = require('../../assets/images/main/declarationMarker.png');
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(15, 13) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      image: markerImage,
    });
    markerRef.current = marker;

    const myLocationMarker = new window.kakao.maps.Marker({});
    myLocationMarkerRef.current = myLocationMarker;

    const childrenLocationMarker = new window.kakao.maps.Marker({});
    ChildrenLocationMarkerRef.current = childrenLocationMarker;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    if (!isActiveDeclarationBtn) {
      console.log('false');
      const clickListener = (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        setLatLon({ latitude: latlng.getLat(), longitude: latlng.getLng() });
        setIsDeclaration(false);
        marker.setPosition(latlng);
        marker.setMap(map);
      };

      // 클릭 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'click', clickListener);
      clickListenerRef.current = clickListener;

      // 마커를 지도에 추가
      marker.setMap(map);
    } else {
      // 클릭 이벤트 리스너 제거
      if (clickListenerRef.current) {
        window.kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
        clickListenerRef.current = null;
      }

      // 마커를 지도에서 제거
      if (marker) {
        marker.setMap(null);
      }
    }
  }, [isActiveDeclarationBtn, setLatLon, setIsDeclaration]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = myLocationMarkerRef.current;
    var lat = point.latitude;
    var lon = point.longitude;

    if (lat !== 0 && lon !== 0) {
      var locPosition = new window.kakao.maps.LatLng(lat, lon);
      marker.setPosition(locPosition);
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  }, [point]);

  return <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
};

export default MapBox;
