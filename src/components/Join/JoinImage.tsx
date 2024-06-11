import { useNavigate } from 'react-router-dom';

export default function JoinImage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/join/identity');
  };

  return (
    <div>
      <h1>Upload Profile Image</h1>
      <p>Upload your profile image.</p>
      <button onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
}
