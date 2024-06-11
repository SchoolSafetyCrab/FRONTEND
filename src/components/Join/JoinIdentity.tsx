import { useNavigate } from 'react-router-dom';

export default function JoinIdentity() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Confirm Identity</h1>
      <p>Confirm your identity to complete registration.</p>
      <button onClick={handleNext} type="button">
        Finish
      </button>
    </div>
  );
}
