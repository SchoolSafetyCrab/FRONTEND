import { useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import profile from '@assets/images/profile.svg';
import '@styles/join/JoinProfile.css';

export default function JoinProfile() {
  const navigate = useNavigate();
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isProfileSelectVisible, setProfileSelectVisible] = useState(false);

  const handleNext = () => {
    navigate('/join/identity');
  };

  const handleImageClick = () => {
    setProfileSelectVisible(true);
  };
  const handleImageClickBlock = () => {
    setProfileSelectVisible(false);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setIsNextDisabled(value.length === 0);
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
              src={profile}
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
              backgroundColor: isNextDisabled ? '#DDDBD6' : '#007bff',
              color: 'white',
              border: 'none',
            }}
          >
            Next
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
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>

          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
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
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
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
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
              alt="프로필 이미지"
              aria-label="프로필 이미지 선택"
              style={{ border: 'none' }}
            />
          </button>
          <button
            type="button"
            className="btn p-0 border-0"
            style={{ backgroundColor: '#ffffff', border: 'none' }}
            onClick={handleImageClickBlock}
          >
            <img
              src={profile}
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
