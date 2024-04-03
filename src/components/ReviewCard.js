import { useWindowWidth } from "@react-hook/window-size"; // 창 크기를 감지하는 Hook
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Pagination,
  Row,
} from "react-bootstrap";



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

// const BoardMenu = () => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const titleList = [
//     "디자인",
//     "사이즈",
//     "착화감",
//     "내구성",
//     "사용성",
//     "기능성",
//     "가격",
//     "무게",
//     "소재",
//     "색상",
//     "품질",
//     "굽",
//   ];

//   const handleCardClick = (title) => {
//     setActiveCategory(title);
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         {titleList.map((title, index) => (
//           <Col xs={6} sm={4} md={3} key={index} className="mb-3">
//             <StatusCard
//               title={title}
//               isActive={activeCategory === title}
//               onClick={() => handleCardClick(title)}
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

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
    if (activeCategory === title) {
      setActiveCategory(null); // 이미 활성화된 카테고리를 클릭하면 비활성화합니다.
    } else {
      setActiveCategory(title); // 다른 카테고리를 클릭하면 활성화합니다.
    }
  };
  

  const [KeywordReviewSummary, setKeywordReviewSummary] = useState([]);
  useEffect(() => {
    // 페이지가 렌더링될 때 호출하고자 하는 함수를 호출합니다.
    fetchData(); // 이전에 작성한 컨트롤러 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 설정합니다.


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/rboard'); // 서버의 URL로 요청을 보냅니다.
      const data = await response.json();
      console.log(data); // 응답을 콘솔에 출력하거나 다른 작업을 수행합니다.
      // 가져온 데이터를 상태로 설정합니다.
      console.log(data.reviewSummary);
      setKeywordReviewSummary(data.reviewSummary);
      console.log(KeywordReviewSummary);

      // console.log("아래는 KeywordReviewSummary[0] 입니다."); 
      // console.log(KeywordReviewSummary.KeywordReviewSummary[0]['착화감']); 
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

      {/* 선택된 카테고리에 대한 컴포넌트 표시 */}
      {activeCategory && (
        <Row className="justify-content-center mt-3">
          <Col>
            <Card className="mb-3">
              <Card.Body>
                {/* 여기에 선택된 카테고리에 대한 컴포넌트를 표시하세요 */}
                <p>{KeywordReviewSummary[activeCategory]}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};



const reviewsData = new Array(20).fill(0).map((_, i) => ({
  title: `리뷰 제목 ${i + 1}`,
  rating: 5,
  date: "2023-01-01",
  id: `user${i + 1}`,
  content:
    "이 제품은 정말 대단해요! 내용이 길어질 수 있으니, 여기서 축약해서 보여줍니다. 내용이 매우 길어질 수 있는데, 이 경우에는 더보기 버튼을 통해 내용을 전체 볼 수 있도록 합니다.",
  image: i % 3 === 0 ? null : "https://via.placeholder.com/45",
}));

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div className="me-3">
              <div className="d-flex align-items-center">
                <span className="me-2">{"⭐".repeat(review.rating)}</span>
              </div>
              <Card.Subtitle className="mb-1 text-muted d-flex align-items-center">
                <h5 className="my-2 mb-2 ">{review.title}</h5>
                &nbsp;&nbsp;&nbsp;<span>{review.date}</span>
              </Card.Subtitle>
              <Card.Text>
                {expanded
                  ? review.content
                  : `${review.content.substring(0, 100)}... `}
                {review.content.length > 100 && (
                  <Button variant="link" onClick={handleReadMore}>
                    {expanded ? "숨기기" : "더보기"}
                  </Button>
                )}
              </Card.Text>
            </div>
            {review.image && (
              <div className="ms-auto">
                <img
                  src={review.image}
                  alt="Review"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  onClick={handleImageModal}
                />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* 이미지 모달 */}
      <Modal show={showImageModal} onHide={handleImageModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>상품 이미지</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={review.image} alt="Review" style={{ width: "100%" }} />
        </Modal.Body>
      </Modal>
    </>
  );
};
const ReviewsList = ({ reviews }) => {
  const windowWidth = useWindowWidth(); // 창 크기
  const isMobile = windowWidth <= 768; // 모바일 크기 판단
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(3); // 모바일에서 초기 보여질 리뷰 수

  const lastIndex = currentPage * visibleReviews;
  const firstIndex = lastIndex - visibleReviews;
  const currentReviews = reviews.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  useEffect(() => {
    if (!isMobile) {
      setVisibleReviews(3); // 웹보여질 처음
    }
  }, [isMobile]);

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
          {Array.from(
            { length: Math.ceil(reviews.length / visibleReviews) },
            (_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      )}
    </>
  );
};

const ExReview = () => {
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
            <ReviewsList reviews={reviewsData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExReview;
