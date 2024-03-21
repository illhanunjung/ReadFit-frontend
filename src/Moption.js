import React from "react";
import { Container, Row, Col, Card, ProgressBar, Image } from "react-bootstrap";

const Moption = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={12}>
          {/* 옵션 */}
          <Card>
            <Card.Body>
              <Card.Title>옵션</Card.Title>
              사이즈
              <ProgressBar now={60} label={`60%`} className="mb-2" />
              <ProgressBar
                variant="danger"
                now={30}
                label={`30%`}
                className="mb-2"
              />
              착용감
              <ProgressBar now={30} label={`30%`} className="mb-2" />
              <ProgressBar
                variant="danger"
                now={60}
                label={`60%`}
                className="mb-2"
              />
              착용감
              <ProgressBar now={30} label={`30%`} className="mb-2" />
              <ProgressBar
                variant="danger"
                now={60}
                label={`60%`}
                className="mb-2"
              />
              착용감
              <ProgressBar now={30} label={`30%`} className="mb-2" />
              <ProgressBar
                variant="danger"
                now={60}
                label={`60%`}
                className="mb-2"
              />
              착용감
              <ProgressBar now={30} label={`30%`} className="mb-2" />
              <ProgressBar
                variant="danger"
                now={60}
                label={`60%`}
                className="mb-2"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Moption;
