import Nav from "../components/Nav";
import Carousels from "../components/Carousel";
import "../css/Home.css";
import Barchart from "../components/Barch";
import CardHome from "../components/CardHome";
import MainSearch from "../components/MainSearch";

function Home() {
  return (
    <div className="Home">
      <Nav />
      <br></br>
      <div id="content">
        <MainSearch />
        <br></br>
        <Carousels />
        <br></br>
        <span>리뷰 많은 순</span> <span>별점 많은 순</span>
        <br></br>
        <CardHome />
        {/* <Barchart /> */}
      </div>
    </div>
  );
}

export default Home;
