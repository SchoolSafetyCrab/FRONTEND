import { useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import profile from '@assets/images/profile.svg';
import profile1 from '@assets/images/profile/profile1.svg';
import profile2 from '@assets/images/profile/profile2.svg';
import profile3 from '@assets/images/profile/profile3.svg';
import profile4 from '@assets/images/profile/profile4.svg';
import profile5 from '@assets/images/profile/profile5.svg';
import profile6 from '@assets/images/profile/profile6.svg';
import '@styles/join/JoinProfile.css';
import { useAtom } from 'jotai';
import { iconImgAtom, nicknameAtom } from '../../store/join/joinstore';

export default function JoinProfile() {
  const navigate = useNavigate();
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isProfileSelectVisible, setProfileSelectVisible] = useState(false);
  const [isSelectImg, setIsSelectImg] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(profile);
  const [inputNickname, setInputNickname] = useState('');
  const [, setNickname] = useAtom(nicknameAtom);
  const [, setImg] = useAtom(iconImgAtom);

  const handleNext = () => {
    setNickname(inputNickname);
    navigate('/join/identity');
  };

  const handleImageClick = () => {
    setProfileSelectVisible(true);
  };

  const handleImageClickBlock = (selectedImage: string) => {
    setSelectedProfileImage(selectedImage);
    setImg(selectedImage);
    setIsSelectImg(true);
    setProfileSelectVisible(false);

    if (inputNickname.length !== 0) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputNickname(value);
    if (value.length !== 0 && isSelectImg) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  return (
    <>
      <section className="join-profile-header">
        <h1>
          거의 다 왔어요!
          <br />
          프로필을 설정해 주세요.
        </h1>
      </section>

      <section className="join-profile-input">
        <div className="box text-center">
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ background: 'none', border: 'none' }}
            onClick={handleImageClick}
          >
            <img
              src={selectedProfileImage}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
        </div>
        <input
          type="text"
          className="form-control mt-5"
          id="nickname"
          placeholder="닉네임"
          onChange={handleChangeNickname}
        />
      </section>

      <section className="join-profile-btn">
        <div className="buttonContainer">
          <Button
            className="agreement-btn custom-button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={isNextDisabled}
            style={{
              backgroundColor: isNextDisabled ? '#DDDBD6' : '#FFB800',
              color: 'white',
              border: 'none',
            }}
          >
            다음
          </Button>
        </div>
      </section>
      <section
        className="join-profile-select"
        style={{
          transform: isProfileSelectVisible ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile1)}
          >
            <img
              src={profile1}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>

          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile2)}
          >
            <img
              src={profile2}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile3)}
          >
            <img
              src={profile3}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile4)}
          >
            <img
              src={profile4}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile5)}
          >
            <img
              src={profile5}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={() => handleImageClickBlock(profile6)}
          >
            <img
              src={profile6}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
        </div>
      </section>
    </>
  );
}
