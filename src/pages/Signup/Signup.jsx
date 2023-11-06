import './Signup.scss';

import communitiLong from '../../assets/logos/communiti2.svg';

function Signup() {
    return (
        <>
            <header className='header-signup'>
                <img src={communitiLong} alt="logo for Communiti" className='header-signup__logo'></img>
            </header>

            <main className='signup'>
                <div className='signup__image'>
                </div>

                <section className='signup__content'>
                    <h1 className='signup__heading'>
                        Sign Up / Create your Communiti!
                    </h1>

                    <div className='signup__buttons'>
                        <div className='signup__buttons-button'>
                            <p className='signup__buttons-button-writing'>
                                Email
                            </p>
                        </div>
                        <div className='signup__buttons-button'>
                            <p className='signup__buttons-button-writing'>
                                Password
                            </p>
                        </div>
                        <div className='signup__buttons-button'>
                            <p className='signup__buttons-button-writing'>
                                Sign Up
                            </p>
                        </div>
                        <div className='signup__buttons-button'>
                            <p className='signup__buttons-button-writing'>
                                Sign Up With Google
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Signup;