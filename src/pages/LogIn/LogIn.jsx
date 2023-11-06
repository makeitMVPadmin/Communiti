import './LogIn.scss';

import communitiLong from '../../assets/logos/communiti2.svg';

function LogIn() {
    return (
        <>
            <header className='header-login'>
                <img src={communitiLong} alt="logo for Communiti" className='login__logo'></img>
            </header>

            <main className='login'>
                <div className='home__image'>
                </div>

                <section className='login__content'>
                    <h1 className='home__heading'>
                        Welcome to your Communiti!
                    </h1>

                    <div className='login__buttons'>
                        <div className='login__buttons-button'>
                            <p className='login__buttons-button-writing'>
                                Username
                            </p>
                        </div>
                        <div className='login__buttons-button'>
                            <p className='login__buttons-button-writing'>
                                Password
                            </p>
                        </div>
                        <div className='login__buttons-button'>
                            <p className='login__buttons-button-writing'>
                                Sign In
                            </p>
                        </div>
                        <div className='login__buttons-button'>
                            <p className='login__buttons-button-writing'>
                                Sign In With Google
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default LogIn;