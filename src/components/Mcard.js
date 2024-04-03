import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faThumbsDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Mcard.css"; // 스타일 시트 경로를 확인하세요.
import { Link } from "react-router-dom";

const Mcard = ({
  shoe_img,
  positivePercentage,
  negativePercentage,
  reviewCount,
  shoe,
  reviews,
}) => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [hoverReview, setHoverReview] = useState(false); // 리뷰 텍스트 호버 상태 관리

  // 이전 리뷰 보기 함수
  const handlePreviousReview = () => {
    setReviewIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  // 다음 리뷰 보기 함수
  const handleNextReview = () => {
    setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // 현재 리뷰 객체
  const currentReview =
    reviews && reviews.length > 0 ? reviews[reviewIndex].review : null;

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4 custom-col">
      <Card className="product-card">
        <Link to="/rboard">
          <Card.Img
            variant="top"
            src={shoe_img}
            alt="Product"
            className="product-image"
          />
        </Link>
        <Card.Body className="card-body-custom">
          <Card.Title className="product-title">{shoe}</Card.Title>
          <div
            className="review-container"
            onMouseEnter={() => setHoverReview(true)}
            onMouseLeave={() => setHoverReview(false)}
          >
            {hoverReview && (
              // 왼쪽 버튼이 이전 리뷰를 보여줍니다.
              <Button
                variant="link"
                onClick={handlePreviousReview} // 이전 리뷰 보기
                className="review-button left"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
            )}
            {currentReview && (
              <span className="review-text">{currentReview}</span>
            )}
            {/* 리뷰 텍스트 표시 */}
            {hoverReview && (
              // 오른쪽 버튼이 다음 리뷰를 보여줍니다.
              <Button
                variant="link"
                onClick={handleNextReview} // 다음 리뷰 보기
                className="review-button right"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            )}
          </div>
          <hr className="product-divider" />
          <div className="product-hover-info">
            <span>
              <FontAwesomeIcon icon={faEye} /> {reviewCount}
            </span>
            <span>
              <FontAwesomeIcon icon={faThumbsUp} /> {positivePercentage}%
            </span>
            <span>
              <FontAwesomeIcon icon={faThumbsDown} /> {negativePercentage}%
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Mcard;
