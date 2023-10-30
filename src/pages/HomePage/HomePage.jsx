import "./HomePage.scss";
import Navbar from "../../components/Example/Navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title"> Welcome !</h1>
      <Navbar />
    </div>
  );
};

export default Home;
