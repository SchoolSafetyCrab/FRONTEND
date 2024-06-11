import logo from '../../assets/images/logo.png';
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading">
      <img className="imgs" src={logo} alt="logo img" />
    </div>
  );
}
