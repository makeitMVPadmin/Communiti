import './HomePage.scss';

import communitiLong from '../../assets/logos/communiti2.svg';
import google from '../../assets/logos/google.svg';
import facebook from '../../assets/logos/facebook.svg';
import apple from '../../assets/logos/apple.svg';

import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <header className='header-main'>
                <img src={communitiLong} alt="logo for Communiti" className='header-main__logo'></img>
            </header>

            <main className='home'>
                <div className='home__image'>
                </div>

                <section className='home__content'>
                    <h1 className='home__heading'>
                        Welcome to your Communiti!
                    </h1>
                    <div className='home__buttons'>
                        <button className='home__buttons-button home__buttons-button--login'>Log In</button>
                        <Link to='/signup' className='home__buttons-button home__buttons-button--signup'>Sign Up</Link>
                    </div>

                    <p className='home__writing'>or</p>

                    <div className='home__alt-buttons'>
                        <div className='home__alt-buttons-button home__alt-buttons-button--google'>
                            <img src={google} alt='logo for Google' className='home__icon'></img>
                        </div>
                        <div className='home__alt-buttons-button home__alt-buttons-button--facebook'>
                            <img src={facebook} alt='logo for Facebook' className='home__icon'></img>
                        </div>
                        <div className='home__alt-buttons-button home__alt-buttons-button--apple'>
                        <img src={apple} alt='logo for Apple' className='home__icon'></img>
                        </div>
                    </div>
                </section>
                
            </main>
        </>
        
    )
}

export default HomePage;