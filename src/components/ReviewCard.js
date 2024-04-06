import { useWindowWidth } from "@react-hook/window-size"; // 창 크기를 감지하는 Hook
import axios from 'axios'; // axios를 사용하여 데이터를 가져옵니다.
import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Pagination,
  Row
} from "react-bootstrap";
import KeywordPol from './KeywordPol';



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


const BoardMenu = ({ activeCategory, setActiveCategory, shoe_seq }) => {
  // const [activeCategory, setActiveCategory] = useState('default');
  // alert(shoe_seq)
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
      setActiveCategory('default'); // 이미 활성화된 카테고리를 클릭하면 비활성화합니다.
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
      const response = await fetch(`http://localhost:8081/api/rboard/keywordReviewSummary?shoe_seq=${shoe_seq}`); // 서버의 URL로 요청을 보냅니다.
      const data = await response.json();
     
      // 가져온 데이터를 상태로 설정합니다.
     
      setKeywordReviewSummary(data.reviewSummary);
      console.log('넘어온 값입니다.');
      console.log(KeywordReviewSummary);
     
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
          <p className="ct1">리뷰 요약</p>
            <Card className="mb-3">
              <Card.Body>
                {/* 여기에 선택된 카테고리에 대한 컴포넌트를 표시하세요 */}
                <p>{KeywordReviewSummary[activeCategory] ? KeywordReviewSummary[activeCategory] : "키워드를 클릭하시면 요약정보를 확인하실 수 있습니다"}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};



const ReviewCard = ({ review, highlightRanges, expanded, onToggleExpand }) => {


  // ISO 문자열을 Date 객체로 파싱한 후, 원하는 형식으로 포맷팅
  const formattedDate = format(parseISO(review.review_at), 'yyyy-MM-dd');

  const highlightText = (text, ranges) => {
    if (!ranges || ranges.length === 0) return text;
  
    return (
      <>
        {ranges.reduce((result, range, index) => {
          const start = index === 0 ? 0 : ranges[index - 1][1] + 1;
          const end = range[0];
          result.push(text.slice(start, end));
          result.push(
            <mark key={index} style={{ backgroundColor: '#E8FD8D' }}>
              {text.slice(range[0], range[1] + 1)}
            </mark>
          );
          if (index === ranges.length - 1 && range[1] < text.length - 1) {
            result.push(text.slice(range[1] + 1));
          }
          return result;
        }, [])}
      </>
    );
  };
  const handleToggleExpand = () => {
    onToggleExpand(); // 상위 컴포넌트에서 전달받은 함수 호출
};

  // 하이라이트 처리된 리뷰 텍스트
  const highlightedReview = highlightText(review.review, highlightRanges);

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
              <span className="me-2">{"⭐".repeat(parseInt(review.review_rating, 10))}</span>
              <span>{formattedDate}</span>
              <span style={{ color: polarityColor }}>{polarityText}</span>
            </div>
            <Card.Subtitle className="mb-1 text-muted d-flex align-items-center">
              <h5 className="my-2 mb-2" style={{fontWeight :"bold"}}>{review.review.substring(0, 34)}</h5>
            </Card.Subtitle>
            <Card.Text>
              {expanded ? highlightedReview : `${review.review.substring(0, 100)}...`}
              {review.review.length > 100 && (
                <Button variant="link" onClick={onToggleExpand}>
                  {expanded ? "숨기기" : "더보기"}
                </Button>
              )}
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
const ReviewsList = ({ reviews, activeCategory,resetExpandedStates  }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = isMobile ? 3 : 3;
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [expandedStates, setExpandedStates] = useState({});

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
    resetExpandedStates(); // 더보기 버튼 상태 초기화 함수를 호출합니다.
  };


  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // // activeCategory가 변경될 때마다 페이지를 1로 초기화합니다.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

 useEffect(() => {
    setExpandedStates({});
  }, [currentPage]); // 현재 페이지 또는 리뷰 목록이 변경될 때마다 실행
  return (
    <>
      {currentReviews.map((review, index) => (
        // ReviewCard 컴포넌트에 expandedStates를 prop으로 전달
        <ReviewCard
          key={index}
          review={review}
          highlightRanges={review.highlightRanges}
          activeCategory={activeCategory}
          expanded={expandedStates[review.review_seq]}
          // "더보기" 버튼의 상태를 관리하기 위한 함수를 prop으로 전달
          onToggleExpand={() => setExpandedStates(prev => ({
            ...prev,
            [review.review_seq]: !prev[review.review_seq]
          }))}
        />
      ))}
      <Pagination className="justify-content-center my-4">
        <Pagination.Prev onClick={handlePrevBtn} disabled={currentPage === pageNumbers[0]} />
        {pageNumbers.map(number => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            );
          } else {
            return null;
          }
        })}
        <Pagination.Next onClick={handleNextBtn} disabled={currentPage === pageNumbers[pageNumbers.length - 1]} />
      </Pagination>
    </>
  );
};


const ExReview = ({ reviews, shoe_seq }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchKeywordData = async (shoeSeq) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/api/rboard/keyword/${shoeSeq}`);
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching Keywords data:', error);
    }
    setIsLoading(false);
    
  };
  const highlightText = (text, ranges) => {
    if (!ranges || ranges.length === 0) return text;
  
    return (
      <>
        {ranges.reduce((result, range, index) => {
          const start = index === 0 ? 0 : ranges[index - 1][1] + 1;
          const end = range[0];
          result.push(text.slice(start, end));
          result.push(
            <mark key={index} style={{ backgroundColor: 'lightgreen' }}>
              {text.slice(range[0], range[1] + 1)}
            </mark>
          );
          if (index === ranges.length - 1 && range[1] < text.length - 1) {
            result.push(text.slice(range[1] + 1));
          }
          return result;
        }, [])}
      </>
    );
  };
  useEffect(() => {
    const reviewKeywordMap = {};
  
    keywords.forEach((keyword) => {
      if (!reviewKeywordMap[keyword.review_seq]) {
        reviewKeywordMap[keyword.review_seq] = [keyword];
      } else {
        reviewKeywordMap[keyword.review_seq].push(keyword);
      }
    });
  
    const updatedReviews = reviews.filter((review) => {
      // activeCategory가 null이거나 초기값일 때 모든 리뷰를 포함
      if (!activeCategory) return true;
  
      const reviewKeywords = reviewKeywordMap[review.review_seq] || [];
      return reviewKeywords.some(keyword => keyword.keyword_name === activeCategory);
    }).map((review) => {
      if (!activeCategory) {
        // activeCategory가 null이거나 초기값일 때 하이라이트 없이 모든 리뷰 반환
        return review;
      }
  
      const reviewKeywords = reviewKeywordMap[review.review_seq] || [];
      const highlightRanges = reviewKeywords.reduce((acc, keyword) => {
        if (keyword.keyword_name === activeCategory) {
          acc.push([keyword.start_idx, keyword.end_idx]);
        }
        return acc;
      }, []);
  
      return { ...review, highlightRanges };
    });
  
    setFilteredReviews(updatedReviews);
  }, [activeCategory, keywords, reviews]);
  // 리뷰가 로드될 때 한 번만 키워드 데이터를 가져오는 useEffect
  useEffect(() => {
    if (reviews.length > 0) {
      const shoeSeq = reviews[0].shoe_seq;
      fetchKeywordData(shoeSeq);
    }
  }, [reviews]);

  const resetExpandedStates = () => {
    // 여기서 expandedStates 상태를 초기화하는 작업을 수행합니다.
  };
  console.log("xzcvzxcvzxcvzxcvvxz",filteredReviews);
  return (
    <>
      <p className="ct1">키워드</p>
      <BoardMenu activeCategory={activeCategory} setActiveCategory={setActiveCategory} shoe_seq={shoe_seq}/>
      
      
      <Container>
      <Row>
        <Col md={12}>

        </Col>
      </Row>
      </Container>
      
      {activeCategory && <KeywordPol selectedKeyword={activeCategory} data={keywords}/>} 
      <p className="ct1">리뷰</p>
      <Container>
        <Row>
          <Col md={12}>
          <ReviewsList reviews={filteredReviews} activeCategory={activeCategory} resetExpandedStates={resetExpandedStates}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExReview;
