import "./Navbar.scss"
import Button from "../Button/Button"

export default function Navbar () {

    return(
        <>
            <nav className="navbar">
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
