import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const InventoryItem = ({ image, name, shoe_seq, shoe_price }) => {
  return (
    <Link to={`/rboard/${shoe_seq}`} className="custom-link">
    <div className="card-container">
      <Card className="d-flex flex-row align-items-center my-1">
        <Card.Img className="col-100" src={image} alt="Card image" />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{shoe_price}₩</Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
    </Link>
  );
};



const InventoryList = ({ relShoes }) => {
  if (!relShoes) {
    return null; // 또는 로딩 상태를 보여줄 수도 있습니다.
  }
  return (
    <Row>
      {relShoes.map((item, index) => (
        <InventoryItem key={index} image={item.shoe_img} name={item.shoe} shoe_seq={item.shoe_seq} shoe_price={item.shoe_price} />
      ))}
    </Row>
  );
};

export default InventoryList;
