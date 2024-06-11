import { useNavigate } from 'react-router-dom';

export default function JoinIdAndPw() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/join/profile');
  };

  return (
    <div>
      <h1>Set ID and Password</h1>
      <p>Create your ID and password.</p>
      <button onClick={handleNext} type="button">
        Next
      </button>
    </div>
  );
}
