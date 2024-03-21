import React from "react";
import { Container, Row, Col, Card, ProgressBar, Image } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "../css/Rboard.css";
import Navs from "../components/Nav";
import Balrating from "../components/Balrating";
import ExReview from "../components/ReviewCard";
import InventoryList from "../components/InventoryItem";
import BoardMenu from "../components/BoardMenu";

// Chart.js 설정 (차트 데이터와 옵션)
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
  const inventoryItems = [
    { image: "/img/Readfit.png", name: "상품 A" },
    { image: "/path/to/your/image2.png", name: "상품 B" },
    { image: "/path/to/your/image3.png", name: "상품 C" },
    // ... 추가 상품 ...
  ];
  return (
    <div>
      <Navs />
      <div id="content">
        <Container fluid className="my-5">
          {/* 상단 제품 이름 카드와 리뷰 */}

          <Row className="mb-4">
            <Col lg={6}>
              <p className="ct1">운동화</p>
              <Card className="mb-4">
                <Row noGutters>
                  <Col md={4} className="text-center">
                    <Image src="/img/r1.png" fluid rounded />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="sbt">
                      <Card.Title>상품명</Card.Title>
                      <Card.Text>
                        아디다스 운동화 듀라모 알파바운스 가벼운 발볼넓은 운동화
                        러닝화 남자 남여공용
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              <BoardMenu />
              <ExReview />
            </Col>
            {/* 리뷰 현황 */}
            <Col lg={6}>
              <p className="ct1">월별 리뷰 현황</p>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>리뷰 현황</Card.Title>
                  <div style={{ height: "300px" }}>
                    <Bar data={chartData} options={options} />
                  </div>
                </Card.Body>
              </Card>

              {/* 별점 정보 */}
              <Balrating />

              {/* 옵션 */}
              <Card>
                <Card.Body>
                  <Card.Title>옵션</Card.Title>
                  사이즈
                  <ProgressBar now={60} label={`60%`} className="mb-2" />
                  착용감
                  <ProgressBar now={30} label={`30%`} className="mb-2" />
                </Card.Body>
              </Card>

              {/* 유사제품 */}
              <Row className="mb-4">
                <Col md={12}>
                  <Card>
                    <Card.Header>유사 제품</Card.Header>
                    <Card.Body>
                      {inventoryItems.map((item, index) => (
                        <Row key={index} className="align-items-center mb-2">
                          <Col xs={2}>
                            <Image
                              src={item.image}
                              thumbnail
                              style={{ width: "50px", height: "50px" }}
                            />
                          </Col>
                          <Col xs={10}>
                            <span>{item.name}</span>
                          </Col>
                        </Row>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Rboard;
