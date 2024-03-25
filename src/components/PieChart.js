import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col, Card } from "react-bootstrap";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

// 차트에 플러그인을 등록합니다.
Chart.register(ChartDataLabels);

const PieChart = () => {
  // 원본 데이터와 라벨
  const rawData = [
    { label: "디자인", value: 85 },
    { label: "사이즈", value: 15 },
    { label: "착화감", value: 45 },
    { label: "내구성", value: 23 },
    { label: "사용성", value: 150 },
    { label: "기능성", value: 45 },
    { label: "가격", value: 35 },
    { label: "무게", value: 53 },
    { label: "소재", value: 70 },
    { label: "색상", value: 14 },
    { label: "품질", value: 42 },
    { label: "굽", value: 24 },
  ];

  // 값에 따라 내림차순 정렬
  rawData.sort((a, b) => b.value - a.value);

  // 정렬된 데이터에서 값과 라벨 추출
  const dataValues = rawData.map((item) => item.value);
  const labels = rawData.map((item) => item.label);
  const total = dataValues.reduce((acc, curr) => acc + curr, 0);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
          "#FF9800",
          "#00BCD4",
          "#FF00FF",
          "#CDDC39",
          "#FF4081",
          "#2196F3",
          "#FF5722",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#000000",
        anchor: "center",
        align: "center",

        font: {
          weight: "bold",
          size: 12, // 폰트 사이즈를 더 줄여 겹침을 최소화합니다. 실제 차트 크기에 따라 조정이 필요할 수 있습니다.
        },
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return (
            context.chart.data.labels[context.dataIndex] + "\n" + percentage
          ); // 세로로 라벨과 백분율을 나열합니다.
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
        },
      },
      //   title: {
      //     display: true,
      //     text: "키워드 랭킹",
      //     position: "top",
      //   },
    },
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={12} xl={12}>
          <Card>
            <Card.Title>키워드 랭킹</Card.Title>
            <Card.Body>
              <Pie data={data} options={options} width={570} height={570} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
