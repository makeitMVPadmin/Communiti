import back from '../../assets/images/back.svg';
import placeholder from '../../assets/images/EventPlaceholderImg.png';
import calendar from '../../assets/images/calendarIcon.svg';
import clock from '../../assets/images/clockIcon.svg';
import location from '../../assets/images/location.svg';
import plus from '../../assets/images/PlusIcon-Black.svg';
import placeholder2 from '../../assets/images/woman-and-child.svg';
import rightArrow from '../../assets/images/rightArrowIcon.svg';
import profilePic from '../../assets/images/profilePic.svg';
import chat from '../../assets/images/chatSingle.svg';

import './EventsInfoModal.scss';

function EventsInfoModal({setShowEventsDetails}) {
    return (
        <article className='events-modal'>
            <div onClick={ () => setShowEventsDetails(false) } className='events-modal__top'>
                <img className='events-modal__top-icon' src={back}></img>
                <p className='events-modal__top-writing'>
                    Back
                </p>
            </div>
            <img className='events-modal__banner' src={placeholder}></img>
            <section className='events-modal__content'>
                <section className='events-modal__content-one'>
                    <h1 className='events-modal__content-one-heading'>
                        How AI can help in Marketing
                    </h1>

                    <p className='events-modal__content-one-writing'>
                        Come learn about different ways you can meet investors and learn how to pitch to them Come learn about different ways you can meet investors and learn how to pitch to them
                    </p>

                    <div className='events-modal__content-one-category'>
                        <img className='events-modal__content-one-icon' src={calendar}></img>
                        <p>WED, NOV 7</p>
                    </div>

                    <div className='events-modal__content-one-category'>
                        <img className='events-modal__content-one-icon' src={clock}></img>
                        <p>4:00 PM - 5:00 PM PST</p>
                    </div>

                    <div className='events-modal__content-one-category'>
                        <img className='events-modal__content-one-icon' src={location} ></img>
                        <p>213 Seymour st., Denver</p>
                    </div>
                </section>
                <section className='events-modal__content-two'>
                    <button className='events-modal__content-two-button'>
                        <img className='events-modal__content-two-icon' src={plus}></img>
                        <p className='events-modal__content-two-writing'>
                            RSVP
                        </p>
                        <div></div>
                    </button>
                </section>
            </section>
            <section className='events-modal__bottom'>
                <div className='events-modal__bottom-ftc'>
                    <h2 className='events-modal__bottom-ftc-heading'>
                        From the Community
                    </h2>
                    <div className='events-modal__bottom-ftc-container'>
                        <img className='events-modal__bottom-ftc-container-image' src={placeholder2}></img>
                        <div className='events-modal__bottom-ftc-container-right'>
                            <h3 className='events-modal__bottom-ftc-container-right-heading'>
                                Product Pitchers
                            </h3>
                            <button className='events-modal__bottom-ftc-container-right-button'>
                                <img src={rightArrow}></img>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='events-modal__bottom-ob'>
                    <h2 className='events-modal__bottom-ob-heading'>
                        Organized by
                    </h2>
                    <div className='events-modal__bottom-ob-container'>
                        <img className='events-modal__bottom-ob-container-pic' src={profilePic}></img>
                        <div className='events-modal__bottom-ob-container-writing'>
                            <p className='events-modal__bottom-ob-container-writing--name'>
                                Marina Reese
                            </p>
                            <p className='events-modal__bottom-ob-container-writing--role'>
                                Product Manager
                            </p>
                        </div>
                        <img className='events-modal__bottom-ob-container-icon' src={chat}></img>
                    </div>
                </div>
            </section>
            
        </article>
    )
}

export default EventsInfoModal;