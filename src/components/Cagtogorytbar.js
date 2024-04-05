import React from "react";
import { Container, Row, Col, Card, ProgressBar, Image } from "react-bootstrap";

const Cagtogorytbar = ({
  positive_percentage,
  negative_percentage,
  neutral_percentage,
}) => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={12}>
          {/* 옵션 */}
          긍정
          <ProgressBar
            now={positive_percentage}
            label={
              <span
                style={{ color: "black" }}
              >{`${positive_percentage}%`}</span>
            }
            className="mb-2"
          />
          부정{" "}
          <ProgressBar
            variant="danger"
            now={negative_percentage}
            label={
              <span
                style={{ color: "black" }}
              >{`${negative_percentage}%`}</span>
            }
            className="mb-2"
          />
          중립{" "}
          <ProgressBar
            variant="success"
            now={neutral_percentage}
            label={
              <span style={{ color: "black" }}>{`${neutral_percentage}%`}</span>
            } // 라벨 색상 변경
            className="mb-2"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Cagtogorytbar;
