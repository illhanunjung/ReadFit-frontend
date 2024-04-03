import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import axios from "axios";
import "../css/Mnav.css";

const Mnav = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/categories")
      .then((response) => {
        const categoryData = response.data;
        const groupedCategories = categoryData.reduce((acc, cur) => {
          const key = cur.parent_category_seq;

          acc[key] = {
            categorySeq: key,
            parentCategorySeq: cur.parent_category_seq,
            parentCategorySeqName: cur.parent_category_seq_name,
            subCategories: [],
          };

          return acc;
        }, {});

        setCategories(Object.values(groupedCategories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    if (typeof onCategorySelect === "function") {
      onCategorySelect(category); // 선택한 카테고리를 부모 컴포넌트로 전달
      console.log(category);
    } else {
      console.warn("onCategorySelect is not defined or not a function");
    }
  };

  return (
    <Container fluid className="mamenu2-container custom-nav-container">
      <Nav className="mamenu2 justify-content-center custom-nav">
        {categories.map((category, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              eventKey={`link-${index}`}
              onClick={() => handleCategoryClick(category)}
              className="custom-nav-link"
            >
              {category.parentCategorySeq}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};

export default Mnav;
