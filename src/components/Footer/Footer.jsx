import "./Footer.scss"
import instagram from "../../assets/logos/instagram.svg"
import twitter from "../../assets/logos/twitter.svg"
import linkedin from "../../assets/logos/linkedin.svg"

export default function Footer() {
    return(
        <>
            <div className="footer">
                <div className="icon-row">
                    <a href="#">
                        <img src={instagram} alt="instagram" />
                    </a>
                    <a href="#">
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a href="#">
                        <img src={linkedin} alt="linkedin" />
                    </a>
                </div>
            </div>
        </>
    )
}