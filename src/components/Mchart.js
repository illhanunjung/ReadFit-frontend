import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

// Chart.js 설정 (차트 데이터와 옵션)
const chartData = {
  labels: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  datasets: [
    {
      label: "월별 리뷰량",
      data: [12, 19, 3, 5, 2, 3, 9, 3, 5, 2, 3, 9],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(199, 199, 199, 0.2)",
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

const Mchart = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>리뷰 현황</Card.Title>
              <div style={{ height: "500px" }}>
                <Bar data={chartData} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Mchart;
