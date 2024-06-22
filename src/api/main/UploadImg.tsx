const uploadImageToImgBB = async (file: File): Promise<string | null> => {
  const key = process.env.REACT_APP_IMGBB_KEY;
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data.data.url; // 이미지 링크 반환
    }
    return null;
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    return null;
  }
};
export default uploadImageToImgBB;
