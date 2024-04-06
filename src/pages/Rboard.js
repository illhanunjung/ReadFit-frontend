import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import Balrating from "../components/Balrating";
import InventoryList from "../components/InventoryList";

import Navs from "../components/Nav";
import ExReview from "../components/ReviewCard";

import "../css/Rboard.css";
import KeywordPol from "../components/KeywordPol";



const Rboard = ({selectedKeyword,title}) => {
  const { shoe_seq } = useParams();
  const [shoes, setShoes] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [relShoes, setRelShoes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null ); // null이나 적절한 기본값으로 초기화
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoeResponse = await axios.get(`http://localhost:8081/api/rboard/${shoe_seq}`);
        setShoes(shoeResponse.data);
        
        const { parent_category_seq_name, shoe_price } = shoeResponse.data[0] || {};
        if (parent_category_seq_name && shoe_price) {
          try {
            const relShoesResponse = await axios.get(
              `http://localhost:8081/api/rboard/best/${parent_category_seq_name}/${shoe_price}`
            );
            setRelShoes(relShoesResponse.data);
          } catch (error) {
            console.error('Error fetching related shoes data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching shoe data:', error);
      }
    };
  
    const fetchKeyword = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/rboard/keyword/${shoe_seq}`);
        setKeywords(response.data);
        
      } catch (error) {
        console.error('Error fetching Keywords data:', error);
      }
    };
  
    fetchData();
    fetchKeyword();
  }, [shoe_seq]);


   // 긍정, 부정, 중립 개수를 저장할 객체
   const count = { 긍정: 0, 부정: 0, 중립: 0 };
   
   


 
   // selectedKeyword에 해당하는 데이터만 필터링
   // const filteredData = keywords.filter(item => item.keyword_name === selectedKeyword);
 
   // 필터링된 데이터를 이용해 긍정, 부정, 중립 개수 계산
   keywords.forEach(item => {
     switch (item.keyword_polarity) {
       case 2: count['긍정'] += 1; break;
       case 1: count['부정'] += 1; break;
       case 0: count['중립'] += 1; break;
       default: break;
     }
   });
 
   const chartData = {
     labels: ['긍정', '부정', '중립'],
     datasets: [{

       data: [count['긍정'], count['부정'], count['중립']],
       backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
       borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
       borderWidth: 1,
     }],
   };
 
   const options = {
     responsive: true,
     plugins: {
       legend: {
         position: 'top',
       },
     },
   };

  return (
    <div>
      <Navs />
      <div id="content">
        <Container fluid className="my-5">
        {shoes.map((shoe, index) => (
          <Row className="mb-4">
            <Col lg={6}>
              <p className="ct2">
                {shoe.shoe}
              </p>
              <Card className="mb-4">
                <Row noGutters>
                  <Col md={4} className="text-center">
                    <Image src={shoe.shoe_img} fluid rounded />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="sbt mb-1">
                      <Card.Text>
                        <p>카테고리 : {shoe.parent_category_seq}</p>
                        <p>가격 : {shoe.shoe_price}원</p>
                        <p><img src="/img/Star.png" style={{ width: "15px", height: "auto" }}/>({shoe.averageRating.toFixed(1)})</p>
                        <p>리뷰수 : ({shoe.reviewCount})</p>
                      </Card.Text>
                    </Card.Body>  
                  </Col>
                </Row>
              </Card>
              
              <p className="ct1">전체 키워드 긍/부정</p>
              <div className="content-section">                  
                    {/* <Bar data={chartData} options={options} />차트 표시 */}
                    <KeywordPol data={keywords}/>
 
              </div>
              
              
               <div className="content-section">
              <p className="ct1">별점 비율</p>
              <Balrating reviews={shoe.reviews}/>{/* 별점 비율 표시 */}
              </div>
              <div className="content-section">
              <Row className="mb-4">
                <p className="ct1">함께보면 좋은 상품</p>
                <InventoryList relShoes={relShoes} />{/* 함께 보면 좋은 상품 리스트 표시 */}
              </Row>
             
              </div>
            </Col>
            
            <Col lg={6}>
              
              <ExReview reviews={shoe.reviews} shoe_seq={shoe.shoe_seq}/>
            </Col>
          </Row>
              ))}
        </Container>
      </div>
    </div>
  );
};

export default Rboard;
