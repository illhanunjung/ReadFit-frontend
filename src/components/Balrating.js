import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import footIcon from "./Star.png"; // 별 이미지 경로로 변경하세요.

const Balrating = ({reviews}) => {
  // 별점 빈도수 계산
  const starCounts = reviews.reduce((acc, review) => {
    const rating = review.review_rating;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

   // 총 리뷰 수 계산
  const totalReviews = reviews.length;


  // 각 별점 별로 진행률 데이터 생성
  const progressData = Object.keys(starCounts).map((rating) => {
    const count = starCounts[rating];
    const percentage = ((count / totalReviews) * 100).toFixed(0);
    const color = getColorByRating(rating); // 별점에 따른 색상을 결정하는 함수
    return {
      stars: parseInt(rating, 10),
      percentage,
      color,
    };
  });

  // 별점에 따른 색상 결정
  function getColorByRating(rating) {
    switch (parseInt(rating, 10)) {
      case 1:
        return "#FFD700"; // 예시 색상
      case 2:
        return "#FFD700";
      case 3:
        return "#FFD700";
      case 4:
        return "#FFD700";
      case 5:
        return "#FFD700";
      default:
        return "#d6d6d6";
    }
  }

  const renderStars = (stars) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {Array.from({ length: stars > 2 ? 2 : stars }).map((_, index) => (
            <img
              key={index}
              src={footIcon}
              alt="Foot"
              style={{ width: "15px", height: "15px", marginRight: "2px" }}
            />
          ))}
        </div>
        {stars > 2 && (
          <div>
            {Array.from({ length: stars - 2 }).map((_, index) => (
              <img
                key={index}
                src={footIcon}
                alt="Foot"
                style={{ width: "15px", height: "15px", marginRight: "2px" }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title></Card.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {progressData.map((data, index) => (
            <div key={index} style={{ width: "100px", margin: "10px" }}>
              <CircularProgressbarWithChildren
                value={data.percentage}
                styles={buildStyles({
                  pathColor: data.color,
                  trailColor: "#d6d6d6",
                  textColor: "#fff",
                })}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {renderStars(data.stars)}
                  <div style={{ fontSize: "12px", marginTop: "5px" }}>
                    {`${data.percentage}%`}
                  </div>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Balrating;
