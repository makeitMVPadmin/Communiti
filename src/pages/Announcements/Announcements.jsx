import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import './Announcements.scss';

import back from '../../assets/images/back.svg';
import penAndPaper from '../../assets/images/penAndPaper.svg';
import location from '../../assets/images/location.svg';
import members from '../../assets/images/members.svg';

function Announcements() {

    const placeholderGroup = {
        name: "Product Pitchers",
        location: "San Francisco",
        meetingType: "Virtual",
        numMembers: 25,
        description: "Join our Product Enthusiasts Club for exclusive insights, discounts, and community. Stay ahead with the latest trends and meet fellow product aficionados. Your gateway to product innovation!",
        announcements: [],
        thumb: "somethinghere"
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
                        <img src={penAndPaper}></img>
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
                                    <img src={members}></img>
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
                        <p>
                            {placeholderGroup.description}
                        </p>
                    </section>
                </section>
            </main>
        </>

    )
}

export default Announcements;