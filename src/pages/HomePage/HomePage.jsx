import "./HomePage.scss";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <h1 className="home__title"> Welcome !</h1>
    </div>
  );
};

export default Home;
