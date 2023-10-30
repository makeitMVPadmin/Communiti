import "./Navbar.scss"
import Button from "../Button/Button"
import communiti from "../../assets/logos/communiti.svg"
import miniCommuniti from "../../assets/logos/miniCommuniti.svg"
import { useState, useEffect } from "react"

export default function Navbar () {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    return(
        <>
            <nav className="navbar">
                <a href="#">
                    <img src={windowWidth < 480 ? miniCommuniti : communiti} alt="communiti" />
                </a>
                <ul className="nav-links">
                {windowWidth >= 768 ? (
                    <>
                    <li>Home</li>
                    <li>About</li>
                    </>
                ) : null}
                    <li><Button color="#FFFFFF" buttonText="Log In"/></li>
                    <li><Button color="#FFD22F" buttonText="Sign Up"/></li>
                </ul>
            </nav>
        </>
    )
}
