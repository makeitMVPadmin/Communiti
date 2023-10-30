import "./Navbar.scss"
import Button from "../Button/Button"

export default function Navbar () {

    return(
        <>
            <nav className="navbar">
                <ul className="nav-links">
                    <li>Home</li>
                    <li>About</li>
                    <li><Button buttonText="Log In"/></li>
                    <li><Button buttonText="Sign Up"/></li>
                </ul>
            </nav>
        </>
    )
}
