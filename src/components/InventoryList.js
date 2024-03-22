import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

const InventoryItem = ({ image, name }) => {
  return (
    <Col md={4} className="mb-4">
      <Card className="inventory-card h-100">
        <Image src={image} fluid className="inventory-image" />
        <Card.Body className="inventory-card-body text-center">
          <Card.Title className="inventory-title">{name}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

const InventoryList = () => {
  const inventoryItems = [
    { image: "/img/sh1.jpg", name: "나이키 신발 흰빨 검정색 모양" },
    { image: "/img/sh2.jpg", name: "아디다스 NNN...검정색 흰색줄 스니커즈" },
    { image: "/img/sh1.jpg", name: "나이키 신발 흰빨 검정색나이키 모양" },
    // ... additional images and names ...
  ];

  return (
    <Row>
      {inventoryItems.map((item, index) => (
        <InventoryItem key={index} image={item.image} name={item.name} />
      ))}
    </Row>
  );
};

export default InventoryList;
