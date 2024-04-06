import React, { useRef } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navs from "../components/Nav";
import "../css/Mains1.css"; // 스타일시트 경로 확인
import { Link } from "react-router-dom";
// import SocialKakao from "../api/kakaoApi";

const Main1 = () => {
  const topRef = useRef(null); // 페이지 최상단을 가리키는 참조 생성

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={topRef}>
      <Navs />
      <Container fluid className="main-container">
        <Row className="align-items-center justify-content-center">
          <Col lg={6} className="text-center">
            <div className="brand-small">신발 리뷰 분석 서비스</div>
            <div className="download-buttons mt-4">
              <Link to="/main2" className="download-link me-3">
                시작하기
              </Link>
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
              <h2>카테고리 TOP10</h2>
              <p>리뷰 많은 TOP10 상품 제시</p>
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
            <Image src="/img/back4444.png" fluid />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Button className="last" onClick={scrollToTop}>
              맨 위로
            </Button>
          </Col>
        </Row>
        {/* <SocialKakao /> */}
      </Container>
    </div>
  );
};

export default Main1;
