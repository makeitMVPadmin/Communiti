import './MembersTab.scss';

import profilePic from '../../assets/images/profilePic.svg';
import chat from '../../assets/images/chatSingle.svg';

function MembersTab({groupMembers}) {
    return (
        <section className='members-tab'>
            <div className='members-tab__header'>
                <h2 className='members-tab__header-heading'>
                    Members
                </h2>
                <p className='members-tab__header-groupnum'>
                    ({groupMembers.length})
                </p>
            </div>

            <ul className='members-tab__members'>
                {
                    groupMembers.map( member => (
                        <li key={member.id} className='members-tab__members-member'>

                            <div className='members-tab__members-member-left'>
                                <img className='members-tab__members-member-profile-pic' src={profilePic} alt={`${member.name} profile picture`}></img>

                                <div className='members-tab__members-member-writing'>
                                    <p className='members-tab__members-member-writing-name'>
                                        {member.name}
                                    </p>
                                    <p className='members-tab__members-member-writing-role'>
                                        {member.role}
                                    </p>
                                </div>
                            </div>

                            <img className='members-tab__members-member-icon' src={chat} alt="chat bubble icon"></img>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default MembersTab;