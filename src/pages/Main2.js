import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousels from "../components/Carousel";
import Mcard from "../components/Mcard";
import Mnav from "../components/Mnav";
import Navs from "../components/Nav";
import "../css/Main2.css";
// import SocialKakao from "../api/kakaoApi";
import axios from "axios";
import McardTOP from "../components/McardTOP";
import PieChart from "../components/PieChart";

const Main2 = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    categorySeq: "",
    parentCategoryName: "",
    categoryName: "운동화/스니커즈", // 기본값으로 '운동화/스니커즈' 설정
  });
  const [keywords, setKeywords] = useState([]);
  const [topThreeShoes, setTopThreeShoes] = useState([]);
  

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory({
      categorySeq: selectedCategory.categorySeq,
      parentCategoryName: selectedCategory.parentCategorySeqName,
      categoryName: selectedCategory.categorySeq, // 클릭된 카테고리의 이름으로 업데이트
    });
    console.log(selectedCategory);
  };


  useEffect(() => {
    const fetchShoes = () => {
      // 초기 URL은 기본 카테고리인 'running'으로 설정
      let apiUrl = "http://localhost:8081/api/shoe/top/running";

      // 사용자가 다른 카테고리를 선택한 경우, 해당 카테고리명으로 URL을 업데이트
      if (selectedCategory.parentCategoryName) {
        apiUrl = `http://localhost:8081/api/shoe/top/${selectedCategory.parentCategoryName}`;
      }

      // 상품 데이터 요청
      axios
        .get(apiUrl)
        .then((response) => {
          setShoes(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const fetchTopthrees = () => {
      let apiUrl = "http://localhost:8081/api/shoes/topthree/running";

      if (selectedCategory.parentCategoryName) {
        apiUrl = `http://localhost:8081/api/shoes/topthree/${selectedCategory.parentCategoryName}`;
      }

      axios
        .get(apiUrl)
        .then((response) => {
          setTopThreeShoes(response.data); // 키워드 데이터 상태 업데이트
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching keywords data:", error);
        });
    };

    const fetchKeywords = () => {
      let apiUrl = "http://localhost:8081/api/keywords/top/running";

      if (selectedCategory.parentCategoryName) {
        apiUrl = `http://localhost:8081/api/keywords/top/${selectedCategory.parentCategoryName}`;
      }

      axios
        .get(apiUrl)
        .then((response) => {
          setKeywords(response.data); // 키워드 데이터 상태 업데이트
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching keywords data:", error);
        });
    };


    
    fetchTopthrees();
    fetchShoes();
    fetchKeywords();
  }, [selectedCategory.parentCategoryName]);

  return (
    <div>
      <Navs />
      <div id="content">
        <br></br>
        <Carousels />
        <Container fluid className="my-5">
          <Row className="my-5 no-gutters">
            <Col lg={12} md={12} sm={12} className="t2">
              카테고리
            </Col>
          </Row>
          <Row>
            <Col>
              <Mnav onCategorySelect={handleCategorySelect} />
            </Col>
          </Row>

          <Row className="my-5">
            <Col lg={6} md={12} sm={12} className="t2">
              {selectedCategory.categoryName + " TOP10"}{" "}
              {/* 조건부 렌더링 제거 */}
            </Col>
            <Col lg={6} md={12} sm={12} className="text-lg-right text-md-left">
              <Link to={"/Category"}>
                <Button className="t2btn">더보기</Button>
              </Link>
            </Col>
          </Row>
          <Row className="my-5">
            {shoes.map((shoe, index) => (
                <Mcard
                
                key={index}
                shoe_img={shoe.shoe_img}
                positivePercentage={shoe.positive_percentage} // 예시 값
                negativePercentage={shoe.negative_percentage} // 예시 값
                reviewCount={shoe.reviewCount}
                shoe={shoe.shoe}
                reviews={shoe.reviews} // 이 부분은 실제 데이터 구조에 따라 조정 필요
                shoe_seq={shoe.shoe_seq}
              />
            ))}
          </Row>
          <Row className="mb-4  align-items-center" >
            <Col lg={6}>
  
              <Row >
              <Col lg={12} md={12} sm={12} className="t2 my-5">
              {selectedCategory.categoryName + " 관심상품 TOP3"}{" "}
              </Col>
                  {/* <TopThreeShoes category_name={selectedCategory.categoryName} /> */}
                  {topThreeShoes.map((shoe, index) => (
              
              
              <McardTOP 
                key={index}
                shoe_img={shoe.shoe_img}
                positivePercentage={shoe.positive_percentage} // 예시 값
                negativePercentage={shoe.negative_percentage} // 예시 값
                reviewCount={shoe.reviewCount}
                shoe={shoe.shoe}
                reviews={shoe.reviews} // 이 부분은 실제 데이터 구조에 따라 조정 필요
                shoe_seq={shoe.shoe_seq}
              />
             
            ))}
        
        </Row>
            </Col>
       
            <Col lg={6}>
            <Col lg={12} md={12} sm={12} className="t2 my-5">
              {selectedCategory.categoryName + " 키워드 랭킹"}{" "}
              </Col>
              <Card className="mb-4">
                <Row noGutters>
                  {/* <Moption /> */}
                  <PieChart data={keywords} />
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* <SocialKakao /> */}
      </div>
    </div>
  );
};

export default Main2;