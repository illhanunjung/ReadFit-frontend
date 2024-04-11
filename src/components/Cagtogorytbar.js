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
           <div style={{ position: 'relative', width: '100%', marginBottom: '15px' }}>
            <ProgressBar
              now={positive_percentage}
              
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                
                right: 62, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                fontWeight:'bold',
                color: 'black',
                
              }}
            >
              {`${positive_percentage}%`}
            </span>
          </div>
                    부정{" "}
              <div style={{ position: 'relative', width: '100%', marginBottom: '15px' }}>
            <ProgressBar
              variant="danger"
              now={negative_percentage}
              
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                
                right: 62, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                fontWeight:'bold',
                color: 'black',
                
              }}
            >
              {`${negative_percentage}%`}
            </span>
          </div>

          중립{" "}
          <div style={{ position: 'relative', width: '100%', marginBottom: '15px' }}>
            <ProgressBar
              variant="success"
              now={neutral_percentage}
              
            />
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                right: 67, // 오른쪽 끝에 위치시킵니다. 위치 조정이 필요하다면 이 값을 변경하세요.
                fontSize: '12px',
                fontWeight:'bold',
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
