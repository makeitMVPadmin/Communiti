import './EventsTab.scss';

function EventsTab({events}) {
    function noEvents() {
        return (
            <div className='events-tab__none'>
                <p className='events-tab__none-writing'>
                    Bring your community to life! Create events to connect and engage
                </p>
                <button className='events-tab__none-button'>
                    + Create Event
                </button>
            </div>
        )
    }

    function someEvents() {
        return (
            <div>
                <h1>hello</h1>
            </div>
        )
    }

    return (
        <section className="events-tab">
            {(events.length === 0) ? noEvents() : someEvents()}
        </section>
    )
}

export default EventsTab;