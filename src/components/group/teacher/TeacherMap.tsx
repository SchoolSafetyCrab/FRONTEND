import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import profile1 from '@assets/images/profile/map/profile1.png';
import profile2 from '@assets/images/profile/map/profile2.png';
import profile3 from '@assets/images/profile/map/profile3.png';
import profile4 from '@assets/images/profile/map/profile4.png';
import profile5 from '@assets/images/profile/map/profile5.png';
import profile6 from '@assets/images/profile/map/profile6.png';
import pencil from '@assets/images/group/pencil.svg';
import '@styles/group/teacher/TeacherMap.css';
import childrenLocationAtom from '../../../store/children/ChildrenLocation';
import childrenSchoolWayAtom from '../../../store/children/ChildrenSchoolWay';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

export default function TeacherMap() {
  const [childrenLocation] = useAtom(childrenLocationAtom);
  const [childrenSchoolWay] = useAtom(childrenSchoolWayAtom);

  const mapRef = useRef<any>(null);
  const ChildrenLocationMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const navigate = useNavigate();

  const params = useParams();
  const groupId: string = params.groupId as string;

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const writeBtnClick = () => {
    navigate(`/group/teacher-write/${groupId}`);
  };


  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const childrenLocationMarker = new window.kakao.maps.Marker({});
    ChildrenLocationMarkerRef.current = childrenLocationMarker;
    const polyline = new window.kakao.maps.Polyline({
      strokeWeight: 5,
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });
    polylineRef.current = polyline;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = ChildrenLocationMarkerRef.current;
    var lat = childrenLocation.latitude;
    var lon = childrenLocation.longitude;
    var img = childrenLocation.img;

    // Mapping image values to profile images
    const profileImages: { [key: number]: string } = {
      1: profile1,
      2: profile2,
      3: profile3,
      4: profile4,
      5: profile5,
      6: profile6,
    };
    let numLat = parseInt(lat, 10);
    let numLon = parseInt(lon, 10);

    if (numLat !== 0 && numLon !== 0) {
      var locPosition = new window.kakao.maps.LatLng(lat, lon);
      map.setCenter(locPosition);
      // Create marker image based on img value
      const imgIndex = parseInt(img, 10);
      const imageSrc = profileImages[imgIndex] || profile1; // Default to profile1 if img is not 1-6
      const imageSize = new window.kakao.maps.Size(30, 30);
      const imageOption = { offset: new window.kakao.maps.Point(15, 13) };
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      marker.setImage(markerImage);
      marker.setPosition(locPosition);
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  }, [childrenLocation]);

  useEffect(() => {
    const map = mapRef.current;
    const polyline = polylineRef.current;
    const linePath = childrenSchoolWay.map(
      (location) => new window.kakao.maps.LatLng(location.latitude, location.longitude),
    );
    polyline.setPath(linePath);
    polyline.setMap(map);
    const newColor = getRandomColor();
    polyline.setOptions({ strokeColor: newColor });
  }, [childrenSchoolWay]);

  return (
    <section style={{width : '100%' , height: "100%", position: "relative"}}>
      <div className="circle-btn-div">
        <button type="button" className="circle-button" onClick={writeBtnClick}>
          <img src={pencil} alt="플러스" />
        </button>
      </div>
      <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
    </section>
  );
}
