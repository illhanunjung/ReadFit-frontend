import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Balrating from "../components/Balrating";
import InventoryList from "../components/InventoryList";
import Navs from "../components/Nav";
import ExReview from "../components/ReviewCard";
import "../css/Rboard.css";

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

  // useEffect(() => {
  //   // 페이지가 렌더링될 때 호출하고자 하는 함수를 호출합니다.
  //   fetchData(); // 이전에 작성한 컨트롤러 함수 호출
  // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출되도록 설정합니다.


  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8081/api/rboard'); // 서버의 URL로 요청을 보냅니다.
  //     const data = await response.json();
  //     console.log(data); // 응답을 콘솔에 출력하거나 다른 작업을 수행합니다.
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };


  return (
    <div>
      <Navs />
      <div id="content">
        <Container fluid className="my-5">
          {/* 상단 제품 이름 카드와 리뷰 */}

          <Row className="mb-4">
            <Col lg={6}>
              <p className="ct2">
                아디다스 운동화 듀라모 알파바운스 가벼운 발볼넓은 운동화 러닝화
                남자 남여공용
              </p>
              <Card className="mb-4">
                <Row noGutters>
                  <Col md={4} className="text-center">
                    <Image src="/img/sh2.jpg" fluid rounded />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="sbt">
                      <Card.Text>
                        <p>남성패션 남성 신발 운동화 런닝화</p>
                        <p>가격 100,000 원</p>
                        <p>❤(4.8) 🗨 (833)</p>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>

              <ExReview />
            </Col>
            {/* 리뷰 현황 */}
            <Col lg={6}>
              <p className="ct1">월별 리뷰 현황</p>
              <Card className="mb-4">
                <Card.Body>
                  <div style={{ height: "300px" }}>
                    <Bar data={chartData} options={options} />
                  </div>
                </Card.Body>
              </Card>
              {/* 유사제품 */}
              <Row className="mb-4">
                <p className="ct1">함께보면 좋은 상품</p>

                <InventoryList />
              </Row>

              {/* 별점 정보 */}
              <p className="ct1">별점 비율</p>
              <Balrating />
              <br></br>
              {/* 옵션 */}
              <p className="ct1">키워드 긍/부정</p>
              <Card>
                <Card.Body>
                  <div style={{ height: "300px" }}>
                    <Bar data={chartData} options={options} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Rboard;
