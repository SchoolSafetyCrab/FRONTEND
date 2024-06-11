import { useNavigate } from 'react-router-dom';

export default function JoinProfile() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/join/image');
  };

  return (
    <div>
      <h1>Create Profile</h1>
      <p>Set up your profile information.</p>
      <button onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
}
