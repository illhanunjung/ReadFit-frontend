import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navs from "../components/Nav";
import "../css/Rboard1.css"; // 스타일시트 경로 확인

const Main3 = () => {
  return (
    <div>
      <Navs />
      <Container fluid className="main-container">
        <Row className="align-items-center justify-content-center">
          <Col lg={6} className="text-center">
            <div className="brand-small">신발 리뷰 분석 서비스</div>
            <div className="download-buttons mt-4">
              <a href="#" className="download-link me-3">
                시작하기
              </a>
            </div>
          </Col>
          <Col lg={6}>
            <Image src="/img/back3.png" fluid />
          </Col>
        </Row>
        <Row className="se">
          <Col className="se_con d-flex flex-column align-items-left">
            <div className="review-container d-flex align-items-left">
              <div className="review">리뷰를 Read</div>
            </div>
            <div className="data">내 신발을 Fit!</div>
          </Col>
        </Row>

        <Row className="se1 th-row">
          <Col lg={6} md={6} className="th-col">
            <div className="number-circle">01</div>
            <div className="th-content">
              <h2>리뷰 분석</h2>
              <p>키워드 별로 리뷰 분석</p>
            </div>
          </Col>
          <Col lg={6} md={6} className="th-col">
            <div className="number-circle">02</div>
            <div className="th-content">
              <h2>카테고리 TOP5</h2>
              <p>리뷰 많은 TOP5 상품 제시</p>
            </div>
          </Col>
        </Row>
        <Row className="se1 th-row">
          <Col lg={6} md={6} className="th-col">
            <div className="number-circle">03</div>
            <div className="th-content">
              <h2>리뷰 분석 상세 페이지</h2>
              <p>심층적인 데이터 분석</p>
            </div>
          </Col>
          <Col lg={6} md={6} className="th-col">
            <div className="number-circle">04</div>
            <div className="th-content">
              <h2>챗봇</h2>
              <p>챗봇을 통한 리뷰 분석</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Image src="/img/123.png" fluid />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Button className="last">View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main3;
