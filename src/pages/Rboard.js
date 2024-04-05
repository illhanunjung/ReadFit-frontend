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

const chartData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월"],
  datasets: [
    {
      label: "월별 판매량",
      data: [12, 19, 3, 5, 2, 3, 9],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(199, 199, 199, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(159, 159, 159, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: {
      ticks: {
        beginAtZero: true,
      },
    },
  },
  maintainAspectRatio: false,
};

const Rboard = () => {
  const { shoe_seq } = useParams();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/rboard/${shoe_seq}`
        );
        setShoes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching shoe data:", error);
      }
    };

    fetchData();
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
                          <p>가격 :{shoe.shoe_price}원</p>
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
                <p className="ct1">월별 리뷰 현황</p>
                <Card className="mb-4">
                  <Card.Body>
                    <div style={{ height: "300px" }}>
                      <Bar data={chartData} options={options} />
                      {/* 차트 표시 */}
                    </div>
                  </Card.Body>
                </Card>

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
