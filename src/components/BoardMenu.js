import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const titleList = [
    "디자인",
    "치수/사이즈",
    "착화감",
    "내구성",
    "사용성",
    "기능성",
    "가격",
    "무게",
    "소재",
    "색상",
    "품질",
    "굽",
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        {titleList.map((index) => (
          <Col xs={3} key={index}>
            <StatusCard
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
