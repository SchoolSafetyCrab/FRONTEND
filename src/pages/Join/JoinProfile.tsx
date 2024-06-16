import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from '../../assets/images/logo.png';

export default function JoinProfile() {
  const [img, setImg] = React.useState(false);
  const navigate = useNavigate();

  const handleImg = () => {
    setImg(true);
  };

  const handleNext = () => {
    navigate('/join/identity');
  };

  return (
    <div>
      <h1>거의 다 왔어요!</h1>
      <h1>프로필을 설정해 주세요.</h1>
      <div className="box text-center">
        <button
          type="button"
          className="btn p-0 border-0"
          style={{ background: 'none' }}
          onClick={handleImg}
        >
          <img
            src={logo}
            className="rounded-circle profile mx-auto d-block border border-2 img-thumbnail"
            alt="프로필 이미지"
            aria-label="프로필 이미지 선택"
          />
        </button>
      </div>
      <input type="text" className="form-control mt-3" id="nickname" placeholder="닉네임" />
      <div className="buttonContainer d-grid gap-2">
        <button onClick={handleNext} type="button" className="btn btn-primary mt-3">
          Next
        </button>
      </div>

      {img && (
        <div
          className="offcanvas offcanvas-bottom"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">
              이미지 업로드
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <p>이미지를 업로드해 주세요.</p>
            <input type="file" className="form-control" id="uploadImage" />
          </div>
        </div>
      )}
    </div>
  );
}
