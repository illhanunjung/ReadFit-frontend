import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBell,
  faCheckCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const StatusCard = ({ icon, title, isActive, onClick }) => {
  return (
    <Card
      className="status-card text-center"
      style={{
        width: "6rem",
        margin: "0.5rem",
        borderColor: isActive ? "#FFD700" : "#d4d4d4",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Card.Body>
        <FontAwesomeIcon icon={icon} className="status-icon" />
        <Card.Text style={{ color: isActive ? "#FFD700" : "black" }}>
          {title}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const BoardMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const iconList = [faCircle, faHeart, faBell, faCheckCircle, faBell];
  const titleList = ["디자인", "색상", "착용감", "가격", "품질"];

  return (
    <Container>
      <Row className="justify-content-center">
        {iconList.map((icon, index) => (
          <Col xs={3} key={index}>
            <StatusCard
              icon={icon}
              title={titleList[index]}
              isActive={activeIndex === index}
              onClick={() => handleCardClick(index)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BoardMenu;
