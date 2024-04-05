import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faThumbsDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../css/McardTOP.css"; // 스타일 시트 경로를 확인하세요.
import { Link } from "react-router-dom";

const McardTOP = ({
  shoe_img,
  positivePercentage,
  negativePercentage,
  reviewCount,
  shoe,
  reviews,
  shoe_seq
}) => {
  const [reviewIndex, setReviewIndex] = useState(0);

  // 리뷰 이동 함수
  const handlePreviousReview = () => {
    setReviewIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const handleNextReview = () => {
    setReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // 현재 리뷰
  const currentReview = reviews?.[reviewIndex]?.review;

  return (
    <Card  xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4 slider-card">
      <div className="slider-content">
      <Link to={`/rboard/${shoe_seq}`} className="pt">
          <div className="slider-image-container">
            <img
              src={shoe_img}
              alt="Product"
              className="slider-image"
            />
          </div>
        </Link>
        <div className="slider-info">
          <div className="slider-text">
            <h5>{shoe}</h5>
            {currentReview && <p className="slider-review-text">{currentReview}</p>}
          </div>
          <div className="slider-controls">
            <Button
              variant="link"
              onClick={handlePreviousReview}
              className="slider-button"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button
              variant="link"
              onClick={handleNextReview}
              className="slider-button"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>
      </div>
      <div className="slider-footer">
        <span>
          <FontAwesomeIcon icon={faEye} /> {reviewCount} Views
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} /> {positivePercentage}%
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsDown} /> {negativePercentage}%
        </span>
      </div>
    </Card>
  );
};

export default McardTOP;
