import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../css/cmenu.css";

function CMenu() {
  return (
    <Container fluid className="my-5 cmenu">
      <Row>
        <ButtonGroup size="lg" className="mb-2">
          <Button style={{ backgroundColor: "#f0f8ff", color: "black" }}>
            카테고리
          </Button>
          <Button className="list">운동화</Button>
          <Button className="list">힐</Button>
          <Button className="list">단화</Button>
          <Button className="list">슬리퍼</Button>
          <Button className="list">부츠</Button>
          <Button className="list">기능화</Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
}

export default CMenu;
