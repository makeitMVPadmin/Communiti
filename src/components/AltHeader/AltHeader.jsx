import "./AltHeader.scss";
import { Link } from "react-router-dom";
import communitiLong from "../../assets/logos/communiti2.svg";

function AltHeader() {
  return (
    <Link to="/home">
      <header className="header">
        <img
          src={communitiLong}
          alt="logo for Communiti"
          className="header__logo"
        ></img>
      </header>
    </Link>
  );
}

export default AltHeader;
