import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

const InventoryItem = ({ image, name }) => {
  return (
    <Card className="mb-3">
      <Row noGutters>
        <Col xs={4}>
          <Image src={image} fluid />
        </Col>
        <Col xs={8} className="d-flex align-items-center">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

const InventoryList = () => {
  const inventoryItems = [
    { image: "/img/Readfit.png", name: "상품 A" },
    { image: "/path/to/your/image2.png", name: "상품 B" },
    { image: "/path/to/your/image3.png", name: "상품 C" },
    // 실제 이미지 경로와 상품명으로 수정하세요.
  ];

  return (
    <div>
      {inventoryItems.map((item, index) => (
        <InventoryItem key={index} image={item.image} name={item.name} />
      ))}
    </div>
  );
};

export default InventoryList;
