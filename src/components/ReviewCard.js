import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Modal,
} from "react-bootstrap";
import { useWindowWidth } from "@react-hook/window-size"; // 창 크기를 감지하는 Hook
import { format, parseISO } from 'date-fns';

const StatusCard = ({ title, isActive, onClick }) => {
  return (
    <Card
      className={`text-center status-card ${isActive ? "active-card" : ""}`}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const BoardMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const titleList = [
    "디자인",
    "사이즈",
    "착화감",
    "내구성",
    "사용성",
    "기능성",
    "가격",
    "무게",
    "소재",
    "색상",
    "품질",
    "굽",
  ];

  const handleCardClick = (title) => {
    setActiveCategory(title);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {titleList.map((title, index) => (
          <Col xs={6} sm={4} md={3} key={index} className="mb-3">
            <StatusCard
              title={title}
              isActive={activeCategory === title}
              onClick={() => handleCardClick(title)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// const reviewsData = new Array(20).fill(0).map((_, i) => ({
//   title: `리뷰 제목 ${i + 1}`,
//   rating: 5,
//   date: "2023-01-01",
//   id: `user${i + 1}`,
//   content:
//     "이 제품은 정말 대단해요! 내용이 길어질 수 있으니, 여기서 축약해서 보여줍니다. 내용이 매우 길어질 수 있는데, 이 경우에는 더보기 버튼을 통해 내용을 전체 볼 수 있도록 합니다.",
//   image: i % 3 === 0 ? null : "https://via.placeholder.com/45",
// }));



const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  // ISO 문자열을 Date 객체로 파싱한 후, 원하는 형식으로 포맷팅
  const formattedDate = format(parseISO(review.review_at), 'yyyy-MM-dd');
  
  const reviewPolarity = review.review_polarity;
  let polarityText, polarityColor;
  switch (reviewPolarity) {
    case 1:
      polarityText = "부정";
      polarityColor = "red";
      break;
    case 2:
      polarityText = "긍정";
      polarityColor = "blue";
      break;
    case 0:
      polarityText = "중립";
      polarityColor = "black";
      break;
    default:
      polarityText = "미정";
      polarityColor = "gray";
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="me-3">
            <div className="d-flex align-items-center">
  
              <span className="me-2">{"⭐".repeat(parseInt(review.review_rating, 10))}</span>&nbsp;&nbsp;&nbsp;<span>{formattedDate}</span>&nbsp;&nbsp;&nbsp;<span style={{ color: polarityColor }}>{polarityText}</span>
            </div>
            <Card.Subtitle className="mb-1 text-muted d-flex align-items-center">
              <h5 className="my-2 mb-2" style={{fontWeight :"bold"}}>{review.review.substring(0, 34)}</h5>
              
            </Card.Subtitle>
            <Card.Text>
              {expanded
                ? review.review
                : `${review.review.substring(0, 100)}... `}
              {review.review.length > 100 && (
                <Button variant="link" onClick={handleReadMore}>
                  {expanded ? "숨기기" : "더보기"}
                </Button>
              )}
            </Card.Text>
          </div>
          {/* 이미지 처리 관련 주석 처리된 코드 생략 */}
        </div>
      </Card.Body>
    </Card>
  );
};
const ReviewsList = ({ reviews }) => {
  const windowWidth = useWindowWidth(); // 창 크기
  const isMobile = windowWidth <= 768; // 모바일 크기 판단
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(3); // 모바일에서 초기 보여질 리뷰 수

  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / visibleReviews);
  const lastIndex = currentPage * visibleReviews;
  const firstIndex = lastIndex - visibleReviews;
  const currentReviews = reviews.slice(firstIndex, lastIndex);




    // 페이지네이션 버튼의 최대 개수를 제한하기 위한 로직
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / visibleReviews) && i <= 10; i++) {
      pageNumbers.push(i);
    }
  

  const showMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  useEffect(() => {
    if (!isMobile) {
      setVisibleReviews(4); // 웹보여질 처음
    }
  }, [isMobile]);

  console.log("3",reviews);

    // 이전 페이지로 이동
    const handlePrev = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };
  
    // 다음 페이지로 이동
    const handleNext = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };
  

  return (
    <>
      {currentReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}

      {isMobile ? (
        visibleReviews < reviews.length && (
          <Button
            variant="primary"
            onClick={showMoreReviews}
            className="w-100 mt-3"
          >
            더보기
          </Button>
        )
      ) : (
        <Pagination className="justify-content-center my-4">
        <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, currentPage - 5), Math.min(currentPage + 4, totalPages))
          .map(number => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
              {number}
            </Pagination.Item>
          ))}
        <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
      </Pagination>

      )}
    </>
  );
};

const ExReview = ({reviews}) => {
  console.log("2",reviews);

  return (
    <>
      <p className="ct1">키워드</p>
      <BoardMenu />
      <p className="ct1">리뷰</p>
      
      <Container>
      <Row>
        <Col md={12}>
        <Card className="mb-3">
        <Card.Body>
        
              <Card.Text>
       dddd
              </Card.Text>

   
        </Card.Body>
      </Card>
        </Col>
      </Row>
      </Container>
      <p className="ct1">리뷰</p>
      <Container>
        <Row>
          <Col md={12}>
            <ReviewsList reviews={reviews} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExReview;
