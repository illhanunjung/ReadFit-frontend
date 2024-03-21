import "../css/MainSearch.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MainSearch = () => {
  return (
    <Container fluid className="mainsearch ">
      <Row className="justify-content-center align-items-center ">
        <Col xs={12} md={6} lg={4} className="text-center">
          <img
            className="image-11-icon img-fluid"
            loading="lazy"
            alt=""
            src="/img/r1.png"
          />
        </Col>
        <Col xs={12} md={6} lg={4} className="text-center">
          <h1 className="value">1억 발들에게 물어봐</h1>
        </Col>
      </Row>
    </Container>
  );
};
export default MainSearch;
