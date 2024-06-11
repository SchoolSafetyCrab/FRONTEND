import { useNavigate } from 'react-router-dom';

export default function Verification() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/join/id-and-pw');
  };

  return (
    <div>
      <h1>Verification</h1>
      <p>Verify your identity.</p>
      <button onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
}
