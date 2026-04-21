import { useNavigate } from "react-router-dom";
import "./welcome.css";
import logo from "../../assets/logo2.png";

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div className="welcome">
      <div className="welcome-overlay">
        <div className="welcome-card">
          <div>
            <img src={logo} alt="logo" className="welcome-logo-img"/> 
          </div>

          <p className="welcome-subtitle">Enjoy the newest movies</p>

          <button className="welcome-button" onClick={handleStart}>
            Start watching
          </button>

          <p className="welcome-helper">
            Just demo mode · No account needed
          </p>
        </div>
      </div>
    </div>
  );
}