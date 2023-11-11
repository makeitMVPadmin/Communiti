import "./DashboardHome.scss"
import clockIcon from "../../../assets/images/clockIcon.svg"

export default function DashboardHome () {
    return(
       <>
            <div className="container">
                <div className="welcome">
                    <h1> Welcome Back, NAME 👋 </h1>
                </div>
                <div className="post-container">
                    <div className="icon-heading">
                        <div className="profile-image">

                        </div>
                        <div className="heading">
                            <div className="name"> Early Career Designers</div>
                            <div className="time-posted">
                                <img src={clockIcon} alt="" />
                                <p>10 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex, inventore voluptate quidem delectus, saepe vitae, illum odit optio ullam voluptas excepturi laborum ipsum voluptatibus! Ut eos asperiores assumenda unde!</p>
                    </div>
                </div>
            </div>
       </> 
    )
}