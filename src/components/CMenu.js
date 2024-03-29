// CMenu.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cmenu.css";

function CMenu({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/categories")
      .then((response) => {
        const categoryData = response.data;
        const groupedCategories = categoryData.reduce((acc, cur) => {
          const key = cur.parent_category_seq;
          if (!acc[key]) {
            acc[key] = {
              categorySeq: key,
              parentCategorySeq: cur.parent_category_seq, // 수정
              parentCategorySeqName: cur.parent_category_seq_name,
              subCategories: [],
            };
          }
          if (cur.category) {
            // 서브 카테고리가 실제로 존재하는 경우에만 추가
            acc[key].subCategories.push(cur.category);
          }
          return acc;
        }, {});

        setCategories(Object.values(groupedCategories));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleToggleCategory = (categorySeq, parentCategorySeqName) => {
    setActiveCategory(activeCategory === categorySeq ? null : categorySeq);
    // 부모 카테고리를 선택하면 해당 카테고리의 이름을 부모 컴포넌트에 전달합니다.
    onCategorySelect(parentCategorySeqName);
  };

  return (
    <div className="cmenu my-5">
      {categories.map((mainCategory) => (
        <div
          key={mainCategory.categorySeq}
          className={`main-category ${
            activeCategory === mainCategory.categorySeq ? "active" : ""
          }`}
          onClick={() =>
            handleToggleCategory(
              mainCategory.categorySeq,
              mainCategory.parentCategorySeqName
            )
          }
        >
          {mainCategory.parentCategorySeq} {/* 수정 */}
          {/* 서브 카테고리가 있고, 현재 카테고리가 활성화된 경우에만 드롭다운 메뉴를 표시합니다. */}
          {activeCategory === mainCategory.categorySeq &&
            mainCategory.subCategories.length > 0 && (
              <div className="sub-category-list">
                {mainCategory.subCategories.map((subCategory, index) => (
                  <div key={index} className="sub-category">
                    {subCategory}
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

export default CMenu;
