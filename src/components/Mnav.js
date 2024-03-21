import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "../css/Mnav.css";

const Mnav = () => {
  return (
    <Container fluid className="mamenu2-container">
      <Nav className="mamenu2 justify-content-center">
        <Nav.Item>
          <Nav.Link href="/home">운동화</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">구두</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">워커</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">샌들</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">슬리퍼</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-5">드라이빙</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-6">힐</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-7">기능화</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default Mnav;
