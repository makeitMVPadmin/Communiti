import "./Navbar.scss"
import Button from "../Button/Button"
import communiti from "../../assets/logos/communiti.svg"

export default function Navbar () {

    return(
        <>
            <nav className="navbar">
                <a href="#">
                    <img src={communiti} alt="communiti" />
                </a>
                <ul className="nav-links">
                    <li>Home</li>
                    <li>About</li>
                    <li><Button color="#FFFFFF" buttonText="Log In"/></li>
                    <li><Button color="#FFD22F" buttonText="Sign Up"/></li>
                </ul>
            </nav>
        </>
    )
}
