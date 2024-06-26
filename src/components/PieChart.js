import React from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col, Card } from "react-bootstrap";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

// 차트에 플러그인을 등록합니다.
Chart.register(ChartDataLabels);

const PieChart = ({ data }) => {
  // 받은 데이터를 기반으로 라벨과 값 배열 생성
  const labels = data.map((item) => item.keywordName);
  const dataValues = data.map((item) => item.totalCount);
  const total = dataValues.reduce((acc, curr) => acc + curr, 0);

  // 차트 데이터 구성
  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#ff9999",
          "#FF9933",
          "#8fd9b6",
          "#CC66CC",
          "#99CC00",
          "#3399FF",
          "#80DEEA",
          "#FF77A9",
          "#D4E157",
          "#FF80AB",
          "#6EC6FF",
          "#FF8A65",
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
          size: 12,
        },
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return `${
            context.chart.data.labels[context.dataIndex]
          }\n${percentage}`;
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
        },
      },
    },
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={12} xl={12}>
          <Card>
            <Card.Body>
              <Pie
                data={chartData}
                options={options}
                width={570}
                height={630}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
