import React from "react";
import { Container, Row, Col, Card, ProgressBar, Image } from "react-bootstrap";

const Cagtogorytbar = ({ positivePercentage, negativePercentage }) => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={12}>
          {/* 옵션 */}
          긍정
          <ProgressBar
            now={positivePercentage}
            label={`${positivePercentage}%`}
            className="mb-2"
          />
          부정{" "}
          <ProgressBar
            variant="danger"
            now={negativePercentage}
            label={`${negativePercentage}%`}
            className="mb-2"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Cagtogorytbar;
