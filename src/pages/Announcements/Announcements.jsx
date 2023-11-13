import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import './Announcements.scss';

import back from '../../assets/images/back.svg';
import penAndPaper from '../../assets/images/penAndPaper.svg';
import location from '../../assets/images/location.svg';
import members from '../../assets/images/members.svg';

import { useState } from 'react';
import AnnouncementsTab from '../../components/AnnouncementsTab/AnnouncementsTab';

function Announcements() {
    const [showAnnouncements, setShowAnnouncements] = useState(true);
    const [showEvents, setShowEvents] = useState(false);
    const [showMembers, setShowMembers] = useState(false);

    const placeholderGroup = {
        name: "Product Pitchers",
        location: "San Francisco",
        meetingType: "Virtual",
        numMembers: 25,
        description: "Join our Product Enthusiasts Club for exclusive insights, discounts, and community. Stay ahead with the latest trends and meet fellow product aficionados. Your gateway to product innovation!",
        announcements: [],
        events: [],
        thumb: "somethinghere"
    }

    const [announcements, setAnnouncements] = useState(placeholderGroup.announcements);
    const [events, setEvents] = useState(placeholderGroup.events);

    function handleTabChoice(choice) {
        switch (choice) {
            case 'A':
                setShowAnnouncements(true);
                setShowEvents(false);
                setShowMembers(false);
                break;
            case 'E':
                setShowAnnouncements(false);
                setShowEvents(true);
                setShowMembers(false);
                break;
            case 'M':
                setShowAnnouncements(false);
                setShowEvents(false);
                setShowMembers(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <DashboardNavbar />
            <main className='announcements-page'>
                <section className='announcements-page__hero'>
                    <div className='announcements-page__hero-writing'>
                        <img className='announcements-page__hero-writing-icon' src={back} alt="arrow pointing left"></img>
                        <p>
                            Back to Communities
                        </p>
                    </div>
                    
                </section>
                <section className='announcements-page__card'>
                    <div className='announcements-page__card-top'>
                        <img className='announcements-page__card-top-pic' src={penAndPaper} alt="a pencil atop notebook with imaginative notes taken on it"></img>
                        <div className='announcements-page__card-writing'>
                            <h1 className='announcements-page__card-writing-top'>
                                {placeholderGroup.name}
                            </h1>
                            <div className='announcements-page__card-writing-bottom'>
                                <div className='announcements-page__card-writing-bottom-left'>
                                    <div className='announcements-page__card-card'>
                                        <img className='announcements-page__card-card-icon' src={location} alt="pin drop icon"></img>
                                        <p className='announcements-page__card-card-writing'>
                                            {placeholderGroup.location}
                                        </p>
                                    </div>
                                    <div className='announcements-page__card-card'>
                                        <img className='announcements-page__card-card-icon' src={location} alt="pin drop icon"></img>
                                        <p className='announcements-page__card-card-writing'>
                                            {placeholderGroup.meetingType}
                                        </p>
                                    </div>
                                </div>
                                <div className='announcements-page__card-writing-bottom-right'>
                                    <img src={members} alt="the silouhette of two people, one standing directly behind the other"></img>
                                    <p>
                                        {placeholderGroup.numMembers} members
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className='announcements-page__card-description'>
                        <h2 className='announcements-page__card-description-heading'>
                            Description
                        </h2>
                        <p className='announcements-page__card-description-description'>
                            {placeholderGroup.description}
                        </p>
                    </section>

                    <section className='announcements-page__aem'>
                        <div className='announcements-page__aem-tabs'>
                            <p onClick={ () => handleTabChoice('A') } className={showAnnouncements ? "announcements-page__aem-tabs-tab announcements-page__aem-tabs-tab--active" : "announcements-page__aem-tabs-tab"}>
                                Announcements
                            </p>
                            <p onClick={ () => handleTabChoice('E') } className={showEvents ? "announcements-page__aem-tabs-tab announcements-page__aem-tabs-tab--active" : "announcements-page__aem-tabs-tab"}>
                                Events
                            </p>
                            <p onClick={ () => handleTabChoice('M') } className={showMembers ? "announcements-page__aem-tabs-tab announcements-page__aem-tabs-tab--active" : "announcements-page__aem-tabs-tab"}>
                                Members
                            </p>
                        </div>

                        {showAnnouncements && <AnnouncementsTab announcements={announcements} /> }
                        {/* {showEvents && } */}

                    </section>
                </section>
            </main>
        </>

    )
}

export default Announcements;