import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const KeywordPol = ({ data, selectedKeyword }) => {
  // 긍정, 부정, 중립 개수를 저장할 객체
  const count = { 긍정: 0, 부정: 0, 중립: 0 };
  
  // 선택된 키워드가 있을 경우 해당 키워드만 필터링, 없으면 전체 데이터 사용
  const filteredData = selectedKeyword
    ? data.filter(item => item.keyword_name === selectedKeyword)
    : data;

  // 필터링된 데이터를 이용해 긍정, 부정, 중립 개수 계산
  filteredData.forEach(item => {
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
      label: selectedKeyword ? `${selectedKeyword} 분석` : '전체 키워드 분석',
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
        display: selectedKeyword !== 'default', // selectedKeyword가 'default'가 아닐 때만 레전드 표시
        position: 'top',
      },
    },
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="mb-4">
          <Card.Body>
            <Card.Title>
                {
                    selectedKeyword === 'default' ? 
                    '키워드를 눌러주세요' : 
                    (selectedKeyword ? `${selectedKeyword} 키워드 분석 결과` : '전체 키워드 분석 결과')
                }
            </Card.Title>
            <Bar data={chartData} options={options} />
        </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KeywordPol;