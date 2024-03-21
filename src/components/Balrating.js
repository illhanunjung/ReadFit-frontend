import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import footIcon from "./fit1.jpg"; // 별 이미지 경로로 변경하세요.

const Balrating = () => {
  const progressData = [
    { percentage: 85, color: "purple", stars: 1 },
    { percentage: 66, color: "orange", stars: 2 },
    { percentage: 66, color: "orange", stars: 3 },
    { percentage: 90, color: "green", stars: 4 },
    { percentage: 30, color: "red", stars: 5 },
  ];

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
        <Card.Title>별점</Card.Title>
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
