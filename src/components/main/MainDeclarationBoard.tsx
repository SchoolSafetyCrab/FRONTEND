import React, { useState, ChangeEvent, useEffect } from 'react';
import { useAtom } from 'jotai';

import '@styles/main/MainBoard.css';
import { Button } from 'react-bootstrap';
import declartionImg from '@assets/images/main/inputImg.svg';
import uploadImageToImgBB from '../../api/main/UploadImg';
import {
  isBoardVisibleAtom,
  isDeclarationAtom,
  latlongDeclarationAtom,
} from '../../store/declaration/Declarationstore';
import declarationRequest from '../../api/main/DeclarationRequest';

export default function MainDeclarationBoard() {
  // 상태 초기화: 제목, 내용, 업로드된 이미지 URL 배열
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isDeclaration, setIsDeclaration] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectImages, setSelectImages] = useState<File[]>([]);
  const [saveImg, setSaveImg] = useState<string[]>([]);
  const [latLong, setLatLon] = useAtom(latlongDeclarationAtom);
  const [isBoardVisible, setBoardVisible] = useAtom(isBoardVisibleAtom);
  const [, setIsDeclarationAtom] = useAtom(isDeclarationAtom);

  // 제목 입력 핸들러
  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // 이미지 업로드
  const handleUploadImg = async () => {
    console.log(selectImages);
    const newImagesSave: string[] = [];

    // Promise.all을 사용하여 각 이미지 파일을 순차적으로 업로드하고 결과를 기다립니다.
    await Promise.all(
      selectImages.map(async (file) => {
        const uploadFile: string | null = await uploadImageToImgBB(file);
        if (uploadFile !== null) {
          newImagesSave.push(uploadFile);
        }
      }),
    );

    // 업로드된 이미지를 기존 saveImg에 추가하고 상태 업데이트합니다.
    const updatedSaveImages = [...saveImg, ...newImagesSave];
    setSaveImg(updatedSaveImages);

    // 이미지 업로드가 완료된 후에 신고 요청을 보냅니다.
    const result = await declarationRequest({
      latitude: latLong.latitude,
      longitude: latLong.longitude,
      title,
      detail: content,
      images: updatedSaveImages, // updatedSaveImages를 사용합니다.
    });

    return result;
  };

  const handleDeclaration = async () => {
    // 이미지 업로드를 먼저 처리합니다.
    await handleUploadImg();
    setBoardVisible(false);
    setLatLon({ latitude: '', longitude: '' });
    setIsDeclarationAtom(true);
    setTitle('');
    setContent('');
    setIsDeclaration(true);
    setUploadedImages([]);
    setSelectImages([]);
    setSaveImg([]);
  };

  // 이미지 업로드 핸들러
  const handleAddImages = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    if (uploadedImages.length === 4) return;

    const newImages: string[] = [];
    const newImageFiles: File[] = [];

    // 선택된 각 파일에 대해 URL 생성하여 배열에 추가
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
      newImageFiles.push(file);
    }

    // 기존 이미지와 새로 추가된 이미지를 합침
    const updatedImages = [...uploadedImages, ...newImages];
    const updatedImageFiles = [...selectImages, ...newImageFiles];

    // 최대 10개까지 제한 (필요시)
    const limitedImages = updatedImages.slice(0, 10);

    // 상태 업데이트
    setUploadedImages(limitedImages);
    setSelectImages(updatedImageFiles);
  };

  useEffect(() => {
    if (title.length !== 0 && content.length !== 0 && uploadedImages.length !== 0) {
      setIsDeclaration(false);
    } else {
      setIsDeclaration(true);
    }
  }, [title, content, uploadedImages.length]);

  return (
    <section
      className="mainDeclarationBoardContainer"
      style={{
        transform: isBoardVisible ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="declarationBoardHeader">
        <Button
          className="agreement-btn custom-button"
          variant="primary"
          size="lg"
          disabled={isDeclaration}
          onClick={handleDeclaration}
          style={{
            backgroundColor: '#FFB800',
            width: '20%',
            height: '40%',
            color: 'white',
            border: 'none',
            padding: 0,
            fontSize: '1rem',
            borderRadius: '20px',
          }}
        >
          신고
        </Button>
      </div>
      <div className="declarationBoardContent">
        <div className="declarationTitle">
          <textarea
            className="form-control"
            id="titleTextarea"
            rows={1}
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="declarationDetail">
          <textarea
            className="form-control"
            id="contentTextarea"
            rows={3}
            placeholder="신고 내용을 입력해주세요"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="declarationImg">
          <input
            type="file"
            accept=".png, .svg"
            multiple
            onChange={handleAddImages}
            style={{ display: 'none' }}
            id="imageUploadInput"
          />
          <label htmlFor="imageUploadInput">
            {uploadedImages.length === 0 ? (
              <img src={declartionImg} alt="신고이미지" style={{ cursor: 'pointer' }} />
            ) : (
              <div className="uploadedImages">
                {uploadedImages.map((image, index) => (
                  <img src={image} alt={`이미지-${index}`} />
                ))}
              </div>
            )}
          </label>
        </div>
      </div>
    </section>
  );
}
