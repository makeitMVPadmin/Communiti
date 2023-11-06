import "./HomePage.scss";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import AltHeader from "../../components/AltHeader/AltHeader";
import google from "../../assets/logos/google-black.svg";
import facebook from "../../assets/logos/facebook-black.svg";
import apple from "../../assets/logos/apple-black.svg";
import homeImg from "../../assets/images/homeIcon.svg";

function HomePage() {
  return (
    <>
      <AltHeader />
      <main className="homepage">
        <img src={homeImg} alt="Home Icon" className="homepage__image"></img>
        <section className="homepage__content">
          <h1 className="homepage__heading">
            Welcome to your <br /> Communiti!
          </h1>
          <div className="homepage__buttons">
            <Link to="/login" className="homepage__buttons-link">
              <Button buttonText="Log In" className="button button--black" />
            </Link>
            <Link to="/signup" className="homepage__buttons-link">
              <Button buttonText="Sign Up" className="button button--gray" />
            </Link>
          </div>
          <p className="homepage__writing">or</p>
          <div className="homepage__sso">
            <button className="homepage__sso-button homepage__sso-button--google">
              <img
                src={google}
                alt="logo for Google"
                className="homepage__sso-icon"
              ></img>
            </button>
            <button className="homepage__sso-button homepage__sso-button--facebook">
              <img
                src={facebook}
                alt="logo for Facebook"
                className="homepage__sso-icon"
              ></img>
            </button>
            <button className="homepage__sso-button homepage__sso-button--apple">
              <img
                src={apple}
                alt="logo for Apple"
                className="homepage__sso-icon"
              ></img>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
