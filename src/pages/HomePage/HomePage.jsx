import './HomePage.scss';

import communitiLong from '../../assets/logos/communiti2.svg';
import google from '../../assets/logos/google.svg';
import facebook from '../../assets/logos/facebook.svg';
import apple from '../../assets/logos/apple.svg';

// import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <main className='home'>
            <img src={communitiLong} alt="logo for Communiti" className='home__logo'></img>

            <div className='home__image'>
            </div>

            <h1 className='home__heading'>
                Welcome to your 
                <div className='home__heading-comminuti'>
                    {/* <p>Communiti!</p> */}
                    <span className='yellow-shade'>Communiti!</span>
                </div>
            </h1>

            <button className='home__button home__button--login'>Log In</button>
            <button className='home__button home__button--signup'>Sign Up</button>

            <p className='home__writing'>or</p>

            <div className='home__alt-buttons'>
                <div className='home__alt-buttons-button'>
                    <img src={google} alt='logo for Google' className='home__icon'></img>
                </div>
                <div className='home__alt-buttons-button'>
                    <img src={facebook} alt='logo for Facebook' className='home__icon'></img>
                </div>
                <div className='home__alt-buttons-button'>
                <img src={apple} alt='logo for Apple' className='home__icon'></img>
                </div>
            </div>
        </main>
    )
}

export default HomePage;