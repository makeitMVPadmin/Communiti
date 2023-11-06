import "./LogIn.scss";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import AltHeader from "../../components/AltHeader/AltHeader";
import homeImg from "../../assets/images/homeIcon.svg";
import google from "../../assets/logos/google-black.svg";

function LogIn() {
  return (
    <>
      <AltHeader />
      <main className="loginpage">
        <img src={homeImg} alt="Home Icon" className="loginpage__image"></img>
        <section className="loginpage__content">
          <h1 className="loginpage__heading">
            Login in to your <br /> Communiti!
          </h1>
          <form className="loginpage__form">
            <input
              className="loginpage__input"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="current-email"
            ></input>
            <input
              className="loginpage__input"
              placeholder="PASSWORD"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
            ></input>
            <Link to={"/forgotpassword"} className="loginpage__forgot-link">
              <p> FORGOT PASSWORD?</p>
            </Link>
            <Button buttonText="Sign In" className="button button--gray" />
          </form>
          <p className="loginpage__writing">or</p>
          <div className="loginpage__sso">
            <button className="loginpage__sso-button loginpage__sso-button--google">
              <img
                src={google}
                alt="logo for Google"
                className="loginpage__sso-icon"
              ></img>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default LogIn;
