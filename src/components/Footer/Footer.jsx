import "./Footer.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import instagram from "../../assets/logos/instagram.svg";
import twitter from "../../assets/logos/twitter.svg";
import linkedin from "../../assets/logos/linkedin.svg";
import communiti2 from "../../assets/logos/communiti2.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="logo-container">
        <img className="logo" src={communiti2} alt="communiti in black font" />
        <Button buttonText="Join the Launch" className="button button--yellow" />
      </div>
      <div className="separator"></div>
      <div className="icon-row">
        <Link>
          <img src={instagram} alt="instagram" />
        </Link>
        <Link>
          <img src={twitter} alt="twitter" />
        </Link>
        <Link>
          <img src={linkedin} alt="linkedin" />
        </Link>
      </div>
    </div>
  );
}
export default Footer;
