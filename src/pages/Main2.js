import React, { useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import Navs from "../components/Nav";
import "../css/Main2.css";
import Carousels from "../components/Carousel";
import Mchart from "../components/Mchart";
import Moption from "../components/Moption";
import Mcard from "../components/Mcard";
import Mnav from "../components/Mnav";
import { Link } from "react-router-dom";
import SocialKakao from "../api/kakaoApi";

const Main2 = () => {
  // Sample data array with 10 entries
  const cardsData = [
    {
      image: "/img/sh1.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "나이키 운동화",
      reviews: [
        "이 운동화는 편안하고 내구성이 뛰어납니다.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "가벼우면서도 발을 잘 지지해줍니다.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },

    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    {
      image: "/img/sh2.jpg",
      likes: 50,
      dislikes: 50,
      views: 1450,
      description: "아디다스 운동화",
      reviews: [
        "이 운동화의 색깔이 검정색 굳.",
        "멋진 디자인과 색상이 맘에 들어요.",
        "런닝하기가 편해요.",
        "매일 신기에 정말 좋은 운동화입니다.",
        "발이 큰 사람들에게도 잘 맞아요.",
      ],
    },
    // ...add as many products as you need
  ];

  return (
    <div>
      <Navs />
      <div id="content">
        <br></br>
        <Carousels />
        <Container fluid className="my-5">
          <Row className="my-5">
            <Col lg={12} md={12} sm={12} className="t2">
              카테고리
            </Col>
          </Row>
          <Row>
            <Col>
              <Mnav />
            </Col>
          </Row>

          <Row className="my-5">
            <Col lg={6} md={12} sm={12} className="t2">
              운동화TOP10
            </Col>
            <Col lg={6} md={12} sm={12} className="text-lg-right text-md-left">
              <Link to={"/Category"}>
                <Button className="t2btn">더보기</Button>
              </Link>
            </Col>
          </Row>
          <Row className="my-5">
            {cardsData.map((card, index) => (
              <Mcard key={index} {...card} />
            ))}
          </Row>
          <Row className="mb-4  align-items-center">
            <Col lg={6}>
              <Card className="mb-4">
                <Row noGutters>
                  <Mchart />
                </Row>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="mb-4">
                <Row noGutters>
                  <Moption />
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <SocialKakao />
      </div>
    </div>
  );
};

export default Main2;
