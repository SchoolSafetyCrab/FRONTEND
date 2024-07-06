import React, { useEffect, useRef, useState } from 'react';
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
import getTrafficLights from '../../api/main/getTrafficLight';
import getSafehouses from '../../api/main/getSafehouse';
import getCctvs from '../../api/main/getCctv';
import getCrosswalks from '../../api/main/getCrosswalk';
import getSchools from '../../api/main/getSchoolnfo';
import { getSchoolWay, location } from '../../api/way/GetSchoolWay';
import postSchoolWay from '../../api/way/PostSchoolWay';

import {
  AlarmAtom,
  SafezoneAtom,
  AccidentSiteAtom,
  TrafficLightAtom,
  CctvAtom,
  CrosswalkAtom,
  SafehouseAtom,
} from '../../store/home/Togglestore';
import {
  WayAtom,
  WayAddAtom,
  WayAddEndAtom,
  nowLocationAtom,
  polylineAtom,
  buttonAtom,
} from '../../store/way/WayInfo';

import alarmImg from '../../assets/images/home/bell.svg';
import safezoneImg from '../../assets/images/home/safezone.svg';
import accidentSiteImg from '../../assets/images/home/accident.svg';
import trafficLightImg from '../../assets/images/home/trafficlight.svg';
import cctvImg from '../../assets/images/home/cctv.svg';
import crosswalkImg from '../../assets/images/home/crosswalk.svg';
import schoolImg from '../../assets/images/home/schoolzone.svg';
import safehouseImg from '../../assets/images/home/safehouse.svg';
import selectMarkerImg from '../../assets/images/home/selectMarker.png';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const WayMapBox = () => {
  const [, setLatLon] = useAtom(latlongDeclarationAtom);
  const [, setIsDeclaration] = useAtom(isDeclarationAtom);
  const [isActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [point] = useAtom(pointAtom);
  const [childrenLocation] = useAtom(childrenLocationAtom);

  // 나의 등교길 관련
  const [nowLocation, setNowLocation] = useAtom(nowLocationAtom);
  const [ways, setWays] = useAtom(WayAtom);
  const [isWayAdd, setIsWayAdd] = useAtom(WayAddAtom);
  const [isWayEnd, setIsWayEnd] = useAtom(WayAddEndAtom);
  const [buttonState, setButtonState] = useAtom(buttonAtom);
  const wayMarkerRef = useRef<any[]>([]);
  const wayLocationRef = useRef<any[]>([]);
  const [polylines, setPolylines] = useAtom(polylineAtom);
  const [wayTemp, setWayTemp] = useState<any>(null);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const ChildrenLocationMarkerRef = useRef<any>(null);
  const clickListenerRef = useRef<any>(null);

  // 토글 여부 저장
  const [isAlarmSelected] = useAtom(AlarmAtom);
  const [isSafezoneSelected] = useAtom(SafezoneAtom);
  const [isAccidentSiteSelected] = useAtom(AccidentSiteAtom);
  const [isTrafficLightSelected] = useAtom(TrafficLightAtom);
  const [isCctvSelected] = useAtom(CctvAtom);
  const [isCrosswalkSelected] = useAtom(CrosswalkAtom);
  const [isSafehouseSelected] = useAtom(SafehouseAtom);

  // 현 위치에서 보여줄 데이터의 배열
  const [mapCenterX, setMapCenterX] = useState<number>(0);
  const [mapCenterY, setMapCenterY] = useState<number>(0);
  const [trafficLight, setTrafficLight] = useState<any[]>([]);
  const [safehouse, setSafehouse] = useState<any[]>([]);
  const [cctvs, setCctvs] = useState<any[]>([]);
  const [crossWalks, setCrossWalks] = useState<any[]>([]);
  const [safezones, setSafezones] = useState<any[]>([]);

  // 알람 마커들을 저장할 배열
  const alarmMarkersRef = useRef<any[]>([]);
  const safezoneMarkerRef = useRef<any[]>([]);
  const accidentSiteMarkerRef = useRef<any[]>([]);
  const trafficLightMarkerRef = useRef<any[]>([]);
  const cctvMarkerRef = useRef<any[]>([]);
  const crosswalkMarkerRef = useRef<any[]>([]);
  const schoolMarkerRef = useRef<any[]>([]);
  const safehouseMarkerRef = useRef<any[]>([]);

  // interface
  interface trafficlight {
    name: string;
    type: string;
    lat: number;
    lng: number;
  }

  // 하버사인 공식으로 두 지점 사이의 거리 구하기
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 단위: km
    return distance;
  }

  // 비상벨
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

        const resp = await getAlarms({ lat: mapCenterX, lng: mapCenterY });
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
      } else {
        // 비상벨 토글이 꺼질 경우, 마커를 제거합니다.
        alarmMarkersRef.current.forEach((alarmMarker) => {
          if (alarmMarker && typeof alarmMarker.setMap === 'function') {
            alarmMarker.setMap(null);
          } else {
            console.error('Invalid 비상벨 마커:', alarmMarker);
          }
        });
        alarmMarkersRef.current = [];
      }
    };
    alarmApi();
  }, [mapCenterX, mapCenterY, isAlarmSelected]);

  // 어린이 보호구역 api 호출
  useEffect(() => {
    const safezoneApi = async () => {
      const resp = await getSafezones({ lat: mapCenterX, lng: mapCenterY });
      if (resp.length === 0) {
        console.log('데이터 없음 어린이보호구역');
        return 0;
      }
      const data = resp.data;

      setSafezones(data);
    };
    if (isSafezoneSelected) {
      safezoneApi();
    }
  }, [mapCenterX, mapCenterY, isSafezoneSelected]);

  // 어린이 보호구역 마커 찍기
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

        if (safezones.length > 0) {
          var imageSize = new window.kakao.maps.Size(40, 45);
          var markerImage = new window.kakao.maps.MarkerImage(safezoneImg, imageSize);
          safezones.forEach((safezone: any) => {
            const safezoneMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(safezone.latitude, safezone.longitude),
              map: map,
              image: markerImage,
            });

            const iwContent = `
            <div style="padding: 10px; width: 300px;">
              <div style="font-weight: bold;">어린이 보호구역</div>
              <div>이름: ${safezone.name}</div>
              <div>주소: ${safezone.address}</div>
              <div>CCTV 개수: ${safezone.cctvNum} 개</div>
            </div>
            `;

            var infowindow = new window.kakao.maps.InfoWindow({
              content: iwContent,
            });

            (function (marker, infowindow) {
              window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
              });

              window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
              });
            })(safezoneMarker, infowindow);

            //  배열에 마커 추가
            safezoneMarkerRef.current.push(safezoneMarker);
          });

          for (var i = 0; i < safezoneMarkerRef.current.length; i++) {
            safezoneMarkerRef.current[i].setMap(map);
          }
        }
      } else {
        // 토글 꺼진 경우, 마커를 제거합니다.
        safezoneMarkerRef.current.forEach((safezoneMarker) => {
          if (safezoneMarker && typeof safezoneMarker.setMap === 'function') {
            safezoneMarker.setMap(null);
          } else {
            console.error('Invalid schoolzoneMarker:', safezoneMarker);
          }
        });
        safezoneMarkerRef.current = [];
      }
    };
    safezoneApi();
  }, [safezones, isSafezoneSelected]);

  // 사고 우발지
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

        const resp = await getAccidentSites({ lat: mapCenterX, lng: mapCenterY });
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
      } else {
        // false인 경우, 마커를 제거합니다.
        accidentSiteMarkerRef.current.forEach((accidentSiteMarker) => {
          if (accidentSiteMarker && typeof accidentSiteMarker.setMap === 'function') {
            accidentSiteMarker.setMap(null);
          } else {
            console.error('Invalid accidentSiteMarker:', accidentSiteMarker);
          }
        });
        accidentSiteMarkerRef.current = [];
      }
    };
    accidentSiteApi();
  }, [mapCenterX, mapCenterY, isAccidentSiteSelected]);

  // 신호등
  useEffect(() => {
    const api = async () => {
      const resp = await getTrafficLights();
      const tempArr = resp.response.body.items.item || [];
      setTrafficLight(tempArr);
    };
    api();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    if (!map) return;

    if (isTrafficLightSelected && trafficLight.length !== 0) {
      // 기존 마커 제거
      trafficLightMarkerRef.current.forEach((marker) => marker.setMap(null));
      trafficLightMarkerRef.current = [];

      const imageSize = new window.kakao.maps.Size(40, 45);
      const markerImage = new window.kakao.maps.MarkerImage(trafficLightImg, imageSize);

      trafficLight.forEach((item: any) => {
        const lat1 = item.LATITUDE;
        const lon1 = item.LONGITUDE;
        console.log('latlng: ', lat1, lon1);
        const distance = getDistance(lat1, lon1, mapCenterX, mapCenterY);

        if (distance <= 1) {
          const trafficLightMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat1, lon1),
            map: map,
            image: markerImage,
          });

          const iwContent = `
                          <div style="padding: 10px; width: 300px;">
                            <div style="font-weight: bold;">신호등</div>
                            <div>주소: ${item.LNMADR}</div>
                          </div>
                        `;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
          });

          (function (marker, infowindow) {
            window.kakao.maps.event.addListener(marker, 'mouseover', function () {
              infowindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.close();
            });
          })(trafficLightMarker, infowindow);

          trafficLightMarkerRef.current.push(trafficLightMarker);
        }
      });
    } else {
      trafficLightMarkerRef.current.forEach((trafficLightMarker) => {
        if (trafficLightMarker && typeof trafficLightMarker.setMap === 'function') {
          trafficLightMarker.setMap(null);
        } else {
          console.error('Invalid marker:', trafficLightMarker);
        }
      });

      trafficLightMarkerRef.current = [];
    }
    if (trafficLightMarkerRef.current.length !== 0) {
      for (let i = 0; i < trafficLightMarkerRef.current.length; i++) {
        const marker = trafficLightMarkerRef.current[i];
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(map);
        } else {
          console.error('Invalid marker:', marker);
        }
      }
    }
  }, [mapCenterX, mapCenterY, trafficLight, isTrafficLightSelected]);

  // 안전 어린이집 데이터 가져오기
  useEffect(() => {
    const fetchSafehouseData = async () => {
      try {
        // console.log('안전 맵 보내는 곳: ', mapCenterX, mapCenterY);
        const response: any = await getSafehouses(mapCenterX, mapCenterY);

        // console.log('잠깐 여기: ', response);
        const { features } = response.response.result.featureCollection;
        // console.log('안전 어린이집 결과:', features);

        const safehouses = features.map((feature: any) => ({
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          name: feature.properties.fac_nam,
          address: feature.properties.fac_o_add,
          tel: feature.properties.fac_tel,
        }));

        setSafehouse(safehouses);
      } catch (error) {
        console.error('안전 어린이집 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    if (isSafehouseSelected) {
      fetchSafehouseData();
    }
  }, [mapCenterX, mapCenterY, isSafehouseSelected]);

  // 안전 어린이집 마커 업데이트
  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    // 기존 마커 제거
    safehouseMarkerRef.current.forEach((marker) => marker.setMap(null));
    safehouseMarkerRef.current = [];

    if (isSafehouseSelected && safehouse.length > 0) {
      const imageSize = new window.kakao.maps.Size(40, 45);
      const markerImage = new window.kakao.maps.MarkerImage(safehouseImg, imageSize);

      safehouse.forEach((safehouse) => {
        const safehouseMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(safehouse.lat, safehouse.lng),
          map: map,
          image: markerImage,
        });

        const iwContent = `
          <div style="padding: 10px; width: 300px;">
            <div style="font-weight: bold;">안전 어린이집</div>
            <div>이름: ${safehouse.name}</div>
            <div>주소: ${safehouse.address}</div>
            <div>전화번호: ${safehouse.tel}</div>
          </div>
        `;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
        });

        window.kakao.maps.event.addListener(safehouseMarker, 'mouseover', function () {
          infowindow.open(map, safehouseMarker);
        });

        window.kakao.maps.event.addListener(safehouseMarker, 'mouseout', function () {
          infowindow.close();
        });

        safehouseMarkerRef.current.push(safehouseMarker);
      });
    }
  }, [safehouse, isSafehouseSelected]);

  // CCTV 데이터
  useEffect(() => {
    const cctvApi = async () => {
      const resp = await getCctvs();
      const tempArr = resp.response.body.items || [];
      console.log('api 밖에서 받은 tempArr: ', tempArr);

      if (tempArr.length > 0) {
        setCctvs(tempArr);
      }
    };
    cctvApi();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    if (isCctvSelected && cctvMarkerRef.current.length !== null) {
      cctvMarkerRef.current.forEach((cctvMarker) => {
        if (cctvMarker && typeof cctvMarker.setMap === 'function') {
          cctvMarker.setMap(null);
        } else {
          console.error('Invalid cctv marker:', cctvMarker);
        }
      });
      cctvMarkerRef.current = [];

      if (cctvs.length > 0) {
        const imageSize = new window.kakao.maps.Size(40, 45);
        const markerImage = new window.kakao.maps.MarkerImage(cctvImg, imageSize);

        cctvs.forEach((cctv: any) => {
          const lat1 = cctv.crdntY;
          const lon1 = cctv.crdntX;
          const distance = getDistance(lat1, lon1, mapCenterX, mapCenterY);

          if (distance <= 2) {
            const cctvMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat1, lon1),
              map: map,
              image: markerImage,
            });

            const iwContent = `
                <div style="padding: 10px; width: 300px;">
                  <div style="font-weight: bold;">어린이 방범 CCTV</div>
                  <div>이름: ${cctv.manageNo}</div>
                  <div>주소: ${cctv.lnmAdres}</div>
                  <div>관리처: ${cctv.polcDstrc}</div>
                </div>
              `;

            const infowindow = new window.kakao.maps.InfoWindow({
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
            })(cctvMarker, infowindow);

            // alarmMarkers 배열에 마커 추가
            cctvMarkerRef.current.push(cctvMarker);
          }
        });
      }
    } else if (!isCctvSelected && cctvMarkerRef.current.length !== 0) {
      for (let i = 0; i < cctvMarkerRef.current.length; i++) {
        const marker = cctvMarkerRef.current[i];
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        } else {
          console.error('Invalid marker:', marker);
        }
      }
    }
  }, [mapCenterX, mapCenterY, isCctvSelected]);

  // 횡단보도 데이터 api 호출
  useEffect(() => {
    const map = mapRef.current;

    const crosswalkApi = async () => {
      const resp = await getCrosswalks();
      const tempArr = resp.response.body.items.item || [];
      console.log('횡단보도: ', tempArr);
      if (tempArr.length > 0) {
        setCrossWalks(tempArr);
      }
    };

    crosswalkApi();
  }, []);

  // 횡단보도 데이터 지도에 찍기
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    if (isCrosswalkSelected) {
      if (crosswalkMarkerRef.current.length !== 0) {
        crosswalkMarkerRef.current.forEach((crosswalkMarker) => {
          if (crosswalkMarker && typeof crosswalkMarker.setMap === 'function') {
            crosswalkMarker.setMap(null);
          } else {
            console.error('Invalid crosswalkMarker:', crosswalkMarker);
          }
        });
        crosswalkMarkerRef.current = [];
      }

      if (crossWalks.length > 0) {
        const imageSize = new window.kakao.maps.Size(40, 45);
        const markerImage = new window.kakao.maps.MarkerImage(crosswalkImg, imageSize);

        crossWalks.forEach((crosswalk: any) => {
          const lat1 = crosswalk.LATITUDE;
          const lon1 = crosswalk.LONGITUDE;
          const distance = getDistance(lat1, lon1, mapCenterX, mapCenterY);

          if (distance <= 0.8) {
            //너무 많아서 거리를 일부러 작게 잡음
            const crosswalkMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat1, lon1),
              map: map,
              image: markerImage,
            });

            const iwContent = `
                <div style="padding: 10px; width: 300px;">
                  <div style="font-weight: bold;">횡단보도</div>
                  <div>주소: ${crosswalk.LNMADR}</div>
                  <div>집중조명시설 설치여부: ${crosswalk.CNCTRLGHTFCLTYYN}</div>
                </div>
              `;

            const infowindow = new window.kakao.maps.InfoWindow({
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
            })(crosswalkMarker, infowindow);

            //  배열에 마커 추가
            crosswalkMarkerRef.current.push(crosswalkMarker);
          }
        });

        for (let i = 0; i < crosswalkMarkerRef.current.length; i++) {
          const marker = crosswalkMarkerRef.current[i];
          if (marker && typeof marker.setMap === 'function') {
            marker.setMap(map);
          } else {
            console.error('Invalid marker:', marker);
          }
        }
      }
    } else if (!isCrosswalkSelected) {
      // isCrosswalkSelected가 false인 경우, 마커를 제거합니다.
      crosswalkMarkerRef.current.forEach((crosswalkMarker) => {
        if (crosswalkMarker && typeof crosswalkMarker.setMap === 'function') {
          crosswalkMarker.setMap(null);
        } else {
          console.error('Invalid crosswalkMarker:', crosswalkMarker);
        }
      });
      crosswalkMarkerRef.current = [];
    }
  }, [mapCenterX, mapCenterY, isCrosswalkSelected]);

  // 초등학교
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    const fetchSchoolApi = async () => {
      const imageSize = new window.kakao.maps.Size(40, 45);
      const markerImage = new window.kakao.maps.MarkerImage(schoolImg, imageSize);
      const schoolArr = await getSchools();

      if (schoolArr !== null) {
        console.log('널아님');

        let tempArr: any[] = [];
        schoolArr.forEach((school: any) => {
          const schoolMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(school.lat, school.lng),
            map: map,
            image: markerImage,
          });
          // console.log('마커: ', schoolMarker);
          const iwContent = `
                  <div style="padding: 10px; width: 300px;">
                    <div style="font-weight: bold;">${school.name}</div>
                  </div>
                `;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
          });

          window.kakao.maps.event.addListener(schoolMarker, 'mouseover', () => {
            infowindow.open(map, schoolMarker);
            console.log('infowindow open', school.name);
          });
          window.kakao.maps.event.addListener(schoolMarker, 'mouseout', function () {
            infowindow.close();
            console.log('infowindow close', school.name);
          });
          // 배열에 마커 추가
          tempArr.push(schoolMarker);
        });

        schoolMarkerRef.current = tempArr;
      } else {
        console.log('널임');
      }
    };
    fetchSchoolApi();
  }, []);

  // schoolMarkerRef.current가 변경될 때마다 마커를 지도에 설정
  useEffect(() => {
    const map = mapRef.current;
    console.log('새로운 useEffect: ', schoolMarkerRef.current);
    for (let i = 0; i < schoolMarkerRef.current.length; i++) {
      const marker = schoolMarkerRef.current[i];
      marker.setMap(map);
    }
  }, [schoolMarkerRef.current]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    window.kakao.maps.event.addListener(map, 'center_changed', function () {
      // 지도의 중심좌표를 얻어옵니다
      const latlng = map.getCenter();
      setMapCenterX(latlng.getLat());
      setMapCenterY(latlng.getLng());
    });

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

  // 등굣길 조회 api 호출
  useEffect(() => {
    const getSchoolApi = async () => {
      const response = await getSchoolWay();

      console.log('@@결과: ', response);

      if (response) {
        setWays(response); // 버튼 state도 여기서 관리, 등굣길도

        if (response.length > 0) {
          setButtonState(2); // 저장되어 있는 상태
        } else setButtonState(0); // 등굣길 없음
      }
    };
    getSchoolApi();
    console.log('@@@@여기다옹', ways);
  }, []);

  useEffect(() => {
    console.log('way 상태찍기: ', ways);
  }, [ways]);

  // 나의 등하굣길 설정
  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    const setWayMarkers = (map: any) => {
      for (var i = 0; i < wayMarkerRef.current.length; i++) {
        console.log(`저장한 ${i}번째 마커 :`, wayMarkerRef.current[i]);
        wayMarkerRef.current[i].setMap(map);
      }
    };

    const showWayMarkers = () => {
      setWayMarkers(map);
    };

    const hideWayMarkers = () => {
      setWayMarkers(null);
    };

    // 마커들을 기반으로 polyline을 업데이트하는 함수
    const updatePolyline = () => {
      if (ways.length > 0) {
        const path = ways.map(
          (coord) => new window.kakao.maps.LatLng(coord.latitude, coord.longitude),
        );

        polyline = new window.kakao.maps.Polyline({
          path: path,
          strokeWeight: 5,
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });

        // 지도에 새로운 polyline 추가
        polyline.setMap(map);

        // 맵에 찍고 useState를 set으로 둬서 삭제 state 를 두기 (0 -> 생성)
        // 1. useEffect로 api 조회해서 등교길 꺼내오기
        // 2. 등교길 기반으로 polyline
      } else {
        // 새로운 path 생성
        const path = wayMarkerRef.current.map((marker: any) => marker.getPosition());
        polyline = new window.kakao.maps.Polyline({
          path: path,
          strokeWeight: 5,
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });
        // 지도에 새로운 polyline 추가
        polyline.setMap(map);
      }
    };

    let polyline: any = null; // 초기 polyline 선언

    if (ways.length === 0 && isWayAdd) {
      // 등굣길 편집 중

      // 기존 마커 제거
      wayMarkerRef.current.forEach((marker: any) => {
        marker.setMap(null);
      });
      wayMarkerRef.current = [];

      wayLocationRef.current = [];
      const clickListener = (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        // console.log('그 이전의 latlng: ', latlng);
        setNowLocation({ latitude: latlng.getLat(), longitude: latlng.getLng() });
        // setIsDeclaration(false);
        const imageSize = new window.kakao.maps.Size(40, 45);
        const offset = new window.kakao.maps.Point(imageSize.width / 2, imageSize.height / 2); // 이미지의 중심점 설정
        const markerImage = new window.kakao.maps.MarkerImage(selectMarkerImg, imageSize, {
          offset: offset,
        });

        const nowWayMarker = new window.kakao.maps.Marker({
          position: latlng,
          map: map,
          image: markerImage,
        });

        wayMarkerRef.current.push(nowWayMarker);
        wayLocationRef.current.push({ latitude: latlng.getLat(), longitude: latlng.getLng() });
        console.log('마커의 현재 위치: ', wayMarkerRef.current);
        console.log('locationArray: ', wayLocationRef.current);
        updatePolyline();
      };

      // 클릭 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'click', clickListener);
      clickListenerRef.current = clickListener;

      const setWayMarkers = (map: any) => {
        for (var i = 0; i < wayMarkerRef.current.length; i++) {
          console.log(`저장한 ${i}번째 마커 :`, wayMarkerRef.current[i]);
          wayMarkerRef.current[i].setMap(map);
        }
      };

      showWayMarkers();
    }
    if (ways.length === 0 && !isWayAdd) {
      // 등굣길 추가 전
      // 클릭 이벤트 리스너 제거
      if (clickListenerRef.current) {
        window.kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
        clickListenerRef.current = null;
      }

      // 마커를 지도에서 제거
      if (marker) {
        marker.setMap(null);
      }

      hideWayMarkers();
      // hidePolyline();
    }
    if (isWayEnd) {
      // 추가완료 버튼 눌렀을 때
      // setWays(wayLocationRef.current);
      postSchoolApi(wayLocationRef.current);
      showWayMarkers();
      updatePolyline(); // 마커가 추가될 때 polyline 업데이트
      console.log('저장된 값@@@:', wayLocationRef.current);
      setIsWayEnd(false);
    }
    if (ways.length > 0 && !isWayAdd) {
      updatePolyline();
      console.log('여기가 저장완료시에 보여지는 곳');
    }
  }, [ways, isWayAdd, setNowLocation, isWayEnd]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = myLocationMarkerRef.current;
    var lat = point.latitude;
    var lon = point.longitude;

    if (lat !== 0 && lon !== 0) {
      var locPosition = new window.kakao.maps.LatLng(lat, lon);
      marker.setPosition(locPosition);
      marker.setMap(map);
      setMapCenterX(lat);
      setMapCenterY(lon);
    } else {
      marker.setMap(null);
    }
  }, [point]);

  const postSchoolApi = async (points: location[]) => {
    const response = await postSchoolWay(points);
    console.log('POST 보냄: ', response);
  };

  return <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
};

export default WayMapBox;
