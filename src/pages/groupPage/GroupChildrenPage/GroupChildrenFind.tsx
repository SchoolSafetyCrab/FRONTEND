import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';
import profile1 from '@assets/images/profile/profile1.svg';
import profile2 from '@assets/images/profile/profile2.svg';
import profile3 from '@assets/images/profile/profile3.svg';
import profile4 from '@assets/images/profile/profile4.svg';
import profile5 from '@assets/images/profile/profile5.svg';
import profile6 from '@assets/images/profile/profile6.svg';
import findChildren from '../../../api/findChildren/FindChildren';
import '@styles/groupChildrenPage/GroupChildrenFind.css';
import db from '../../../firebase';
import childrenLocationAtom from '../../../store/children/ChildrenLocation';

interface Children {
  userId: string;
  id: string;
  nickName: string;
  userImg: string;
}

interface LatLong {
  latitude: string;
  longitude: string;
  img: string;
}

export default function GroupChildrenFind() {
  const [childrenData, setChildrenData] = useState<Children[]>([]);
  const [, setChildrenLocation] = useAtom(childrenLocationAtom);
  const [clickedChild, setClickedChild] = useState<{ id: string; img: string } | null>(null);
  const [unsubscribeSnapshot, setUnsubscribeSnapshot] = useState<(() => void) | null>(null);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const children = await findChildren(); // findChildren function call
        if (children) {
          setChildrenData(children);
        }
      } catch (error) {
        console.error('Error fetching children info:', error);
      }
    };
    fetchChildrenData();
  }, []);

  const findChildLocation = (id: string, img: string) => {
    setClickedChild({ id, img });
  };

  useEffect(() => {
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot(); // Unsubscribe previous snapshot listener
      setUnsubscribeSnapshot(null); // Clear unsubscribe function
    }

    if (clickedChild) {
      const { id, img } = clickedChild;
      try {
        const docRef = doc(db, 'users', id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const { latitude, longitude } = data; // 필드 접근 시 객체 구조 분해 사용
            const child: LatLong = {
              latitude,
              longitude,
              img,
            };
            setChildrenLocation(child);

            if (latitude === 0 && longitude === 0) {
              alert('자식 위치를 찾을 수 없어요!!');
              unsubscribe(); // Unsubscribe current snapshot listener
              setUnsubscribeSnapshot(null); // Clear unsubscribe function
            }
          }
        });

        setUnsubscribeSnapshot(() => unsubscribe); // Save unsubscribe function
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    }
  }, [clickedChild]);

  return (
    <div className="groupChildrenFindContainer">
      {childrenData.map((child) => (
        <button
          type="button"
          key={child.userId}
          onClick={() => findChildLocation(child.id, child.userImg)}
          className={`childInfo ${clickedChild && clickedChild.id === child.id ? 'clicked' : ''}`}
        >
          {child.userImg === '1' && (
            <img src={profile1} alt={child.nickName} className="childImg" />
          )}
          {child.userImg === '2' && (
            <img src={profile2} alt={child.nickName} className="childImg" />
          )}
          {child.userImg === '3' && (
            <img src={profile3} alt={child.nickName} className="childImg" />
          )}
          {child.userImg === '4' && (
            <img src={profile4} alt={child.nickName} className="childImg" />
          )}
          {child.userImg === '5' && (
            <img src={profile5} alt={child.nickName} className="childImg" />
          )}
          {child.userImg === '6' && (
            <img src={profile6} alt={child.nickName} className="childImg" />
          )}
          <p className="childNickName">{child.nickName}</p>
        </button>
      ))}
    </div>
  );
}