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

const Rboard = () => {
  const { shoe_seq } = useParams();
  const [shoes, setShoes] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/rboard/${shoe_seq}`
        );
        setShoes(response.data);
      } catch (error) {
        console.error("Error fetching shoe data:", error);
      }
    };

    const fetchKeyword = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/rboard/keyword/${shoe_seq}`
        );
        setKeywords(response.data);
      } catch (error) {
        console.error("Error fetching Keywords data:", error);
      }
    };

    fetchData();
    fetchKeyword();
  }, [shoe_seq]);

  return (
    <div>
      <Navs />
      <div id="content">
        <Container fluid className="my-5">
          {shoes.map((shoe, index) => (
            <Row className="mb-4">
              <Col lg={6}>
                <p className="ct2">{shoe.shoe}</p>
                <Card className="mb-4">
                  <Row noGutters>
                    <Col md={4} className="text-center">
                      <Image src={shoe.shoe_img} fluid rounded />
                    </Col>
                    <Col md={8}>
                      <Card.Body className="sbt">
                        <Card.Text>
                          <p>카테고리 : {shoe.parent_category_seq}</p>
                          <p>가격 : {shoe.shoe_price}원</p>
                          <p>
                            <img
                              src="/img/Star.png"
                              style={{ width: "15px", height: "auto" }}
                            />
                            ({shoe.averageRating.toFixed(1)})
                          </p>
                          <p>리뷰수 : ({shoe.reviewCount})</p>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
                <p className="ct1">전체 키워드 긍/부정</p>

                <div style={{ height: "300px" }}>
                  {/* <Bar data={chartData} options={options} />차트 표시 */}
                  <KeywordPol data={keywords} />
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <p className="ct1">별점 비율</p>
                <Balrating reviews={shoe.reviews} />
                {/* 별점 비율 표시 */}
                <br></br>
                <Row className="mb-4">
                  <p className="ct1">함께보면 좋은 상품</p>
                  <InventoryList />
                  {/* 함께 보면 좋은 상품 리스트 표시 */}
                </Row>
              </Col>

              <Col lg={6}>
                <ExReview reviews={shoe.reviews} />
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Rboard;
