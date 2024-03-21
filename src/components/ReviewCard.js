import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import starFullIcon from "./star-icon.png"; // 별 이미지를 프로젝트에 추가하세요.
import reviewImage from "./Readfit.png"; // 리뷰 이미지를 프로젝트에 추가하세요.

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false); // 리뷰 내용을 펼칠지 여부를 결정하는 상태

  // 별점을 나타내는 별 이미지를 렌더링하는 함수
  const renderStars = (rating) =>
    Array.from({ length: rating }, (_, index) => (
      <img
        key={index}
        src={starFullIcon}
        alt="Star"
        style={{ width: "20px", height: "20px" }}
      />
    ));

  // 내용이 길 경우 '리뷰 더보기' 버튼을 표시하는 함수
  const renderContent = (content) => {
    if (content.length < 220 || expanded) {
      return <div>{content}</div>;
    } else {
      return (
        <div>
          {`${content.substring(0, 220)}... `}
          <Button variant="link" onClick={() => setExpanded(true)}>
            리뷰 더보기
          </Button>
        </div>
      );
    }
  };

  return (
    <Card style={{ width: "100%", marginBottom: "20px" }}>
      <Card.Body>
        <Card.Title>{review.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {renderStars(review.rating)}
          <span style={{ marginLeft: "15px" }}>{review.date}</span>
          <span style={{ marginLeft: "15px" }}>{review.id}</span>
        </Card.Subtitle>
        <Card.Text>{renderContent(review.content)}</Card.Text>
        {review.image && (
          <img
            src={review.image}
            alt="Review"
            style={{
              width: "45px",
              height: "45px",
              objectFit: "cover",
              marginTop: "15px",
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};

const ReviewsList = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5);
  };

  return (
    <>
      {reviews.slice(0, visibleReviews).map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
      {visibleReviews < reviews.length && (
        <Button variant="primary" onClick={showMoreReviews}>
          더보기
        </Button>
      )}
    </>
  );
};

// 가상의 리뷰 데이터 예시입니다. 실제 데이터로 대체해주세요.
const reviewsData = new Array(20).fill(0).map((_, i) => ({
  title: `리뷰 제목 ${i + 1}`,
  rating: 5,
  date: "2023-01-01",
  id: `user${i + 1}`,
  content:
    "이 제품은 정말 대단해요! 내용이 길어질 수 있으니, 여기서 축약해서 보여줍니다. 내용이 매우 길어질 수 있는데, 이 경우에는 더보기 버튼을 통해 내용을 전체 볼 수 있도록 합니다.",
  image: i % 3 === 0 ? null : "https://via.placeholder.com/45", // 일부 리뷰에는 이미지를 넣지 않습니다.
}));

const ExReview = () => {
  return <ReviewsList reviews={reviewsData} />;
};

export default ExReview;
