import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import './Announcements.scss';

import back from '../../assets/images/back.svg';

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
                        <img src={back}></img>
                        <p>
                            Back to Communities
                        </p>
                    </div>
                    
                </section>
            </main>
        </>

    )
}

export default Announcements;