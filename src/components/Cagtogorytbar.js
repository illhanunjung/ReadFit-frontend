import React from "react";
import { Container, Row, Col, Card, ProgressBar, Image } from "react-bootstrap";

const Cagtogorytbar = ({
  positive_percentage,
  negative_percentage,
  neutral_percentage,
}) => {
  
  return (
    
    <Container fluid>
      <Row className="mb-4">
        
        <Col lg={12}>
          {/* 옵션 */}
          긍정
           <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
            <ProgressBar
              now={positive_percentage}
              className="mb-2"
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                
                right: 47, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                color: 'black',
                
              }}
            >
              {`${positive_percentage}%`}
            </span>
          </div>
                    부정{" "}
              <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
            <ProgressBar
              variant="danger"
              now={negative_percentage}
              className="mb-2"
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                
                right: 47, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                color: 'black',
                
              }}
            >
              {`${negative_percentage}%`}
            </span>
          </div>

          중립{" "}
          <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
            <ProgressBar
              variant="success"
              now={neutral_percentage}
              className="mb-2"
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                right: 52, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                color: 'black',
                
              }}
            >
              {`${neutral_percentage}%`}
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cagtogorytbar;
